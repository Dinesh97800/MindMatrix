import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { HardwareDevelopmentPageContent } from "@/components/pages/hardware-development/HardwareDevelopmentPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Hardware Development",
  description: "Mind Matrix Hardware Development — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/hardware-development",
  keywords: ["mind matrix","embedded systems","hardware","development"],
});

export default function HardwareDevelopmentPage() {
  return <HardwareDevelopmentPageContent />;
}
