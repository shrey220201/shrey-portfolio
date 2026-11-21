import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          backgroundImage: "radial-gradient(circle at 85% 15%, rgba(94, 234, 212, 0.12), transparent 45%), radial-gradient(circle at 15% 85%, rgba(41, 151, 255, 0.12), transparent 45%)",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          color: "#F5F5F7",
        }}
      >
        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#F5F5F7",
                color: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              SS
            </div>
            <span style={{ fontSize: "20px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A1A1A6" }}>
              {siteConfig.name}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              fontSize: "14px",
              color: "#30D158",
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#30D158" }} />
            <span>Systems Operational</span>
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", fontSize: "20px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#2997FF", fontWeight: 600 }}>
            IT INFRASTRUCTURE · APPLIED AI · AUTOMATION
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: "68px", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            <span>Infrastructure that holds.</span>
            <span style={{ color: "#5EEAD4" }}>AI that helps fix it.</span>
          </div>
          <div style={{ display: "flex", fontSize: "22px", color: "#A1A1A6", maxWidth: "800px", lineHeight: 1.4 }}>
            Enterprise backup, storage & virtualization meets confidence-gated RAG pipelines and LangGraph agents.
          </div>
        </div>

        {/* Bottom Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "28px" }}>
          {["QNAP NAS / SAN", "RAID 0-60", "NAKIVO Backup", "VMware & Proxmox", "LangGraph Agents", "QLoRA Llama 3.2"].map(
            (tag, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  fontSize: "14px",
                  color: "#A1A1A6",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
