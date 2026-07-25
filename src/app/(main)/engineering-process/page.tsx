import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { EngineeringProcessPageContent } from "@/components/pages/engineering-process/EngineeringProcessPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Engineering Process",
  description: "Mind Matrix Engineering Process — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/engineering-process",
  keywords: ["mind matrix","embedded systems","engineering","process"],
});

export default function EngineeringProcessPage() {
  return <EngineeringProcessPageContent />;
}
