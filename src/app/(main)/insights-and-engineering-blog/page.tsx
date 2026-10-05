import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { InsightsAndEngineeringBlogPageContent } from "@/components/pages/insights-and-engineering-blog/InsightsAndEngineeringBlogPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Insights & Engineering Blog",
  description: "Mind Matrix Insights & Engineering Blog — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/insights-and-engineering-blog",
  keywords: ["mind matrix","embedded systems","insights","and","engineering","blog"],
});

export default function InsightsAndEngineeringBlogPage() {
  return <InsightsAndEngineeringBlogPageContent />;
}
