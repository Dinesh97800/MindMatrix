import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { EmbeddedFirmwareDevelopmentPageContent } from "@/components/pages/embedded-firmware-development/EmbeddedFirmwareDevelopmentPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Embedded Firmware Development",
  description: "Mind Matrix Embedded Firmware Development — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/embedded-firmware-development",
  keywords: ["mind matrix","embedded systems","embedded","firmware","development"],
});

export default function EmbeddedFirmwareDevelopmentPage() {
  return <EmbeddedFirmwareDevelopmentPageContent />;
}
