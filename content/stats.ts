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
    description: "QNAP NAS deployments",
  },
  {
    value: 95.5,
    suffix: "%",
    decimalPlaces: 1,
    label: "Held-out Accuracy",
    description: "QLoRA Llama 3.2 1B classifier",
  },
  {
    value: 20,
    suffix: "+",
    label: "Client Tickets / Month",
    description: "Resolved with SLA adherence",
  },
  {
    value: 2,
    suffix: " Mo",
    label: "Intern → Full-Time",
    description: "ITCG Solutions",
  },
  {
    value: 300,
    suffix: "+",
    label: "Users Simulated",
    description: "Dual-region capstone (NY & HK)",
  },
];
