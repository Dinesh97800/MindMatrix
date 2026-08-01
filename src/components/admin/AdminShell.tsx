"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const navItems = [
  { href: "/admin/submissions", label: "Submissions" },
  { href: "/admin/newsletter", label: "Newsletter" },
  { href: "/admin/users", label: "Admin Users", superAdminOnly: true },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isSuperAdmin = session?.user?.role === "super_admin";

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-outline-variant/20 bg-white">
        <div className="mx-auto flex max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop h-16">
          <div className="flex items-center gap-8">
            <Link href="/admin/submissions" className="font-headline-md text-primary">
              Mind Matrix Admin
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems
                .filter((item) => !item.superAdminOnly || isSuperAdmin)
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pathname.startsWith(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm text-on-surface-variant">
              {session?.user?.email}
            </span>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="text-sm font-medium text-primary hover:underline"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop py-stack-md">
        {children}
      </main>
    </div>
  );
}
