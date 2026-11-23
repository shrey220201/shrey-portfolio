"use client";

import React, { useState } from "react";
import { skillCategories, skills, SkillCategory } from "@/content/skills";
import { Info } from "lucide-react";

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("All");

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative w-full py-10 md:py-14 px-4 sm:px-8 lg:px-12 scroll-mt-20">
      <div className="mx-auto max-w-[1240px]">
        {/* Section Header */}
        <div className="mb-10 max-w-[760px]">
          <p className="eyebrow mb-2">TECHNICAL COMPETENCIES &amp; RUNTIME MATRIX</p>
          <h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-5xl md:text-6xl text-[var(--text-primary)]">
            Skills Matrix.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Bare-metal enterprise storage arrays, multi-hypervisor virtualization clusters, network routing, and applied LLM/agent engineering. Each technology has been battle-tested in live client infrastructure or quantitative evaluation pipelines.
          </p>
        </div>

        {/* Filter Pills with Counters */}
        <div className="mb-8 flex max-w-full items-center gap-1.5 overflow-x-auto no-scrollbar p-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)]">
          {skillCategories.map((cat) => {
            const count = cat === "All" ? skills.length : skills.filter((s) => s.category === cat).length;
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? "bg-[#77E7FE]/15 text-[#77E7FE] border border-[#77E7FE]/50 shadow-[0_0_14px_rgba(119,231,254,0.25)] font-semibold"
                    : "border border-white/10 bg-[#141412] text-[#9E9E9C] hover:text-white hover:border-white/20"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isActive ? "bg-[#77E7FE]/25 text-[#77E7FE]" : "bg-white/10 text-[#656563]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Skills Chips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredSkills.map((skill) => {
            return (
              <div
                key={`${skill.category}-${skill.name}`}
                className="group relative rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 transition-all duration-200 hover:border-[var(--border-strong)] hover:bg-[var(--bg-card)]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {skill.name}
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                      {skill.category}
                    </span>
                  </div>
                  <Info className="h-3.5 w-3.5 text-[var(--text-muted)] opacity-60 group-hover:opacity-100 transition-opacity shrink-0 ml-2 mt-0.5" />
                </div>

                {/* Contextual Usage */}
                <p className="mt-2.5 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)] pt-2.5">
                  {skill.tooltip}
                </p>
              </div>
            );
          })}
        </div>

        {/* Telemetry Summary Strip */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-[var(--border)] pt-5 font-mono text-xs text-[var(--text-muted)] gap-2">
          <span>SHOWING {filteredSkills.length} OF {skills.length} TECHNOLOGIES · LIVE CLIENT ENVIRONMENT EXPERIENCE</span>
          <span className="text-[var(--text-secondary)]">SHREY SHAH · IT INFRASTRUCTURE &amp; APPLIED AI</span>
        </div>
      </div>
    </section>
  );
}
