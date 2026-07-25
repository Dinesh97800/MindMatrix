import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { IndustrialAutomationPageContent } from "@/components/pages/industrial-automation/IndustrialAutomationPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Industrial Automation",
  description: "Mind Matrix Industrial Automation — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/industrial-automation",
  keywords: ["mind matrix","embedded systems","industrial","automation"],
});

export default function IndustrialAutomationPage() {
  return <IndustrialAutomationPageContent />;
}
