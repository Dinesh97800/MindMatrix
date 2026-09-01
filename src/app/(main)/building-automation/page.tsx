import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BuildingAutomationPageContent } from "@/components/pages/building-automation/BuildingAutomationPageContent";

export const metadata: Metadata = pageMetadata("/building-automation");

export default function BuildingAutomationPage() {
  return <BuildingAutomationPageContent />;
}
