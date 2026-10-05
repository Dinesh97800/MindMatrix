import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SmartGridPageContent } from "@/components/pages/smart-grid/SmartGridPageContent";

export const metadata: Metadata = pageMetadata("/smart-grid");

export default function SmartGridPage() {
  return <SmartGridPageContent />;
}
