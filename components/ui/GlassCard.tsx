import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: "accent" | "ai" | "none";
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className,
  glow = "none",
  hoverEffect = true,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-panel relative overflow-hidden rounded-[24px] md:rounded-[28px] p-6 md:p-8 transition-all duration-300",
        hoverEffect &&
          "hover:border-[var(--border-strong)] hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1",
        glow === "accent" && "shadow-[0_0_30px_var(--glow-accent)]",
        glow === "ai" && "shadow-[0_0_30px_var(--glow-ai)]",
        className
      )}
      {...props}
    >
      {/* Soft inner highlight on top edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
