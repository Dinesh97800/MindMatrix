import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { IndustriesPageContent } from "@/components/pages/industries/IndustriesPageContent";

export const metadata: Metadata = pageMetadata("/industries");

export default function IndustriesPage() {
  return <IndustriesPageContent />;
}
