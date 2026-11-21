import React from "react";
import type { Metadata } from "next";
import { Experience } from "@/components/sections/Experience";
import { FieldNotes } from "@/components/sections/FieldNotes";
import { Credentials } from "@/components/sections/Credentials";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Experience & Background — Shrey Shah",
  description:
    "Career history at ITCG Solutions, incident triage field notes over SSH/RAID, and degrees from Conestoga College & ITM Universe.",
};

export default function ExperiencePage() {
  return (
    <div className="flex flex-col w-full pt-16 md:pt-20">
      {/* Page Header */}
      <div className="w-full px-6 pt-8 pb-4">
        <div className="mx-auto max-w-[1200px]">
          <Reveal duration={0.7}>
            <p className="eyebrow mb-2">CAREER & CREDENTIALS</p>
            <h1 className="text-4xl font-semibold tracking-[-0.035em] sm:text-6xl text-[var(--text-primary)]">
              Experience &amp; Track Record.
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[var(--text-secondary)] max-w-[720px] leading-relaxed">
              Enterprise infrastructure deployments, rapid promotion from Intern to Full-Time, production incident triage under pressure, and formal credentials.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Career Timeline */}
      <Experience />

      {/* Incident Triage Field Notes */}
      <FieldNotes />

      {/* Education & Certifications */}
      <Credentials />
    </div>
  );
}
