"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

const slideDurations = [9500, 18200] as const;
const transitionDuration = 450;

function HeroScrollCue({ className }: { className: string }) {
  return (
    <a
      className={`hero-scroll-cue ${className}`}
      href="#where-vyuk-operates"
      aria-label="Continue to Areas of Focus"
      title="Explore Areas of Focus"
    >
      <svg width="44" height="26" viewBox="0 0 56 32" fill="none" aria-hidden="true" focusable="false">
        <path d="M6 8 28 24 50 8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

export function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [transitionTo, setTransitionTo] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const remaining = useRef<number>(slideDurations[0]);
  const manualChange = useRef(false);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motionPreference.matches);
    const updateVisibility = () => setVisible(document.visibilityState === "visible");

    updateMotion();
    updateVisibility();
    motionPreference.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      motionPreference.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  const rotating = visible && !reducedMotion && !paused;

  useEffect(() => {
    if (!rotating || transitionTo !== null) return;

    const duration = remaining.current;
    const started = performance.now();
    let finished = false;
    const timer = window.setTimeout(() => {
      finished = true;
      setTransitionTo((activeSlide + 1) % slideDurations.length);
    }, duration);

    return () => {
      window.clearTimeout(timer);
      if (!finished && !manualChange.current) {
        remaining.current = Math.max(1, duration - (performance.now() - started));
      }
      manualChange.current = false;
    };
  }, [activeSlide, rotating, transitionTo]);

  useEffect(() => {
    if (transitionTo === null) return;
    if (reducedMotion) {
      remaining.current = slideDurations[transitionTo];
      setActiveSlide(transitionTo);
      setTransitionTo(null);
      return;
    }

    const timer = window.setTimeout(() => {
      remaining.current = slideDurations[transitionTo];
      setActiveSlide(transitionTo);
      setTransitionTo(null);
    }, transitionDuration);
    return () => window.clearTimeout(timer);
  }, [transitionTo, reducedMotion]);

  function showSlide(index: number) {
    if (transitionTo !== null) {
      if (index === transitionTo) return;
      setTransitionTo(null);
      remaining.current = slideDurations[activeSlide];
      return;
    }
    if (index === activeSlide) return;
    if (rotating) manualChange.current = true;
    remaining.current = slideDurations[index];
    if (reducedMotion) setActiveSlide(index);
    else setTransitionTo(index);
  }

  function slideState(index: number) {
    if (transitionTo !== null) return index === activeSlide ? "outgoing" : "incoming";
    return index === activeSlide ? "current" : "hidden";
  }

  const interactive = (index: number) => transitionTo === null && activeSlide === index;

  return (
    <section
      className="hero-carousel"
      aria-label="Vyuk introduction"
      aria-roledescription="carousel"
      onFocusCapture={(event) => {
        if ((event.target as HTMLElement).matches(":focus-visible")) setPaused(true);
      }}
    >
      <div className="hero-controls" role="group" aria-label="Hero carousel controls">
        {!reducedMotion && (
          <button
            type="button"
            className="hero-pause"
            data-paused={paused}
            aria-label={paused ? "Resume automatic slide rotation" : "Pause automatic slide rotation"}
            onClick={() => setPaused((current) => !current)}
          >
            {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          </button>
        )}
        <div className="hero-indicators" role="group" aria-label="Choose a slide">
          {slideDurations.map((_, index) => (
            <button
              key={index}
              type="button"
              className="hero-indicator"
              aria-label={`Show slide ${index + 1} of ${slideDurations.length}`}
              aria-controls="hero-stage"
              aria-current={(transitionTo ?? activeSlide) === index ? "true" : undefined}
              onClick={() => showSlide(index)}
            >
              <span className="hero-indicator-mark" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <div
        className="hero-stage"
        id="hero-stage"
        aria-live={rotating ? "off" : "polite"}
        data-active-slide={activeSlide + 1}
        data-duration-ms={slideDurations[activeSlide]}
        data-transitioning={transitionTo !== null}
      >
          <div className={`hero hero--leader hero-layer--${slideState(0)}`} role="group" aria-roledescription="slide" aria-label="Slide 1 of 2" aria-hidden={!interactive(0)} inert={!interactive(0)}>
            <img
              className="hero-photo"
              src="/hero-leader.webp"
              width="1855"
              height="848"
              alt="A consumer products executive studies business reports beside his laptop."
              fetchPriority="high"
            />
            <div className="hero-copy">
              <h1 id="hero-title">Could AI solve a persistent problem in your business?</h1>
              <p>Vyuk delivers AI tailored to your business at scale. It learns and improves with use. We help deliver business outcomes.</p>
              <div className="hero-primary-actions">
                <a className="action-button" href="#contact">Discuss a use case</a>
                <HeroScrollCue className="hero-scroll-cue--inline" />
              </div>
            </div>
          </div>
          <div className={`hero hero--team hero-layer--${slideState(1)}`} role="group" aria-roledescription="slide" aria-label="Slide 2 of 2" aria-hidden={!interactive(1)} inert={!interactive(1)}>
            <img
              className="hero-photo"
              src="/hero-team-taupe.webp"
              width="1942"
              height="809"
              alt="Three colleagues review a product decision as staff work in the background."
            />
            <div className="hero-copy hero-copy--team">
              <p className="hero-eyebrow">AS ENTERPRISES PUT AI TO WORK</p>
              <h2 id="team-title">The advantage belongs to the ambitious.</h2>
              <p className="hero-team-body">Vyuk brings applied AI within reach of your consumer product company, building capability around the people, processes and systems you already have.</p>
              <div className="hero-work-invitation">
                <a className="action-button" href="#work">See Vyuk&apos;s Applied AI projects</a>
              </div>
            </div>
            <HeroScrollCue className="hero-scroll-cue--photo" />
          </div>
      </div>
      <HeroScrollCue className="hero-scroll-cue--desktop" />
    </section>
  );
}
