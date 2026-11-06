"use client";

import { useEffect, useId, useRef, useState } from "react";

const heroImage = "/vyuk-sales-throughput-hero-sku.webp";
const questionBackground = "/vyuk-sales-question-background.webp";
const description = "Organisational intelligence, translated into outlet-specific action. Before: a sales officer wonders whether an outlet opportunity has been missed. With Vyuk: he discusses a WhatsApp recommendation to reintroduce SKU12 with the outlet owner.";

// Start at the phone dot, follow the connector, circle the message clockwise, and return.
const sweepPath = "M1263 597 C1293 591 1319 575 1326 550 H1244 Q1224 550 1224 530 V292 Q1224 272 1244 272 H1484 Q1504 272 1504 292 V530 Q1504 550 1484 550 H1326 C1319 575 1293 591 1263 597 Z";

// Trace the foreground owner in the original image's coordinates so the sweep
// stays behind his face and figure in both the full image and the mobile crop.
const ownerSilhouette = "M1648 399 C1628 385 1607 379 1587 381 C1562 378 1538 382 1524 393 C1516 400 1517 414 1519 422 C1514 438 1510 452 1510 467 C1507 477 1502 486 1497 491 C1492 496 1493 503 1498 507 C1496 512 1497 518 1499 522 C1498 527 1498 532 1501 537 C1503 544 1510 550 1520 556 C1524 560 1526 570 1523 579 C1509 585 1498 591 1487 603 C1475 617 1466 640 1451 662 L1418 692 C1408 699 1398 707 1392 716 L1385 729 C1380 731 1377 735 1381 742 L1396 751 C1411 758 1427 762 1446 764 L1648 764 Z";

function QuestionShape() {
  return (
    <>
      <rect x={386} y={303} width={246} height={102} rx={28} />
      <circle cx={401} cy={411.5} r={7.5} />
      <circle cx={383.3} cy={419.4} r={4.5} />
    </>
  );
}

function HeroArt({ scene }: { scene?: "before" | "with" }) {
  const mobile = Boolean(scene);
  const showQuestion = scene !== "with";
  const showSweep = scene !== "before";
  const artRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const artId = `sales-hero-${useId().replace(/:/g, "")}`;
  const glowId = `${artId}-glow`;
  const ownerMaskId = `${artId}-owner-mask`;
  const questionClipId = `${artId}-question-clip`;
  const questionCleanupId = `${artId}-question-cleanup`;
  const questionEdgeId = `${artId}-question-edge`;
  const questionShadowId = `${artId}-question-shadow`;
  const [ready, setReady] = useState(false);
  const [questionReady, setQuestionReady] = useState(false);
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
    if (imageRef.current?.complete && imageRef.current.naturalWidth > 0) setReady(true);

    let cancelled = false;
    let plate: HTMLImageElement | undefined;
    if (showQuestion) {
      plate = new window.Image();
      plate.onload = () => { if (!cancelled) setQuestionReady(true); };
      plate.src = questionBackground;
      if (plate.complete && plate.naturalWidth > 0) setQuestionReady(true);
    }

    const art = artRef.current;
    let observer: IntersectionObserver | undefined;
    if (art && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
      observer.observe(art);
    } else {
      setInView(true);
    }

    return () => {
      cancelled = true;
      if (plate) plate.onload = null;
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer?.disconnect();
    };
  }, [showQuestion]);

  const running = ready && inView && visible && !reducedMotion;

  return (
    <div ref={artRef}
      className={mobile ? `sales-hero-art sales-mobile-scene sales-mobile-scene--${scene}` : "sales-hero-art sales-hero-desktop"}
      data-running={running} data-question-ready={ready && questionReady}>
      <img ref={imageRef} className="sales-hero-original" src={heroImage} width={1672} height={941}
        fetchPriority="high" alt={scene === "before" ? "Before: the sales officer asks, Is there any missed opportunity at this outlet?" : mobile ? "With Vyuk: a WhatsApp outlet mission recommends reintroducing SKU12 because it is missing from recent bills. The sales officer discusses it with the outlet owner." : description}
        onLoad={() => setReady(true)} />
      <svg className="sales-hero-motion" viewBox={scene === "with" ? "844 204 804 710" : "0 0 1672 941"}
        width={1672} height={941}
        preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <filter id={glowId} x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
          <mask id={ownerMaskId} x={0} y={0} width={1672} height={941}
            maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" style={{ maskType: "luminance" }}>
            <rect width={1672} height={941} fill="white" />
            <path d={ownerSilhouette} fill="black" stroke="black" strokeWidth={2} />
          </mask>
          {showQuestion && (
            <>
              <filter id={questionEdgeId} x="-15%" y="-20%" width="130%" height="140%" colorInterpolationFilters="sRGB">
                <feGaussianBlur stdDeviation="1.5" />
              </filter>
              <filter id={questionShadowId} x="-15%" y="-20%" width="130%" height="140%" colorInterpolationFilters="sRGB">
                <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#102a2e" floodOpacity=".16" />
              </filter>
              <clipPath id={questionClipId} clipPathUnits="userSpaceOnUse"><QuestionShape /></clipPath>
              <mask id={questionCleanupId} x={0} y={0} width={1672} height={941}
                maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" style={{ maskType: "luminance" }}>
                <rect width={1672} height={941} fill="black" />
                <g fill="white" stroke="white" strokeWidth={8} filter={`url(#${questionEdgeId})`}><QuestionShape /></g>
              </mask>
            </>
          )}
        </defs>
        {showQuestion && (
          <g className="sales-hero-question-layer">
            <image href={questionBackground} width={1672} height={941} preserveAspectRatio="none" mask={`url(#${questionCleanupId})`} />
            <g transform="translate(509 355)">
              <g className="sales-hero-question">
                <g transform="translate(-509 -355)" filter={`url(#${questionShadowId})`}>
                  <image href={heroImage} width={1672} height={941} preserveAspectRatio="none" clipPath={`url(#${questionClipId})`} />
                </g>
              </g>
            </g>
          </g>
        )}
        {showSweep && <g className="sales-hero-sweep" fill="none" strokeLinecap="round" strokeLinejoin="round" mask={`url(#${ownerMaskId})`}>
          <path className="sales-hero-sweep-trail sales-hero-sweep-trail--glow" d={sweepPath} pathLength={1000}
            stroke="#ff9a43" strokeWidth={7} strokeDasharray="45 955" filter={`url(#${glowId})`} />
          <path className="sales-hero-sweep-trail sales-hero-sweep-trail--light" d={sweepPath} pathLength={1000}
            stroke="#fff0c6" strokeWidth={2.4} strokeDasharray="23 977" />
        </g>}
      </svg>
    </div>
  );
}

export function SalesHeroMotion() {
  return (
    <figure className="sales-hero-figure">
      <HeroArt />
      <div className="sales-hero-mobile">
        <p className="sales-mobile-headline">Organisational intelligence,<br /><span>translated into outlet-specific action.</span></p>
        <HeroArt scene="before" />
        <HeroArt scene="with" />
      </div>
      <figcaption>Example of an outlet mission delivered on WhatsApp.</figcaption>
    </figure>
  );
}
