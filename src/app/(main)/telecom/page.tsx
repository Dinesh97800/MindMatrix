import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TelecomPageContent } from "@/components/pages/telecom/TelecomPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Telecom",
  description: "Mind Matrix Telecom — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/telecom",
  keywords: ["mind matrix","embedded systems","telecom"],
});

export default function TelecomPage() {
  return <TelecomPageContent />;
}
