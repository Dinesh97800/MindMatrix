import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { EngineeringWhitepapersPageContent } from "@/components/pages/engineering-whitepapers/EngineeringWhitepapersPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Engineering Whitepapers",
  description: "Mind Matrix Engineering Whitepapers — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/engineering-whitepapers",
  keywords: ["mind matrix","embedded systems","engineering","whitepapers"],
});

export default function EngineeringWhitepapersPage() {
  return <EngineeringWhitepapersPageContent />;
}
