/**
 * Cloudflare Worker Edge Entrypoint for Shrey Shah Portfolio
 * Handles edge asset delivery, custom domain routing, API proxying, and security headers.
 */

export interface Env {
  ASSETS: {
    fetch: (request: Request | string) => Promise<Response>;
  };
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
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
          honeypot?: string;
        };

        const { name, email, message, honeypot } = body;

        // Anti-bot Honeypot validation
        if (honeypot) {
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

        // If Resend API key is configured in Cloudflare environment
        if (env.RESEND_API_KEY) {
          const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Portfolio Contact <onboarding@resend.dev>",
              to: [env.CONTACT_TO_EMAIL || "Shrey6131@gmail.com"],
              reply_to: email,
              subject: `[Portfolio Inquiry] ${name}`,
              text: `Sender Name: ${name}\nSender Email: ${email}\n\nMessage Content:\n${message}\n\n---\nSent via Cloudflare Worker Edge on shreyks.com`,
            }),
          });

          if (!resendResponse.ok) {
            console.error("Resend API failed:", await resendResponse.text());
          }
        }

        return Response.json({
          ok: true,
          message: "Transmission dispatched successfully to Shrey Shah.",
        });
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : "Internal Error";
        return Response.json({ ok: false, error: errorMsg }, { status: 500 });
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
