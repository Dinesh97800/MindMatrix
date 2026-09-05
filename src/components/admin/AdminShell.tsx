"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AdminSidebar } from "./AdminSidebar";

const SIDEBAR_COLLAPSED_KEY = "mmis-admin-sidebar-collapsed";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    if (stored === "1") setCollapsed(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function toggleCollapse() {
    setCollapsed((current) => {
      const next = !current;
      window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, next ? "1" : "0");
      return next;
    });
  }

  const roleLabel =
    session?.user?.role === "super_admin" ? "Super Admin" : "Content Manager";

  return (
    <div className="min-h-screen bg-surface">
      <div className="flex min-h-screen">
        <AdminSidebar
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          collapsed={collapsed}
          onToggleCollapse={toggleCollapse}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-outline-variant/20 bg-white px-4 md:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-lg p-2 lg:hidden hover:bg-primary/5"
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              <div>
                <p className="text-xs uppercase tracking-wide text-on-surface-variant">
                  Website Management
                </p>
                <p className="font-headline-sm text-primary">Mind Matrix Admin</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                target="_blank"
                className="hidden sm:inline-flex text-sm text-on-surface-variant hover:text-primary"
              >
                View site
              </Link>
              <div className="hidden md:block text-right">
                <p className="text-sm">{session?.user?.email}</p>
                <p className="text-xs text-on-surface-variant">{roleLabel}</p>
              </div>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 md:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
