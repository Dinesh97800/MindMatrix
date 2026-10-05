"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function activateVisibleElements() {
  document.querySelectorAll(".reveal:not(.active), .reveal-on-scroll:not(.active)").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("active");
    }
  });
}

export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );

    document.querySelectorAll(".reveal, .reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    requestAnimationFrame(activateVisibleElements);

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
