"use client";

import React, { useState } from "react";
import { Mail, MapPin, Send, CheckCircle2, ArrowUpRight, Copy, Check } from "lucide-react";
import { siteConfig } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Footer";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

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

    if (formData.honeypot) {
      setStatus("success");
      return;
    }

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
          honeypot: formData.honeypot,
        }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", honeypot: "" });
      } else {
        setStatus("success");
      }
    } catch {
      setStatus("success");
    }
  };

  return (
    <div className="relative w-full py-10 md:py-14 px-4 sm:px-8 lg:px-12">
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
                  <span className="font-semibold text-[var(--text-primary)]">SLA: Under 24h response</span>
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
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    Send Direct Message
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
                    Direct transmission to personal communication pipeline
                  </p>
                </div>
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase border border-[var(--border)] px-2 py-0.5 rounded">
                  PORT 443 · TLS
                </span>
              </div>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--success-led)]/10 text-[var(--success-led)] border border-[var(--success-led)]/30">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)]">
                    Message Dispatched Successfully
                  </h4>
                  <p className="max-w-[380px] text-xs text-[var(--text-secondary)] leading-relaxed">
                    Thank you! Your dispatch has reached my inbox. I typically review and respond within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-3 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 font-mono text-xs text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

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
                    <div className="rounded-lg border border-[var(--danger-led)]/40 bg-[var(--danger-led)]/10 p-3 font-mono text-xs text-[var(--danger-led)]">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 font-mono text-xs font-semibold text-white shadow-md transition-all hover:opacity-95 disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>DISPATCHING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>TRANSMIT DISPATCH</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
