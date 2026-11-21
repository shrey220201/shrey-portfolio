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
    <section id="skills" className="relative w-full py-12 md:py-16 px-6">
      <div className="mx-auto max-w-[1200px]">
        {/* Section Header */}
        <div className="mb-8 max-w-[720px]">
          <p className="eyebrow mb-3">TECHNICAL EXPERTISE</p>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-5xl md:text-6xl text-[var(--text-primary)]">
            Skills Matrix.
          </h2>
          <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed">
            The balance of bare-metal enterprise storage, multi-hypervisor virtualization, and modern applied LLM / agent engineering. Hover any skill to inspect where it was battle-tested.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mb-6 flex max-w-full items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {skillCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 font-mono text-xs whitespace-nowrap shrink-0 transition-all ${
                activeCategory === cat
                  ? "bg-[var(--text-primary)] text-[var(--bg)] font-semibold shadow-md"
                  : "border border-[var(--border)] bg-[var(--surface-glass)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Skills Chips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => {
            return (
              <div
                key={`${skill.category}-${skill.name}`}
                className="group relative rounded-2xl border border-[var(--border)] bg-[var(--surface-glass)] p-4 backdrop-blur-md transition-all duration-200 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--glow-accent)]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {skill.name}
                  </span>
                  <Info className="h-3.5 w-3.5 text-[var(--text-secondary)] opacity-40 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                </div>

                <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                  {skill.category}
                </span>

                {/* Contextual Usage Tooltip */}
                <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)] pt-2 group-hover:text-[var(--text-primary)]/90 transition-colors">
                  {skill.tooltip}
                </p>
              </div>
            );
          })}
        </div>

        {/* Summary Footer */}
        <div className="mt-12 flex items-center justify-between border-t border-[var(--border)] pt-6 font-mono text-xs text-[var(--text-secondary)]">
          <span>{filteredSkills.length} verified technologies</span>
          <span>Shrey Shah · Production Experience</span>
        </div>
      </div>
    </section>
  );
}
