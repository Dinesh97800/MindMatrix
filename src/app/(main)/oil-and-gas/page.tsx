import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { OilAndGasPageContent } from "@/components/pages/oil-and-gas/OilAndGasPageContent";

export const metadata: Metadata = pageMetadata("/oil-and-gas");

export default function OilAndGasPage() {
  return <OilAndGasPageContent />;
}
