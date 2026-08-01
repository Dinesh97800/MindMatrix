"use client";

import { FormEvent, useState } from "react";
import { submitContact } from "@/lib/api/submit-forms";

export function EngineeringConsultationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("Aerospace & Defense");
  const [budget, setBudget] = useState("$50k - $250k");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      await submitContact({
        source: "engineering-consultation",
        name,
        email,
        company,
        message,
        subject: `Engineering consultation — ${industry}`,
        metadata: { industry, budget },
      });
      setStatus("success");
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
      <div className="space-y-1">
        <label className="font-label-sm text-on-surface-variant">FULL NAME</label>
        <input
          className="w-full bg-surface p-3 border border-outline-variant rounded form-input-focus outline-none transition-all"
          placeholder="Dr. Julian Vane"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-1">
        <label className="font-label-sm text-on-surface-variant">CORPORATE EMAIL</label>
        <input
          className="w-full bg-surface p-3 border border-outline-variant rounded form-input-focus outline-none transition-all"
          placeholder="j.vane@aerospace-v.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-1 md:col-span-2">
        <label className="font-label-sm text-on-surface-variant">COMPANY / ENTITY</label>
        <input
          className="w-full bg-surface p-3 border border-outline-variant rounded form-input-focus outline-none transition-all"
          placeholder="Precision Dynamics Group"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <label className="font-label-sm text-on-surface-variant">INDUSTRY SECTOR</label>
        <select
          className="w-full bg-surface p-3 border border-outline-variant rounded form-input-focus outline-none appearance-none"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        >
          <option>Aerospace & Defense</option>
          <option>Renewable Energy</option>
          <option>Advanced Robotics</option>
          <option>Quantum Computing</option>
        </select>
      </div>
      <div className="space-y-1">
        <label className="font-label-sm text-on-surface-variant">PROJECT BUDGET (USD)</label>
        <select
          className="w-full bg-surface p-3 border border-outline-variant rounded form-input-focus outline-none appearance-none"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        >
          <option>$50k - $250k</option>
          <option>$250k - $1M</option>
          <option>$1M - $5M</option>
          <option>$5M+</option>
        </select>
      </div>
      <div className="space-y-1 md:col-span-2">
        <label className="font-label-sm text-on-surface-variant">
          PROJECT DETAILS / REQUIREMENTS
        </label>
        <textarea
          className="w-full bg-surface p-3 border border-outline-variant rounded form-input-focus outline-none transition-all"
          placeholder="Outline technical constraints, required standards (ISO, AS9100), and core objectives..."
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          minLength={10}
        />
      </div>

      {status === "success" && (
        <p className="md:col-span-2 text-secondary text-sm">
          Thank you. Your request has been submitted.
        </p>
      )}
      {status === "error" && (
        <p className="md:col-span-2 text-error text-sm">{error}</p>
      )}

      <div className="md:col-span-2 pt-stack-sm">
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full md:w-auto px-12 py-4 bg-primary text-on-primary rounded font-headline-md tracking-tight hover:bg-primary-container technical-glow transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {status === "loading" ? "Submitting..." : "Initialize Protocol"}
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </button>
      </div>
    </form>
  );
}
