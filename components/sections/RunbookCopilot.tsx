"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Workflow,
  CheckCircle,
  AlertTriangle,
  Layers,
} from "lucide-react";
import { projects } from "@/content/projects";
import { GlassCard } from "@/components/ui/GlassCard";
import { GithubIcon } from "@/components/ui/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const DynamicAgentGraph = dynamic(
  () => import("@/components/three/AgentGraph").then((m) => m.AgentGraph),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-56 w-full flex-col items-center justify-center p-6 text-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent-2)]" />
        <span className="mt-2 font-mono text-[11px] text-[var(--text-secondary)]">
          Mounting Agent Graph 3D...
        </span>
      </div>
    ),
  }
);

export function RunbookCopilot() {
  const project = projects.find((p) => p.slug === "runbook-copilot");
  const [selectedNode, setSelectedNode] = useState<string>("gate");

  if (!project) return null;

  return (
    <section id="runbook-copilot" className="relative w-full py-12 md:py-16 px-6 bg-[var(--bg-elevated)]/40 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1200px]">
        {/* Eyebrow & Tagline */}
        <Reveal duration={0.8}>
          <div className="mb-8 max-w-[800px]">
            <p className="eyebrow mb-3">FEATURED PROJECT</p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-5xl md:text-6xl text-[var(--text-primary)]">
              Runbook Copilot
            </h2>
            <p className="mt-3 text-lg sm:text-xl text-[var(--accent-2)] font-mono">
              {project.tagline}
            </p>
            <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed">
              {project.summary}
            </p>

            {/* Tech Stack Chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface-glass)] px-2.5 py-1 font-mono text-xs text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Key Metrics Strip */}
        <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {project.metrics?.map((metric, i) => (
            <Reveal key={i} delay={i * 0.08} duration={0.7}>
              <GlassCard className="p-5 text-center">
                <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--accent-2)]">
                  {metric.value}
                </div>
                <div className="mt-1 font-mono text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                  {metric.label}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* Two-Column Deep Dive: Narrative on Left, Interactive Graph on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Problem, Approach & Benchmark (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* The Problem */}
            <Reveal duration={0.8}>
              <GlassCard>
                <div className="flex items-center gap-2.5 mb-4 text-[var(--accent)] font-mono text-xs uppercase tracking-wider font-semibold">
                  <AlertTriangle className="h-4 w-4" />
                  <span>The Problem</span>
                </div>
                <ul className="space-y-3">
                  {project.problem.map((prob, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <span className="font-mono text-xs text-[var(--accent)] mt-0.5">•</span>
                      <span>{prob}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>

            {/* The Approach & Engineering Decisions */}
            <Reveal duration={0.8} delay={0.1}>
              <GlassCard>
                <div className="flex items-center gap-2.5 mb-4 text-[var(--accent-2)] font-mono text-xs uppercase tracking-wider font-semibold">
                  <Workflow className="h-4 w-4" />
                  <span>Engineering Decisions & Architecture</span>
                </div>
                <ul className="space-y-3.5">
                  {project.approach.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <CheckCircle className="h-4 w-4 shrink-0 text-[var(--accent-2)] mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>

            {/* Fine-Tuning Accuracy Before / After Bar */}
            <Reveal duration={0.8} delay={0.15}>
              <TiltCard maxTilt={4}>
                <GlassCard className="border-[var(--accent-2)]/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent-2)]">
                      <Layers className="h-4 w-4" />
                      <span>QLoRA Llama 3.2 1B Fine-Tuning Breakthrough</span>
                    </div>
                    <span className="font-mono text-xs text-[var(--text-secondary)]">Modal GPUs (4-bit NF4)</span>
                  </div>

                  <div className="space-y-4">
                    {/* Initial Result */}
                    <div>
                      <div className="flex justify-between font-mono text-xs text-[var(--text-secondary)] mb-1">
                        <span>Initial Baseline (Traced to labeling defect)</span>
                        <span>86.6%</span>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-[var(--surface-glass)] border border-[var(--border)] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "86.6%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full bg-[var(--text-secondary)] opacity-60"
                        />
                      </div>
                    </div>

                    {/* Final Result */}
                    <div>
                      <div className="flex justify-between font-mono text-xs font-semibold text-[var(--accent-2)] mb-1">
                        <span>Optimized Held-out Accuracy (Leak-proof split)</span>
                        <span>95.5%</span>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-[var(--surface-glass)] border border-[var(--border)] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "95.5%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] shadow-[0_0_12px_var(--accent-2)]"
                        />
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-[var(--text-secondary)] leading-normal">
                    Adversarial red-teaming discovered 7 of 12 gate bypasses (prompt injections, role overrides), all systematically resolved with confidence scoring and deterministic guardrails.
                  </p>
                </GlassCard>
              </TiltCard>
            </Reveal>

            {/* Results */}
            <Reveal duration={0.8} delay={0.2}>
              <GlassCard>
                <div className="flex items-center gap-2.5 mb-4 text-[var(--success-led)] font-mono text-xs uppercase tracking-wider font-semibold">
                  <CheckCircle className="h-4 w-4" />
                  <span>Measured Outcomes</span>
                </div>
                <ul className="space-y-2.5">
                  {project.results.map((res, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm font-medium text-[var(--text-primary)]">
                      <span className="font-mono text-xs text-[var(--success-led)] mt-0.5">✓</span>
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </div>

          {/* Right Column: Interactive 3D Agent Graph Stage (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <Reveal duration={0.8}>
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4 border-b border-[var(--border)] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--accent-2)] animate-pulse" />
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                      3D LangGraph State Machine
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--accent-2)]">
                    Interactive R3F Graph
                  </span>
                </div>

                {/* 3D Agent Graph Viewport */}
                <div className="mb-4 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)]/60">
                  <DynamicAgentGraph className="h-[280px] w-full" />
                </div>

                {/* Node Sequence Diagram */}
                <div className="space-y-2.5 my-4">
                  {project.architecture?.nodes.map((node, i) => {
                    const isSelected = selectedNode === node.id;
                    const isEscalation = node.id === "action-escalation";
                    const isGate = node.id === "gate";

                    return (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNode(node.id)}
                        className={`cursor-pointer rounded-xl border p-3 transition-all duration-200 ${
                          isSelected
                            ? "border-[var(--accent-2)] bg-[var(--accent-2)]/10 shadow-md translate-x-1"
                            : "border-[var(--border)] bg-[var(--surface-glass)] hover:border-[var(--text-secondary)]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-[10px] text-[var(--text-secondary)]">
                              0{i + 1}
                            </span>
                            <span className="text-xs font-semibold text-[var(--text-primary)]">
                              {node.label}
                            </span>
                          </div>
                          <span
                            className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${
                              isEscalation
                                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                : isGate
                                ? "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20"
                                : "bg-[var(--surface-glass)] text-[var(--text-secondary)]"
                            }`}
                          >
                            {node.role}
                          </span>
                        </div>
                        {isSelected && (
                          <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed pt-2 border-t border-[var(--border)]">
                            {node.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t border-[var(--border)] flex flex-wrap gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--text-primary)] px-4 py-2 text-xs font-medium text-[var(--bg)] hover:opacity-90 transition-opacity"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>GitHub Repository</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>

                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-xs font-medium text-[var(--text-primary)] hover:border-[var(--text-secondary)]"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-glass)] px-3 py-2 font-mono text-xs text-[var(--text-secondary)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      <span>Demo coming soon</span>
                    </span>
                  )}

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-colors ml-auto"
                  >
                    <span>Case study</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
