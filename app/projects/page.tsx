import React from "react";
import type { Metadata } from "next";
import { RunbookCopilot } from "@/components/sections/RunbookCopilot";
import { Projects } from "@/components/sections/Projects";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Projects & Systems — Shrey Shah",
  description:
    "Production infrastructure, LangGraph agents, QLoRA fine-tuning, and enterprise backup systems built by Shrey Shah.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col w-full pt-16 md:pt-20">
      {/* Page Header */}
      <div className="w-full px-6 pt-8 pb-4">
        <div className="mx-auto max-w-[1200px]">
          <Reveal duration={0.7}>
            <p className="eyebrow mb-2">PORTFOLIO & CASE STUDIES</p>
            <h1 className="text-4xl font-semibold tracking-[-0.035em] sm:text-6xl text-[var(--text-primary)]">
              Projects &amp; Systems.
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[var(--text-secondary)] max-w-[720px] leading-relaxed">
              Real enterprise infrastructure architectures, confidence-gated AI agents, and incident triage runbooks engineered for production reliability.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Flagship Highlight */}
      <RunbookCopilot />

      {/* All Projects Catalog */}
      <Projects />
    </div>
  );
}
