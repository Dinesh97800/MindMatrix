import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { EnergyMonitoringPageContent } from "@/components/pages/energy-monitoring/EnergyMonitoringPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Energy Monitoring",
  description: "Mind Matrix Energy Monitoring — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/energy-monitoring",
  keywords: ["mind matrix","embedded systems","energy","monitoring"],
});

export default function EnergyMonitoringPage() {
  return <EnergyMonitoringPageContent />;
}
