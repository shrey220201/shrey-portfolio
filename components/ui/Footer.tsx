"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/content/site";

export function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function LinkedinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-10 md:py-12">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-6 md:flex-row">
        {/* Left: Operational status pill */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)] px-3 py-1 font-mono text-[11px] text-[var(--text-secondary)]">
            <span
              className="inline-block h-2 w-2 rounded-full bg-[var(--success-led)] shadow-[0_0_8px_var(--success-led)] animate-pulse"
              aria-hidden="true"
            />
            <span>SYSTEM: ALL NODES OPERATIONAL · 99.98% UPTIME</span>
          </div>
        </div>

        {/* Center: Copyright & Attribution */}
        <div className="text-center font-mono text-xs text-[var(--text-muted)]">
          <p>&copy; {currentYear} {siteConfig.name} &middot; Designed with Dieter Rams &amp; Apple Utilitarian Principles</p>
        </div>

        {/* Right: Quick Links & Back to top */}
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
