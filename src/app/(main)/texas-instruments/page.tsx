import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { TexasInstrumentsPageContent } from "@/components/pages/texas-instruments/TexasInstrumentsPageContent";

export const metadata: Metadata = pageMetadata("/texas-instruments");

export default function TexasInstrumentsPage() {
  return <TexasInstrumentsPageContent />;
}
