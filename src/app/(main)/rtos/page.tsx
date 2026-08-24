import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { FreertosPageContent } from "@/components/pages/freertos/FreertosPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "RTOS",
  description:
    "Mind Matrix RTOS development — structured task management, timing control, communication handling, and reliable embedded device operation.",
  path: "/rtos",
  keywords: ["mind matrix", "embedded systems", "rtos", "real-time operating system"],
});

export default function RtosPage() {
  return <FreertosPageContent />;
}
