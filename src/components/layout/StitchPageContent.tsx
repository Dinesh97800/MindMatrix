import { ReactNode } from "react";

interface StitchPageContentProps {
  children: ReactNode;
}

export function StitchPageContent({ children }: StitchPageContentProps) {
  return <main>{children}</main>;
}
