import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { MetropolisEvTransitPageContent } from "@/components/pages/metropolis-ev-transit/MetropolisEvTransitPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Metropolis EV-Transit",
  description: "Mind Matrix Metropolis EV-Transit — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/metropolis-ev-transit",
  keywords: ["mind matrix","embedded systems","metropolis","ev","transit"],
});

export default function MetropolisEvTransitPage() {
  return <MetropolisEvTransitPageContent />;
}
