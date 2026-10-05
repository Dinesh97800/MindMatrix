import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { EngineeringProcessPageContent } from "@/components/pages/engineering-process/EngineeringProcessPageContent";

export const metadata: Metadata = pageMetadata("/engineering-process");

export default function EngineeringProcessPage() {
  return <EngineeringProcessPageContent />;
}
