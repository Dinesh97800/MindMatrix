import { ReactNode } from "react";
import { HomeLayout } from "@/components/layout/HomeLayout";

export default function HomeRouteLayout({ children }: { children: ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>;
}
