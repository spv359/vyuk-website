"use client";

import { useEffect } from "react";

const SWEEP_MS = 850;

export function ScopeMotion() {
  useEffect(() => {
    const focus = document.querySelector<HTMLElement>("#where-vyuk-operates .scope-focus");
    if (!focus || !("IntersectionObserver" in window)) return;

    // DOM order is icon, first card, second card for each function.
    const steps = Array.from(focus.querySelectorAll<HTMLElement>("[data-scope-sweep]"));
    if (steps.length !== 9) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let stepIndex = 0;
    let timer: number | undefined;
    let active: HTMLElement | null = null;

    function halt() {
      if (timer !== undefined) window.clearTimeout(timer);
      timer = undefined;
      active?.classList.remove("is-sweeping");
      active = null;
      stepIndex = 0;
    }

    function runStep() {
      if (!inView || reducedMotion.matches || document.hidden) return;
      const step = steps[stepIndex];
      active = step;
      step.classList.add("is-sweeping");
      timer = window.setTimeout(() => {
        step.classList.remove("is-sweeping");
        active = null;
        stepIndex = (stepIndex + 1) % steps.length;
        const gap = stepIndex === 3 || stepIndex === 6 ? 500 : stepIndex === 0 ? 3000 : 0;
        timer = window.setTimeout(runStep, gap);
      }, SWEEP_MS);
    }

    function syncMotion() {
      if (!inView || reducedMotion.matches || document.hidden) {
        halt();
      } else if (timer === undefined && active === null) {
        runStep();
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.intersectionRatio >= 0.15;
      syncMotion();
    }, { threshold: 0.15 });

    observer.observe(focus);
    reducedMotion.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncMotion);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncMotion);
      halt();
    };
  }, []);

  return null;
}
