"use client";

import { AdminModal } from "./AdminModal";

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  loading = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AdminModal open={open} title={title} onClose={onCancel} size="sm">
      <p className="text-sm text-on-surface-variant">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-lg border px-4 py-2 text-sm disabled:opacity-60"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className={`rounded-lg px-4 py-2 text-sm text-white disabled:opacity-60 ${
            destructive ? "bg-error" : "bg-primary"
          }`}
        >
          {loading ? "Please wait..." : confirmLabel}
        </button>
      </div>
    </AdminModal>
  );
}
