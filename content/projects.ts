export interface Project {
  slug: string;
  title: string;
  tagline: string;
  featured: boolean;
  category: "Applied AI" | "Enterprise Infrastructure" | "Automation & Storage" | "Networking & Systems";
  stack: string[];
  metrics?: { label: string; value: string }[];
  summary: string;
  githubUrl?: string;
  demoUrl?: string;
  has3dModel?: "agentGraph" | "dualGlobe" | "nasExploded";
  problem: string[];
  approach: string[];
  results: string[];
  architecture?: {
    nodes: { id: string; label: string; role: string; description: string }[];
  };
}

export const projects: Project[] = [
  {
    slug: "runbook-copilot",
    title: "Runbook Copilot",
    tagline: "RAG & agent-based infrastructure incident triage system.",
    featured: true,
    category: "Applied AI",
    stack: [
      "Python",
      "Ollama",
      "Qdrant",
      "LangGraph",
      "HuggingFace",
      "Modal",
      "FastAPI",
      "RAGAS",
      "Llama 3.2 1B",
    ],
    metrics: [
      { label: "Classifier Accuracy", value: "95.5%" },
      { label: "Baseline Defect Traced From", value: "86.6%" },
      { label: "Adversarial Bypasses Closed", value: "7 / 12" },
      { label: "Execution Safeguard", value: "Human-in-the-Loop" },
    ],
    summary:
      "A retrieval-augmented, confidence-gated agentic system built for infrastructure incident triage over real Windows Server, Active Directory, Hyper-V, and Proxmox documentation. Grounds remediation guidance in verified enterprise sources instead of raw model recall.",
    githubUrl: "<PASTE GITHUB REPO URL>",
    demoUrl: process.env.NEXT_PUBLIC_DEMO_URL,
    has3dModel: "agentGraph",
    problem: [
      "Enterprise IT engineers face ticket fatigue and slow resolution times when triaging complex infrastructure anomalies across disparate hypervisors and directories.",
      "Generic LLMs hallucinate CLI commands and lack real domain runbook context, risking destructive operations on live servers.",
      "Automated triage systems often fail on adversarial inputs or ambiguous tickets where model confidence is dangerously misplaced.",
    ],
    approach: [
      "Vectorized real Windows Server, Active Directory, Hyper-V, and Proxmox documentation in Qdrant with hybrid retrieval, grounding every response in verified runbooks.",
      "Engineered a confidence-gated LangGraph agent with deterministic branching: Runbook Search, System Status Verification, and Human Escalation.",
      "Enforced immediate human escalation upon detection of destructive CLI commands (e.g., disk wipe, volume drops, forced reboots) or low-confidence retrieval score.",
      "Conducted adversarial red-teaming: identified 7 of 12 gate bypasses (including prompt injections and role hijacking) and patched every vector.",
      "Fine-tuned a Llama 3.2 1B incident classifier with QLoRA (4-bit NF4) on Modal cloud GPUs. Traced an initial 86.6% accuracy plateau to a subtle training labeling defect rather than data scarcity, resolving it to achieve 95.5% held-out accuracy with a leak-proof source-level split.",
      "Constructed a RAGAS evaluation harness on real-world-grounded test tickets to quantitatively track faithfulness, answer relevancy, and context precision.",
      "Architected a local-first stack (Ollama, Qdrant, HuggingFace) with optional token-authenticated GPU Ollama deployment on Modal, switchable via a single environment variable, served via FastAPI with multi-turn session memory.",
    ],
    results: [
      "Elevated classifier accuracy from 86.6% to 95.5% held-out accuracy.",
      "Zero un-escalated destructive commands executed across rigorous red-team test suites.",
      "100% reproducible open-source architecture with modular local-or-cloud inference flexibility.",
    ],
    architecture: {
      nodes: [
        {
          id: "ticket",
          label: "Inbound Ticket",
          role: "Input Ingestion",
          description: "Receives raw infrastructure alert or technician issue report.",
        },
        {
          id: "classifier",
          label: "QLoRA Classifier",
          role: "Llama 3.2 1B (95.5%)",
          description: "Categorizes severity, affected infrastructure domain, and intent.",
        },
        {
          id: "retriever",
          label: "Qdrant Vector Retriever",
          role: "Hybrid Search",
          description: "Retrieves relevant verified runbook sections & troubleshooting playbooks.",
        },
        {
          id: "gate",
          label: "Confidence & Safety Gate",
          role: "Deterministic Guardrail",
          description: "Inspects answer confidence and detects destructive command patterns.",
        },
        {
          id: "action-runbook",
          label: "Runbook Guidance",
          role: "Validated Resolution",
          description: "Provides cited, verified step-by-step resolution to engineer.",
        },
        {
          id: "action-status",
          label: "Status Check",
          role: "Telemetry Query",
          description: "Queries live monitoring telemetry or diagnostic state.",
        },
        {
          id: "action-escalation",
          label: "Human Escalation",
          role: "Human-in-the-Loop",
          description: "Safely escalates ambiguous or dangerous operations to senior engineers.",
        },
      ],
    },
  },
  {
    slug: "dual-region-infrastructure",
    title: "Dual-Region Enterprise IT Infrastructure",
    tagline: "300+ user multi-region simulated environment with automated DR.",
    featured: true,
    category: "Enterprise Infrastructure",
    stack: [
      "Active Directory",
      "Exchange Server",
      "Docker",
      "Nextcloud",
      "Rocket.Chat",
      "Zabbix",
      "osTicket",
      "AWS",
      "IPsec VPN",
    ],
    metrics: [
      { label: "Simulated Scale", value: "300+ Users" },
      { label: "Sites Connected", value: "New York & Hong Kong" },
      { label: "Failover Strategy", value: "Site-to-Site DR" },
      { label: "Monitoring Coverage", value: "Full Stack Zabbix" },
    ],
    summary:
      "Architected and deployed a full dual-region enterprise IT environment simulating 300+ user scale across two geographic sites (New York & Hong Kong). Engineered high-availability Active Directory, Dockerized microservices, site-to-site DR strategy, and multi-region network design to meet strict RTO/RPO targets.",
    has3dModel: "dualGlobe",
    problem: [
      "Distributed multinational enterprises require fault-tolerant identity, messaging, file collaboration, and ticketing with cross-ocean replication and low recovery targets.",
    ],
    approach: [
      "Configured multi-site Active Directory Domain Services with site-aware topology, subnets, and scheduled replication between NY and HK.",
      "Integrated Exchange Server with edge routing and secure mail relay across both branches.",
      "Deployed Docker-based collaborative platforms: Nextcloud (storage), Rocket.Chat (secure communications), and osTicket (helpdesk).",
      "Established centralized infrastructure observability via Zabbix monitoring agents tracking CPU, memory, link latency, and disk IOPS.",
      "Architected disaster recovery failover procedures, DNS cutover policies, and site-to-site VPN tunnels meeting defined enterprise RTO and RPO targets.",
    ],
    results: [
      "Resilient dual-region operations supporting seamless failover and synchronized collaboration for 300+ simulated users.",
      "Comprehensive end-to-end IT services suite running under unified governance.",
    ],
  },
  {
    slug: "support-rag-assistant",
    title: "Support RAG Assistant",
    tagline: "Internal operational knowledge retrieval for client support tickets.",
    featured: true,
    category: "Applied AI",
    stack: ["Python", "Vector Embeddings", "RAG Pipeline", "FastAPI", "n8n", "ITIL Workflows"],
    metrics: [
      { label: "Search Latency", value: "Sub-second" },
      { label: "Team Productivity", value: "Measurable Search Reduction" },
      { label: "Target Scope", value: "Historical Ticket Resolutions" },
    ],
    summary:
      "Built a RAG-based AI assistant for the ITCG Solutions technical support team that indexes historical tickets and knowledge base articles, suggesting verified troubleshooting procedures and cutting repetitive resolution lookup times.",
    problem: [
      "Support engineers spent significant time manually searching past resolved tickets across varied customer environments to find repetitive troubleshooting steps.",
    ],
    approach: [
      "Extracted, sanitized, and chunked resolved technical tickets and SOP runbooks into an embedded vector store.",
      "Engineered prompt-grounded retrieval ensuring suggested actions always reference previous successful resolutions.",
      "Integrated with internal support workflows to assist engineers during real-time ticket diagnosis.",
    ],
    results: [
      "Substantially reduced average time spent searching for past resolutions across storage, firewall, and virtualization issues.",
      "Enhanced support SLA adherence and knowledge transfer for newer engineers.",
    ],
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation with n8n & Power Automate",
    tagline: "API-driven operations workflows with secure secrets management.",
    featured: false,
    category: "Automation & Storage",
    stack: ["n8n", "Microsoft Power Automate", "REST APIs", "OAuth 2.0", "Webhook Triggers", "JSON"],
    metrics: [
      { label: "Workflows Deployed", value: "Multi-system" },
      { label: "Security", value: "Encrypted API Keys & Secrets" },
      { label: "Execution", value: "Event-driven" },
    ],
    summary:
      "Engineered automated workflows across n8n and Microsoft Power Automate to streamline repetitive operational tasks, ticket triage alerts, and API data exchanges with strict secrets isolation.",
    problem: [
      "Manual data handoffs between ticket systems, client alerting channels, and reporting dashboards introduced delays and human error.",
    ],
    approach: [
      "Built resilient workflow pipelines triggered by incoming webhooks and scheduled polling intervals.",
      "Implemented enterprise secrets handling, avoiding hardcoded tokens with credential vaults and environment parameters.",
      "Designed error handling and fallback alert mechanisms for dropped API calls.",
    ],
    results: [
      "Automated routine recurring operational tasks, eliminating manual data re-entry and improving response speed.",
    ],
  },
  {
    slug: "qnap-nakivo-backup",
    title: "QNAP NAS & NAKIVO Backup Deployments",
    tagline: "Multi-bay enterprise storage & disaster recovery for SMBs.",
    featured: true,
    category: "Automation & Storage",
    stack: ["QNAP NAS/SAN", "RAID 0/1/5/6/10", "SSD Tiering", "NAKIVO Backup", "Veeam", "HBS3"],
    metrics: [
      { label: "Deployments", value: "10+ Enterprise Sites" },
      { label: "Hardware Scale", value: "2–16 Bay Systems" },
      { label: "Recovery Points", value: "Multi-Server SLA Compliant" },
    ],
    summary:
      "Configured and deployed QNAP NAS devices (2 to 16 bay) with customized RAID arrays, SSD caching, and NAKIVO Backup & Replication disaster recovery across multiple enterprise client sites.",
    has3dModel: "nasExploded",
    problem: [
      "SMB clients required robust data protection against hardware failure, ransomware threats, and operational errors without enterprise-tier complexity.",
    ],
    approach: [
      "Evaluated IOPS and capacity needs to architect customized RAID levels (RAID 5, 6, 10) and SSD cache acceleration.",
      "Installed and configured NAKIVO Backup repositories with deduplication and compression.",
      "Authored standardized deployment runbooks and configuration checklists to shorten future rollout cycles.",
    ],
    results: [
      "Delivered reliable recovery points and reduced repeat onboarding time across 10+ client facilities.",
    ],
  },
  {
    slug: "ninjapostal-network",
    title: "Network Design — NinjaPostal Corp",
    tagline: "Scalable multi-office network architecture across Tokyo, Toronto, & Vancouver.",
    featured: false,
    category: "Networking & Systems",
    stack: ["Cisco Routing & Switching", "IPsec VPN", "VLANs", "NAT", "Access Control Lists", "Wireshark"],
    metrics: [
      { label: "Offices Connected", value: "3 International Hubs" },
      { label: "Design Level", value: "CCNA-grade" },
      { label: "Topology", value: "High-Availability Hub & Spoke" },
    ],
    summary:
      "Designed a secure, scalable multi-office network architecture connecting Tokyo, Toronto, and Vancouver with inter-site routing, site-to-site IPsec VPNs, VLAN segmentation, and future-ready capacity planning.",
    problem: [
      "Distributed logistics operations required secure interconnectivity, isolated traffic segments for operations vs administration, and resilient routing.",
    ],
    approach: [
      "Designed hierarchical campus and WAN topology using Cisco routing protocols and redundant gateway paths.",
      "Engineered secure IPsec VPN tunnels across WAN links with cryptographic policy enforcement.",
      "Segmented departments using 802.1Q VLANs and robust ACLs to isolate logistics data from office networks.",
    ],
    results: [
      "Zero-compromise security posture with predictable packet routing and deterministic latency across international branches.",
    ],
  },
  {
    slug: "bookstack-wiki",
    title: "BookStack Wiki & Active Directory Domain Integration",
    tagline: "Centralized documentation portal with GPO-enforced enterprise access.",
    featured: false,
    category: "Networking & Systems",
    stack: ["BookStack", "Linux", "MySQL", "Active Directory LDAP", "Group Policy (GPO)", "Markdown"],
    metrics: [
      { label: "Integration", value: "LDAP / AD Authentication" },
      { label: "Policy", value: "GPO Browser Redirection" },
      { label: "Content Format", value: "Structured Markdown" },
    ],
    summary:
      "Deployed BookStack open-source wiki with SQL backend and Markdown integration; enforced standardized intranet homepage redirection and GPO-based domain access policies across enterprise endpoints.",
    problem: [
      "Knowledge was scattered across disparate folders and text documents with no unified access governance or single source of truth.",
    ],
    approach: [
      "Installed and tuned BookStack on Linux with MySQL backend and automated database backups.",
      "Integrated LDAP authentication against Active Directory for centralized identity and role-based access control.",
      "Configured Windows Server Group Policy Objects (GPO) to set default browser homepages and bookmarks across domain-joined workstations.",
    ],
    results: [
      "Standardized organization-wide knowledge management with instant documentation access for all staff.",
    ],
  },
];
