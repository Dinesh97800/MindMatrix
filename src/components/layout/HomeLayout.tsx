import { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { HomeFooter } from "@/components/layout/HomeFooter";

interface HomeLayoutProps {
  children: ReactNode;
}

export function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <HomeFooter />
    </>
  );
}
