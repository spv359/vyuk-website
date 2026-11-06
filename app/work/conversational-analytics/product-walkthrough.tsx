"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { walkthroughSteps } from "./walkthrough-data";
import styles from "./page.module.css";

export function ProductWalkthrough() {
  const [activeStep, setActiveStep] = useState(0);
  const stepButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const step = walkthroughSteps[activeStep];
  const isLast = activeStep === walkthroughSteps.length - 1;

  function handleStepKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let target = index;
    if (event.key === "ArrowRight") target = (index + 1) % walkthroughSteps.length;
    else if (event.key === "ArrowLeft") target = (index - 1 + walkthroughSteps.length) % walkthroughSteps.length;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = walkthroughSteps.length - 1;
    else return;
    event.preventDefault();
    setActiveStep(target);
    stepButtons.current[target]?.focus();
  }

  function handleNext() {
    if (!isLast) {
      setActiveStep(activeStep + 1);
      return;
    }
    const demoSection = document.getElementById("request-demo");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    demoSection?.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
    document.getElementById("demo-title")?.focus({ preventScroll: true });
  }

  return (
    <div className={styles.walkthrough}>
      <nav className={styles.stepNav} aria-label="Product walkthrough steps">
        {walkthroughSteps.map(({ name }, index) => (
          <button
            className={styles.stepButton}
            key={name}
            type="button"
            ref={(node) => { stepButtons.current[index] = node; }}
            aria-pressed={activeStep === index}
            aria-controls="walkthrough-stage"
            onClick={() => setActiveStep(index)}
            onKeyDown={(event) => handleStepKey(event, index)}
          >
            <span className={styles.stepMarker} aria-hidden="true" />
            <span>{name}</span>
          </button>
        ))}
      </nav>

      <div id="walkthrough-stage" className={styles.stage}>
        <div className={styles.stageIntro} aria-live="polite" aria-atomic="true">
          <h3>{step.title}</h3>
          <p>{step.summary}</p>
        </div>
        <div className={styles.readout}>
          <span>{step.label}</span>
          <p>{step.readout}</p>
        </div>
        <figure className={styles.capture}>
          <div className={styles.captureBar} aria-hidden="true">
            <span className={styles.miniLogo}>vyu</span>
            <span>{step.source}</span>
          </div>
          <div className={styles.captureWindow}>
            <svg
              key={step.asset}
              role="img"
              aria-label={step.alt}
              viewBox={step.crop.join(" ")}
              style={{ aspectRatio: `${step.crop[2]} / ${step.crop[3]}`, maxWidth: step.crop[2], marginInline: "auto" }}
              width={step.crop[2]}
              height={step.crop[3]}
            >
              <defs>
                <filter
                  id="vyu-screenshot-clarity"
                  filterUnits="userSpaceOnUse"
                  x={step.crop[0] - 2}
                  y={step.crop[1] - 2}
                  width={step.crop[2] + 4}
                  height={step.crop[3] + 4}
                  colorInterpolationFilters="sRGB"
                >
                  <feConvolveMatrix order="3" kernelMatrix="0 -0.08 0 -0.08 1.32 -0.08 0 -0.08 0" divisor={1} edgeMode="duplicate" preserveAlpha="true" />
                  <feComponentTransfer>
                    <feFuncR type="linear" slope={1.06} intercept={-0.03} />
                    <feFuncG type="linear" slope={1.06} intercept={-0.03} />
                    <feFuncB type="linear" slope={1.06} intercept={-0.03} />
                  </feComponentTransfer>
                </filter>
              </defs>
              <image href={step.asset} x={0} y={0} width={step.width} height={step.height} filter="url(#vyu-screenshot-clarity)" />
            </svg>
          </div>
          <div className={styles.mobileDetails}>
            <p className={styles.mobileLabel}>Walkthrough highlights</p>
            <ul>{step.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
          </div>
          <figcaption className={styles.srOnly}>{step.alt}</figcaption>
        </figure>
        <p className={styles.demoCaption}>Anonymised product walkthrough. Names, SKU labels and business figures are illustrative.</p>
      </div>

      <div className={styles.demoActions}>
        <div className={styles.previousAndCount}>
          {activeStep > 0 && (
            <button className={styles.secondary} type="button" onClick={() => setActiveStep(activeStep - 1)}>
              <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" /> Previous
            </button>
          )}
          <span className={styles.stepCount}>{activeStep + 1} of {walkthroughSteps.length}</span>
        </div>
        <button className={styles.secondary} type="button" onClick={handleNext}>
          {isLast ? "Request a demo" : "Next step"}<ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
