import { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { DefaultFooter } from "@/components/layout/DefaultFooter";
import { BreadcrumbsBar } from "@/components/layout/BreadcrumbsBar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <BreadcrumbsBar />
      {children}
      <DefaultFooter />
    </>
  );
}
