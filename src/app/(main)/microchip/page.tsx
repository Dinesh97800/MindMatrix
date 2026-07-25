import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { MicrochipPageContent } from "@/components/pages/microchip/MicrochipPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Microchip",
  description: "Mind Matrix Microchip — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/microchip",
  keywords: ["mind matrix","embedded systems","microchip"],
});

export default function MicrochipPage() {
  return <MicrochipPageContent />;
}
