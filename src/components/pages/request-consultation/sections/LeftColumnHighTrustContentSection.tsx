"use client";

import { RequestConsultationForm } from "@/components/forms/RequestConsultationForm";
import { siteContent } from "@/config/site-content";

export function LeftColumnHighTrustContentSection() {
  return (
    <div className="grid grid-cols-12 gap-gutter">
      <div className="col-span-12 lg:col-span-5 flex flex-col justify-center gap-stack-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-container/10 text-on-primary-container rounded-full w-fit">
          <span className="material-symbols-outlined text-[16px]">engineering</span>
          <span className="font-label-sm text-label-sm">Engineering Consultation</span>
        </div>
        <h1 className="font-display-lg text-display-lg leading-tight">
          Discuss Your{" "}
          <span className="text-on-primary-container">Embedded Product Requirement</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
          {siteContent.contactCta}
        </p>
        <div className="flex flex-col gap-6 mt-4">
          {[
            {
              icon: "developer_board",
              title: "Firmware & Hardware Support",
              text: "Bare-metal/RTOS firmware, integration, bring-up, debugging, and redesign.",
            },
            {
              icon: "router",
              title: "Industrial Communication",
              text: "CAN, Modbus, RS-485, UART, SPI, I²C, Ethernet, MQTT and SNMP where applicable.",
            },
            {
              icon: "verified_user",
              title: "Confidential Engagement",
              text: siteContent.confidentialityShort,
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
