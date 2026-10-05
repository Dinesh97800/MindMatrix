import type { ReactNode } from "react";
import { CmsPublishedSwitch } from "@/components/cms/CmsPublishedSwitch";

export default function MainRouteTemplate({ children }: { children: ReactNode }) {
  return <CmsPublishedSwitch>{children}</CmsPublishedSwitch>;
}
