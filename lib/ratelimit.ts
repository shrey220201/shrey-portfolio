import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import crypto from "crypto";

export type RateLimitReason = "ip" | "email" | "global";

export interface RateLimitResult {
  ok: boolean;
  retryAfterSeconds: number;
  reason: RateLimitReason | null;
}

// In-memory fallback map for local development or when Redis is unconfigured/fails
// IP -> array of timestamps in milliseconds
const inMemoryStore = new Map<string, number[]>();
const IN_MEMORY_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const IN_MEMORY_MAX_REQUESTS = 2; // max 2 requests per 15 min

function checkInMemoryFallback(ip: string): RateLimitResult {
  const now = Date.now();
  const existing = inMemoryStore.get(ip) || [];
  // Filter out timestamps older than the sliding window
  const recent = existing.filter((ts) => now - ts < IN_MEMORY_WINDOW_MS);

  if (recent.length >= IN_MEMORY_MAX_REQUESTS) {
    const oldest = recent[0];
    const retryAfterMs = Math.max(0, oldest + IN_MEMORY_WINDOW_MS - now);
    const retryAfterSeconds = Math.max(1, Math.ceil(retryAfterMs / 1000));
    return {
      ok: false,
      retryAfterSeconds,
      reason: "ip",
    };
  }

  recent.push(now);
  inMemoryStore.set(ip, recent);
  return { ok: true, retryAfterSeconds: 0, reason: null };
}

// Build Redis client from environment variables (supporting both naming styles)
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

let ratelimiters: {
  ipLimit: Ratelimit;
  emailLimit: Ratelimit;
  globalLimit: Ratelimit;
} | null = null;

if (url && token) {
  try {
    const redis = new Redis({ url, token });

    ratelimiters = {
      ipLimit: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(2, "15 m"),
        prefix: "contact:ip",
      }),
      emailLimit: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(2, "15 m"),
        prefix: "contact:email",
      }),
      globalLimit: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(20, "24 h"),
        prefix: "contact:global",
      }),
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.warn("Failed to initialize Upstash Redis ratelimit:", msg);
    ratelimiters = null;
  }
} else {
  // Missing Redis env vars: will fall back to in-memory limiter
}

export function hashEmail(email: string): string {
  const normalized = email.toLowerCase().trim();
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

export async function checkContactLimits(ip: string, email: string): Promise<RateLimitResult> {
  // If Redis is not configured, gracefully fall back to in-memory limiter
  if (!ratelimiters) {
    return checkInMemoryFallback(ip);
  }

  try {
    const now = Date.now();
    const emailHash = hashEmail(email);

    // 1. Check Global Limit (key: "all")
    const globalRes = await ratelimiters.globalLimit.limit("all");
    if (!globalRes.success) {
      const retryAfterSeconds = Math.max(1, Math.ceil((globalRes.reset - now) / 1000));
      return { ok: false, retryAfterSeconds, reason: "global" };
    }

    // 2. Check IP Limit
    const ipRes = await ratelimiters.ipLimit.limit(ip);
    if (!ipRes.success) {
      const retryAfterSeconds = Math.max(1, Math.ceil((ipRes.reset - now) / 1000));
      return { ok: false, retryAfterSeconds, reason: "ip" };
    }

    // 3. Check Email Limit (hashed email key)
    const emailRes = await ratelimiters.emailLimit.limit(emailHash);
    if (!emailRes.success) {
      const retryAfterSeconds = Math.max(1, Math.ceil((emailRes.reset - now) / 1000));
      return { ok: false, retryAfterSeconds, reason: "email" };
    }

    return { ok: true, retryAfterSeconds: 0, reason: null };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.warn("Upstash Redis error during rate limit check, using in-memory fallback:", errorMsg);
    return checkInMemoryFallback(ip);
  }
}
