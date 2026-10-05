"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { isLinkActive, type MobileNavNode } from "@/config/navigation";

const linkClass = (active: boolean, depth: number) =>
  [
    "flex min-h-[44px] flex-1 items-center rounded-lg font-label-sm text-label-sm transition-colors",
    depth === 0 ? "text-base font-semibold tracking-wide" : "text-sm font-medium",
    active
      ? "text-secondary"
      : depth === 0
        ? "text-white hover:text-white/90"
        : "text-white/80 hover:text-white",
  ].join(" ");

interface MobileNavAccordionItemProps {
  node: MobileNavNode;
  depth: number;
  pathname: string;
  onNavigate: () => void;
}

export function MobileNavAccordionItem({
  node,
  depth,
  pathname,
  onNavigate,
}: MobileNavAccordionItemProps) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = Boolean(node.children && node.children.length > 0);
  const paddingLeft = 12 + depth * 16;
  const active = node.href ? isLinkActive(pathname, node.href) : false;

  if (!hasChildren) {
    if (!node.href) return null;

    return (
      <li>
        <Link
          href={node.href}
          onClick={onNavigate}
          style={{ paddingLeft }}
          className={`${linkClass(isLinkActive(pathname, node.href), depth)} pr-4`}
        >
          {node.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="list-none">
      <div className="flex min-h-[44px] items-center gap-1">
        {node.href ? (
          <Link
            href={node.href}
            onClick={onNavigate}
            style={{ paddingLeft }}
            className={`${linkClass(active, depth)} pr-2`}
          >
            {node.label}
          </Link>
        ) : (
          <span
            style={{ paddingLeft }}
            className={`${linkClass(false, depth)} pr-2`}
          >
            {node.label}
          </span>
        )}
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-expanded={expanded}
          aria-label={`${expanded ? "Collapse" : "Expand"} ${node.label}`}
        >
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="material-symbols-outlined text-[22px] leading-none"
          >
            expand_more
          </motion.span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key={`${node.id}-panel`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <ul
              className="space-y-0.5 border-l border-white/15 pb-2 pt-1"
              style={{ marginLeft: paddingLeft + 8 }}
            >
              {node.children!.map((child) => (
                <MobileNavAccordionItem
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  pathname={pathname}
                  onNavigate={onNavigate}
                />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
