"use client";

export function StatusBadge({ status }: { status: "draft" | "published" | "archived" }) {
  const styles =
    status === "published"
      ? "bg-secondary/10 text-secondary"
      : status === "archived"
        ? "bg-on-surface-variant/10 text-on-surface-variant"
        : "bg-amber-100 text-amber-800";

  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${styles}`}>
      {status}
    </span>
  );
}
