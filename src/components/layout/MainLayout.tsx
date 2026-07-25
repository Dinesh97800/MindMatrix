import { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { DefaultFooter } from "@/components/layout/DefaultFooter";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <DefaultFooter />
    </>
  );
}
