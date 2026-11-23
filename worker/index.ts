/**
 * Cloudflare Worker Edge Entrypoint for Shrey Shah Portfolio
 * Handles edge asset delivery, custom domain routing, API proxying, and security headers.
 */

import { WorkerMailer } from "worker-mailer";

export interface Env {
  ASSETS: {
    fetch: (request: Request | string) => Promise<Response>;
  };
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_SECURE?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  CONTACT_TO_EMAIL?: string;
  RESEND_API_KEY?: string;
  RUNBOOK_COPILOT_API_URL?: string;
  RUNBOOK_COPILOT_TOKEN?: string;
  NEXT_PUBLIC_SITE_URL?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // --------------------------------------------------------------------------
    // 0. Canonical Edge Redirection: HTTP -> HTTPS and www.* -> bare domain
    // --------------------------------------------------------------------------
    const isHttp = url.protocol === "http:";
    const isWww = url.hostname.startsWith("www.");
    const isLocalhost = url.hostname === "localhost" || url.hostname === "127.0.0.1";

    if (!isLocalhost && (isHttp || isWww)) {
      const canonicalHostname = url.hostname.replace(/^www\./, "");
      const canonicalUrl = `https://${canonicalHostname}${url.pathname}${url.search}`;
      return Response.redirect(canonicalUrl, 301);
    }

    // --------------------------------------------------------------------------
    // 1. API Route: Contact Form Dispatcher (/api/contact)
    // --------------------------------------------------------------------------
    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        const body = (await request.json()) as {
          name?: string;
          email?: string;
          message?: string;
          company?: string;
          honeypot?: string;
        };

        const { name, email, message, company, honeypot } = body;

        // Anti-bot Honeypot validation (company or legacy honeypot)
        if ((company && company.trim().length > 0) || (honeypot && honeypot.trim().length > 0)) {
          return Response.json({ ok: true, message: "Transmission received" });
        }

        if (!name || !email || !message) {
          return Response.json(
            { ok: false, error: "Please provide name, email, and message." },
            { status: 400 }
          );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return Response.json(
            { ok: false, error: "Invalid email address format." },
            { status: 400 }
          );
        }

        // 1. Primary: Zoho Mail SMTP via WorkerMailer (Cloudflare TCP Sockets)
        if (env.SMTP_USER && env.SMTP_PASS) {
          const mailer = await WorkerMailer.connect({
            host: env.SMTP_HOST || "smtppro.zoho.in",
            port: Number(env.SMTP_PORT) || 465,
            secure: env.SMTP_SECURE !== "false",
            authType: "login",
            credentials: {
              username: env.SMTP_USER,
              password: env.SMTP_PASS,
            },
          });

          const safeName = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
          const safeEmail = email.replace(/</g, "&lt;").replace(/>/g, "&gt;");
          const safeMessage = message
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\n/g, "<br/>");

          const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: #111; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="border-bottom: 2px solid #F15419; padding-bottom: 12px; margin-bottom: 20px;">
    <h2 style="margin: 0; font-size: 20px; color: #111;">New Portfolio Contact Message</h2>
    <p style="margin: 4px 0 0; font-size: 13px; color: #666;">Received via shreyks.com</p>
  </div>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
    <tr><td style="padding: 6px 0; width: 80px; font-weight: bold; color: #555;">From:</td><td>${safeName}</td></tr>
    <tr><td style="padding: 6px 0; width: 80px; font-weight: bold; color: #555;">Email:</td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
  </table>
  <div style="padding: 16px; background-color: #f7f7f8; border-left: 4px solid #F15419; border-radius: 4px; font-size: 14px;">
    <div style="font-weight: bold; margin-bottom: 8px; color: #333;">Message:</div>
    <div>${safeMessage}</div>
  </div>
</body>
</html>
          `.trim();

          await mailer.send({
            from: {
              name: "Portfolio Contact",
              email: env.SMTP_USER,
            },
            to: {
              name: "Shrey Shah",
              email: env.CONTACT_TO_EMAIL || env.SMTP_USER,
            },
            reply: {
              name,
              email,
            },
            subject: `New message from ${name} — shreyks.com`,
            text: `New message from ${name} (${email}):\n\n${message}\n\n---\nSent from portfolio contact form (shreyks.com)`,
            html: htmlContent,
          });

          return Response.json({ ok: true });
        }

        // 2. Secondary Fallback: Resend API if configured
        if (env.RESEND_API_KEY) {
          const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Portfolio Contact <onboarding@resend.dev>",
              to: [env.CONTACT_TO_EMAIL || "shrey.shah@shreyks.com"],
              reply_to: email,
              subject: `[Portfolio Inquiry] ${name}`,
              text: `Sender Name: ${name}\nSender Email: ${email}\n\nMessage Content:\n${message}\n\n---\nSent via Cloudflare Worker Edge on shreyks.com`,
            }),
          });

          if (!resendResponse.ok) {
            console.error("Resend API failed:", await resendResponse.text());
          }
          return Response.json({ ok: true });
        }

        console.warn("No mail delivery provider configured on edge worker.");
        return Response.json({ ok: false, error: "Email not configured" }, { status: 500 });
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : "Internal Error";
        console.error("Contact worker error:", errorMsg);
        return Response.json({ ok: false, error: "Could not send message" }, { status: 500 });
      }
    }

    // --------------------------------------------------------------------------
    // 2. API Route: Runbook Copilot Chat Proxy (/api/chat)
    // --------------------------------------------------------------------------
    if (url.pathname === "/api/chat" && request.method === "POST") {
      if (!env.RUNBOOK_COPILOT_API_URL) {
        return Response.json(
          {
            ok: false,
            error: "Demo coming soon",
            message:
              "Runbook Copilot GPU inference backend is currently unconfigured or offline.",
          },
          { status: 503 }
        );
      }

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (env.RUNBOOK_COPILOT_TOKEN) {
        headers["Authorization"] = `Bearer ${env.RUNBOOK_COPILOT_TOKEN}`;
      }

      const backendUrl = `${env.RUNBOOK_COPILOT_API_URL.replace(/\/$/, "")}/chat`;
      return fetch(backendUrl, {
        method: "POST",
        headers,
        body: await request.text(),
      });
    }

    // --------------------------------------------------------------------------
    // 3. Static Asset Delivery with Cloudflare Edge Caching & Security Headers
    // --------------------------------------------------------------------------
    const response = await env.ASSETS.fetch(request);
    const newHeaders = new Headers(response.headers);

    // Defense-in-depth Security Headers
    newHeaders.set("X-Content-Type-Options", "nosniff");
    newHeaders.set("X-Frame-Options", "DENY");
    newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
    newHeaders.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

    // Immutable caching for hashed assets (1-year edge & browser cache)
    if (
      url.pathname.startsWith("/_next/static/") ||
      url.pathname.match(/\.(?:woff2?|png|jpe?g|svg|ico|pdf|webp)$/i)
    ) {
      newHeaders.set("Cache-Control", "public, max-age=31536000, immutable");
    } else {
      // Revalidate dynamic HTML pages so deployments update instantly
      newHeaders.set("Cache-Control", "public, max-age=0, must-revalidate");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
