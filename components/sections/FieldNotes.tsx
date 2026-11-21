"use client";

import React from "react";
import { Terminal, CheckCircle2 } from "lucide-react";
import { fieldNotes } from "@/content/fieldNotes";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

export function FieldNotes() {
  return (
    <section id="field-notes" className="relative w-full py-16 px-6 bg-[var(--bg-elevated)] border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1240px]">
        {/* Header */}
        <div className="mb-10 max-w-[760px]">
          <p className="eyebrow mb-2">INCIDENT TRIAGE &amp; PRODUCTION POSTMORTEMS</p>
          <h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-5xl md:text-6xl text-[var(--text-primary)]">
            Field Notes.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Unfiltered incident postmortems solved under live enterprise production conditions — when standard GUI playbooks failed and root-cause resolution over SSH was the only path forward.
          </p>
        </div>

        {/* 4 Incident Cards Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fieldNotes.map((note, idx) => (
            <Reveal key={note.id} delay={idx * 0.1} duration={0.8}>
              <TiltCard maxTilt={2} className="h-full">
                <div className="h-full flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 transition-all duration-300 hover:border-[var(--border-strong)] hover:shadow-lg">
                  <div>
                    {/* Header: Category & Severity */}
                    <div className="flex items-center justify-between mb-4 border-b border-[var(--border)] pb-3">
                      <div className="flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-[var(--accent)]" />
                        <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                          {note.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[var(--success-led)] shadow-[0_0_6px_var(--success-led)]" />
                        <span className="font-mono text-[10px] uppercase text-[var(--text-secondary)] font-semibold">
                          RESOLVED
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-3 leading-snug">
                      {note.title}
                    </h3>

                    {/* Incident Condition */}
                    <div className="mb-3.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--warning-led)] font-semibold block mb-1">
                        CONDITION &amp; ANOMALY:
                      </span>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {note.problem}
                      </p>
                    </div>

                    {/* Resolution (Terminal Box) */}
                    <div className="mb-4">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-1">
                        SSH DIAGNOSTICS &amp; REMEDIATION:
                      </span>
                      <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--bg)] p-3 font-mono text-[11px] text-[var(--text-primary)] leading-relaxed">
                        <span className="text-[var(--accent)] select-none mr-2">$</span>
                        {note.resolution}
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Impact Result & Tags */}
                  <div className="pt-3 border-t border-[var(--border)] mt-2">
                    <div className="flex items-start gap-2 mb-3">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[var(--success-led)] shrink-0 mt-0.5" />
                      <div className="font-mono text-xs text-[var(--text-primary)] font-semibold">
                        {note.impact}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
