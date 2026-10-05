import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SmartInfrastructurePageContent } from "@/components/pages/smart-infrastructure/SmartInfrastructurePageContent";

export const metadata: Metadata = pageMetadata("/smart-infrastructure");

export default function SmartInfrastructurePage() {
  return <SmartInfrastructurePageContent />;
}
