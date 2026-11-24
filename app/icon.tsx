import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 15,
          background: "#0C0C0A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          border: "1.5px solid #F15419",
          boxShadow: "inset 0 0 8px rgba(241, 84, 25, 0.25)",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: 800,
          letterSpacing: "-0.5px",
        }}
      >
        <span style={{ color: "#FFFFFF" }}>S</span>
        <span style={{ color: "#F15419" }}>S</span>
      </div>
    ),
    {
      ...size,
    }
  );
}
