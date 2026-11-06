"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function SalesFlowMotion({ children }: { children: ReactNode }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const update = () => setRunning(inView && document.visibilityState === "visible" && !preference.matches);
    let observer: IntersectionObserver | undefined;

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        update();
      }, { threshold: 0 });
      observer.observe(list);
    } else {
      inView = true;
    }

    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();

    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <ol ref={listRef} className="project-flow sales-flow-motion" data-running={running}
      aria-label="From organisational intelligence to an outlet action">
      {children}
    </ol>
  );
}
