import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { EvInfrastructurePageContent } from "@/components/pages/ev-infrastructure/EvInfrastructurePageContent";

export const metadata: Metadata = pageMetadata("/ev-infrastructure");

export default function EvInfrastructurePage() {
  return <EvInfrastructurePageContent />;
}
