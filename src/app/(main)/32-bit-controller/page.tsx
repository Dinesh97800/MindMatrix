import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { cmsOrLegacyMetadata } from "@/lib/cms/published-metadata";
import { Stm32PageContent } from "@/components/pages/stm32/Stm32PageContent";

const legacyMetadata = buildPageMetadata({
  title: "32-bit Controller & Processor",
  description:
    "Mind Matrix 32-bit controller and processor development — firmware, peripheral drivers, RTOS integration, communication stacks, and prototype bring-up.",
  path: "/32-bit-controller",
  keywords: ["mind matrix", "embedded systems", "32-bit controller", "microcontroller", "processor"],
});

export async function generateMetadata(): Promise<Metadata> {
  return cmsOrLegacyMetadata("/32-bit-controller", legacyMetadata);
}

export default function ThirtyTwoBitControllerPage() {
  return <Stm32PageContent />;
}
