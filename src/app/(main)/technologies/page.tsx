import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TechnologiesPageContent } from "@/components/pages/technologies/TechnologiesPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Technologies",
  description: "Mind Matrix Technologies — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/technologies",
  keywords: ["mind matrix","embedded systems","technologies"],
});

export default function TechnologiesPage() {
  return <TechnologiesPageContent />;
}
