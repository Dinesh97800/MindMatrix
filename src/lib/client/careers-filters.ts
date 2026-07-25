/** Careers page job listing filters. */
export function filterJobs(category: string): void {
  document.querySelectorAll(".job-filter-btn").forEach((btn) => {
    const filter = btn.getAttribute("data-filter");
    const active = filter === category;
    btn.classList.toggle("bg-primary", active);
    btn.classList.toggle("text-on-primary", active);
    btn.classList.toggle("border-primary", active);
    btn.classList.toggle("bg-white", !active);
    btn.classList.toggle("text-on-surface", !active);
    btn.classList.toggle("active", active);
  });

  document.querySelectorAll("[data-job-category]").forEach((row) => {
    const jobCat = row.getAttribute("data-job-category") ?? "";
    const show = category === "all" || jobCat === category;
    if (row instanceof HTMLElement) {
      row.style.display = show ? "" : "none";
    }
  });
}
