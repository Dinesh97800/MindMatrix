import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { AboutUsPageContent } from "@/components/pages/about-us/AboutUsPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description: "Mind Matrix About Us — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/about-us",
  keywords: ["mind matrix","embedded systems","about","us"],
});

export default function AboutUsPage() {
  return <AboutUsPageContent />;
}
