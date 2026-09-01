import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { EmbeddedMeasurementSystemPageContent } from "@/components/pages/embedded-measurement-system/EmbeddedMeasurementSystemPageContent";

export const metadata: Metadata = pageMetadata("/embedded-measurement-system");

export default function EmbeddedMeasurementSystemPage() {
  return <EmbeddedMeasurementSystemPageContent />;
}
