# Vyuk website design system

The site uses an editorial, executive visual language: warm light backgrounds, deep teal ink, and Vyuk orange for emphasis and action. The live values are in `app/design-tokens.css`; this document explains when to use them.

| Role | Token | Use |
| --- | --- | --- |
| Background | `--ds-background` | Header and light canvas |
| Surface | `--ds-surface` / `--ds-surface-raised` | Forms, cards, and raised content |
| Muted surface | `--ds-surface-muted` | Case study and quiet section backgrounds |
| Dark surface | `--ds-ink-surface` | High-contrast sections and dark hero |
| Primary text | `--ds-text` / `--ds-text-inverse` | Light and dark backgrounds |
| Muted text | `--ds-text-muted` / `--ds-text-inverse-muted` | Supporting body copy |
| Accent | `--ds-accent` | Brand mark and visual emphasis |
| Action | `--ds-accent-action` / `--ds-accent-hover` | Buttons with white labels |
| Accent on dark | `--ds-accent-on-ink` | Dark-section links and details |

## Type roles

| Role | Tokens | Current use |
| --- | --- | --- |
| Display | `--ds-display-*` | Hero headlines |
| Headline | `--ds-headline-*` | Section titles |
| Lead | `--ds-lead-*` | Hero supporting copy |
| Body | `--ds-body-*` | Section descriptions and invitation |
| Caption | `--ds-caption-*` | Section eyebrows |
| Label | `--ds-label-size` | Form field labels |

The type scale responds at 900px and 700px. Use the role tokens in new sections rather than copying font values from another selector. Keep paragraphs readable, reserve orange for emphasis, and use the action orange where white text sits on orange.

## Layout and interaction

Use `--ds-max-section`, `--ds-section-space`, and `--ds-gutter` for the main section rhythm. Use `--ds-control-height` and `--ds-control-radius` for new controls. The existing carousel timings and image transition are intentionally separate from the general `--ds-motion-short` interaction token.

The shadcn color variables in `app/design-tokens.css` are aliases to the same design tokens, so future form controls inherit the Vyuk palette.

## Responsive behavior

- The hero has a minimum height and grows when the copy needs more space. Keep slide content visible at intermediate desktop widths and at enlarged browser text sizes.
- At 900px and below, the case study and contact sections stack into one column. At 700px and below, the hero switches to its mobile image and copy layout, and form fields become one column.
- Keep `minmax(0, 1fr)` on grid columns to prevent long content from forcing horizontal scrolling. Use `--ds-gutter` for section edges and check new sections at 320px, 390px, 768px, and 1440px.
- Images should fill their intended space with `object-fit: cover`; keep readable text and calls to action outside image assets so they can reflow.
