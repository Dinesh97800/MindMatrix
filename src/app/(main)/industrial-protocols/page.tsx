import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { IndustrialProtocolsPageContent } from "@/components/pages/industrial-protocols/IndustrialProtocolsPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Industrial Protocols",
  description: "Mind Matrix Industrial Protocols — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/industrial-protocols",
  keywords: ["mind matrix","embedded systems","industrial","protocols"],
});

export default function IndustrialProtocolsPage() {
  return <IndustrialProtocolsPageContent />;
}
