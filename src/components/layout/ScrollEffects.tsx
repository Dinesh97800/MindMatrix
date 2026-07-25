"use client";

import { useEffect } from "react";

export function ScrollEffects() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal, .reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    const onScroll = () => {
      const header = document.querySelector(
        "header.sticky, nav.sticky, header[class*='sticky'], nav[class*='sticky']"
      );
      if (!header) return;
      if (window.pageYOffset > 50) {
        header.classList.remove("h-20");
        header.classList.add("h-16", "shadow-md");
      } else {
        header.classList.add("h-20");
        header.classList.remove("h-16", "shadow-md");
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
