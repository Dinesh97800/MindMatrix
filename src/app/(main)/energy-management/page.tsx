import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { EnergyManagementPageContent } from "@/components/pages/energy-management/EnergyManagementPageContent";

export const metadata: Metadata = pageMetadata("/energy-management");

export default function EnergyManagementPage() {
  return <EnergyManagementPageContent />;
}
