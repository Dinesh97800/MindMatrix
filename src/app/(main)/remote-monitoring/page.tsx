import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { RemoteMonitoringPageContent } from "@/components/pages/remote-monitoring/RemoteMonitoringPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Remote Monitoring",
  description: "Mind Matrix Remote Monitoring — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/remote-monitoring",
  keywords: ["mind matrix","embedded systems","remote","monitoring"],
});

export default function RemoteMonitoringPage() {
  return <RemoteMonitoringPageContent />;
}
