import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Contact form limiter: 3 POSTs per 10 minutes per client IP (sliding window).
 * Missing Upstash credentials skip limiting so local dev works without Redis.
 * Redis errors fail open so a limiter outage never takes the form down.
 */
export type RateLimitResult =
  | { allowed: true }
  | {
      allowed: false;
      retryAfterSeconds: number;
      limit: number;
      reset: number;
    };

const MS_PER_SECOND = 1000;

let cachedLimiter: Ratelimit | null | undefined;
let missingCredentialsWarned = false;

function getLimiter(): Ratelimit | null {
  if (cachedLimiter !== undefined) {
    return cachedLimiter;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

  if (!(url && token)) {
    if (!missingCredentialsWarned) {
      missingCredentialsWarned = true;
      console.warn("Rate limiting disabled: no Upstash credentials");
    }
    cachedLimiter = null;
    return null;
  }

  cachedLimiter = new Ratelimit({
    redis: new Redis({ token, url }),
    limiter: Ratelimit.slidingWindow(3, "10 m"),
    analytics: false,
  });
  return cachedLimiter;
}

export async function checkContactRateLimit(
  request: Request
): Promise<RateLimitResult> {
  const limiter = getLimiter();
  if (!limiter) {
    return { allowed: true };
  }

  const forwarded = request.headers.get("x-forwarded-for");
  const firstForwarded = forwarded?.split(",")[0]?.trim();
  const ip = firstForwarded || request.headers.get("x-real-ip") || "unknown";

  try {
    const result = await limiter.limit(`contact:${ip}`);
    // pending is only for analytics / multi-region sync; analytics is off so we do not await it.
    if (result.success) {
      return { allowed: true };
    }

    return {
      allowed: false,
      limit: result.limit,
      reset: result.reset,
      retryAfterSeconds: Math.max(
        0,
        Math.ceil((result.reset - Date.now()) / MS_PER_SECOND)
      ),
    };
  } catch (error) {
    console.error(error);
    return { allowed: true };
  }
}
