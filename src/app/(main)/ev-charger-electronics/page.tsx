import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { EvChargerElectronicsPageContent } from "@/components/pages/ev-charger-electronics/EvChargerElectronicsPageContent";

export const metadata: Metadata = pageMetadata("/ev-charger-electronics");

export default function EvChargerElectronicsPage() {
  return <EvChargerElectronicsPageContent />;
}
