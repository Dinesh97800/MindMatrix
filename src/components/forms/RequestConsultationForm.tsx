"use client";

import { FormEvent, useState } from "react";
import { submitContact } from "@/lib/api/submit-forms";

export function RequestConsultationForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState("Aerospace & Defense");
  const [focus, setFocus] = useState("Migration");
  const [summary, setSummary] = useState("");
  const [timeline, setTimeline] = useState("ASAP");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function goToStep(next: number) {
    setStep(next);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!consent) {
      setError("Please accept the privacy consent to continue.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      await submitContact({
        source: "request-consultation",
        name,
        email,
        message: summary,
        subject: `Consultation request — ${focus}`,
        metadata: { industry, focus, timeline },
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
    <form onSubmit={handleSubmit} className="relative overflow-hidden" id="consultation-form">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                step === n ? "bg-primary" : "bg-outline-variant"
              }`}
            />
          ))}
        </div>
        <span className="font-label-sm text-label-sm font-bold text-on-surface-variant">
          STEP {String(step).padStart(2, "0")}/03
        </span>
      </div>

      {step === 1 && (
        <div>
          <div className="mb-8">
            <h2 className="font-headline-md text-headline-md mb-2">Technical Context</h2>
            <p className="font-body-md text-on-surface-variant">
              Identify your current position in the digital frontier.
            </p>
          </div>
          <div className="space-y-stack-md">
            <div>
              <label className="block font-label-sm text-label-sm mb-2 text-on-surface">
                FULL NAME
              </label>
              <input
                className="w-full bg-surface-container-lowest border-outline-variant/30 rounded-DEFAULT p-4 font-body-md"
                placeholder="Johnathan Sterling"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-label-sm text-label-sm mb-2 text-on-surface">
                ORGANIZATION EMAIL
              </label>
              <input
                className="w-full bg-surface-container-lowest border-outline-variant/30 rounded-DEFAULT p-4 font-body-md"
                placeholder="j.sterling@enterprise.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-label-sm text-label-sm mb-2 text-on-surface">
                PRIMARY INDUSTRY
              </label>
              <select
                className="w-full bg-surface-container-lowest border-outline-variant/30 rounded-DEFAULT p-4 font-body-md"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option>Aerospace & Defense</option>
                <option>Industrial Manufacturing</option>
                <option>FinTech / Secure Systems</option>
                <option>Energy Infrastructure</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <button
            className="w-full mt-10 bg-primary text-on-primary p-5 rounded-DEFAULT font-label-sm text-label-sm font-bold flex items-center justify-center gap-2"
            type="button"
            onClick={() => goToStep(2)}
          >
            NEXT: ARCHITECTURE DETAILS
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="mb-8">
            <h2 className="font-headline-md text-headline-md mb-2">Scope of Engagement</h2>
            <p className="font-body-md text-on-surface-variant">
              Define the parameters of the engineering challenge.
            </p>
          </div>
          <div className="space-y-stack-md">
            <label className="block font-label-sm text-label-sm text-on-surface mb-4">
              PRIMARY FOCUS AREA
            </label>
            <div className="grid grid-cols-2 gap-4">
              {["Migration", "Scalability", "Cyber Security", "R&D / Innovation"].map(
                (option) => (
                  <label
                    key={option}
                    className={`flex flex-col p-4 border rounded-DEFAULT cursor-pointer ${
                      focus === option
                        ? "border-primary bg-primary-container/5"
                        : "border-outline-variant/30"
                    }`}
                  >
                    <input
                      className="hidden"
                      name="focus"
                      type="radio"
                      checked={focus === option}
                      onChange={() => setFocus(option)}
                    />
                    <span className="font-label-sm text-label-sm font-bold">{option}</span>
                  </label>
                )
              )}
            </div>
            <div>
              <label className="block font-label-sm text-label-sm mb-2 text-on-surface">
                TECHNICAL SUMMARY
              </label>
              <textarea
                className="w-full bg-surface-container-lowest border-outline-variant/30 rounded-DEFAULT p-4 font-body-md"
                placeholder="Briefly describe your current stack or infrastructure hurdle..."
                rows={4}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
                minLength={10}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-10">
            <button
              className="flex-1 border border-outline text-on-surface p-5 rounded-DEFAULT font-label-sm text-label-sm font-bold"
              type="button"
              onClick={() => goToStep(1)}
            >
              BACK
            </button>
            <button
              className="flex-[2] bg-primary text-on-primary p-5 rounded-DEFAULT font-label-sm text-label-sm font-bold"
              type="button"
              onClick={() => goToStep(3)}
            >
              FINAL STEP
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="mb-8">
            <h2 className="font-headline-md text-headline-md mb-2">Final Validation</h2>
            <p className="font-body-md text-on-surface-variant">
              Establishing the secure communication protocol.
            </p>
          </div>
          <div className="space-y-stack-md">
            <div className="bg-surface-container p-6 rounded-lg border border-outline-variant/20">
              <h4 className="font-label-sm text-label-sm font-bold mb-4">
                PREFERRED TIMELINE
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {["ASAP", "1-3 Mo.", "Explore"].map((option) => (
                  <button
                    key={option}
                    className={`p-3 border rounded font-label-sm text-label-sm ${
                      timeline === option
                        ? "bg-primary text-white border-primary"
                        : "bg-white border-outline-variant/30"
                    }`}
                    type="button"
                    onClick={() => setTimeline(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-start gap-3 p-4">
              <input
                className="mt-1 rounded text-primary h-5 w-5"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span className="font-body-md text-on-surface-variant text-sm">
                I consent to the processing of technical data under the Mind Matrix
                Privacy Protocol and confirm that this inquiry involves commercial/industrial
                operations.
              </span>
            </label>
          </div>
          {error && <p className="text-error text-sm mt-4">{error}</p>}
          <div className="flex gap-4 mt-10">
            <button
              className="flex-1 border border-outline text-on-surface p-5 rounded-DEFAULT font-label-sm text-label-sm font-bold"
              type="button"
              onClick={() => goToStep(2)}
            >
              BACK
            </button>
            <button
              className="flex-[2] bg-primary text-on-primary p-5 rounded-DEFAULT font-label-sm text-label-sm font-bold disabled:opacity-60"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Submitting..." : "INITIATE CONSULTATION"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
