import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, AlertTriangle, Layers, ExternalLink } from "lucide-react";
import { projects } from "@/content/projects";
import { GlassCard } from "@/components/ui/GlassCard";
import { GithubIcon } from "@/components/ui/Footer";
import { Project3DViewer } from "@/components/three/Project3DViewer";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const otherProjects = projects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <article className="min-h-screen px-6 py-12 md:py-20">
      <div className="mx-auto max-w-[1000px]">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-glass)] px-4 py-2 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-colors mb-12"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Projects</span>
        </Link>

        {/* Case Study Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--accent)] mb-3">
            <span>Case Study</span>
            <span>·</span>
            <span>{project.category}</span>
          </div>

          <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-5xl md:text-6xl text-[var(--text-primary)]">
            {project.title}
          </h1>

          <p className="mt-4 font-mono text-base sm:text-lg text-[var(--accent-2)]">
            {project.tagline}
          </p>

          <p className="mt-6 text-base text-[var(--text-secondary)] leading-relaxed max-w-[800px]">
            {project.summary}
          </p>

          {/* Tech Stack Chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface-glass)] px-3 py-1 font-mono text-xs text-[var(--text-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="mt-8 flex flex-wrap items-center gap-4 border-b border-[var(--border)] pb-8">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--text-primary)] px-5 py-2.5 text-xs font-semibold text-[var(--bg)] hover:opacity-90 transition-opacity"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}

            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-xs font-medium text-[var(--text-primary)] hover:border-[var(--text-secondary)]"
              >
                <span>Live Demonstration</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <span className="font-mono text-xs text-[var(--text-secondary)]">
                Internal enterprise deployment / Open repo
              </span>
            )}
          </div>
        </div>

        {/* Impact Metrics */}
        {project.metrics && (
          <div className="mb-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {project.metrics.map((m, idx) => (
              <GlassCard key={idx} className="p-5 text-center">
                <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--accent)]">
                  {m.value}
                </div>
                <div className="mt-1 font-mono text-[11px] text-[var(--text-secondary)] uppercase tracking-wider">
                  {m.label}
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Interactive 3D Model Stage (if project has a 3D simulation) */}
        {project.has3dModel && (
          <div className="mb-14 rounded-2xl border border-[var(--border)] bg-[var(--surface-glass)] p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4 border-b border-[var(--border)] pb-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent-2)]">
                Interactive 3D System Topology
              </span>
              <span className="font-mono text-[10px] text-[var(--text-secondary)]">
                Draggable Procedural Simulation
              </span>
            </div>

            <Project3DViewer modelType={project.has3dModel} />
          </div>
        )}

        {/* Narrative Sections */}
        <div className="space-y-10">
          {/* Problem */}
          <GlassCard className="p-8">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-4">
              <AlertTriangle className="h-4 w-4" />
              <span>Problem Context & Objectives</span>
            </div>
            <ul className="space-y-3">
              {project.problem.map((p, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  <span className="font-mono text-xs text-[var(--accent)] mt-0.5">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Approach */}
          <GlassCard className="p-8">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent-2)] mb-4">
              <Layers className="h-4 w-4" />
              <span>Architectural Execution & Methodology</span>
            </div>
            <ul className="space-y-4">
              {project.approach.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--accent-2)] mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Results */}
          <GlassCard className="p-8">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--success-led)] mb-4">
              <CheckCircle2 className="h-4 w-4" />
              <span>Deliverables & Measured Impact</span>
            </div>
            <ul className="space-y-3">
              {project.results.map((res, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm font-medium text-[var(--text-primary)] leading-relaxed">
                  <span className="font-mono text-xs text-[var(--success-led)] mt-0.5">✓</span>
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>

        {/* Related Projects */}
        <div className="mt-20 border-t border-[var(--border)] pt-12">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-6">
            Explore Other Architectures
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherProjects.map((other) => (
              <Link
                key={other.slug}
                href={`/projects/${other.slug}`}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--surface-glass)] p-5 transition-all hover:border-[var(--accent)]"
              >
                <span className="font-mono text-[10px] uppercase text-[var(--accent)] block mb-1">
                  {other.category}
                </span>
                <h4 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {other.title}
                </h4>
                <div className="mt-3 flex items-center gap-1 font-mono text-[11px] text-[var(--text-secondary)]">
                  <span>Read case study</span>
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
