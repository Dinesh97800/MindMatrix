import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SmartGridPageContent } from "@/components/pages/smart-grid/SmartGridPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Smart Grid",
  description: "Mind Matrix Smart Grid — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/smart-grid",
  keywords: ["mind matrix","embedded systems","smart","grid"],
});

export default function SmartGridPage() {
  return <SmartGridPageContent />;
}
