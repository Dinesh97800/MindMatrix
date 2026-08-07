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

const statusOptions = [
  "Concept",
  "Specification",
  "Existing design",
  "Prototype",
  "Field issue",
  "Production product",
];

export function EngineeringConsultationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [support, setSupport] = useState(supportOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [platform, setPlatform] = useState("");
  const [protocols, setProtocols] = useState("");
  const [requirements, setRequirements] = useState("");
  const [quantities, setQuantities] = useState("");
  const [timeline, setTimeline] = useState("");
  const [certification, setCertification] = useState("");
  const [ndaRequired, setNdaRequired] = useState("No");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!consent) {
      setError("Please confirm consent to be contacted regarding this enquiry.");
      return;
    }

    setSubmitStatus("loading");
    setError("");

    try {
      await submitContact({
        source: "engineering-consultation",
        name,
        email,
        company,
        message: message || requirements,
        subject: `Engineering consultation — ${support}`,
        metadata: {
          phone,
          country,
          support,
          designStatus: status,
          platform,
          protocols,
          requirements,
          quantities,
          timeline,
          certification,
          ndaRequired,
          budget: budget || "Not provided",
        },
      });
      setSubmitStatus("success");
      setName("");
      setEmail("");
      setCompany("");
      setPhone("");
      setCountry("");
      setPlatform("");
      setProtocols("");
      setRequirements("");
      setQuantities("");
      setTimeline("");
      setCertification("");
      setBudget("");
      setMessage("");
      setConsent(false);
    } catch (err) {
      setSubmitStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed.");
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="rounded-xl border border-outline-variant/20 bg-white p-8 text-center">
        <h2 className="font-headline-md text-headline-md text-primary mb-3">
          Enquiry received
        </h2>
        <p className="text-on-surface-variant">
          Thank you. Our engineering team will review your requirement and respond shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-stack-md"
    >
      <div className="space-y-1">
        <label className="font-label-sm text-on-surface-variant">FULL NAME</label>
        <input
          className="w-full bg-surface p-3 border border-outline-variant rounded outline-none transition-all"
          placeholder="Your name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-1">
        <label className="font-label-sm text-on-surface-variant">COMPANY</label>
        <input
          className="w-full bg-surface p-3 border border-outline-variant rounded outline-none transition-all"
          placeholder="Company name"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <label className="font-label-sm text-on-surface-variant">BUSINESS EMAIL</label>
        <input
          className="w-full bg-surface p-3 border border-outline-variant rounded outline-none transition-all"
          placeholder="name@company.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-1">
        <label className="font-label-sm text-on-surface-variant">PHONE</label>
        <input
          className="w-full bg-surface p-3 border border-outline-variant rounded outline-none transition-all"
          placeholder="Contact number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="space-y-1 md:col-span-2">
        <label className="font-label-sm text-on-surface-variant">COUNTRY</label>
        <input
          className="w-full bg-surface p-3 border border-outline-variant rounded outline-none transition-all"
          placeholder="Country"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div className="space-y-1 md:col-span-2">
        <label className="font-label-sm text-on-surface-variant">
          PRODUCT OR ENGINEERING PROBLEM
        </label>
        <textarea
          className="w-full bg-surface p-3 border border-outline-variant rounded outline-none transition-all"
          placeholder="Brief description of the product or engineering problem"
          rows={4}
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          required
          minLength={10}
        />
      </div>
      <div className="space-y-1">
        <label className="font-label-sm text-on-surface-variant">REQUIRED SUPPORT</label>
        <select
          className="w-full bg-surface p-3 border border-outline-variant rounded appearance-none"
          value={support}
          onChange={(e) => setSupport(e.target.value)}
        >
          {supportOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="space-y-1">
        <label className="font-label-sm text-on-surface-variant">CURRENT STATUS</label>
        <select
          className="w-full bg-surface p-3 border border-outline-variant rounded appearance-none"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {statusOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="space-y-1">
        <label className="font-label-sm text-on-surface-variant">
          TARGET CONTROLLER / PLATFORM
        </label>
        <input
          className="w-full bg-surface p-3 border border-outline-variant rounded outline-none transition-all"
          placeholder="If already selected"
          type="text"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <label className="font-label-sm text-on-surface-variant">
          INTERFACES / PROTOCOLS
        </label>
        <input
          className="w-full bg-surface p-3 border border-outline-variant rounded outline-none transition-all"
          placeholder="CAN, Modbus, RS-485, MQTT, etc."
          type="text"
          value={protocols}
          onChange={(e) => setProtocols(e.target.value)}
        />
      </div>
      <div className="space-y-1 md:col-span-2">
        <label className="font-label-sm text-on-surface-variant">
          POWER, MEASUREMENT, SAFETY OR PERFORMANCE REQUIREMENTS
        </label>
        <textarea
          className="w-full bg-surface p-3 border border-outline-variant rounded outline-none transition-all"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <label className="font-label-sm text-on-surface-variant">
          PROTOTYPE QTY / PRODUCTION VOLUME
        </label>
        <input
          className="w-full bg-surface p-3 border border-outline-variant rounded outline-none transition-all"
          type="text"
          value={quantities}
          onChange={(e) => setQuantities(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <label className="font-label-sm text-on-surface-variant">TIMELINE</label>
        <input
          className="w-full bg-surface p-3 border border-outline-variant rounded outline-none transition-all"
          placeholder="Required timeline and milestones"
          type="text"
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <label className="font-label-sm text-on-surface-variant">
          CERTIFICATION / REGULATORY NEEDS
        </label>
        <input
          className="w-full bg-surface p-3 border border-outline-variant rounded outline-none transition-all"
          type="text"
          value={certification}
          onChange={(e) => setCertification(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <label className="font-label-sm text-on-surface-variant">NDA REQUIRED</label>
        <select
          className="w-full bg-surface p-3 border border-outline-variant rounded appearance-none"
          value={ndaRequired}
          onChange={(e) => setNdaRequired(e.target.value)}
        >
          <option>No</option>
          <option>Yes</option>
        </select>
      </div>
      <div className="space-y-1 md:col-span-2">
        <label className="font-label-sm text-on-surface-variant">
          BUDGET RANGE (OPTIONAL)
        </label>
        <input
          className="w-full bg-surface p-3 border border-outline-variant rounded outline-none transition-all"
          type="text"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>
      <div className="md:col-span-2">
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
      </div>

      {submitStatus === "error" && (
        <p className="md:col-span-2 text-error text-sm">{error}</p>
      )}

      <div className="md:col-span-2 pt-stack-sm">
        <button
          type="submit"
          disabled={submitStatus === "loading"}
          className="w-full md:w-auto px-12 py-4 bg-primary text-on-primary rounded font-headline-md tracking-tight hover:bg-primary-container transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {submitStatus === "loading" ? "Submitting..." : "Submit Enquiry"}
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </button>
      </div>
    </form>
  );
}
