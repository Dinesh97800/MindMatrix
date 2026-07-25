"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export function BreadcrumbsBar() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Breadcrumbs pathname={pathname} />;
}
