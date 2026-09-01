import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { IndustrialControllerPageContent } from "@/components/pages/industrial-controller/IndustrialControllerPageContent";

export const metadata: Metadata = pageMetadata("/industrial-controller");

export default function IndustrialControllerPage() {
  return <IndustrialControllerPageContent />;
}
