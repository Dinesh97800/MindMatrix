import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SmartInfrastructurePageContent } from "@/components/pages/smart-infrastructure/SmartInfrastructurePageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Smart Infrastructure",
  description: "Mind Matrix Smart Infrastructure — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/smart-infrastructure",
  keywords: ["mind matrix","embedded systems","smart","infrastructure"],
});

export default function SmartInfrastructurePage() {
  return <SmartInfrastructurePageContent />;
}
