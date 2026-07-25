import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { EmbeddedMeasurementSystemPageContent } from "@/components/pages/embedded-measurement-system/EmbeddedMeasurementSystemPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Embedded Measurement System",
  description: "Mind Matrix Embedded Measurement System — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/embedded-measurement-system",
  keywords: ["mind matrix","embedded systems","embedded","measurement","system"],
});

export default function EmbeddedMeasurementSystemPage() {
  return <EmbeddedMeasurementSystemPageContent />;
}
