"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { siteConfig } from "@/content/site";
import { useIntro } from "@/lib/intro";

const getStatusMessage = (progress: number) => {
  if (progress < 25) return "INITIALIZING INFRASTRUCTURE MATRIX...";
  if (progress < 55) return "CALIBRATING BARE-METAL & HYPERVISOR NODES...";
  if (progress < 80) return "MOUNTING ENTERPRISE RUNBOOKS & LLM AGENTS...";
  if (progress < 100) return "VERIFYING RECOVERY SLAS & INTEGRITY...";
  return "SYSTEM OPERATIONAL · ALL NODES SECURE";
};

export function PageIntro() {
  const prefersReduced = useReducedMotion();
  const { introActive, completeIntro } = useIntro();

  const [progress, setProgress] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const hasTriggeredReveal = useRef(false);

  useEffect(() => {
    if (!introActive || prefersReduced) {
      setIsDone(true);
      return;
    }

    let rafId: number;
    const startTime = performance.now();
    const duration = 1250; // Total calibration duration in ms

    const step = (now: number) => {
      const elapsed = now - startTime;
      const ratio = Math.min(elapsed / duration, 1);

      // Non-linear realistic calibration progression
      let p: number;
      if (ratio < 0.35) {
        p = (ratio / 0.35) * 45;
      } else if (ratio < 0.75) {
        p = 45 + ((ratio - 0.35) / 0.4) * 40;
      } else {
        p = 85 + ((ratio - 0.75) / 0.25) * 15;
      }

      const currentProgress = Math.min(100, Math.floor(p));
      setProgress(currentProgress);

      if (ratio < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setProgress(100);
        setTimeout(() => {
          triggerUnveil();
        }, 160);
      }
    };

    const triggerUnveil = () => {
      if (hasTriggeredReveal.current) return;
      hasTriggeredReveal.current = true;
      setIsOpening(true);
      completeIntro(); // Triggers the Hero & Nav to glide in right as curtains split

      setTimeout(() => {
        setIsDone(true);
      }, 850);
    };

    rafId = requestAnimationFrame(step);

    const handleSkip = () => {
      setProgress(100);
      triggerUnveil();
    };

    window.addEventListener("keydown", handleSkip);
    window.addEventListener("wheel", handleSkip, { passive: true });
    window.addEventListener("touchmove", handleSkip, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("keydown", handleSkip);
      window.removeEventListener("wheel", handleSkip);
      window.removeEventListener("touchmove", handleSkip);
    };
  }, [introActive, prefersReduced, completeIntro]);

  if (isDone || prefersReduced || !introActive) {
    return null;
  }

  return (
    <div
      className="loader-screen"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="System initialization loading"
      onClick={() => {
        setProgress(100);
        if (!hasTriggeredReveal.current) {
          hasTriggeredReveal.current = true;
          setIsOpening(true);
          completeIntro();
          setTimeout(() => setIsDone(true), 850);
        }
      }}
    >
      {/* Ambient background glow */}
      <div className="loader-ambient-glow" aria-hidden="true" />

      {/* Top Curtain */}
      <motion.div
        className="loader-curtain loader-curtain-top"
        initial={{ y: 0 }}
        animate={{ y: isOpening ? "-100%" : 0 }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Bottom Curtain */}
      <motion.div
        className="loader-curtain loader-curtain-bottom"
        initial={{ y: 0 }}
        animate={{ y: isOpening ? "100%" : 0 }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Center Seam Glow */}
      <motion.div
        className="loader-seam-glow"
        initial={{ scaleX: 1, opacity: 0.85 }}
        animate={{ scaleX: isOpening ? 0 : 1, opacity: isOpening ? 0 : 0.85 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Center HUD */}
      <motion.div
        className="loader-hud"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: isOpening ? 0 : 1, scale: isOpening ? 0.96 : 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* Eyebrow with Beacon */}
        <div className="loader-eyebrow">
          <span className="loader-beacon" aria-hidden="true" />
          <span>SYS_INIT // INFRA_OPS</span>
        </div>

        {/* Title */}
        <div className="loader-title">{siteConfig.name}</div>

        {/* Role */}
        <div className="loader-role">
          <span className="loader-role-part">ENTERPRISE INFRASTRUCTURE</span>
          <span className="loader-role-sep">·</span>
          <span className="loader-role-part">AGENTIC AI</span>
        </div>

        {/* Progress Cluster */}
        <div className="loader-progress-cluster">
          <div className="loader-counter-row">
            <span className="loader-counter-label">CALIBRATING SYSTEM</span>
            <span className="loader-counter-num font-mono">
              {progress.toString().padStart(2, "0")}%
            </span>
          </div>
          <div className="loader-track">
            <div
              className="loader-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Status Stream */}
        <div className="loader-status-stream" aria-live="polite">
          <span className="loader-status-prompt">&gt;</span>
          <span>{getStatusMessage(progress)}</span>
        </div>
      </motion.div>

      {/* Footer Telemetry */}
      <motion.div
        className="loader-footer-telemetry"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: isOpening ? 0 : 0.7 }}
        transition={{ duration: 0.25 }}
      >
        <span>LATENCY: 8MS // ENCRYPTED</span>
        <span>RECOVERY SLA: 99.9%</span>
      </motion.div>
    </div>
  );
}
