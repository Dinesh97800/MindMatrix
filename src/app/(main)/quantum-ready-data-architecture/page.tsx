import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { QuantumReadyDataArchitecturePageContent } from "@/components/pages/quantum-ready-data-architecture/QuantumReadyDataArchitecturePageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Quantum-Ready Data Architecture",
  description: "Mind Matrix Quantum-Ready Data Architecture — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/quantum-ready-data-architecture",
  keywords: ["mind matrix","embedded systems","quantum","ready","data","architecture"],
});

export default function QuantumReadyDataArchitecturePage() {
  return <QuantumReadyDataArchitecturePageContent />;
}
