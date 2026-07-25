import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { AtacamaSolarReservePageContent } from "@/components/pages/atacama-solar-reserve/AtacamaSolarReservePageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Atacama Solar Reserve",
  description: "Mind Matrix Atacama Solar Reserve — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/atacama-solar-reserve",
  keywords: ["mind matrix","embedded systems","atacama","solar","reserve"],
});

export default function AtacamaSolarReservePage() {
  return <AtacamaSolarReservePageContent />;
}
