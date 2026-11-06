"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Ellipsis, Map, MapPinned, TrendingDown, UserRound, UsersRound } from "lucide-react";
import { questionSweepDuration, questionSweepScroll, visibleQuestionSweepRange } from "@/lib/question-sweep";

const questions = [
  {
    label: "EXAMPLE: TEAM PERFORMANCE",
    icon: UsersRound,
    text: "Which sales officers need support based on the past two weeks? What is holding them back, and where should I focus coaching?",
  },
  {
    label: "EXAMPLE: TERRITORY PERFORMANCE",
    icon: MapPinned,
    text: "Which beats are underperforming? What is driving the gap, and where should I focus attention?",
  },
  {
    label: "EXAMPLE: NEW SALES OFFICERS",
    icon: UserRound,
    text: "Which are the top three and bottom three outlets on my beat today? What is limiting sales in the bottom three, and how can I improve them?",
  },
  {
    label: "EXAMPLE: REGIONAL PERFORMANCE",
    icon: Map,
    text: "Which sales regions in Kerala are performing best and worst? What explains the differences, and how can we improve sales in Kochi?",
  },
  {
    label: "EXAMPLE: SKU PERFORMANCE",
    icon: TrendingDown,
    text: "Which SKUs have declined across my outlets over the past three months? What is driving the decline, and which interventions should I prioritise?",
  },
  {
    label: "AND MORE…",
    icon: Ellipsis,
    text: "Teams use vyu to find answers across their business data, understand what is driving performance and make informed decisions.",
  },
] as const;

// Hidden copies make the return from the sixth example to the first seamless.
const loopedQuestions = Array.from({ length: 3 }, (_, copy) =>
  questions.map((question) => ({ ...question, copy })),
).flat();

