export function RepeatedLogosForContinuousLoopSection() {
  const logos = [
    "32-BIT MCU",
    "NORDIC",
    "AWS IoT",
    "ESPRESSIF",
    "RTOS",
    "ZEPHYR",
    "ARM",
    "NXP",
  ] as const;

  return (
    <section className="py-stack-md bg-surface-container overflow-hidden border-y border-outline-variant/10">
      <div className="flex whitespace-nowrap animate-scroll-x">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-20 items-center px-10">
            {logos.map((logo) => (
              <span
                key={`${copy}-${logo}`}
                className="text-headline-md font-display-lg text-outline-variant opacity-50"
              >
                {logo}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
