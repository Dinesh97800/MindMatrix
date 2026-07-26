"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  buildMobileNavTree,
  headerNavItems,
  isLinkActive,
  isNavItemActive,
  type MobileNavNode,
  type NavItem,
} from "@/config/navigation";

const HOVER_CLOSE_DELAY_MS = 180;

function megaLinkClass(pathname: string, href: string) {
  return `block rounded-lg px-3 py-2.5 font-label-sm text-label-sm leading-snug transition-colors whitespace-normal ${
    isLinkActive(pathname, href)
      ? "bg-primary/10 text-primary font-bold"
      : "text-on-surface-variant hover:bg-primary/5 hover:text-primary"
  }`;
}

function linkGridClass(count: number) {
  if (count > 10) return "grid-cols-1 sm:grid-cols-2";
  if (count > 5) return "grid-cols-1 md:grid-cols-2";
  return "grid-cols-1";
}

function DesktopMegaPanel({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const hasGroups = item.groups && item.groups.length > 0;
  const hasLinks = item.links && item.links.length > 0;
  const linkCount = item.links?.length ?? 0;

  if (!hasGroups && !hasLinks) return null;

  if (hasGroups) {
    const groupCount = item.groups!.length;
    return (
      <div
        className={`grid gap-x-10 gap-y-6 p-6 ${
          groupCount >= 4
            ? "grid-cols-2 lg:grid-cols-4"
            : groupCount === 3
              ? "grid-cols-1 sm:grid-cols-3"
              : groupCount >= 2
                ? "grid-cols-2"
                : "grid-cols-1"
        } min-w-[min(48rem,calc(100vw-2rem))] max-w-[min(64rem,calc(100vw-2rem))]`}
      >
        {item.groups!.map((group) => (
          <div key={group.label} className="min-w-[10rem]">
            <p className="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wider mb-3">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={megaLinkClass(pathname, l.href)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {hasLinks && (
          <div
            className={
              groupCount >= 4
                ? "lg:col-span-4 border-t border-outline-variant/20 pt-4 mt-2"
                : ""
            }
          >
            <p className="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wider mb-3">
              Featured
            </p>
            <ul className={`grid gap-x-8 gap-y-0.5 ${linkGridClass(linkCount)}`}>
              {item.links!.map((l) => (
                <li key={l.href} className="min-w-0">
                  <Link href={l.href} className={megaLinkClass(pathname, l.href)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`p-6 w-max max-w-[min(44rem,calc(100vw-2rem))] ${
        linkCount > 10 ? "min-w-[min(40rem,calc(100vw-2rem))]" : "min-w-[14rem]"
      }`}
    >
      <Link
        href={item.href}
        className="mb-4 inline-flex items-center gap-1 font-label-sm text-label-sm font-bold text-primary hover:underline"
      >
        View all {item.label}
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </Link>
      <ul className={`grid gap-x-10 gap-y-0.5 ${linkGridClass(linkCount)}`}>
        {item.links!.map((l) => (
          <li key={l.href} className="min-w-[11rem] max-w-[20rem]">
            <Link href={l.href} className={megaLinkClass(pathname, l.href)}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DesktopNavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = isNavItemActive(pathname, item);
  const hasMenu =
    (item.links && item.links.length > 0) || (item.groups && item.groups.length > 0);
  const wideMenu =
    (item.links?.length ?? 0) > 10 || (item.groups?.length ?? 0) >= 3;

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), HOVER_CLOSE_DELAY_MS);
  };

  if (item.label === "Home") {
    return (
      <Link
        href="/"
        className={`px-3 py-2 font-label-sm text-label-sm transition-colors duration-200 ${
          pathname === "/"
            ? "font-bold border-b-2 border-primary text-primary"
            : "text-on-surface-variant hover:text-primary"
        }`}
      >
        Home
      </Link>
    );
  }

  if (!hasMenu) {
    return (
      <Link
        href={item.href}
        className={`px-3 py-2 font-label-sm text-label-sm transition-colors duration-200 ${
          active
            ? "font-bold border-b-2 border-primary text-primary"
            : "text-on-surface-variant hover:text-primary"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        clearCloseTimer();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocusCapture={() => {
        clearCloseTimer();
        setOpen(true);
      }}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose();
      }}
    >
      <button
        type="button"
        className={`inline-flex items-center gap-0.5 px-2.5 py-2 font-label-sm text-label-sm transition-colors duration-200 ${
          active
            ? "font-bold border-b-2 border-primary text-primary"
            : "text-on-surface-variant hover:text-primary"
        }`}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <span
          className={`material-symbols-outlined text-base transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>
      <div
        className={`absolute top-full z-50 pt-2 transition-all duration-200 ${
          wideMenu ? "left-1/2 -translate-x-1/2" : "left-0"
        } ${
          open
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-1"
        }`}
      >
        <div className="rounded-xl border border-outline-variant/20 bg-surface shadow-lg">
          <DesktopMegaPanel item={item} pathname={pathname} />
        </div>
      </div>
    </div>
  );
}

function MobileAccordionNode({
  node,
  depth,
  pathname,
  openIds,
  toggleId,
  onNavigate,
}: {
  node: MobileNavNode;
  depth: number;
  pathname: string;
  openIds: Set<string>;
  toggleId: (id: string) => void;
  onNavigate: () => void;
}) {
  const hasChildren = node.children && node.children.length > 0;
  const isOpen = openIds.has(node.id);
  const paddingLeft = 12 + depth * 16;

  if (!hasChildren) {
    if (!node.href) return null;
    return (
      <Link
        href={node.href}
        onClick={onNavigate}
        style={{ paddingLeft }}
        className={`flex min-h-[44px] items-center rounded-lg pr-4 font-label-sm text-label-sm transition-colors ${
          isLinkActive(pathname, node.href)
            ? "bg-primary/10 text-primary font-bold"
            : "text-on-surface-variant hover:bg-primary/5 hover:text-primary"
        }`}
      >
        {node.label}
      </Link>
    );
  }

  return (
    <div>
      <div className="flex min-h-[44px] items-stretch gap-1">
        {node.href ? (
          <Link
            href={node.href}
            onClick={onNavigate}
            style={{ paddingLeft }}
            className={`flex flex-1 items-center rounded-lg pr-2 font-label-sm text-label-sm ${
              isLinkActive(pathname, node.href)
                ? "bg-primary/10 text-primary font-bold"
                : "text-on-surface hover:bg-primary/5"
            }`}
          >
            {node.label}
          </Link>
        ) : (
          <span
            style={{ paddingLeft }}
            className="flex flex-1 items-center font-label-sm text-label-sm font-bold text-on-surface"
          >
            {node.label}
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleId(node.id)}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-on-surface-variant hover:bg-primary/5"
          aria-expanded={isOpen}
          aria-label={`${isOpen ? "Collapse" : "Expand"} ${node.label}`}
        >
          <span
            className={`material-symbols-outlined transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            expand_more
          </span>
        </button>
      </div>
      <div
        className={`grid transition-all duration-200 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-0.5 pb-2">
            {node.children!.map((child) => (
              <MobileAccordionNode
                key={child.id}
                node={child}
                depth={depth + 1}
                pathname={pathname}
                openIds={openIds}
                toggleId={toggleId}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileOpenIds, setMobileOpenIds] = useState<Set<string>>(new Set());
  const mobileTree = buildMobileNavTree();

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileOpenIds(new Set());
  }, []);

  const toggleMobileId = useCallback((id: string) => {
    setMobileOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 shadow-sm sticky top-0 z-50">
      <nav
        aria-label="Main navigation"
        className="flex justify-between items-center w-full px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto h-20"
      >
        <BrandLogo />

        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center min-w-0">
          {headerNavItems.map((item) => (
            <DesktopNavItem key={item.label} item={item} pathname={pathname} />
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            className="lg:hidden flex min-h-[44px] min-w-[44px] items-center justify-center text-on-surface-variant"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
          <Link
            href="/request-consultation"
            className="bg-primary text-on-primary px-4 lg:px-6 py-2.5 rounded-full font-label-sm text-label-sm hover:bg-primary/90 transition-all active:scale-[0.98] whitespace-nowrap"
          >
            Request Consultation
          </Link>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden border-t border-outline-variant/10 bg-surface/98 backdrop-blur-xl max-h-[calc(100dvh-5rem)] overflow-y-auto">
          <div className="px-margin-mobile py-4 space-y-1">
            {mobileTree.map((node) => (
              <MobileAccordionNode
                key={node.id}
                node={node}
                depth={0}
                pathname={pathname}
                openIds={mobileOpenIds}
                toggleId={toggleMobileId}
                onNavigate={closeMobile}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
