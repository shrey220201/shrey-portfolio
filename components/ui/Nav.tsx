"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Command } from "lucide-react";
import { siteConfig } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-3 md:pt-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`flex w-full max-w-[1140px] items-center justify-between rounded-full border border-[var(--border)] px-4 py-2 transition-all duration-300 md:px-5 ${
          scrolled
            ? "bg-[var(--bg-elevated)]/90 backdrop-blur-xl shadow-lg shadow-black/10 border-[var(--border-strong)]"
            : "bg-[var(--surface-glass)] backdrop-blur-md"
        }`}
      >
        {/* Brand Name: Shrey Shah in bold ash grey */}
        <Link
          href="/"
          className="text-sm sm:text-base font-bold tracking-tight text-[#B2BEB5] hover:text-white transition-colors select-none"
        >
          Shrey Shah
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {siteConfig.navLinks.map((link) => {
            const isActive = isLinkActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-[#77E7FE]"
                    : "text-[#9E9E9C] hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-[#77E7FE]/10 border border-[#77E7FE]/40 shadow-[0_0_14px_rgba(119,231,254,0.2)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Command Hint */}
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
              );
            }}
            className="hidden lg:flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--bg-card)] px-2 py-1 font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors"
            title="Open Command Palette (⌘K)"
          >
            <Command className="h-3 w-3" />
            <span>K</span>
          </button>

          <ThemeToggle />

          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[var(--text-primary)] px-3.5 py-1.5 text-xs font-semibold text-[var(--bg)] transition-opacity hover:opacity-90"
          >
            Resume
            <ArrowUpRight className="h-3 w-3" />
          </a>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="inline-flex md:hidden h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-glass)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-4 right-4 z-40 overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)]/95 p-4 backdrop-blur-2xl md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-2.5 text-xs font-medium transition-colors ${
                    isLinkActive(link.href)
                      ? "bg-[var(--surface-hover)] text-[var(--text-primary)] font-semibold border border-[var(--border)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-[var(--border)] flex justify-between items-center px-4">
                <span className="font-mono text-xs text-[var(--text-muted)]">Download CV</span>
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[var(--accent)]"
                >
                  Resume PDF
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
