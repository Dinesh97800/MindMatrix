import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { FreertosPageContent } from "@/components/pages/freertos/FreertosPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "FreeRTOS",
  description: "Mind Matrix FreeRTOS — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/freertos",
  keywords: ["mind matrix","embedded systems","freertos"],
});

export default function FreertosPage() {
  return <FreertosPageContent />;
}
