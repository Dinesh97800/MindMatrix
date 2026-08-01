"use client";

import { FormEvent, useState } from "react";
import { submitContact } from "@/lib/api/submit-forms";

export function ContactUsForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      await submitContact({
        source: "contact-us",
        name,
        email,
        subject,
        message,
      });
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-stack-md">
      <div className="grid grid-cols-1 gap-stack-md md:grid-cols-2">
        <div className="space-y-2">
          <label className="font-label-sm uppercase text-on-surface-variant">
            Full Name
          </label>
          <input
            className="w-full rounded-lg border-transparent bg-surface-container-low p-3 font-body-md transition-all focus:border-primary focus:ring-0"
            placeholder="Your name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="font-label-sm uppercase text-on-surface-variant">
            Email
          </label>
          <input
            className="w-full rounded-lg border-transparent bg-surface-container-low p-3 font-body-md transition-all focus:border-primary focus:ring-0"
            placeholder="you@company.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-label-sm uppercase text-on-surface-variant">
          Subject
        </label>
        <input
          className="w-full rounded-lg border-transparent bg-surface-container-low p-3 font-body-md transition-all focus:border-primary focus:ring-0"
          placeholder="How can we help?"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="font-label-sm uppercase text-on-surface-variant">
          Message
        </label>
        <textarea
          className="w-full rounded-lg border-transparent bg-surface-container-low p-4 font-body-md transition-all focus:border-primary focus:ring-0"
          placeholder="Describe your project or enquiry..."
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          minLength={10}
        />
      </div>

      {status === "success" && (
        <p className="text-secondary text-sm">
          Thank you. Your enquiry has been submitted successfully.
        </p>
      )}
      {status === "error" && <p className="text-error text-sm">{error}</p>}

      <div className="pt-stack-md">
        <button
          className="flex w-full items-center justify-center gap-stack-sm rounded-lg bg-primary py-5 font-label-sm uppercase tracking-[0.2em] text-on-primary transition-all hover:bg-secondary active:scale-[0.98] disabled:opacity-60"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send Enquiry"}
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </form>
  );
}
