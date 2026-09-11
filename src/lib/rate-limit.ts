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

const REDIS_URL =
  process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const REDIS_TOKEN =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

let cachedLimiter: Ratelimit | null | undefined;

function createLimiter(): Ratelimit | null {
  if (!(REDIS_URL && REDIS_TOKEN)) {
    console.warn("Rate limiting disabled: no Upstash credentials");
    return null;
  }
  return new Ratelimit({
    redis: new Redis({ token: REDIS_TOKEN, url: REDIS_URL }),
    limiter: Ratelimit.slidingWindow(3, "10 m"),
    analytics: false,
  });
}

function getLimiter(): Ratelimit | null {
  if (cachedLimiter === undefined) {
    cachedLimiter = createLimiter();
  }
  return cachedLimiter;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const firstForwarded = forwarded?.split(",")[0]?.trim();
  return firstForwarded || request.headers.get("x-real-ip") || "unknown";
}

/** The slice of Upstash's limit response this module reads. */
interface LimitOutcome {
  limit: number;
  reset: number;
  success: boolean;
}

function toRateLimitResult(result: LimitOutcome): RateLimitResult {
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
}

export async function checkContactRateLimit(
  request: Request
): Promise<RateLimitResult> {
  const limiter = getLimiter();
  if (!limiter) {
    return { allowed: true };
  }
  try {
    return toRateLimitResult(
      await limiter.limit(`contact:${clientIp(request)}`)
    );
  } catch (error) {
    console.error(error);
    return { allowed: true };
  }
}
