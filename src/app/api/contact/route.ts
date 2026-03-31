import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_ORIGINS = [
  'https://lucabecker.dev',
  'https://www.lucabecker.dev',
];

if (process.env.NODE_ENV === 'development') {
  ALLOWED_ORIGINS.push('http://localhost:3000');
}

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(100),
  email: z.string().email('Invalid email address.').max(254),
  subject: z
    .string()
    .min(1, 'Subject is required.')
    .max(200)
    .refine((s) => !s.includes('\n') && !s.includes('\r'), 'Invalid subject.'),
  message: z.string().min(10, 'Message must be at least 10 characters.').max(5000),
});

export async function POST(request: Request) {
  // Origin validation
  const origin = request.headers.get('origin');
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    await resend.emails.send({
      from: `Support Form <noreply@lucabecker.dev>`,
      to: process.env.EMAIL_TO!,
      replyTo: email,
      subject: `[Support] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
