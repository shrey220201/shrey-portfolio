"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Globe, HardDrive, Network, Sparkles, Terminal, FileText, ArrowRight } from "lucide-react";
import { projects } from "@/content/projects";
import { GlassCard } from "@/components/ui/GlassCard";
import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal } from "@/components/motion/Reveal";

export function Projects() {
  const moreProjects = projects.filter((p) => p.slug !== "runbook-copilot");
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Enterprise Infrastructure", "Applied AI", "Automation & Storage", "Networking & Systems"];

  const filteredProjects =
    filter === "All"
      ? moreProjects
      : moreProjects.filter((p) => p.category === filter);

  const getProjectIcon = (slug: string) => {
    switch (slug) {
      case "dual-region-infrastructure":
        return Globe;
      case "qnap-nakivo-backup":
        return HardDrive;
      case "ninjapostal-network":
        return Network;
      case "support-rag-assistant":
        return Sparkles;
      case "workflow-automation":
        return Terminal;
      case "bookstack-wiki":
        return FileText;
      default:
        return HardDrive;
    }
  };

  return (
    <section id="projects" className="relative w-full py-12 md:py-16 px-6">
      <div className="mx-auto max-w-[1200px]">
        {/* Section Header */}
        <Reveal duration={0.8}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
            <div>
              <p className="eyebrow mb-3">SYSTEMS & WORKFLOWS</p>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-5xl md:text-6xl text-[var(--text-primary)]">
                More Projects.
              </h2>
              <p className="mt-4 text-base text-[var(--text-secondary)] max-w-[600px]">
                Production deployments spanning enterprise multi-region disaster recovery, automated RAG support assistants, and custom network architectures.
              </p>
            </div>

            {/* Category Filter Pills (Responsive scroll/wrap) */}
            <div className="flex max-w-full items-center gap-1.5 overflow-x-auto no-scrollbar p-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-glass)] backdrop-blur-md">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`rounded-full px-3 py-1 font-mono text-xs whitespace-nowrap shrink-0 transition-all ${
                    filter === cat
                      ? "bg-[var(--text-primary)] text-[var(--bg)] font-semibold shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const Icon = getProjectIcon(project.slug);
            const isFeatured = project.slug === "dual-region-infrastructure";

            return (
              <Reveal key={project.slug} delay={idx * 0.08} duration={0.8}>
                <TiltCard
                  className={`h-full ${
                    isFeatured ? "md:col-span-2 lg:col-span-2" : ""
                  }`}
                  maxTilt={5}
                >
                  <GlassCard
                    className={`h-full flex flex-col justify-between group cursor-pointer transition-all duration-300 ${
                      isFeatured
                        ? "bg-gradient-to-br from-[var(--surface-glass)] via-[var(--surface-glass)] to-[var(--accent)]/5"
                        : ""
                    }`}
                  >
                    <div>
                      {/* Card Header: Icon & Category */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--accent)] group-hover:scale-105 transition-transform">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-mono text-[11px] text-[var(--text-secondary)] uppercase tracking-wider">
                          {project.category}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-1 font-mono text-xs text-[var(--accent)]">
                        {project.tagline}
                      </p>

                      <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Metrics Badges */}
                      {project.metrics && (
                        <div className="mt-5 grid grid-cols-2 gap-2 border-y border-[var(--border)] py-3">
                          {project.metrics.slice(0, 2).map((m, mIdx) => (
                            <div key={mIdx}>
                              <span className="font-mono text-xs font-bold text-[var(--text-primary)]">
                                {m.value}
                              </span>
                              <span className="block font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-tight">
                                {m.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Stack Chips */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-[var(--border)] bg-[var(--surface-glass)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.stack.length > 4 && (
                          <span className="rounded-md border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]">
                            +{project.stack.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer Link */}
                    <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                      <span className="font-mono text-xs text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                        Explore architecture & runbooks
                      </span>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-glass)] text-[var(--text-secondary)] group-hover:border-[var(--text-primary)] group-hover:text-[var(--text-primary)] transition-colors"
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </GlassCard>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
