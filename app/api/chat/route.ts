import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const chatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(4000),
  sessionId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const apiUrl = process.env.RUNBOOK_COPILOT_API_URL;
    const apiToken = process.env.RUNBOOK_COPILOT_TOKEN;

    // If backend environment variables are absent, return 503 Service Unavailable
    if (!apiUrl) {
      return NextResponse.json(
        {
          ok: false,
          error: "Demo coming soon",
          message: "Runbook Copilot GPU inference backend is currently offline or unconfigured.",
        },
        { status: 503 }
      );
    }

    const body = await req.json();
    const validation = chatRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { ok: false, error: validation.error.issues[0]?.message || "Invalid chat payload" },
        { status: 400 }
      );
    }

    const { message, sessionId } = validation.data;

    // Forward request to FastAPI backend on Modal / Render
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (apiToken) {
      headers["Authorization"] = `Bearer ${apiToken}`;
      headers["RUNBOOK_COPILOT_TOKEN"] = apiToken;
    }

    const backendResponse = await fetch(`${apiUrl.replace(/\/$/, "")}/chat`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        message,
        session_id: sessionId || "web-guest-session",
      }),
    });

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error("[Runbook Copilot Backend Error]:", errorText);
      return NextResponse.json(
        { ok: false, error: "Backend triage inference failed", status: backendResponse.status },
        { status: 502 }
      );
    }

    // If backend supports streaming (text/event-stream or chunked text), stream back directly
    if (backendResponse.body) {
      return new Response(backendResponse.body, {
        headers: {
          "Content-Type": backendResponse.headers.get("Content-Type") || "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
        },
      });
    }

    const data = await backendResponse.json();
    return NextResponse.json({ ok: true, data });
  } catch (err: unknown) {
    console.error("[Chat Route Proxy Exception]:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to connect to Runbook Copilot inference backend" },
      { status: 500 }
    );
  }
}
