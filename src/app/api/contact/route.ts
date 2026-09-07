import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { checkContactRateLimit } from "@/lib/rate-limit";

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

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  const allowedOrigins =
    process.env.NODE_ENV === "development" && host
      ? [...ALLOWED_ORIGINS, `http://${host}`]
      : ALLOWED_ORIGINS;
  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const rateLimit = await checkContactRateLimit(request);
  if (!rateLimit.allowed) {
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

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  try {
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    const emailTo = process.env.EMAIL_TO;
    if (!emailTo) {
      console.error("EMAIL_TO is not configured.");
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: "Support Form <noreply@lucabecker.dev>",
      to: emailTo,
      replyTo: email,
      subject: `[Support] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
