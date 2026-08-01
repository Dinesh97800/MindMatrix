"use client";

import { AnimatePresence, motion } from "framer-motion";
import { buildMobileNavTree } from "@/config/navigation";
import { MobileNavAccordionItem } from "./MobileNavAccordionItem";

interface MobileNavDrawerProps {
  open: boolean;
  pathname: string;
  onClose: () => void;
}

export function MobileNavDrawer({ open, pathname, onClose }: MobileNavDrawerProps) {
  const mobileTree = buildMobileNavTree();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] bg-black/50 lg:hidden"
            aria-hidden="true"
            onClick={onClose}
          />

          <motion.div
            key="mobile-nav-drawer"
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[95] flex flex-col bg-brand-navy lg:hidden"
          >
            <nav
              aria-label="Mobile navigation links"
              className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain pt-20"
            >
              <ul className="space-y-1 px-margin-mobile py-6">
                {mobileTree.map((node) => (
                  <MobileNavAccordionItem
                    key={node.id}
                    node={node}
                    depth={0}
                    pathname={pathname}
                    onNavigate={onClose}
                  />
                ))}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
