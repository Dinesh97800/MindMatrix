"use client";

/** Multi-step consultation form (request-consultation page). */
export function nextStep(step: number): void {
  const total = 3;
  for (let i = 1; i <= total; i++) {
    const panel = document.getElementById(`step-${i}`);
    const dot = document.getElementById(`step-${i}-dot`);
    if (panel) {
      const active = i === step;
      panel.classList.toggle("hidden", !active);
      panel.classList.toggle("translate-x-10", !active);
      panel.classList.toggle("opacity-0", !active);
      if (active) {
        panel.classList.remove("hidden");
        panel.classList.remove("translate-x-10");
        panel.classList.remove("opacity-0");
      }
    }
    if (dot) {
      dot.classList.toggle("bg-primary", i === step);
      dot.classList.toggle("bg-outline-variant", i !== step);
    }
  }
  const indicator = document.getElementById("step-indicator");
  if (indicator) {
    indicator.textContent = `STEP ${String(step).padStart(2, "0")}/${String(total).padStart(2, "0")}`;
  }
}
