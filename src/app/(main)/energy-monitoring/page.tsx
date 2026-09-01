import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { EnergyMonitoringPageContent } from "@/components/pages/energy-monitoring/EnergyMonitoringPageContent";

export const metadata: Metadata = pageMetadata("/energy-monitoring");

export default function EnergyMonitoringPage() {
  return <EnergyMonitoringPageContent />;
}
