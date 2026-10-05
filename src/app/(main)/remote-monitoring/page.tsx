import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { RemoteMonitoringPageContent } from "@/components/pages/remote-monitoring/RemoteMonitoringPageContent";

export const metadata: Metadata = pageMetadata("/remote-monitoring");

export default function RemoteMonitoringPage() {
  return <RemoteMonitoringPageContent />;
}
