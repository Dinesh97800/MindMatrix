import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { NxpPageContent } from "@/components/pages/nxp/NxpPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "NXP",
  description: "Mind Matrix NXP — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/nxp",
  keywords: ["mind matrix","embedded systems","nxp"],
});

export default function NxpPage() {
  return <NxpPageContent />;
}
