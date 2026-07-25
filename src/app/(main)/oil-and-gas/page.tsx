import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { OilAndGasPageContent } from "@/components/pages/oil-and-gas/OilAndGasPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Oil & Gas",
  description: "Mind Matrix Oil & Gas — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/oil-and-gas",
  keywords: ["mind matrix","embedded systems","oil","and","gas"],
});

export default function OilAndGasPage() {
  return <OilAndGasPageContent />;
}
