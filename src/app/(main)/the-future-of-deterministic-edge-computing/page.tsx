import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { TheFutureOfDeterministicEdgeComputingPageContent } from "@/components/pages/the-future-of-deterministic-edge-computing/TheFutureOfDeterministicEdgeComputingPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "The Future of Deterministic Edge Computing",
  description: "Mind Matrix The Future of Deterministic Edge Computing — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/the-future-of-deterministic-edge-computing",
  keywords: ["mind matrix","embedded systems","the","future","of","deterministic","edge","computing"],
});

export default function TheFutureOfDeterministicEdgeComputingPage() {
  return <TheFutureOfDeterministicEdgeComputingPageContent />;
}
