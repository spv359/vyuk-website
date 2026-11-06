"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { focusAreas, type FocusCapability } from "./focus-content";
import { SectionScrollCue } from "./section-scroll-cue";

const projects = focusAreas.flatMap(({ capabilities }) => capabilities);

function Tile({ project, index, active }: { project: FocusCapability; index: number; active: boolean }) {
  return (
    <li className="work-strip-item" id={"work-project-" + index} data-active={active} aria-hidden={!active} inert={!active}>
      <article
        className={"work-tile " + (project.href ? "work-tile--linked" : "work-tile--upcoming")}
        role="group" aria-roledescription="slide"
        aria-label={(index + 1) + " of " + projects.length + ": " + project.title}
      >
        <div className="work-tile-top"><span>{project.category}</span></div>
        <div className="work-tile-content">
          <h3>{project.title}</h3>
          {typeof project.description === "string" ? (
            <p>{project.description}</p>
          ) : (
            <ul className="work-tile-points">
              {project.description.map((point) => <li key={point}>{point}</li>)}
            </ul>
          )}
        </div>
        <div className="work-tile-footer">
          {project.href ? (
            <a className="work-tile-action" href={project.href} tabIndex={active ? 0 : -1} aria-label={project.linkLabel + ": " + project.title}>
              <span>{project.linkLabel}</span>
              <ArrowUpRight size={23} aria-hidden="true" />
            </a>
          ) : <span className="work-tile-status">COMING SOON</span>}
        </div>
      </article>
    </li>
  );
}

export function WorkStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const previousRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const indicatorRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.18 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const cards = Array.from(viewport.querySelectorAll<HTMLElement>(".work-strip-item"));
    let frame = 0;

    const updateActive = () => {
      frame = 0;
      const origin = cards[0]?.offsetLeft ?? 0;
      let closest = 0;
      let nearestDistance = Infinity;
      cards.forEach((card, index) => {
        const distance = Math.abs(viewport.scrollLeft - (card.offsetLeft - origin));
        if (distance < nearestDistance) {
          closest = index;
          nearestDistance = distance;
        }
      });
      if (closest === activeIndexRef.current) return;

      const focused = document.activeElement;
      if (focused && cards.some((card, index) => index !== closest && card.contains(focused))) {
        viewport.focus({ preventScroll: true });
      }
      if ((closest === 0 && focused === previousRef.current) ||
          (closest === cards.length - 1 && focused === nextRef.current)) {
        indicatorRefs.current[closest]?.focus({ preventScroll: true });
      }
      activeIndexRef.current = closest;
      setActiveIndex(closest);
    };

    const onScroll = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActive);
    };
    const onResize = () => {
      const origin = cards[0]?.offsetLeft ?? 0;
      const card = cards[activeIndexRef.current];
      if (card) viewport.scrollTo({ left: card.offsetLeft - origin, behavior: "instant" });
      updateActive();
    };

    viewport.addEventListener("scroll", onScroll, { passive: true });
    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(viewport);
    } else {
      window.addEventListener("resize", onResize);
    }
    updateActive();
    return () => {
      if (frame) cancelAnimationFrame(frame);
      viewport.removeEventListener("scroll", onScroll);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  function goToProject(index: number) {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const cards = viewport.querySelectorAll<HTMLElement>(".work-strip-item");
    const target = cards[Math.max(0, Math.min(projects.length - 1, index))];
    if (!target || !cards[0]) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    viewport.scrollTo({ left: target.offsetLeft - cards[0].offsetLeft, behavior: reducedMotion ? "instant" : "smooth" });
  }

  function handleViewportKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey) return;
    let target: number;
    switch (event.key) {
      case "ArrowLeft": target = activeIndexRef.current - 1; break;
      case "ArrowRight": target = activeIndexRef.current + 1; break;
      case "Home": target = 0; break;
      case "End": target = projects.length - 1; break;
      default: return;
    }
    event.preventDefault();
    goToProject(target);
  }

  return (
    <section className="work" id="work" aria-labelledby="work-title" ref={sectionRef} data-in-view={inView} tabIndex={-1}>
      <div className="work-heading">
        <h2 id="work-title">Applied AI use cases</h2>
      </div>
      <div className="work-strip-shell" data-active-kind={projects[activeIndex].href ? "linked" : "upcoming"}>
        <div
          className="work-strip-viewport" ref={viewportRef} tabIndex={0}
          role="region" aria-roledescription="carousel" aria-label="Vyuk projects"
          aria-describedby="work-carousel-position" onKeyDown={handleViewportKey}
        >
          <ul className="work-strip-group" role="list">
            {projects.map((project, index) => <Tile key={project.title} project={project} index={index} active={activeIndex === index} />)}
          </ul>
        </div>
        {activeIndex > 0 && (
          <button
            className="work-strip-arrow work-strip-arrow--previous" ref={previousRef}
            type="button" onClick={() => goToProject(activeIndexRef.current - 1)}
            aria-label="Show previous project"
          >
            <ArrowLeft aria-hidden="true" size={28} strokeWidth={2} />
          </button>
        )}
        <button
          className="work-strip-arrow work-strip-arrow--next" ref={nextRef}
          type="button" onClick={() => goToProject(activeIndexRef.current + 1)}
          aria-label="Show next project" disabled={activeIndex === projects.length - 1}
        >
          <ArrowRight aria-hidden="true" size={28} strokeWidth={2} />
        </button>
      </div>
      <div className="work-pagination" role="group" aria-label="Choose a Vyuk project">
        {projects.map(({ title }, index) => (
          <button
            className="work-indicator" key={title} type="button"
            ref={(element) => { indicatorRefs.current[index] = element; }}
            aria-label={"Show project " + (index + 1) + " of " + projects.length + ": " + title}
            aria-controls={"work-project-" + index} aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => goToProject(index)}
          >
            <span className="work-indicator-mark" aria-hidden="true" />
          </button>
        ))}
      </div>
      <p className="sr-only" id="work-carousel-position" role="status" aria-live="polite" aria-atomic="true">
        {projects[activeIndex].title}. Project {activeIndex + 1} of {projects.length}.
      </p>
      <SectionScrollCue href="#about" label="About vyuk" ariaLabel="Continue to About Vyuk" />
    </section>
  );
}
