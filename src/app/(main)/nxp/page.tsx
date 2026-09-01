import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { NxpPageContent } from "@/components/pages/nxp/NxpPageContent";

export const metadata: Metadata = pageMetadata("/nxp");

export default function NxpPage() {
  return <NxpPageContent />;
}
