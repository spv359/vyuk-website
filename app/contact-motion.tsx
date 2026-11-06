"use client";

import { useEffect } from "react";

export function ContactMotion() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("#contact .contact-form, #contact .email-option");
    if (!targets.length) return;
    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => { target.dataset.inView = "true"; });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        (entry.target as HTMLElement).dataset.inView = entry.intersectionRatio >= 0.3 ? "true" : "false";
      });
    }, { threshold: [0, 0.3] });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return null;
}
