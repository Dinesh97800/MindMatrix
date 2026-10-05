import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { PipelineMonitoringPageContent } from "@/components/pages/pipeline-monitoring/PipelineMonitoringPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Pipeline Monitoring",
  description: "Mind Matrix Pipeline Monitoring — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/pipeline-monitoring",
  keywords: ["mind matrix","embedded systems","pipeline","monitoring"],
});

export default function PipelineMonitoringPage() {
  return <PipelineMonitoringPageContent />;
}
