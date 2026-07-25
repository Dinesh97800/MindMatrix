import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { MqttPageContent } from "@/components/pages/mqtt/MqttPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "MQTT",
  description: "Mind Matrix MQTT — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/mqtt",
  keywords: ["mind matrix","embedded systems","mqtt"],
});

export default function MqttPage() {
  return <MqttPageContent />;
}
