import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TexasInstrumentsPageContent } from "@/components/pages/texas-instruments/TexasInstrumentsPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Texas Instruments",
  description: "Mind Matrix Texas Instruments — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/texas-instruments",
  keywords: ["mind matrix","embedded systems","texas","instruments"],
});

export default function TexasInstrumentsPage() {
  return <TexasInstrumentsPageContent />;
}
