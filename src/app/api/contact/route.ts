import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { checkContactRateLimit, type RateLimitResult } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_ORIGINS = [
  "https://lucabecker.dev",
  "https://www.lucabecker.dev",
];

const contactSchema = z.object({
  name: z.string().min(1, "Name is required.").max(100),
  email: z.email("Invalid email address.").max(254),
  subject: z
    .string()
    .min(1, "Subject is required.")
    .max(200)
    .refine((s) => !(s.includes("\n") || s.includes("\r")), "Invalid subject."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(5000),
});

type ContactInput = z.infer<typeof contactSchema>;

const SEND_FAILED = { error: "Failed to send message. Please try again." };

function allowedOrigins(host: string | null): readonly string[] {
  if (process.env.NODE_ENV === "development" && host) {
    return [...ALLOWED_ORIGINS, `http://${host}`];
  }
  return ALLOWED_ORIGINS;
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }
  return allowedOrigins(request.headers.get("host")).includes(origin);
}

function tooManyRequests(
  rateLimit: Extract<RateLimitResult, { allowed: false }>
): NextResponse {
  const minutes = Math.ceil(rateLimit.retryAfterSeconds / 60);
  const unit = minutes === 1 ? "minute" : "minutes";
  return NextResponse.json(
    { error: `Too many messages. Try again in ${minutes} ${unit}.` },
    {
      status: 429,
      headers: {
        "Retry-After": String(rateLimit.retryAfterSeconds),
        "X-RateLimit-Limit": String(rateLimit.limit),
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": String(Math.ceil(rateLimit.reset / 1000)),
      },
    }
  );
}

async function parseContact(
  request: Request
): Promise<{ data: ContactInput } | { error: string }> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return { error: "Invalid request body." };
  }
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }
  return { data: result.data };
}

async function deliver(input: ContactInput): Promise<NextResponse> {
  const emailTo = process.env.EMAIL_TO;
  if (!emailTo) {
    console.error("EMAIL_TO is not configured.");
    return NextResponse.json(SEND_FAILED, { status: 500 });
  }
  try {
    const { error } = await resend.emails.send({
      from: "Support Form <noreply@lucabecker.dev>",
      to: emailTo,
      replyTo: input.email,
      subject: `[Support] ${input.subject}`,
      text: `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
    });
    if (error) {
      console.error("Resend rejected the email:", error);
      return NextResponse.json(SEND_FAILED, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(SEND_FAILED, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const rateLimit = await checkContactRateLimit(request);
  if (!rateLimit.allowed) {
    return tooManyRequests(rateLimit);
  }

  const parsed = await parseContact(request);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  return deliver(parsed.data);
}
