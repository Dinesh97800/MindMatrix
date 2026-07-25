import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { StitchHtmlContent } from "@/components/layout/StitchHtmlContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Energy Monitoring",
  description: "Mind Matrix Energy Monitoring — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/energy-monitoring",
});

function getPageHtml() {
  return fs.readFileSync(
    path.join(process.cwd(), "src/content/pages/energy-monitoring.html"),
    "utf8"
  );
}

export default function EnergyMonitoringPage() {
  const html = getPageHtml();
  return <StitchHtmlContent html={html} />;
}
