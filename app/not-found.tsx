import React from "react";
import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] w-full flex-col items-center justify-center px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--accent)] mb-6 shadow-lg shadow-[var(--glow-accent)]/15">
        <Terminal className="h-8 w-8" />
      </div>

      <div className="font-mono text-xs uppercase tracking-widest text-[var(--glacier)] mb-2 font-semibold">
        HTTP 404 // ROUTE NOT FOUND
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] mb-3">
        Page Offline or Relocated.
      </h1>

      <p className="max-w-[460px] text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
        The requested system node does not exist in the route manifest. Check the URL or return to the main command console.
      </p>

      <Link
        href="/"
        className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--accent)] px-6 font-mono text-xs font-semibold text-white shadow-lg shadow-[var(--glow-accent)] transition-all hover:opacity-90 active:scale-95"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Return to Headquarters</span>
      </Link>
    </div>
  );
}
