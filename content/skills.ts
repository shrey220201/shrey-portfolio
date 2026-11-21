export interface SkillItem {
  name: string;
  category: SkillCategory;
  tooltip: string;
}

export type SkillCategory =
  | "All"
  | "Applied AI"
  | "Storage & Backup"
  | "Virtualisation & Systems"
  | "Networking & Automation";

export const skillCategories: SkillCategory[] = [
  "All",
  "Applied AI",
  "Storage & Backup",
  "Virtualisation & Systems",
  "Networking & Automation",
];

export const skills: SkillItem[] = [
  // Applied AI (Runbook Copilot Stack)
  {
    name: "LangGraph Agent Workflows",
    category: "Applied AI",
    tooltip: "Cyclic state graphs, confidence gating, and human escalation boundaries for incident triage.",
  },
  {
    name: "QLoRA Fine-Tuning",
    category: "Applied AI",
    tooltip: "4-bit NF4 parameter-efficient fine-tuning on Modal GPUs; raised Llama 3.2 1B accuracy from 86.6% to 95.5%.",
  },
  {
    name: "Hybrid RAG & Qdrant",
    category: "Applied AI",
    tooltip: "Dense + sparse vector retrieval grounded in verified Windows Server, AD, and Proxmox runbooks.",
  },
  {
    name: "RAGAS Evaluation",
    category: "Applied AI",
    tooltip: "Automated scoring harnesses measuring faithfulness, answer relevance, and context recall on test tickets.",
  },
  {
    name: "Ollama & Local Inference",
    category: "Applied AI",
    tooltip: "Local-first open-source LLM runtime with streaming responses and zero cloud telemetry.",
  },
  {
    name: "FastAPI & Agent Backends",
    category: "Applied AI",
    tooltip: "Python async REST API with multi-turn conversation memory and deterministic gate enforcement.",
  },

  // Storage & Backup
  {
    name: "QNAP Enterprise NAS & SAN",
    category: "Storage & Backup",
    tooltip: "Provisioned and maintained across 10+ enterprise client facilities (2–16 drive bays).",
  },
  {
    name: "RAID Topologies",
    category: "Storage & Backup",
    tooltip: "Engineered RAID 0, 1, 5, 6, and 10 arrays with SSD caching/tiering and fault-tolerant rebuilds.",
  },
  {
    name: "NAKIVO Backup & Replication",
    category: "Storage & Backup",
    tooltip: "Certified technical professional managing automated multi-server backup and off-site replication schedules.",
  },
  {
    name: "Veeam Backup & Disaster Recovery",
    category: "Storage & Backup",
    tooltip: "Virtual machine backup policies, snapshot validation, and verified site-to-site recovery points.",
  },

  // Virtualisation & Systems
  {
    name: "VMware vSphere & ESXi",
    category: "Virtualisation & Systems",
    tooltip: "ESXi hypervisor administration, vCenter clusters, and high-availability VM workloads.",
  },
  {
    name: "Hyper-V & Proxmox VE",
    category: "Virtualisation & Systems",
    tooltip: "Windows Server virtualization, virtual switches, KVM orchestration, and live migration.",
  },
  {
    name: "Windows Server (2016–2022)",
    category: "Virtualisation & Systems",
    tooltip: "Domain controllers, DNS, DHCP scopes, storage pools, and server role deployment.",
  },
  {
    name: "Active Directory & Group Policy (GPO)",
    category: "Virtualisation & Systems",
    tooltip: "Enterprise domain architecture, user lifecycle management, and security baselines.",
  },
  {
    name: "Linux Administration",
    category: "Virtualisation & Systems",
    tooltip: "Debian & RHEL server administration, LVM volume management, systemd services, and SSH.",
  },

  // Networking & Automation
  {
    name: "CCNA Routing & Switching",
    category: "Networking & Automation",
    tooltip: "Inter-VLAN routing, subnetting, trunking, STP, and enterprise packet flow design.",
  },
  {
    name: "Wireshark Packet Analysis",
    category: "Networking & Automation",
    tooltip: "Deep packet inspection, TCP handshake diagnostics, and latency bottleneck isolation.",
  },
  {
    name: "Python (Automation & Scripting)",
    category: "Networking & Automation",
    tooltip: "Core language for LLM pipelines, infrastructure health checks, and API integrations.",
  },
  {
    name: "PowerShell Automation",
    category: "Networking & Automation",
    tooltip: "Bulk Active Directory management, WMI system queries, and automated maintenance scripts.",
  },
  {
    name: "n8n & Power Automate",
    category: "Networking & Automation",
    tooltip: "Automated workflow orchestration bridging support tickets, alerts, and enterprise APIs.",
  },
  {
    name: "Docker",
    category: "Networking & Automation",
    tooltip: "Containerized application deployment, persistent volume mapping, and isolated services.",
  },
];
