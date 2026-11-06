export const questionSweepDuration = 4000;

export function questionSweepScroll(
  base: number,
  index: number,
  progress: number,
  step: number,
  cardWidth: number,
  viewportWidth: number,
): number {
  // Move late in the sweep, keeping its bright segment inside the viewport.
  const margin = Math.max(step - cardWidth + 12, viewportWidth * .12);
  const transition = Math.min(1, Math.max(0, (progress - .68) / .32));
  const eased = transition * transition * (3 - 2 * transition);
  return base + index * step - margin + step * eased;
}

export function visibleQuestionSweepRange(
  cardLeft: number,
  cardWidth: number,
  scrollLeft: number,
  viewportWidth: number,
): { start: number; end: number } {
  return {
    start: Math.min(1, Math.max(0, (scrollLeft + 8 - cardLeft) / cardWidth)),
    end: Math.min(1, Math.max(0, (scrollLeft + viewportWidth - 8 - cardLeft) / cardWidth)),
  };
}
