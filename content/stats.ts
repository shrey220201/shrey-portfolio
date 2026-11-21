export interface ImpactStat {
  value: number;
  suffix: string;
  prefix?: string;
  decimalPlaces?: number;
  label: string;
  description: string;
}

export const impactStats: ImpactStat[] = [
  {
    value: 10,
    suffix: "+",
    label: "Enterprise Client Sites",
    description: "QNAP NAS & SAN multi-bay deployments with RAID & SSD caching",
  },
  {
    value: 95.5,
    suffix: "%",
    decimalPlaces: 1,
    label: "Held-out Accuracy",
    description: "Fine-tuned QLoRA Llama 3.2 1B incident classifier",
  },
  {
    value: 20,
    suffix: "+",
    label: "Client Tickets / Month",
    description: "Storage, backup, NComputing & firewall SLA adherence",
  },
  {
    value: 2,
    suffix: " Mo",
    label: "Intern → Full-Time",
    description: "Rapid promotion at ITCG Solutions on client delivery",
  },
  {
    value: 300,
    suffix: "+",
    label: "Users Simulated",
    description: "Dual-region enterprise IT capstone (New York & Hong Kong)",
  },
];
