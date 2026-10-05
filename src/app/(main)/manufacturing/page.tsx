import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ManufacturingPageContent } from "@/components/pages/manufacturing/ManufacturingPageContent";

export const metadata: Metadata = pageMetadata("/manufacturing");

export default function ManufacturingPage() {
  return <ManufacturingPageContent />;
}
