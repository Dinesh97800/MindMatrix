import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { Stm32PageContent } from "@/components/pages/stm32/Stm32PageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "32-bit Controller & Processor",
  description:
    "Mind Matrix 32-bit controller and processor development — firmware, peripheral drivers, RTOS integration, communication stacks, and prototype bring-up.",
  path: "/32-bit-controller",
});

export default function Stm32Page() {
  return <Stm32PageContent />;
}
