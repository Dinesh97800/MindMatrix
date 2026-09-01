import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { FreertosPageContent } from "@/components/pages/freertos/FreertosPageContent";

export const metadata: Metadata = pageMetadata("/rtos");

export default function RtosPage() {
  return <FreertosPageContent />;
}
