import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Zod validation schema according to §9 specifications
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name cannot exceed 80 characters"),
  email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message cannot exceed 2000 characters"),
  honeypot: z.string().optional(),
});

// Simple in-memory rate limiter (5 submissions per 10 minutes per IP)
// TODO: Replace with @upstash/redis or @upstash/ratelimit for distributed multi-region serverless deployments
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  const current = rateLimitMap.get(ip);
  if (!current || now > current.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

    // Rate limiting check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Rate limit exceeded. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Validate body with Zod
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { ok: false, error: validation.error.issues[0]?.message || "Invalid input parameters" },
        { status: 400 }
      );
    }

    const { name, email, message, honeypot } = validation.data;

    // Honeypot anti-bot verification
    if (honeypot && honeypot.trim().length > 0) {
      // Silently discard spam submission and return success to avoid alerting bot
      console.warn(`[Anti-Spam] Bot detected via honeypot from IP: ${ip}`);
      return NextResponse.json({ ok: true });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "Shrey6131@gmail.com";

    // If Resend API key is missing, log payload in development and return 200 OK
    if (!resendApiKey) {
      console.log(`[Dev Contact Form Submission] From: ${name} <${email}>`);
      console.log(`[Message]: ${message}`);
      return NextResponse.json({
        ok: true,
        note: "Development mode: Form submission logged to console (RESEND_API_KEY not configured)",
      });
    }

    // Send email via Resend API
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [toEmail],
        reply_to: email,
        subject: `New Portfolio Inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!resendResponse.ok) {
      const errText = await resendResponse.text();
      console.error("[Resend API Error]:", errText);
      return NextResponse.json(
        { ok: false, error: "Failed to dispatch email via notification provider" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("[Contact API Internal Error]:", err);
    return NextResponse.json(
      { ok: false, error: "An unexpected error occurred while processing your request" },
      { status: 500 }
    );
  }
}
