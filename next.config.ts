import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Completely disable dev indicators (removes bottom-left Next.js 'N' button)
  devIndicators: false,
  images: {
    // Cloudflare Workers runs on V8 isolates without Node.js native sharp binaries
    unoptimized: true,
  },
  // Disable production browser sourcemaps to minimize asset size
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
};

export default nextConfig;