export function QuestionsCarousel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const resumeAt = useRef(0);
  const sweep = useRef<{ index: number; elapsed: number; progress: number; reading: boolean }>({
    index: questions.length, elapsed: 0, progress: 0, reading: false,
  });
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setVisible(document.visibilityState === "visible");
    updatePreference();
    updateVisibility();
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);

    const root = rootRef.current;
    let observer: IntersectionObserver | undefined;
    if (root && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
      observer.observe(root);
    } else {
      setInView(true);
    }
    return () => {
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const first = viewport.querySelectorAll<HTMLElement>(".analytics-question-card")[questions.length];
    if (first) viewport.scrollLeft = first.offsetLeft;
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !inView || !visible || reducedMotion) return;
    const cards = Array.from(viewport.querySelectorAll<HTMLElement>(".analytics-question-card"));
    if (cards.length !== loopedQuestions.length) return;

    let cardWidth = 0;
    let step = 0;
    let viewportWidth = 0;
    let positions: number[] = [];
    const measure = () => {
      const viewportLeft = viewport.getBoundingClientRect().left;
      positions = cards.map((card) => card.getBoundingClientRect().left - viewportLeft + viewport.scrollLeft);
      cardWidth = cards[0].getBoundingClientRect().width;
      step = positions[1] - positions[0];
      viewportWidth = viewport.clientWidth;
    };
    measure();
    const observer = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(measure);
    observer?.observe(viewport);
    if (viewport.firstElementChild) observer?.observe(viewport.firstElementChild);
    window.addEventListener("resize", measure);

    let activeCard: HTMLElement | undefined;
    let previousTime: number | undefined;
    let frame = 0;
    const animate = (now: number) => {
      const elapsed = previousTime === undefined ? 0 : Math.min(50, now - previousTime);
      previousTime = now;
      const reading = focused || now < resumeAt.current;
      const current = sweep.current;
      const visibleCards = positions.flatMap((left, index) => {
        const range = visibleQuestionSweepRange(left, cardWidth, viewport.scrollLeft, viewportWidth);
        return range.end - range.start > .12 ? [{ index, range }] : [];
      });

      if (reading && !visibleCards.some(({ index }) => index === current.index)) {
        // A swipe may put a different card in view. Start its visible line immediately.
        const next = visibleCards.find(({ range }) => range.start === 0 && range.end === 1)
          ?? visibleCards.reduce<typeof visibleCards[number] | undefined>((best, card) =>
            !best || card.range.end - card.range.start > best.range.end - best.range.start ? card : best,
          undefined);
        if (next) { current.index = next.index; current.elapsed = 0; }
      }

      if (!reading) {
        if (current.reading) current.elapsed = current.progress * questionSweepDuration;
        current.index = questions.length + current.index % questions.length;
      }
      current.reading = reading;
      current.elapsed += elapsed;
      if (current.elapsed >= questionSweepDuration) {
        current.elapsed %= questionSweepDuration;
        current.index = reading
          ? (visibleCards.find(({ index }) => index > current.index) ?? visibleCards[0])?.index ?? current.index
          : questions.length + (current.index + 1) % questions.length;
      }

      const progress = current.elapsed / questionSweepDuration;
      if (reading) {
        const range = visibleQuestionSweepRange(positions[current.index], cardWidth, viewport.scrollLeft, viewportWidth);
        current.progress = range.start + progress * (range.end - range.start);
      } else {
        current.progress = progress;
        viewport.scrollLeft = questionSweepScroll(
          positions[questions.length], current.index % questions.length, progress, step, cardWidth, viewportWidth,
        );
      }
      const card = cards[current.index];
      if (activeCard !== card) {
        activeCard?.removeAttribute("data-sweeping");
        activeCard = card;
        activeCard.setAttribute("data-sweeping", "true");
      }
      card.style.setProperty("--sweep-position", `${current.progress * 100}%`);
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(frame);
      activeCard?.removeAttribute("data-sweeping");
      window.removeEventListener("resize", measure);
      observer?.disconnect();
    };
  }, [inView, visible, reducedMotion, focused]);

  function pauseForReading() {
    resumeAt.current = performance.now() + 8000;
  }

  function move(towards: -1 | 1) {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const cards = viewport.querySelectorAll<HTMLElement>(".analytics-question-card");
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    const cycle = cards[questions.length].offsetLeft - cards[0].offsetLeft;
    pauseForReading();
    // Keep manual browsing in the middle copy so both arrows remain usable.
    if (viewport.scrollLeft < cycle) viewport.scrollLeft += cycle;
    else if (viewport.scrollLeft >= cycle * 2) viewport.scrollLeft -= cycle;
    viewport.scrollTo({
      left: viewport.scrollLeft + towards * step,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }

  return (
    <div
      className="analytics-questions"
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Examples of business questions answered with vyu"
      onFocusCapture={(event) => setFocused((event.target as HTMLElement).matches(":focus-visible"))}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div className="analytics-questions-shell">
        <div
          className="analytics-questions-viewport"
          ref={viewportRef}
          id="analytics-questions-viewport"
          tabIndex={0}
          aria-label="Six example cards. Use the arrow keys or swipe to browse."
          onPointerDown={pauseForReading}
          onWheel={pauseForReading}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              setFocused(true);
              move(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
        >
          <ul className="analytics-question-track">
            {loopedQuestions.map(({ label, icon: Icon, text, copy }) => (
              <li className="analytics-question-card" key={`${copy}:${label}`} aria-hidden={copy !== 1 ? true : undefined}>
                <span className="analytics-question-sweep" aria-hidden="true" />
                <Icon aria-hidden="true" size={27} strokeWidth={1.8} />
                <span className="analytics-step-label">{label}</span>
                <h3>{text}</h3>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="work-strip-arrow work-strip-arrow--previous analytics-question-arrow"
          type="button"
          onClick={() => move(-1)}
          aria-label="Show previous examples"
          aria-controls="analytics-questions-viewport"
        ><ArrowLeft size={24} strokeWidth={1.8} aria-hidden="true" /></button>
        <button
          className="work-strip-arrow work-strip-arrow--next analytics-question-arrow"
          type="button"
          onClick={() => move(1)}
          aria-label="Show next examples"
          aria-controls="analytics-questions-viewport"
        ><ArrowRight size={24} strokeWidth={1.8} aria-hidden="true" /></button>
      </div>
    </div>
  );
}
