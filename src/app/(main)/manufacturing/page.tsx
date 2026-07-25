import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ManufacturingPageContent } from "@/components/pages/manufacturing/ManufacturingPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Manufacturing",
  description: "Mind Matrix Manufacturing — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/manufacturing",
  keywords: ["mind matrix","embedded systems","manufacturing"],
});

export default function ManufacturingPage() {
  return <ManufacturingPageContent />;
}
