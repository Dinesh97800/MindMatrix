import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { IndustrialProtocolsPageContent } from "@/components/pages/industrial-protocols/IndustrialProtocolsPageContent";

export const metadata: Metadata = pageMetadata("/industrial-protocols");

export default function IndustrialProtocolsPage() {
  return <IndustrialProtocolsPageContent />;
}
