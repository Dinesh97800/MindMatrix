import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { SolutionsPageContent } from "@/components/pages/solutions/SolutionsPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Solutions",
  description: "Mind Matrix Solutions — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/solutions",
  keywords: ["mind matrix","embedded systems","solutions"],
});

export default function SolutionsPage() {
  return <SolutionsPageContent />;
}
