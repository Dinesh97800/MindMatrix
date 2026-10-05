import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { HyperloopBetaPageContent } from "@/components/pages/hyperloop-beta/HyperloopBetaPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Hyperloop Beta (Telemetry)",
  description: "Mind Matrix Hyperloop Beta (Telemetry) — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/hyperloop-beta",
  keywords: ["mind matrix","embedded systems","hyperloop","beta"],
});

export default function HyperloopBetaPage() {
  return <HyperloopBetaPageContent />;
}
