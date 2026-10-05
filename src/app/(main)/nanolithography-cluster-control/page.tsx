import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { NanolithographyClusterControlPageContent } from "@/components/pages/nanolithography-cluster-control/NanolithographyClusterControlPageContent";

export const metadata: Metadata = buildPageMetadata({
  title: "Nanolithography Cluster Control",
  description: "Mind Matrix Nanolithography Cluster Control — industrial-grade embedded engineering, hardware design, and firmware development for mission-critical systems.",
  path: "/nanolithography-cluster-control",
  keywords: ["mind matrix","embedded systems","nanolithography","cluster","control"],
});

export default function NanolithographyClusterControlPage() {
  return <NanolithographyClusterControlPageContent />;
}
