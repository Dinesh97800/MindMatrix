"use client";

import { useState } from "react";
import { siteContent } from "@/config/site-content";

export function FaqItem1Section() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-y border-outline-variant/10 bg-surface-container-low px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div className="mx-auto max-w-3xl">
        <div className="mb-stack-lg text-center">
          <h2 className="mb-2 font-headline-lg text-headline-lg">Technical FAQ</h2>
          <p className="font-body-md text-on-surface-variant">
            Common questions about how we scope and deliver engineering work.
          </p>
        </div>

        <div className="space-y-stack-sm">
          {siteContent.consultationFaq.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-lg border border-outline-variant/40 bg-surface-container-lowest"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 p-stack-md text-left transition-colors hover:bg-surface"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-headline-md text-headline-md text-sm md:text-lg">
                    {item.question}
                  </span>
                  <span
                    className={`material-symbols-outlined shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-outline-variant/10 p-stack-md pt-0">
                    <p className="pt-stack-md font-body-md text-on-surface-variant">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
