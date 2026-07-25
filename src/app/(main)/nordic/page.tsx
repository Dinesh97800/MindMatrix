import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { NordicPageContent } from "@/components/pages/nordic/NordicPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Nordic",
  description: "Mind Matrix Nordic — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/nordic",
  keywords: ["mind matrix","embedded systems","nordic"],
});

export default function NordicPage() {
  return <NordicPageContent />;
}
