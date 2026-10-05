import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { MqttPageContent } from "@/components/pages/mqtt/MqttPageContent";

export const metadata: Metadata = pageMetadata("/mqtt");

export default function MqttPage() {
  return <MqttPageContent />;
}
