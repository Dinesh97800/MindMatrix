import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { Esp32PageContent } from "@/components/pages/esp32/Esp32PageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "ESP32",
  description: "Mind Matrix ESP32 — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/esp32",
  keywords: ["mind matrix","embedded systems","esp32"],
});

export default function Esp32Page() {
  return <Esp32PageContent />;
}
