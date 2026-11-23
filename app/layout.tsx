import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { SmoothScrollProvider } from "@/lib/lenis";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { FluidCursor } from "@/components/ui/FluidCursor";
import { CustomCursor } from "@/components/ui/Cursor";
import { FlowingWaveBackground } from "@/components/ui/FlowingWaveBackground";
import { PageIntro } from "@/components/motion/PageIntro";
import { Terminal } from "@/components/ui/Terminal";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { siteConfig } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shreyks.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description: siteConfig.subline,
  keywords: [
    "Shrey Shah",
    "IT Infrastructure Engineer",
    "Applied AI",
    "RAG",
    "LLM Agents",
    "LangGraph",
    "QNAP",
    "NAKIVO",
    "Disaster Recovery",
    "Vadodara",
    "Ollama",
    "Modal QLoRA",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.github }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.subline,
    url: siteUrl,
    siteName: `${siteConfig.name} Portfolio`,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.subline,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  url: siteUrl,
  email: `mailto:${siteConfig.email}`,
  sameAs: [siteConfig.linkedin, siteConfig.github],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vadodara",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  worksFor: {
    "@type": "Organization",
    name: "ITCG Solutions Pvt. Ltd.",
  },
  knowsAbout: [
    "Enterprise IT Infrastructure",
    "QNAP NAS & SAN Storage",
    "RAID Architecture",
    "Disaster Recovery",
    "NAKIVO Backup & Replication",
    "Virtualization",
    "VMware vSphere",
    "Proxmox VE",
    "Hyper-V",
    "Active Directory",
    "Applied AI & LLM Engineering",
    "LangGraph Agents",
    "RAG Architectures",
    "QLoRA Fine-Tuning",
  ],
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] font-sans antialiased selection:bg-[var(--accent)] selection:text-white"
      >
        <ThemeProvider>
          <SmoothScrollProvider>
            <FlowingWaveBackground />
            <PageIntro />
            <NoiseOverlay />
            <ScrollProgress />
            <FluidCursor />
            <CustomCursor />
            <Nav />
            <main className="relative z-10 flex min-h-screen flex-col pt-20">
              {children}
            </main>
            <Terminal />
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
