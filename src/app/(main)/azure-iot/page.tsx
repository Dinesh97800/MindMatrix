import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { AzureIotPageContent } from "@/components/pages/azure-iot/AzureIotPageContent";

export const metadata: Metadata = pageMetadata("/azure-iot");

export default function AzureIotPage() {
  return <AzureIotPageContent />;
}
