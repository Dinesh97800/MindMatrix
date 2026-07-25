import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { CognitiveCoreOsPageContent } from "@/components/pages/cognitive-core-os/CognitiveCoreOsPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Cognitive Core OS",
  description: "Mind Matrix Cognitive Core OS — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/cognitive-core-os",
  keywords: ["mind matrix","embedded systems","cognitive","core","os"],
});

export default function CognitiveCoreOsPage() {
  return <CognitiveCoreOsPageContent />;
}
