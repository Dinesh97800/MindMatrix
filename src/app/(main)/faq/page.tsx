import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { FaqPageContent } from "@/components/pages/faq/FaqPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQ",
  description: "Mind Matrix FAQ — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/faq",
  keywords: ["mind matrix","embedded systems","faq"],
});

export default function FaqPage() {
  return <FaqPageContent />;
}
