import React from "react";
import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact & Connect — Shrey Shah",
  description:
    "Get in touch with Shrey Shah, IT Infrastructure & Applied AI Engineer in Vadodara, India. Inquiries for infrastructure architecture, storage, and AI agents.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full pt-16 md:pt-20">
      {/* Page Header */}
      <div className="w-full px-6 pt-8 pb-4">
        <div className="mx-auto max-w-[1200px]">
          <Reveal duration={0.7}>
            <p className="eyebrow mb-2">INITIATE TRANSMISSION</p>
            <h1 className="text-4xl font-semibold tracking-[-0.035em] sm:text-6xl text-[var(--text-primary)]">
              Let&apos;s Connect.
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[var(--text-secondary)] max-w-[720px] leading-relaxed">
              Open to enterprise infrastructure, storage systems, and applied AI engineering roles. Reach out directly or dispatch a transmission below.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Main Contact Section */}
      <Contact />
    </div>
  );
}
