export interface FieldNote {
  id: string;
  title: string;
  category: "Storage & Recovery" | "Virtualization" | "Production ERP" | "Disaster Recovery";
  problem: string;
  resolution: string;
  impact: string;
  tags: string[];
}

export const fieldNotes: FieldNote[] = [
  {
    id: "arm64-nakivo-upgrade",
    title: "ARM64 QNAP TS-431X2 NAKIVO Upgrade Failure",
    category: "Storage & Recovery",
    problem:
      "A complex multi-layer NAKIVO upgrade failure on ARM64 QNAP TS-431X2 triggered package signature expiry errors, incompatible package warnings, and root QTS volume errors.",
    resolution:
      "Diagnosed underlying QTS package signature mechanism and symlink paths over SSH, patched repository metadata, and completed in-place upgrade without data migration.",
    impact: "Avoided complete data migration and maintained multi-TB client backup continuity with zero data loss.",
    tags: ["QNAP NAS", "ARM64", "NAKIVO", "SSH", "Linux CLI"],
  },
  {
    id: "vm-migration-proxmox",
    title: "Hyper-V → Proxmox VM Migration & QBelt VPN",
    category: "Virtualization",
    problem:
      "Legacy workloads required migration from Windows Server Hyper-V to Proxmox VE without downtime, alongside secure, authenticated remote access for distributed engineers.",
    resolution:
      "Orchestrated cross-hypervisor VHDX-to-raw image conversions, configured virtual bridges in Proxmox, and deployed QBelt VPN on QNAP NAS for encrypted remote tunnels.",
    impact: "Seamless hypervisor cutover with improved resource density and reliable remote client access.",
    tags: ["Hyper-V", "Proxmox VE", "QBelt VPN", "Network Routing"],
  },
  {
    id: "sap-hana-storage-expansion",
    title: "SAP HANA Production Storage Assessment",
    category: "Production ERP",
    problem:
      "Production SAP HANA server faced storage pressure, requiring thorough partition layout validation and expansion feasibility analysis.",
    resolution:
      "Conducted low-level Linux block device, LVM layout, and filesystem analysis directly on live production infrastructure, confirming online expansion paths without workload disruption.",
    impact: "Confirmed capacity headroom and zero disruption to active mission-critical ERP operations.",
    tags: ["SAP HANA", "Linux LVM", "Enterprise Storage", "Zero Downtime"],
  },
  {
    id: "nakivo-4-server-backup-sla",
    title: "4-Server NAKIVO Enterprise Backup Environment",
    category: "Disaster Recovery",
    problem:
      "Critical enterprise workloads across 4 dedicated servers (SAP SRV, SRV HRD, SRV E-LAB NOTE, SRV TEAM) required unified backup scheduling, verification, and strict SLA compliance.",
    resolution:
      "Integrated NAKIVO Backup & Replication, provisioned isolated backup repositories, configured immutable recovery points, and verified automated integrity checks.",
    impact: "100% backup job SLA adherence and verified recovery objectives across all 4 production nodes.",
    tags: ["NAKIVO", "Disaster Recovery", "SLA Adherence", "RTO / RPO"],
  },
];
