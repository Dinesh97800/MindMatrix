import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { IotPageContent } from "@/components/pages/iot/IotPageContent";

export const metadata: Metadata = pageMetadata("/iot");

export default function IotPage() {
  return <IotPageContent />;
}
