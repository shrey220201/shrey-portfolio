"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { siteConfig } from "@/content/site";

export function PageIntro() {
  const prefersReduced = useReducedMotion();
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;

    try {
      const hasSeenIntro = sessionStorage.getItem("shrey-seen-intro");
      if (!hasSeenIntro) {
        setShowIntro(true);
        sessionStorage.setItem("shrey-seen-intro", "true");
        // Auto-dismiss within 1.1s (under 1.2s limit)
        const timer = setTimeout(() => {
          setShowIntro(false);
        }, 1100);
        return () => clearTimeout(timer);
      }
    } catch {
      // sessionStorage might fail in strict private windows
    }
  }, [prefersReduced]);

  const handleSkip = () => {
    setShowIntro(false);
  };

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
          onClick={handleSkip}
          className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-[var(--bg)]"
        >
          <div className="relative flex flex-col items-center">
            {/* Monogram / Name */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--text-primary)]"
            >
              {siteConfig.name}
            </motion.div>

            {/* Line Drawing Animation */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 140 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="mt-2 font-mono text-[10px] text-[var(--text-secondary)] tracking-widest uppercase"
            >
              Infrastructure · AI
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
