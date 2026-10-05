"use client";

import { FormEvent, useState } from "react";
import { submitContact } from "@/lib/api/submit-forms";
import { siteContent } from "@/config/site-content";

const supportOptions = [
  "Technical consultation",
  "Firmware development",
  "Hardware development",
  "Complete product development",
  "Existing-product debugging",
  "Design upgrade/redesign",
  "Testing or calibration utilities",
  "Long-term engineering support",
];

export function RequestConsultationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [support, setSupport] = useState(supportOptions[0]);
  const [summary, setSummary] = useState("");
  const [timeline, setTimeline] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!consent) {
      setError("Please confirm consent to be contacted regarding this enquiry.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      await submitContact({
        source: "request-consultation",
        name,
        email,
        company,
        message: summary,
        subject: `Consultation request — ${support}`,
        metadata: { support, timeline },
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-outline-variant/20 bg-white p-8 text-center">
        <h2 className="font-headline-md text-headline-md text-primary mb-3">
          Consultation request received
        </h2>
        <p className="text-on-surface-variant">
          Our engineering team will review your request and respond shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-stack-md" id="consultation-form">
      <div>
        <label className="block font-label-sm text-label-sm mb-2 text-on-surface">
          FULL NAME
        </label>
        <input
          className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-DEFAULT p-4 font-body-md"
          placeholder="Your name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-label-sm text-label-sm mb-2 text-on-surface">
          BUSINESS EMAIL
        </label>
        <input
          className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-DEFAULT p-4 font-body-md"
          placeholder="name@company.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-label-sm text-label-sm mb-2 text-on-surface">
          COMPANY
        </label>
        <input
          className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-DEFAULT p-4 font-body-md"
          placeholder="Company name"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-label-sm text-label-sm mb-2 text-on-surface">
          REQUIRED SUPPORT
        </label>
        <select
          className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-DEFAULT p-4 font-body-md"
          value={support}
          onChange={(e) => setSupport(e.target.value)}
        >
          {supportOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-label-sm text-label-sm mb-2 text-on-surface">
          BRIEF DESCRIPTION
        </label>
        <textarea
          className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-DEFAULT p-4 font-body-md"
          placeholder="Describe the product requirement or engineering problem"
          rows={4}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
          minLength={10}
        />
      </div>
      <div>
        <label className="block font-label-sm text-label-sm mb-2 text-on-surface">
          TIMELINE
        </label>
        <input
          className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-DEFAULT p-4 font-body-md"
          placeholder="Required timeline or milestones"
          type="text"
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
        />
      </div>
      <label className="flex items-start gap-3">
        <input
          className="mt-1 rounded text-primary h-5 w-5"
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span className="font-body-md text-on-surface-variant text-sm">
          I consent to be contacted by {siteContent.legalName} regarding this enquiry.
        </span>
      </label>
      {error && <p className="text-error text-sm">{error}</p>}
      <button
        className="w-full bg-primary text-on-primary p-5 rounded-DEFAULT font-label-sm text-label-sm font-bold disabled:opacity-60"
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting..." : "Submit Enquiry"}
      </button>
    </form>
  );
}
