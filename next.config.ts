import type { NextConfig } from "next";

/** GitHub Pages / static export (configure-pages sets this in CI; keep in repo for parity). */
const isStaticExport =
  process.env.GITHUB_PAGES === "true" || process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" as const } : {}),
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "**.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
