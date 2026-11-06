"use client";

import { useEffect, useRef, useState } from "react";

const originalImage = "/vyu-conversational-analytics-hero.webp";
const backgroundPlate = "/vyu-conversational-analytics-background.webp";
const imageDescription = "Illustrative outlet visit: before vyu, three disconnected spreadsheet reports and a manager's call create uncertainty; with vyu, a sales officer reviews a flat six-month sales trend and prepares a performance-linked response.";

// Trace the existing phone bubble, connector, and message border, returning to the phone.
const insightSweepPath = "M1392 552 A10 10 0 1 0 1372 552 A10 10 0 1 0 1392 552 C1434 544 1475 532 1479 510 C1481 498 1475 492 1464 492 H1298 C1282 492 1269 480 1269 464 V184 C1269 168 1282 156 1298 156 H1622 C1639 156 1652 169 1652 186 V462 C1652 479 1639 492 1622 492 H1496 C1488 492 1481 492 1479 510 C1475 532 1434 544 1392 552 Z";

const cards = [
  {
    id: "rack-rent",
    centre: [368, 365],
    path: "M294 333 L439 328 Q454 328 455 344 L457 381 Q458 395 442 397 L296 403 Q281 403 280 388 L278 350 Q278 335 294 333 Z",
  },
  {
    id: "outlet-terms",
    centre: [320, 441],
    path: "M249 410 L389 407 Q405 407 405 423 L406 456 Q406 472 391 472 L250 476 Q234 476 234 460 L233 429 Q233 411 249 410 Z",
  },
  {
    id: "sales-data",
    centre: [323, 511],
    path: "M252 482 L395 478 Q411 478 411 494 L412 526 Q412 542 397 543 L253 548 Q237 548 237 532 L235 501 Q235 483 252 482 Z",
  },
  {
    id: "manager-call",
    centre: [544, 709],
    path: "M425 673 H663 Q683 673 683 693 V725 Q683 745 663 745 H425 Q405 745 405 725 V693 Q405 673 425 673 Z",
  },
] as const;

export function AnalyticsHeroMotion() {
  const artRef = useRef<HTMLDivElement>(null);
  const [plateReady, setPlateReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setVisible(document.visibilityState === "visible");
    updatePreference();
    updateVisibility();
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);

    // A client-side load check also works when the SVG image loaded before hydration.
    let cancelled = false;
    const plate = new window.Image();
    plate.onload = () => { if (!cancelled) setPlateReady(true); };
    plate.src = backgroundPlate;
    if (plate.complete && plate.naturalWidth > 0) setPlateReady(true);

    const art = artRef.current;
    let observer: IntersectionObserver | undefined;
    if (art && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
      observer.observe(art);
    } else {
      setInView(true);
    }

    return () => {
      cancelled = true;
      plate.onload = null;
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer?.disconnect();
    };
  }, []);

  const running = plateReady && inView && visible && !reducedMotion;

  return (
    <figure className="analytics-hero-figure">
      <div className="analytics-hero-art" ref={artRef} data-running={running} data-ready={plateReady}>
        <img
          className="analytics-hero-original"
          src={originalImage}
          alt={imageDescription}
          width="1672"
          height="941"
          fetchPriority="high"
        />
        <svg className="analytics-hero-motion" viewBox="0 0 1672 941" aria-hidden="true" focusable="false">
          <defs>
            <filter id="analytics-hero-soft-edge" x="-20%" y="-30%" width="140%" height="160%" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="2" />
            </filter>
            <filter id="analytics-vyu-sweep-glow" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="2.4" />
            </filter>
            <path id="analytics-vyu-sweep-path" d={insightSweepPath} pathLength="1000" />
            {cards.map((card) => (
              <clipPath id={`analytics-hero-${card.id}`} key={card.id}>
                <path d={card.path} />
              </clipPath>
            ))}
            <mask id="analytics-hero-cleanup" maskUnits="userSpaceOnUse" x="0" y="0" width="1672" height="941">
              <rect width="1672" height="941" fill="black" />
              {cards.map((card) => (
                <path d={card.path} key={card.id} fill="white" stroke="white" strokeWidth="18" filter="url(#analytics-hero-soft-edge)" />
              ))}
            </mask>
          </defs>
          <image
            href={backgroundPlate}
            width="1672"
            height="941"
            preserveAspectRatio="none"
            mask="url(#analytics-hero-cleanup)"
          />
          {cards.map((card) => (
            <g key={card.id} transform={`translate(${card.centre[0]} ${card.centre[1]})`}>
              <g className={`analytics-hero-card analytics-hero-card--${card.id}`}>
                <g transform={`translate(${-card.centre[0]} ${-card.centre[1]})`}>
                  <image href={originalImage} width="1672" height="941" clipPath={`url(#analytics-hero-${card.id})`} />
                </g>
              </g>
            </g>
          ))}
          <g className="analytics-vyu-sweep" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <use
              className="analytics-vyu-sweep-trail analytics-vyu-sweep-trail--glow"
              href="#analytics-vyu-sweep-path"
              stroke="#ff8d3a"
              strokeWidth="8"
              strokeDasharray="48 952"
              filter="url(#analytics-vyu-sweep-glow)"
            />
            <use
              className="analytics-vyu-sweep-trail analytics-vyu-sweep-trail--light"
              href="#analytics-vyu-sweep-path"
              stroke="#fff4cc"
              strokeWidth="2.2"
              strokeDasharray="28 972"
            />
          </g>
        </svg>
      </div>
      <figcaption>Illustrative field sales scenario</figcaption>
    </figure>
  );
}
