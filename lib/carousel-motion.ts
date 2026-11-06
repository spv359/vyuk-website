export function advanceBackAndForth(
  position: number,
  direction: -1 | 1,
  maxScroll: number,
  distance: number,
): { position: number; direction: -1 | 1 } {
  const limit = Math.max(0, maxScroll);
  if (limit === 0) return { position: 0, direction: 1 };

  const start = Math.min(limit, Math.max(0, position));
  const next = start + direction * Math.max(0, distance);
  if (next >= limit) return { position: limit, direction: -1 };
  if (next <= 0) return { position: 0, direction: 1 };
  return { position: next, direction };
}
