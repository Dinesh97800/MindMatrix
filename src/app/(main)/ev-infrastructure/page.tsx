import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { EvInfrastructurePageContent } from "@/components/pages/ev-infrastructure/EvInfrastructurePageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "EV Infrastructure",
  description: "Mind Matrix EV Infrastructure — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/ev-infrastructure",
  keywords: ["mind matrix","embedded systems","ev","infrastructure"],
});

export default function EvInfrastructurePage() {
  return <EvInfrastructurePageContent />;
}
