import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { TelecomPageContent } from "@/components/pages/telecom/TelecomPageContent";

export const metadata: Metadata = pageMetadata("/telecom");

export default function TelecomPage() {
  return <TelecomPageContent />;
}
