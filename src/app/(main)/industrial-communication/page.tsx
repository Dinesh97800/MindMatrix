import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { IndustrialCommunicationPageContent } from "@/components/pages/industrial-communication/IndustrialCommunicationPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Industrial Communication",
  description: "Mind Matrix Industrial Communication — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/industrial-communication",
  keywords: ["mind matrix","embedded systems","industrial","communication"],
});

export default function IndustrialCommunicationPage() {
  return <IndustrialCommunicationPageContent />;
}
