import type { NextConfig } from "next";

/** GitHub Pages / static export (configure-pages sets this in CI; keep in repo for parity). */
const isStaticExport =
  process.env.GITHUB_PAGES === "true" || process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" as const } : {}),
  serverExternalPackages: ["sequelize", "mysql2", "bcryptjs", "nodemailer"],
  async redirects() {
    return [
      { source: "/hyperloop-beta", destination: "/case-studies", permanent: true },
      { source: "/atacama-solar-reserve", destination: "/case-studies", permanent: true },
      { source: "/metropolis-ev-transit", destination: "/case-studies", permanent: true },
      { source: "/nanolithography-cluster-control", destination: "/case-studies", permanent: true },
      { source: "/quantum-ready-data-architecture", destination: "/technologies", permanent: true },
      { source: "/cognitive-core-os", destination: "/technologies", permanent: true },
      { source: "/oil-and-gas", destination: "/industries", permanent: true },
      { source: "/building-automation", destination: "/industrial-automation", permanent: true },
      { source: "/smart-grid", destination: "/energy-monitoring", permanent: true },
      { source: "/renewable-energy", destination: "/energy-monitoring", permanent: true },
      { source: "/engineering-whitepapers", destination: "/about-us", permanent: true },
      { source: "/application-notes-and-design-guides", destination: "/about-us", permanent: true },
      { source: "/technical-downloads-and-sdks", destination: "/about-us", permanent: true },
      { source: "/technical-knowledge-base", destination: "/about-us", permanent: true },
      { source: "/insights-and-engineering-blog", destination: "/about-us", permanent: true },
      { source: "/resources-and-blog", destination: "/about-us", permanent: true },
      { source: "/the-future-of-deterministic-edge-computing", destination: "/about-us", permanent: true },
    ];
  },
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "**.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
