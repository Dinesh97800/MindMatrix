import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { RenewableEnergyPageContent } from "@/components/pages/renewable-energy/RenewableEnergyPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Renewable Energy",
  description: "Mind Matrix Renewable Energy — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/renewable-energy",
  keywords: ["mind matrix","embedded systems","renewable","energy"],
});

export default function RenewableEnergyPage() {
  return <RenewableEnergyPageContent />;
}
