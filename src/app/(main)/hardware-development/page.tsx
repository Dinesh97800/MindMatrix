import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { HardwareDevelopmentPageContent } from "@/components/pages/hardware-development/HardwareDevelopmentPageContent";

export const metadata: Metadata = pageMetadata("/hardware-development");

export default function HardwareDevelopmentPage() {
  return <HardwareDevelopmentPageContent />;
}
