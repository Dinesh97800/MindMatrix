"use client";

import { SessionProvider } from "next-auth/react";
import { AdminShell } from "./AdminShell";

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
