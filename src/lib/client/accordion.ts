/** FAQ / careers accordion toggles (Stitch markup). */
export function toggleAccordion(button: HTMLElement): void {
  const item = button.closest(".accordion-item");
  if (!item) return;

  const content = item.querySelector(".accordion-content");
  const icon = button.querySelector(".icon-rotate");

  const isOpen = item.classList.toggle("is-open");
  icon?.classList.toggle("rotate-180", isOpen);

  if (content instanceof HTMLElement) {
    content.style.display = isOpen ? "block" : "none";
  }
}
