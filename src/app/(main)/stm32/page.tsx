import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { Stm32PageContent } from "@/components/pages/stm32/Stm32PageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "STM32",
  description: "Mind Matrix STM32 — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/stm32",
  keywords: ["mind matrix","embedded systems","stm32"],
});

export default function Stm32Page() {
  return <Stm32PageContent />;
}
