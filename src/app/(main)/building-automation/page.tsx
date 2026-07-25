import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { BuildingAutomationPageContent } from "@/components/pages/building-automation/BuildingAutomationPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Building Automation",
  description: "Mind Matrix Building Automation — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/building-automation",
  keywords: ["mind matrix","embedded systems","building","automation"],
});

export default function BuildingAutomationPage() {
  return <BuildingAutomationPageContent />;
}
