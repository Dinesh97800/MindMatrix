import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { EnvironmentalMonitoringPageContent } from "@/components/pages/environmental-monitoring/EnvironmentalMonitoringPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Environmental Monitoring",
  description: "Mind Matrix Environmental Monitoring — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/environmental-monitoring",
  keywords: ["mind matrix","embedded systems","environmental","monitoring"],
});

export default function EnvironmentalMonitoringPage() {
  return <EnvironmentalMonitoringPageContent />;
}
