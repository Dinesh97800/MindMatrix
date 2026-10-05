"use client";

import { useEffect } from "react";

export function AdminModal({
  open,
  title,
  children,
  onClose,
  size = "md",
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const sizeClass =
    size === "sm"
      ? "max-w-md"
      : size === "lg"
        ? "max-w-4xl"
        : size === "xl"
          ? "max-w-6xl"
          : "max-w-2xl";

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close modal"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${sizeClass} max-h-[90vh] overflow-hidden rounded-xl bg-white shadow-xl`}
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="font-headline-md text-primary">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-primary/5"
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="max-h-[calc(90vh-4rem)] overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}
