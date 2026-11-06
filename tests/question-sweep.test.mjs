import assert from "node:assert/strict";
import test from "node:test";
import { questionSweepScroll, visibleQuestionSweepRange } from "../lib/question-sweep.ts";

const layouts = [
  ...[200, 280, 320, 375, 650, 780].map((viewport) => ({ viewport, width: viewport * .88, gap: viewport <= 650 ? 14 : 24 })),
  ...[850, 1000, 1280, 1600].map((viewport) => ({ viewport, width: (viewport - 24) / 2.2, gap: 24 })),
];

test("the bright sweep stays visible throughout all six stages at mobile and desktop widths", () => {
  for (const { viewport, width, gap } of layouts) {
    const step = width + gap;
    const base = step * 6;
    for (let index = 0; index < 6; index++) {
      for (let tick = 0; tick <= 1000; tick++) {
        const progress = tick / 1000;
        const scroll = questionSweepScroll(base, index, progress, step, width, viewport);
        const highlight = base + index * step + progress * width - scroll;
        assert.ok(highlight >= 8 && highlight <= viewport - 8,
          `viewport=${viewport}, card=${index + 1}, progress=${progress}, highlight=${highlight}`);
      }
    }
  }
});

test("six-to-one wrap shifts exactly one repeated group, keeping the visible content continuous", () => {
  for (const { viewport, width, gap } of layouts) {
    const step = width + gap;
    const base = step * 6;
    const end = questionSweepScroll(base, 5, 1, step, width, viewport);
    const restart = questionSweepScroll(base, 0, 0, step, width, viewport);
    assert.ok(Math.abs(end - restart - base) < 1e-8);
  }
});

test("manual browsing sweeps only the visible portion of a card, including partially clipped cards", () => {
  for (const { viewport, width, gap } of layouts) {
    const step = width + gap;
    const maxScroll = step * 18 - gap - viewport;
    for (let scroll = 0; scroll <= maxScroll; scroll += 41) {
      let candidates = 0;
      for (let index = 0; index < 18; index++) {
        const left = index * step;
        const range = visibleQuestionSweepRange(left, width, scroll, viewport);
        if (range.end - range.start <= .12) continue;
        candidates++;
        for (const progress of [0, .25, .5, .75, 1]) {
          const highlight = left + (range.start + progress * (range.end - range.start)) * width - scroll;
          assert.ok(highlight >= 8 - 1e-8 && highlight <= viewport - 8 + 1e-8);
        }
      }
      assert.ok(candidates > 0, `No visible sweep at viewport=${viewport}, scroll=${scroll}`);
    }
  }
});
