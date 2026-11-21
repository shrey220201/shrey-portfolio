"use client";

import React from "react";
import { Terminal } from "lucide-react";
import { fieldNotes } from "@/content/fieldNotes";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

export function FieldNotes() {
  return (
    <section id="field-notes" className="relative w-full py-12 md:py-16 px-6 bg-[var(--bg-elevated)]/30 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-8 max-w-[720px]">
          <p className="eyebrow mb-3">INCIDENT TRIAGE</p>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-5xl md:text-6xl text-[var(--text-primary)]">
            Field Notes.
          </h2>
          <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed">
            Hard problems solved under live conditions — when standard playbooks fail and root-cause debugging over SSH is the only way forward.
          </p>
        </div>

        {/* 4 Incident Cards Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fieldNotes.map((note, idx) => (
            <Reveal key={note.id} delay={idx * 0.1} duration={0.8}>
              <TiltCard maxTilt={4} className="h-full">
                <GlassCard
                  className="h-full flex flex-col justify-between group hover:border-[var(--border-strong)] transition-all"
                >
              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5" />
                    {note.category}
                  </span>
                  <span className="inline-block h-2 w-2 rounded-full bg-[var(--success-led)] shadow-[0_0_6px_var(--success-led)]" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                  {note.title}
                </h3>

                {/* Problem */}
                <div className="mb-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                    Condition:
                  </span>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {note.problem}
                  </p>
                </div>

                {/* Resolution */}
                <div className="mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent-2)] block mb-1">
                    Resolution:
                  </span>
                  <p className="text-xs text-[var(--text-primary)]/90 leading-relaxed font-mono bg-[var(--surface-glass)] p-2.5 rounded-lg border border-[var(--border)]">
                    {note.resolution}
                  </p>
                </div>
              </div>

              {/* Bottom: Impact & Tags */}
              <div className="pt-4 border-t border-[var(--border)] mt-4">
                <div className="mb-3">
                  <span className="font-mono text-[10px] uppercase text-[var(--success-led)] font-semibold block mb-0.5">
                    Result:
                  </span>
                  <p className="text-xs font-medium text-[var(--text-primary)]">
                    {note.impact}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </TiltCard>
        </Reveal>
      ))}
        </div>
      </div>
    </section>
  );
}
