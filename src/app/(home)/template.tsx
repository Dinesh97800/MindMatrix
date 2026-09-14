import type { ReactNode } from "react";
import { CmsPublishedSwitch } from "@/components/cms/CmsPublishedSwitch";

export default function HomeRouteTemplate({ children }: { children: ReactNode }) {
  return <CmsPublishedSwitch>{children}</CmsPublishedSwitch>;
}
