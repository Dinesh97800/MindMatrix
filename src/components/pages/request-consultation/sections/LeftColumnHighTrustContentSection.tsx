"use client";

import { RequestConsultationForm } from "@/components/forms/RequestConsultationForm";

export function LeftColumnHighTrustContentSection() {
  return (
    <div className="grid grid-cols-12 gap-gutter">
      <div className="col-span-12 lg:col-span-5 flex flex-col justify-center gap-stack-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-container/10 text-on-primary-container rounded-full w-fit">
          <span className="material-symbols-outlined text-[16px]">verified</span>
          <span className="font-label-sm text-label-sm">ISO 27001 & SOC2 CERTIFIED</span>
        </div>
        <h1 className="font-display-lg text-display-lg leading-tight">
          Speak with a{" "}
          <span className="text-on-primary-container">Senior Engineering Architect.</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
          Skip the sales pitch. Get a direct technical evaluation of your
          infrastructure, scalability roadmap, and security posture from our lead
          architects.
        </p>
        <div className="flex flex-col gap-6 mt-4">
          {[
            {
              icon: "architecture",
              title: "Structural Analysis",
              text: "Review of existing architecture and bottleneck identification.",
            },
            {
              icon: "security",
              title: "Security Audit",
              text: "Zero-trust strategy and compliance gap analysis.",
            },
            {
              icon: "precision_manufacturing",
              title: "Industrial Scaling",
              text: "Precision engineering for high-throughput digital ecosystems.",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white border border-outline-variant flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">{item.icon}</span>
              </div>
              <div>
                <h3 className="font-headline-md text-body-md font-bold">{item.title}</h3>
                <p className="font-body-md text-on-surface-variant">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-12 lg:col-start-7 lg:col-span-6">
        <div className="glass-card p-stack-md md:p-10 rounded-xl shadow-sm border border-outline-variant/20">
          <RequestConsultationForm />
        </div>
      </div>
    </div>
  );
}
