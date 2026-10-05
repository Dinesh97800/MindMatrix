import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { RenewableEnergyPageContent } from "@/components/pages/renewable-energy/RenewableEnergyPageContent";

export const metadata: Metadata = pageMetadata("/renewable-energy");

export default function RenewableEnergyPage() {
  return <RenewableEnergyPageContent />;
}
