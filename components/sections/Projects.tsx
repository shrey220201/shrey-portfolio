"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Globe, HardDrive, Network, Sparkles, Terminal, FileText, ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "@/content/projects";
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
    <section id="projects" className="relative w-full py-16 px-6">
      <div className="mx-auto max-w-[1240px]">
        {/* Section Header */}
        <Reveal duration={0.8}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-6">
            <div>
              <p className="eyebrow mb-2">SYSTEMS, INFRASTRUCTURE &amp; AGENTS</p>
              <h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-5xl md:text-6xl text-[var(--text-primary)]">
                Selected Works.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] max-w-[620px] leading-relaxed">
                Production deployments spanning dual-region disaster recovery, enterprise ZFS storage tiers, automated RAG support assistants, and custom enterprise networks.
              </p>
            </div>

            {/* Category Filter Pills (Tactile & Monospace) */}
            <div className="flex max-w-full items-center gap-1.5 overflow-x-auto no-scrollbar p-1 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`rounded-md px-3 py-1.5 font-mono text-xs whitespace-nowrap shrink-0 transition-colors ${
                    filter === cat
                      ? "bg-[var(--accent)] text-white font-semibold shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const Icon = getProjectIcon(project.slug);
            const isFeatured = project.slug === "dual-region-infrastructure";

            return (
              <Reveal key={project.slug} delay={idx * 0.08} duration={0.8} className={isFeatured ? "md:col-span-2 lg:col-span-2" : ""}>
                <TiltCard className="h-full" maxTilt={3}>
                  <div
                    className={`h-full flex flex-col justify-between rounded-2xl border bg-[var(--bg-elevated)] p-6 md:p-8 transition-all duration-300 hover:border-[var(--border-strong)] hover:shadow-xl ${
                      isFeatured ? "border-[var(--border-strong)]" : "border-[var(--border)]"
                    }`}
                  >
                    <div>
                      {/* Card Header: Icon & Category & Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--accent)]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block">
                              SYSTEM CATEGORY
                            </span>
                            <span className="font-mono text-xs text-[var(--text-secondary)] font-semibold">
                              {project.category}
                            </span>
                          </div>
                        </div>

                        {isFeatured && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-muted)] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--accent)] uppercase tracking-wider">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                            CRITICAL INFRASTRUCTURE
                          </span>
                        )}
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-1">
                        {project.title}
                      </h3>
                      <p className="font-mono text-xs text-[var(--accent)] mb-3">
                        {project.tagline}
                      </p>

                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                        {project.summary}
                      </p>

                      {/* Asymmetric Architecture Highlight for Featured Project */}
                      {isFeatured && (
                        <div className="mb-5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 font-mono text-xs">
                          <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-2 font-semibold">
                            TOPOLOGY PIPELINE:
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-[var(--text-secondary)]">
                            <span className="rounded bg-[var(--bg-elevated)] px-2 py-1 text-[var(--text-primary)] border border-[var(--border)]">
                              Primary 96TB SAN (RAID 60)
                            </span>
                            <span className="text-[var(--accent)]">&rarr;</span>
                            <span className="rounded bg-[var(--bg-elevated)] px-2 py-1 text-[var(--text-primary)] border border-[var(--border)]">
                              10GbE SFP+ Sync
                            </span>
                            <span className="text-[var(--accent)]">&rarr;</span>
                            <span className="rounded bg-[var(--bg-elevated)] px-2 py-1 text-[var(--text-primary)] border border-[var(--border)]">
                              Secondary DR Site
                            </span>
                            <span className="text-[var(--accent)]">&rarr;</span>
                            <span className="rounded bg-[var(--bg-elevated)] px-2 py-1 text-[var(--text-primary)] border border-[var(--border)]">
                              NAKIVO Immutable Backup
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Metrics Badges */}
                      {project.metrics && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 border-y border-[var(--border)] py-3 my-4">
                          {project.metrics.map((m, mIdx) => (
                            <div key={mIdx}>
                              <span className="font-mono text-xs sm:text-sm font-bold text-[var(--text-primary)] block">
                                {m.value}
                              </span>
                              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-tight block">
                                {m.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Stack Chips */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-[var(--border)] bg-[var(--bg-card)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Link */}
                    <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                      >
                        <span>Inspect Architecture &amp; Runbook</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
