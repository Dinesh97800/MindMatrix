import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { IndustriesPageContent } from "@/components/pages/industries/IndustriesPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Industries",
  description: "Mind Matrix Industries — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/industries",
  keywords: ["mind matrix","embedded systems","industries"],
});

export default function IndustriesPage() {
  return <IndustriesPageContent />;
}
