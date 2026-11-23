"use client";

import React, { useState, useEffect } from "react";
import { Mail, MapPin, Send, CheckCircle2, ArrowUpRight, Copy, Check } from "lucide-react";
import { siteConfig } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Footer";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    company: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [rateLimitState, setRateLimitState] = useState<{
    isLimited: boolean;
    reason: "ip" | "email" | "global" | null;
    secondsRemaining: number;
  }>({
    isLimited: false,
    reason: null,
    secondsRemaining: 0,
  });

  useEffect(() => {
    if (!rateLimitState.isLimited || rateLimitState.secondsRemaining <= 0) return;

    const timer = setInterval(() => {
      setRateLimitState((prev) => {
        if (prev.secondsRemaining <= 1) {
          return { isLimited: false, reason: null, secondsRemaining: 0 };
        }
        return { ...prev, secondsRemaining: prev.secondsRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [rateLimitState.isLimited, rateLimitState.secondsRemaining]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          company: formData.company,
        }),
      });

      const data = await res.json();

      if (res.status === 429 || data.error === "rate_limited") {
        const seconds =
          typeof data.retryAfterSeconds === "number" && data.retryAfterSeconds > 0
            ? data.retryAfterSeconds
            : 900;
        setRateLimitState({
          isLimited: true,
          reason: data.reason || "ip",
          secondsRemaining: seconds,
        });
        setStatus("idle");
        return;
      }

      if (res.ok && data.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", company: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Could not send message. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section id="contact" className="relative w-full py-10 md:py-14 px-4 sm:px-8 lg:px-12 scroll-mt-20">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Communication Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="eyebrow mb-2">DIRECT COMMUNICATION TERMINAL</p>
              <h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-5xl text-[var(--text-primary)]">
                Get In Touch.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                Whether you need enterprise storage architectures, high-availability virtualization, or confidence-gated AI agents that respect physical infrastructure &mdash; my terminal is open.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-3">
              {/* Email with copy button */}
              <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 transition-all hover:border-[var(--border-strong)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--accent)]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] block">
                      DIRECT INBOX
                    </span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="h-4 w-4 text-[var(--success-led)]" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--accent)]">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] block">
                    LOCATION &amp; TIMEZONE
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                    {siteConfig.location} (IST / UTC+5:30)
                  </p>
                </div>
              </div>

              {/* Status pill */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 font-mono text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-2 w-2 rounded-full bg-[var(--success-led)] animate-pulse" />
                  <span className="font-semibold text-[var(--text-primary)]">Usually replies within a day</span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Open for infrastructure engineering, AI engineering, and technical systems roles.
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2 font-mono text-xs text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] transition-colors"
              >
                <LinkedinIcon className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>

              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2 font-mono text-xs text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] transition-colors"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Direct Message Terminal (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-6 sm:p-8">
              <div className="border-b border-[var(--border)] pb-4 mb-6">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  Send Direct Message
                </h3>
                <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
                  I&apos;ll get back to you soon.
                </p>
              </div>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--success-led)]/10 text-[var(--success-led)] border border-[var(--success-led)]/30">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)]">
                    Thanks &mdash; I&apos;ll get back to you soon.
                  </h4>
                  <p className="max-w-[380px] text-xs text-[var(--text-secondary)] leading-relaxed">
                    Your message has reached my inbox. I typically review and reply within a day.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setErrorMessage("");
                    }}
                    className="mt-3 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 font-mono text-xs text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot anti-spam field */}
                  <div style={{ display: "none" }} aria-hidden="true">
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="new-password"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1.5 font-semibold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex Morgan"
                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3.5 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1.5 font-semibold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@enterprise.com"
                        className="w-full rounded-lg border border-white/10 bg-[#0C0C0A] px-3.5 py-2.5 text-xs text-white placeholder-[#656563] focus:border-[#77E7FE] focus:ring-1 focus:ring-[#77E7FE]/40 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1.5 font-semibold">
                      Message / Project Scope *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Details on your infrastructure, storage challenge, or applied AI initiative..."
                      className="w-full rounded-lg border border-white/10 bg-[#0C0C0A] px-3.5 py-2.5 text-xs text-white placeholder-[#656563] focus:border-[#77E7FE] focus:ring-1 focus:ring-[#77E7FE]/40 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center justify-between rounded-lg border border-[var(--danger-led)]/40 bg-[var(--danger-led)]/10 p-3 font-mono text-xs text-[var(--danger-led)]">
                      <span>{errorMessage}</span>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="ml-3 underline hover:opacity-80 font-semibold cursor-pointer shrink-0"
                      >
                        Retry
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting" || rateLimitState.isLimited}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 font-mono text-xs font-semibold text-white shadow-md transition-all hover:opacity-95 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Sending message...</span>
                      </>
                    ) : rateLimitState.isLimited ? (
                      <span>
                        Cooldown active ({Math.floor(rateLimitState.secondsRemaining / 60)}:{(rateLimitState.secondsRemaining % 60).toString().padStart(2, "0")})
                      </span>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Send message</span>
                      </>
                    )}
                  </button>

                  {/* Calm inline rate-limit message */}
                  {rateLimitState.isLimited && (
                    rateLimitState.reason === "global" ? (
                      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 font-mono text-xs text-amber-200/90 leading-relaxed">
                        <span>I&apos;m receiving a lot of messages right now — please try again later or reach me on </span>
                        <a
                          href={siteConfig.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-[var(--accent)] hover:opacity-80 font-semibold inline-flex items-center gap-0.5"
                        >
                          LinkedIn
                          <ArrowUpRight className="h-3 w-3 inline" />
                        </a>
                        .
                      </div>
                    ) : (
                      <div className="rounded-lg border border-white/10 bg-white/5 p-3 font-mono text-xs text-[var(--text-secondary)] leading-relaxed">
                        <span>
                          You&apos;ve sent a couple of messages already — please try again in about {Math.max(1, Math.ceil(rateLimitState.secondsRemaining / 60))} {Math.max(1, Math.ceil(rateLimitState.secondsRemaining / 60)) === 1 ? "minute" : "minutes"}.
                        </span>
                        <span className="block mt-1 text-[11px] text-[var(--text-muted)]">
                          Cooldown remaining: {Math.floor(rateLimitState.secondsRemaining / 60)}:{(rateLimitState.secondsRemaining % 60).toString().padStart(2, "0")}
                        </span>
                      </div>
                    )
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
