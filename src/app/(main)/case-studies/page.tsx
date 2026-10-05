import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { CaseStudiesPageContent } from "@/components/pages/case-studies/CaseStudiesPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Case Studies",
  description: "Mind Matrix Case Studies — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/case-studies",
  keywords: ["mind matrix","embedded systems","case","studies"],
});

export default function CaseStudiesPage() {
  return <CaseStudiesPageContent />;
}
