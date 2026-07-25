import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { RenesasPageContent } from "@/components/pages/renesas/RenesasPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Renesas",
  description: "Mind Matrix Renesas — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/renesas",
  keywords: ["mind matrix","embedded systems","renesas"],
});

export default function RenesasPage() {
  return <RenesasPageContent />;
}
