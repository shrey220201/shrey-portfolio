"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { siteConfig } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const DynamicIntersectionScene = dynamic(
  () => import("@/components/three/IntersectionScene").then((m) => m.IntersectionScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
      </div>
    ),
  }
);

export function Hero() {
  return (
    <section
      id="overview"
      className="relative flex min-h-[75vh] lg:min-h-[78vh] w-full flex-col justify-center px-6 lg:px-12 pt-20 pb-8 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1240px]">
        {/* Main 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
          
          {/* Left: Dominant, Bold Typography & Narrative (7 cols) */}
          <div className="flex flex-col items-start text-left lg:col-span-7 xl:col-span-7 w-full">
            
            {/* Minimal Status Pill */}
            <Reveal delay={0.05} duration={0.6}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-glass)] px-3.5 py-1.5 backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-[var(--success-led)] shadow-[0_0_8px_var(--success-led)] animate-pulse" />
                <span className="font-mono text-xs text-[var(--text-secondary)]">
                  IT Infrastructure & Applied AI Engineer · Vadodara, India
                </span>
              </div>
            </Reveal>

            {/* Grand Hero Name & Headline */}
            <Reveal delay={0.12} duration={0.8} yOffset={20}>
              <h1 className="mb-5 tracking-[-0.035em] leading-[1.05] text-[var(--text-primary)]">
                <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold tracking-tight mb-3 text-[var(--text-primary)]">
                  Shrey Shah
                </span>
                <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold leading-[1.1] text-[var(--text-secondary)]">
                  I keep enterprise systems running{" "}
                  <span className="gradient-text-ai text-[var(--text-primary)]">
                    and build the AI that helps fix them.
                  </span>
                </span>
              </h1>
            </Reveal>

            {/* Human Narrative Subtitle */}
            <Reveal delay={0.22} duration={0.8}>
              <p className="mb-8 text-base sm:text-lg md:text-xl leading-relaxed text-[var(--text-secondary)] max-w-[620px]">
                IT Infrastructure Engineer at ITCG Solutions. Managing multi-bay enterprise storage, backup pipelines, and hypervisors by day; designing confidence-gated LangGraph agents and fine-tuning open-weights models by night.
              </p>
            </Reveal>

            {/* Clean Tactile CTAs */}
            <Reveal delay={0.3} duration={0.8}>
              <div className="flex flex-wrap items-center gap-4">
                <Magnetic strength={0.2}>
                  <Link
                    href="/projects"
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--accent)] px-7 text-sm sm:text-base font-medium text-white shadow-lg shadow-[var(--glow-accent)] transition-all duration-200 hover:opacity-90 active:scale-95"
                  >
                    <span>View Projects</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Magnetic>

                <Magnetic strength={0.15}>
                  <a
                    href={siteConfig.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-glass)] px-6 text-sm sm:text-base font-medium text-[var(--text-primary)] backdrop-blur-md transition-all duration-200 hover:border-[var(--text-secondary)] hover:bg-[var(--surface-glass)] active:scale-95"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Resume</span>
                  </a>
                </Magnetic>

                {/* Social Icon Pills */}
                <div className="flex items-center gap-2.5 sm:ml-2">
                  <Magnetic strength={0.2}>
                    <a
                      href={siteConfig.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-glass)] text-[var(--text-secondary)] transition-colors hover:border-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    >
                      <GithubIcon className="h-4 w-4" />
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <a
                      href={siteConfig.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-glass)] text-[var(--text-secondary)] transition-colors hover:border-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    >
                      <LinkedinIcon className="h-4 w-4" />
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      aria-label="Email Shrey"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-glass)] text-[var(--text-secondary)] transition-colors hover:border-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Right: The 3D Datacenter Rack (5 cols, prominent & commanding) */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center w-full">
            <Reveal delay={0.2} duration={1} yOffset={20}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                className="relative flex w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[460px] xl:max-w-[500px] aspect-square flex-col items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--surface-glass)] p-6 backdrop-blur-2xl shadow-2xl overflow-hidden"
              >
                {/* Subtle Datacenter Glow */}
                <div
                  className="pointer-events-none absolute -inset-6 rounded-full bg-gradient-to-tr from-[var(--accent)]/15 via-transparent to-[#FF9F0A]/10 blur-3xl"
                  aria-hidden="true"
                />

                {/* 3D Model Stage */}
                <div
                  id="hero-3d-stage"
                  className="relative z-10 flex h-full w-full min-h-[320px] sm:min-h-[360px] flex-col items-center justify-center"
                >
                  <DynamicIntersectionScene className="h-full w-full" />
                </div>
              </motion.div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
