"use client";

import { FormEvent, useState } from "react";
import { submitNewsletter } from "@/lib/api/submit-forms";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      await submitNewsletter(email);
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Subscription failed.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <input
          className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg flex-grow focus:ring-2 focus:ring-outline-variant focus:border-transparent outline-none font-body-md min-h-[44px]"
          placeholder="Engineering insights to your inbox"
          type="email"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-white text-primary px-4 py-3 rounded-lg font-bold text-label-sm hover:bg-white/90 transition-all min-h-[44px] disabled:opacity-60"
        >
          {status === "loading" ? "..." : "Join"}
        </button>
      </div>
      {status === "success" && (
        <p className="text-on-primary-container/80 text-sm">
          You&apos;re subscribed. Thank you!
        </p>
      )}
      {status === "error" && (
        <p className="text-error text-sm">{error}</p>
      )}
    </form>
  );
}
