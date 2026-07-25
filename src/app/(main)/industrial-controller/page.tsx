import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { IndustrialControllerPageContent } from "@/components/pages/industrial-controller/IndustrialControllerPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Industrial Controller",
  description: "Mind Matrix Industrial Controller — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/industrial-controller",
  keywords: ["mind matrix","embedded systems","industrial","controller"],
});

export default function IndustrialControllerPage() {
  return <IndustrialControllerPageContent />;
}
