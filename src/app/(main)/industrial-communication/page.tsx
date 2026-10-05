import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { IndustrialCommunicationPageContent } from "@/components/pages/industrial-communication/IndustrialCommunicationPageContent";

export const metadata: Metadata = pageMetadata("/industrial-communication");

export default function IndustrialCommunicationPage() {
  return <IndustrialCommunicationPageContent />;
}
