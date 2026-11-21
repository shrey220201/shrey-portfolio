export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  eyebrow: string;
  headline: string;
  alternativeHeadline: string;
  subline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
  nowChip: string;
  flags: {
    showPhone: boolean;
    enableNoise: boolean;
    enableScrollProgress: boolean;
    enableCustomCursor: boolean;
    enableFluidCursor: boolean;
    enableSpotlight: boolean;
    enableTerminal: boolean;
  };
  placeholders: {
    runbookCopilotRepoUrl: string;
    profilePhoto: string;
    demoUrl: string;
  };
  navLinks: NavItem[];
}

export const siteConfig: SiteConfig = {
  name: "Shrey Shah",
  role: "IT Infrastructure & Applied AI Engineer",
  eyebrow: "IT INFRASTRUCTURE · APPLIED AI · AUTOMATION",
  headline: "Infrastructure that holds. AI that helps fix it.",
  alternativeHeadline: "I keep enterprise systems running — and build the AI that helps fix them.",
  subline:
    "IT Infrastructure Engineer in Vadodara, India. Backup, storage and virtualisation by day; RAG pipelines and LLM agents built on top of them.",
  location: "Vadodara, Gujarat, India",
  email: "Shrey6131@gmail.com",
  phone: "{{PHONE}}",
  linkedin: "https://www.linkedin.com/in/shrey-shah-5739581a4/",
  github: "https://github.com/shrey220201",
  resumeUrl: "/Shrey_Shah_Resume.pdf",
  nowChip: "Currently: building with LangGraph & Ollama",
  flags: {
    showPhone: false,
    enableNoise: true,
    enableScrollProgress: true,
    enableCustomCursor: true,
    enableFluidCursor: true,
    enableSpotlight: true,
    enableTerminal: true,
  },
  placeholders: {
    runbookCopilotRepoUrl: "{{RUNBOOK_COPILOT_REPO_URL}}",
    profilePhoto: "{{PROFILE_PHOTO}}",
    demoUrl: process.env.NEXT_PUBLIC_DEMO_URL || "",
  },
  navLinks: [
    { label: "Overview", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/experience" },
    { label: "Skills", href: "/skills" },
    { label: "Contact", href: "/contact" },
  ],
};
