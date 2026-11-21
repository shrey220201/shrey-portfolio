export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  promotedBadge?: string;
  highlights: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "itcg-engineer",
    role: "IT Technical Support Engineer",
    company: "ITCG Solutions Pvt. Ltd.",
    location: "Vadodara, Gujarat, India",
    period: "Aug 2025 – Present",
    startDate: "2025-08",
    endDate: "Present",
    current: true,
    highlights: [
      "Deployed QNAP NAS solutions (2–16 bay) across 10+ enterprise client sites, configuring RAID arrays (0/1/5/6/10), SSD caching, and storage expansion; reduced average setup time through standardized deployment playbooks.",
      "Integrated NAKIVO Backup & Replication for enterprise clients; managed a 4-server backup environment (SAP SRV, SRV HRD, SRV E-LAB NOTE, SRV TEAM), created repositories, and maintained backup job SLA compliance.",
      "Resolved a complex multi-layer NAKIVO upgrade failure on ARM64 QNAP TS-431X2 (signature expiry, incompatible package errors, QTS volume root-cause); diagnosed and resolved via SSH, avoiding full data migration.",
      "Managed and resolved 20+ client tickets/month across storage, backup, NComputing connectivity, and firewall issues with consistent SLA adherence via on-site and remote support.",
      "Built a RAG-based AI assistant for the support team that retrieves relevant past tickets and suggests troubleshooting steps, reducing time spent searching for resolutions.",
      "Developed automation workflows in n8n and Microsoft Power Automate to streamline repetitive operational tasks, using API-driven integrations with secure API key handling.",
      "Executed VM migrations (Hyper-V → Proxmox) and implemented QBelt VPN on QNAP for secure remote client access.",
      "Investigated Linux storage configuration on an SAP HANA production server; confirmed partition layout and assessed expansion feasibility without disrupting live ERP workloads.",
    ],
  },
  {
    id: "itcg-intern",
    role: "IT Technical Support Intern",
    company: "ITCG Solutions Pvt. Ltd.",
    location: "Vadodara, Gujarat, India",
    period: "Jun 2025 – Aug 2025",
    startDate: "2025-06",
    endDate: "2025-08",
    promotedBadge: "Promoted to Full-Time in 2 Months",
    highlights: [
      "Completed hands-on training across enterprise solutions (QNAP NAS, NAKIVO, NComputing); participated in client site NAS installations, troubleshooting, and data recovery.",
      "Assisted senior engineers in backup monitoring, POCs, and client demos; supported CCNA-level networking tasks including routing, switching, and Wireshark packet analysis.",
      "Earned accelerated full-time promotion in 2 months based on outstanding technical troubleshooting, ownership, and client delivery.",
    ],
  },
  {
    id: "nupur-intern",
    role: "Frontend Development Intern",
    company: "Nupur Software",
    location: "Vadodara, Gujarat, India",
    period: "Jan 2022 – Mar 2022",
    startDate: "2022-01",
    endDate: "2022-03",
    highlights: [
      "Developed the Hunt and Hire payroll system frontend using HTML, CSS, Bootstrap, jQuery, and AngularJS.",
      "Collaborated on responsive layout design, form validation, and client-side data binding for HR operations.",
    ],
  },
  {
    id: "uro-intern",
    role: "Web Development Intern",
    company: "URO Web-soft Solutions",
    location: "Vadodara, Gujarat, India",
    period: "Jun 2021",
    startDate: "2021-06",
    endDate: "2021-06",
    highlights: [
      "Built job-oriented practical skills in ASP.NET (C#), SQL, and frontend web development in a professional client delivery setting.",
      "Engineered backend queries and database schema integrations for commercial web applications.",
    ],
  },
];
