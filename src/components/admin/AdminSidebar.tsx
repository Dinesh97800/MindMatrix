"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { signOut, useSession } from "next-auth/react";

type NavItem = {
  label: string;
  href?: string;
  icon?: string;
  superAdminOnly?: boolean;
  children?: NavItem[];
};

type NavCategory = {
  id: number;
  label: string;
  slug: string;
  pages: Array<{ id: number; title: string; slug: string }>;
  children: NavCategory[];
};

function buildWebsiteContentNav(categories: NavCategory[]): NavItem[] {
  const walk = (nodes: NavCategory[]): NavItem[] =>
    nodes.map((node) => {
      const pageChildren: NavItem[] = node.pages.map((page) => ({
        label: page.title,
        href: `/admin/cms/pages/${page.id}`,
      }));
      const categoryChildren = walk(node.children);
      const children = [...pageChildren, ...categoryChildren];

      if (children.length === 0) {
        return {
          label: node.label,
          href: `/admin/cms/pages?categoryId=${node.id}`,
        };
      }

      return {
        label: node.label,
        children,
      };
    });

  return walk(categories);
}

const baseNav: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Website Content", icon: "language", children: [] },
  {
    label: "Blog",
    icon: "article",
    children: [
      { label: "All Posts", href: "/admin/cms/blog" },
      { label: "Add New", href: "/admin/cms/blog/new" },
    ],
  },
  { label: "Media Library", href: "/admin/cms/media", icon: "perm_media" },
  { label: "Global Settings", href: "/admin/cms/settings", icon: "settings" },
  {
    label: "Inbox",
    icon: "inbox",
    children: [
      { label: "Submissions", href: "/admin/submissions" },
      { label: "Newsletter", href: "/admin/newsletter" },
    ],
  },
  {
    label: "Users & Admins",
    icon: "group",
    superAdminOnly: true,
    children: [{ label: "Admin Users", href: "/admin/users" }],
  },
  { label: "Profile", href: "/admin/profile", icon: "person" },
];

function NavLinkItem({
  item,
  depth = 0,
  expanded,
  toggle,
  collapsed,
}: {
  item: NavItem;
  depth?: number;
  expanded: Record<string, boolean>;
  toggle: (key: string) => void;
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const key = item.href ?? item.label;
  const hasChildren = Boolean(item.children?.length);
  const isOpen = expanded[key] ?? depth === 0;
  const isActive = item.href
    ? pathname === item.href || pathname.startsWith(`${item.href}/`)
    : false;

  if (collapsed && depth > 0) return null;

  return (
    <div>
      <div
        className="flex items-center gap-1"
        style={{ paddingLeft: collapsed ? 0 : `${depth * 12}px` }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => toggle(key)}
            className={`flex min-w-0 flex-1 items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-primary/5 ${
              collapsed ? "justify-center px-2" : ""
            }`}
            title={collapsed ? item.label : undefined}
          >
            {item.icon ? (
              <span className="material-symbols-outlined text-base">{item.icon}</span>
            ) : null}
            {!collapsed ? <span className="flex-1 truncate">{item.label}</span> : null}
            {!collapsed ? (
              <span className="material-symbols-outlined text-base">
                {isOpen ? "expand_less" : "expand_more"}
              </span>
            ) : null}
          </button>
        ) : item.href ? (
          <Link
            href={item.href}
            title={collapsed ? item.label : undefined}
            className={`flex min-w-0 flex-1 items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
              collapsed ? "justify-center px-2" : ""
            } ${
              isActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-on-surface-variant hover:bg-primary/5 hover:text-primary"
            }`}
          >
            {item.icon ? (
              <span className="material-symbols-outlined text-base">{item.icon}</span>
            ) : null}
            {!collapsed ? <span className="truncate">{item.label}</span> : null}
          </Link>
        ) : (
          !collapsed ? (
            <span className="px-3 py-2 text-sm font-medium text-on-surface">{item.label}</span>
          ) : null
        )}
      </div>
      {hasChildren && isOpen && !collapsed ? (
        <div className="mt-1 space-y-1">
          {item.children!.map((child) => (
            <NavLinkItem
              key={`${child.href ?? child.label}-${depth}`}
              item={child}
              depth={depth + 1}
              expanded={expanded}
              toggle={toggle}
              collapsed={collapsed}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function AdminSidebar({
  mobileOpen,
  onClose,
  collapsed,
  onToggleCollapse,
}: {
  mobileOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}) {
  const { data: session } = useSession();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "Website Content": true,
    Blog: false,
    Inbox: false,
    "Users & Admins": false,
  });
  const [websiteNav, setWebsiteNav] = useState<NavItem[]>([]);

  useEffect(() => {
    fetch("/api/admin/cms/navigation")
      .then((res) => res.json())
      .then((data) => {
        if (data.navigation) {
          setWebsiteNav(buildWebsiteContentNav(data.navigation));
        }
      })
      .catch(() => undefined);
  }, []);

  const navItems = useMemo(() => {
    const items = baseNav.map((item) =>
      item.label === "Website Content"
        ? {
            ...item,
            children: [
              { label: "All Website Pages", href: "/admin/cms/pages" },
              ...websiteNav,
            ],
          }
        : item
    );
    return items.filter(
      (item) => !item.superAdminOnly || session?.user?.role === "super_admin"
    );
  }, [websiteNav, session?.user?.role]);

  const roleLabel =
    session?.user?.role === "super_admin" ? "Super Admin" : "Content Manager";

  const toggle = (key: string) => {
    setExpanded((current) => ({ ...current, [key]: !current[key] }));
  };

  const sidebar = (
    <aside
      className={`flex h-full flex-col border-r border-outline-variant/20 bg-white transition-all ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b border-outline-variant/20 px-4">
        {!collapsed ? (
          <Link href="/admin" className="font-headline-md text-primary">
            MMIS CMS
          </Link>
        ) : (
          <Link href="/admin" className="font-headline-md text-primary">
            M
          </Link>
        )}
        <button
          type="button"
          className="hidden rounded-lg p-2 lg:inline-flex hover:bg-primary/5"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={onToggleCollapse}
        >
          <span className="material-symbols-outlined">
            {collapsed ? "chevron_right" : "chevron_left"}
          </span>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => (
          <NavLinkItem
            key={item.label}
            item={item}
            expanded={expanded}
            toggle={toggle}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {!collapsed ? (
        <div className="border-t border-outline-variant/20 p-4">
          <p className="truncate text-sm font-medium">{session?.user?.name ?? session?.user?.email}</p>
          <p className="text-xs text-on-surface-variant">{roleLabel}</p>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="mt-3 text-sm text-primary hover:underline"
          >
            Sign out
          </button>
        </div>
      ) : null}
    </aside>
  );

  return (
    <>
      <div className="hidden lg:block">{sidebar}</div>
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={onClose}
          />
          <div className="absolute inset-y-0 left-0 w-72">{sidebar}</div>
        </div>
      ) : null}
    </>
  );
}

export function AdminBreadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-on-surface-variant">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span>/</span> : null}
            {item.href ? (
              <Link href={item.href} className="hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="text-on-surface">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
