import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { QuantumReadyDataArchitecturePageContent } from "@/components/pages/quantum-ready-data-architecture/QuantumReadyDataArchitecturePageContent";

export const metadata: Metadata = pageMetadata("/quantum-ready-data-architecture");

export default function QuantumReadyDataArchitecturePage() {
  return <QuantumReadyDataArchitecturePageContent />;
}
