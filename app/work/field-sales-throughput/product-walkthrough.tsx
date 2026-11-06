"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, FileText, Image as ImageIcon, MessageCircle } from "lucide-react";
import { fieldSteps, samplePitches } from "./walkthrough-data";
import shared from "../conversational-analytics/page.module.css";
import styles from "./page.module.css";

export function FieldWalkthrough() {
  const [activeStep, setActiveStep] = useState(0);
  const stepButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const step = fieldSteps[activeStep];
  const isLast = activeStep === fieldSteps.length - 1;

  function handleStepKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let target = index;
    if (event.key === "ArrowRight") target = (index + 1) % fieldSteps.length;
    else if (event.key === "ArrowLeft") target = (index - 1 + fieldSteps.length) % fieldSteps.length;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = fieldSteps.length - 1;
    else return;
    event.preventDefault();
    setActiveStep(target);
    stepButtons.current[target]?.focus();
  }

  function handleNext() {
    if (!isLast) { setActiveStep(activeStep + 1); return; }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("request-demo")?.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
    document.getElementById("demo-title")?.focus({ preventScroll: true });
  }

  return (
    <div>
      <nav className={shared.stepNav} aria-label="Field guidance walkthrough steps">
        {fieldSteps.map(({ name }, index) => (
          <button className={shared.stepButton} key={name} type="button"
            ref={(node) => { stepButtons.current[index] = node; }}
            aria-pressed={activeStep === index} aria-controls="field-walkthrough-stage"
            onClick={() => setActiveStep(index)} onKeyDown={(event) => handleStepKey(event, index)}>
            <span className={shared.stepMarker} aria-hidden="true" /><span>{name}</span>
          </button>
        ))}
      </nav>

      <div id="field-walkthrough-stage">
        <div className={shared.stageIntro} aria-live="polite" aria-atomic="true"><h3>{step.title}</h3><p>{step.summary}</p></div>
        <div className={`${styles.visual} ${activeStep === 3 ? styles.deliveryVisual : ""}`}>
          {activeStep === 0 && (
            <div className={styles.priorityCard}>
              <span className={styles.cardLabel}>Example leadership priority</span>
              <h4>Recover regular product orders.</h4>
              <div className={styles.reasoningPath}>
                <div><span>Box</span><strong>Product opportunities</strong></div>
                <ArrowDown size={18} strokeWidth={1.8} aria-hidden="true" />
                <div><span>Line of Thought</span><strong>Historical product recovery</strong></div>
              </div>
            </div>
          )}
          {activeStep === 1 && (
            <div className={styles.contextCard}>
              <span className={styles.cardLabel}>Outlet A · Product context</span>
              <h4>{samplePitches[2].product}</h4>
              <dl className={styles.contextFacts}>
                <div><dt>Earlier purchases</dt><dd>Purchased in historical bills.</dd></div>
                <div><dt>Recent activity</dt><dd>Missing from recent bills.</dd></div>
              </dl>
              <p className={styles.contextConclusion}>A repeat-purchase opportunity to raise during the next visit.</p>
            </div>
          )}
          {activeStep === 2 && (
            <div className={styles.pitchCard}>
              <span className={styles.cardLabel}>Outlet A · Additional pitch</span>
              <h4>Bring {samplePitches[2].product} back into the order.</h4>
              <p className={styles.pitchReason}><strong>Why:</strong> Previously purchased; missing from recent bills.</p>
              <div className={styles.pitchCue}><span>Suggested pitch</span><p>“Would you like to add {samplePitches[2].product} back into this order?”</p></div>
            </div>
          )}
          {activeStep === 3 && (
            <div className={styles.deliveryExample}>
              <div className={styles.messageCard}>
                <div className={styles.messageHeader}><span>WhatsApp text · Example</span></div>
                <div className={styles.messageBody}>
                  <p className={styles.messageRoute}>15 SEP · OUTLET A</p>
                  <h4>Additional pitches</h4>
                  <p className={styles.messageIntro}>Alongside your regular pitch, raise these opportunities.</p>
                  <ol className={styles.messageItems}>
                    {samplePitches.map(({ product, action }, index) => (
                      <li key={product} className={index === 2 ? styles.featuredPitch : undefined}>
                        <strong>{product}</strong><span>{action}</span>
                        {index === 2 && <span className={styles.messageReason}>Why: previously purchased; missing from recent bills.</span>}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <ul className={styles.deliveryFormats} aria-label="Available delivery formats">
                <li><MessageCircle size={17} strokeWidth={1.8} aria-hidden="true" />WhatsApp text</li>
                <li><FileText size={17} strokeWidth={1.8} aria-hidden="true" />PDF</li>
                <li><ImageIcon size={17} strokeWidth={1.8} aria-hidden="true" />PNG / JPEG</li>
              </ul>
            </div>
          )}
        </div>
        <p className={shared.demoCaption}>Condensed, anonymised examples based on pilot guidance.</p>
      </div>

      <div className={`${shared.demoActions} ${styles.walkthroughActions}`}>
        <div className={shared.previousAndCount}>
          {activeStep > 0 && <button className={shared.secondary} type="button" onClick={() => setActiveStep(activeStep - 1)}><ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />Previous</button>}
          <span className={shared.stepCount}>{activeStep + 1} of {fieldSteps.length}</span>
        </div>
        <button className={shared.secondary} type="button" onClick={handleNext}>{isLast ? "Request a demo" : "Next step"}<ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" /></button>
      </div>
    </div>
  );
}
