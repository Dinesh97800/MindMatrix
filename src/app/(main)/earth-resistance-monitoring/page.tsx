import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { EarthResistanceMonitoringPageContent } from "@/components/pages/earth-resistance-monitoring/EarthResistanceMonitoringPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Earth Resistance Monitoring",
  description: "Mind Matrix Earth Resistance Monitoring — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/earth-resistance-monitoring",
  keywords: ["mind matrix","embedded systems","earth","resistance","monitoring"],
});

export default function EarthResistanceMonitoringPage() {
  return <EarthResistanceMonitoringPageContent />;
}
