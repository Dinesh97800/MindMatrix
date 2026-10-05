import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { IndustrialAutomationPageContent } from "@/components/pages/industrial-automation/IndustrialAutomationPageContent";

export const metadata: Metadata = pageMetadata("/industrial-automation");

export default function IndustrialAutomationPage() {
  return <IndustrialAutomationPageContent />;
}
