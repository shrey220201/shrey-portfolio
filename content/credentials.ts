export interface Education {
  institution: string;
  degree: string;
  location: string;
  date: string;
  gpa?: string;
  focus?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  hours?: string;
  instructor?: string;
  skillsGained: string[];
}

export const educationList: Education[] = [
  {
    institution: "Conestoga College",
    degree: "Post-Graduate Certificate in Network & System Administration",
    location: "Kitchener, ON, Canada",
    date: "Apr 2025",
    gpa: "3.0 / 4.0",
    focus: "Enterprise network design, virtualization platforms, Active Directory infrastructure, and security baselines.",
  },
  {
    institution: "ITM (SLS) Baroda University",
    degree: "Bachelor of Engineering in Computer Engineering",
    location: "Vadodara, Gujarat, India",
    date: "Dec 2023",
    gpa: "7.79 / 10",
    focus: "Core computer science, systems programming, computer networks, database management, and web engineering.",
  },
];

export const certifications: Certification[] = [
  {
    name: "NAKIVO Technical Professional",
    issuer: "NAKIVO Inc.",
    date: "2025",
    skillsGained: [
      "Backup & Replication architecture",
      "Multi-site repository configuration",
      "Disaster recovery orchestration",
      "Immutable recovery points",
    ],
  },
  {
    name: "Google Cybersecurity Professional Certificate",
    issuer: "Google / Coursera",
    date: "2024",
    skillsGained: [
      "Threat analysis & SIEM log review",
      "Network security & packet dissection",
      "Incident response protocols",
      "Linux & SQL security operations",
    ],
  },
  {
    name: "AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents",
    issuer: "Udemy (Instructor: Ed Donner)",
    date: "Aug 2026",
    hours: "33.5 hrs",
    instructor: "Ed Donner",
    skillsGained: [
      "Fine-tuning with QLoRA & Modal",
      "LangGraph agentic state flows",
      "RAG architecture & vector indexing",
      "RAGAS quantitative evaluation",
    ],
  },
  {
    name: "CCNA (Cisco Certified Network Associate)",
    issuer: "Cisco",
    date: "Trained",
    skillsGained: [
      "IPv4/IPv6 routing & switching",
      "VLANs, trunking, STP, and EtherChannel",
      "OSPF, ACLs, and NAT configuration",
      "Wireshark network packet troubleshooting",
    ],
  },
  {
    name: "Python Fundamentals & Time Series Analysis",
    issuer: "Professional Training",
    date: "2023",
    skillsGained: [
      "Python data pipelines & APIs",
      "Time-series trend analysis",
      "Automation scripting",
    ],
  },
  {
    name: "PHP & Web Development",
    issuer: "Professional Training",
    date: "2022",
    skillsGained: [
      "Relational database interactions",
      "Server-side scripting",
      "Authentication flows",
    ],
  },
];
