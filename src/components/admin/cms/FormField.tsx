"use client";

export function FormField({
  label,
  helpText,
  error,
  children,
  htmlFor,
}: {
  label: string;
  helpText?: string;
  error?: string;
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      {children}
      {helpText ? (
        <p className="mt-1 text-xs text-on-surface-variant">{helpText}</p>
      ) : null}
      {error ? <p className="mt-1 text-xs text-error">{error}</p> : null}
    </div>
  );
}

export const inputClassName =
  "w-full rounded-lg border border-outline-variant/30 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30";

export const selectClassName = inputClassName;

export const textareaClassName = `${inputClassName} min-h-[120px]`;
