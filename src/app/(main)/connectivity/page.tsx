import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ConnectivityPageContent } from "@/components/pages/connectivity/ConnectivityPageContent";

export const metadata: Metadata = pageMetadata("/connectivity");

export default function ConnectivityPage() {
  return <ConnectivityPageContent />;
}
