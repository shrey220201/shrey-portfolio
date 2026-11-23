export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { checkContactLimits } from "@/lib/ratelimit";

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
  company: z.string().optional(),
});

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { ok: false, error: validation.error.issues[0]?.message || "Invalid input parameters" },
        { status: 400 }
      );
    }

    const { name, email, message, company } = validation.data;

    // Honeypot field check: silently return ok if filled by bot
    if (company && company.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    // Rate limiting check via Upstash Redis (with in-memory fallback)
    const ip = getClientIp(req);
    const limitResult = await checkContactLimits(ip, email);

    if (!limitResult.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "rate_limited",
          retryAfterSeconds: limitResult.retryAfterSeconds,
          reason: limitResult.reason,
        },
        {
          status: 429,
          headers: {
            "Retry-After": limitResult.retryAfterSeconds.toString(),
          },
        }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT) || 465;
    const secure = process.env.SMTP_SECURE !== "false";
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!host || !user || !pass || !toEmail) {
      console.warn("SMTP not configured");
      return NextResponse.json(
        { ok: false, error: "Email not configured" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    const textContent = `New message from ${name} (${email}):\n\n${message}\n\n---\nSent from portfolio contact form (shreyks.com)`;
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New message from ${safeName}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="border-bottom: 2px solid #F15419; padding-bottom: 12px; margin-bottom: 20px;">
    <h2 style="margin: 0; font-size: 20px; color: #111;">New Portfolio Contact Message</h2>
    <p style="margin: 4px 0 0; font-size: 13px; color: #666;">Received via shreyks.com</p>
  </div>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
    <tr>
      <td style="padding: 6px 0; width: 80px; font-weight: bold; color: #555;">From:</td>
      <td style="padding: 6px 0;">${safeName}</td>
    </tr>
    <tr>
      <td style="padding: 6px 0; width: 80px; font-weight: bold; color: #555;">Email:</td>
      <td style="padding: 6px 0;"><a href="mailto:${safeEmail}" style="color: #F15419; text-decoration: none;">${safeEmail}</a></td>
    </tr>
    <tr>
      <td style="padding: 6px 0; width: 80px; font-weight: bold; color: #555;">Date:</td>
      <td style="padding: 6px 0; color: #666;">${new Date().toUTCString()}</td>
    </tr>
  </table>
  <div style="padding: 16px; background-color: #f7f7f8; border-left: 4px solid #F15419; border-radius: 4px; font-size: 14px;">
    <div style="font-weight: bold; margin-bottom: 8px; color: #333;">Message:</div>
    <div style="color: #222; word-break: break-word;">${safeMessage}</div>
  </div>
</body>
</html>
    `.trim();

    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to: toEmail,
      replyTo: `"${name}" <${email}>`,
      subject: `New message from ${name} — shreyks.com`,
      text: textContent,
      html: htmlContent,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.error("SMTP error:", errorMsg);
    return NextResponse.json(
      { ok: false, error: "Could not send message" },
      { status: 500 }
    );
  }
}
