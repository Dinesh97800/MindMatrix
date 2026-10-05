import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { EmbeddedFirmwareDevelopmentPageContent } from "@/components/pages/embedded-firmware-development/EmbeddedFirmwareDevelopmentPageContent";

export const metadata: Metadata = pageMetadata("/embedded-firmware-development");

export default function EmbeddedFirmwareDevelopmentPage() {
  return <EmbeddedFirmwareDevelopmentPageContent />;
}
