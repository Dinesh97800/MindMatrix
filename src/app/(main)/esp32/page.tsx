import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Esp32PageContent } from "@/components/pages/esp32/Esp32PageContent";

export const metadata: Metadata = pageMetadata("/esp32");

export default function Esp32Page() {
  return <Esp32PageContent />;
}
