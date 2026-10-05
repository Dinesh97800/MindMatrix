import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { EmbeddedLinuxPageContent } from "@/components/pages/embedded-linux/EmbeddedLinuxPageContent";

export const metadata: Metadata = pageMetadata("/embedded-linux");

export default function EmbeddedLinuxPage() {
  return <EmbeddedLinuxPageContent />;
}
