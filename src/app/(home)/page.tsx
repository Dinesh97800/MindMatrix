import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { HomePageContent } from "@/components/pages/home/HomePageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Home",
  description: "Mind Matrix Home — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/",
  keywords: ["mind matrix","embedded systems","embedded engineering"],
});

export default function HomePage() {
  return <HomePageContent />;
}
