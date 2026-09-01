import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { MicrochipPageContent } from "@/components/pages/microchip/MicrochipPageContent";

export const metadata: Metadata = pageMetadata("/microchip");

export default function MicrochipPage() {
  return <MicrochipPageContent />;
}
