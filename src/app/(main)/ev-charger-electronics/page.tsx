import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { EvChargerElectronicsPageContent } from "@/components/pages/ev-charger-electronics/EvChargerElectronicsPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "EV Charger Electronics",
  description: "Mind Matrix EV Charger Electronics — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/ev-charger-electronics",
  keywords: ["mind matrix","embedded systems","ev","charger","electronics"],
});

export default function EvChargerElectronicsPage() {
  return <EvChargerElectronicsPageContent />;
}
