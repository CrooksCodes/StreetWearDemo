---
name: The Label
description: Heavyweight, garment-dyed streetwear in limited chapters. Editorial dark-palette storefront.
colors:
  ink: "#0B0908"
  ink-100: "#15120F"
  ink-50: "#1B1816"
  bone: "#F5F2EC"
  bone-muted: "#A8A39B"
  bone-dim: "#807C75"
  oxblood: "#6E1A24"
  oxblood-light: "#8E2330"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.01em"
  display-1:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 12vw, 11rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  display-2:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 8vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body-sm:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.2em"
rounded:
  none: "0px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "64px"
  2xl: "96px"
  3xl: "128px"
components:
  button-primary:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.bone-muted}"
    textColor: "{colors.ink}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-secondary-hover:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
  badge-new:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
  badge-low-stock:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.bone}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
  badge-sold-out:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  card-product:
    backgroundColor: "{colors.ink-50}"
    rounded: "{rounded.none}"
    padding: "0px"
---

## Overview

**Creative North Star — *The Quiet Atelier*.** The site reads like an editorial magazine wrapped around a workshop. Type holds still. Imagery is oversized. Negative space does most of the work. Every interaction feels considered, never demonstrative.

The aesthetic philosophy is restraint as luxury signal. Where a fast-fashion site competes on volume — sale banners, urgency timers, animated everything — the label competes on intentionality. One CTA per section. One accent color. One display typeface. The visitor should feel that someone made this, not that a theme was bought.

The system is **dark by canon**. Near-black `ink` and warm off-white `bone` are not a "dark mode" — they are the brand. We do not flip on `prefers-color-scheme: light`. The single accent, `oxblood`, is held back to a punctuation role: a low-stock warning, a sale-pricing strikethrough, a single text selection highlight. Restraint with the accent is what makes it land when it appears.

What this is not: bright, rounded, pastel, friendly, animated, gradient-heavy, emoji-laced, or geometric-illustrated. Anything that reads as "default tech-startup brand kit" is wrong here.

## Colors

Three families, one accent. Every color is hand-tuned away from sterile defaults — there is no `#000`, no `#fff`, no pure web-safe blue.

### Ink — the canvas

| Token | Hex | Where |
|---|---|---|
| `ink` | `#0B0908` | Page background. Tinted warm toward oxblood (R=11, G=9, B=8) — sub-perceptual chroma, but enough to give the canvas body warmth a true neutral lacks. |
| `ink-100` | `#15120F` | Cart drawer surface, footer surface — one micro-step lighter than `ink`, same warm bias, so the drawer reads as a layer. |
| `ink-50` | `#1B1816` | Card backdrops behind product imagery, modal panel. Two micro-steps up from `ink`, same bias. Frames photography without competing. |

### Bone — the type

| Token | Hex | Where |
|---|---|---|
| `bone` | `#F5F2EC` | Primary text, primary CTA fill, brand wordmark. Warm cream rather than cool white; the warmth is what reads "premium" against ink. |
| `bone-muted` | `#A8A39B` | Secondary text, captions, disabled-but-present text, divider lines at 100% opacity. |
| `bone-dim` | `#807C75` | Tertiary metadata: review timestamps, footer copyright. Sized to clear WCAG AA (4.65:1) against `ink`. |

### Oxblood — the punctuation

| Token | Hex | Where |
|---|---|---|
| `oxblood` | `#6E1A24` | Low-stock badges, in-cart "remove" hover state, text selection highlight. |
| `oxblood-light` | `#8E2330` | Sale-pricing strikethrough, "only N left" warning copy. |

**Rule:** the accent appears on no more than ~3% of any given screen. If you find yourself reaching for it twice in the same section, one of those uses is wrong.

**Contrast pairings (WCAG):**
- `bone` on `ink` — 17.8:1 (AAA, body and large copy alike)
- `bone-muted` on `ink` — 7.6:1 (AAA for body text)
- `bone-dim` on `ink` — 4.65:1 (AA body, AAA large)
- `oxblood` on `bone` — 8.4:1 (AAA)
- `oxblood-light` on `ink` — 4.7:1 (AA — use only at body-or-larger sizes)

## Typography

A two-family system. Hierarchy is set by **scale, weight, and tracking** — never by color shifts within the same role.

### Archivo (display)

A tight, heavy grotesque. Used for the brand wordmark, all section headlines, and product names on the PDP. Display always renders **black (900) and all-caps** — when it appears it should land like a screen print, oversized and confident. The weight *is* the brand's voice.

- **`display-1`** — `clamp(3rem → 8rem)`, weight 900, lh 0.92, tracking -0.03em. Hero headline only. Appears once per page.
- **`display-2`** — `clamp(2.5rem → 6rem)`, weight 900, lh 0.92, tracking -0.03em. Section anchors ("Drop 04", "Editorial", "Sign Up").
- **`display-3`** — `clamp(2rem → 3.5rem)`, weight 900, lh 0.96, tracking -0.02em. Sub-section heads, PDP product name.

### Inter (body)

A neutral, evenly-spaced grotesque. Used for everything that conveys information rather than identity. Body copy carries a base weight of **500** — streetwear UIs read heavier across the board. OpenType features `ss01` and `cv11` are enabled globally for Inter's slightly more humanist character set.

- **`body`** — 1rem (16px), weight 500, lh 1.6. Long-form paragraphs (Story section, product long-descriptions).
- **`body-sm`** — 0.875rem (14px), weight 500, lh 1.55. Captions, secondary descriptive text, accordion content.
- **`label`** — 0.75rem (12px), weight 500, **letter-spacing 0.2em, uppercase**. The signature "wide-tracked label" treatment used for nav links, button copy, badges, section eyebrows. This is a brand cue and should be used consistently — wherever a small caption-sized item needs to feel ceremonial rather than informational, this is the treatment.

### Type rules

- Display is always uppercase and weight 900 — never set a display heading in a lighter weight or sentence case.
- Body copy never goes below 14px. If a label needs to be smaller, it must be `label`-tracked uppercase, not body-cased.
- Never set headlines in the body sans. Never set body in the display serif. The two never trade roles.
- No more than two type sizes in any single component.

## Elevation

The system is **flat by canon**. There are no drop shadows, no elevated cards, no rounded "panels floating on a background." Surface separation is achieved through:

1. **Tonal layering**: `ink` (page) → `ink-50` (card frame) → `ink-100` (drawer/footer). Each step is ~2-3% lightness, just enough to read as a layer.
2. **Hairline rules**: 1px lines at `bone/10` (white at 10% alpha) divide content vertically. Used at section breaks, between accordion items, around the cart drawer header.
3. **Backdrop blur** on overlays only: header on scroll (`bg-ink/85 backdrop-blur-md`), modal scrims, drawer scrim. The blur signals "this layer floats above everything else" without using a shadow.

What we don't do: `box-shadow` on cards, on buttons, on inputs. Glow effects. Glassmorphism beyond the two scrim cases above. If a "shadow" is being used to create separation, the answer is almost always to use a tonal-layer surface or a hairline rule instead.

## Components

### Button — primary, secondary, ghost

All buttons share three traits: **square corners, uppercase label-tracked typography, no shadows**. The variant is communicated by fill, not by shape.

- **Primary** — fill `bone`, text `ink`. Used for the headline CTA on each surface (one per section, ideally one per page-fold).
- **Secondary** — `bone/30` border, transparent fill, `bone` text. Used for "View Lookbook"-class actions that should be visible but yield to the primary.
- **Ghost** — no border, underlined text, `bone` color. Used inline ("Remove", "Continue Shopping" inside an empty-cart state).

Sizing: `sm` 8/16, `md` 12/24, `lg` 16/32 (vertical/horizontal padding). Text is always `label`-tracked uppercase regardless of size.

### Badge — new, low-stock, sold-out, sale

Always positioned absolutely top-left over imagery. Stacked vertically when multiple apply. Text is `label` (12px, 0.2em tracking, uppercase). Dimensions: 4px / 8px padding, no rounding.

- **New** (`bone` on `ink`) — fresh-arrival signal. Suppressed when the variant is sold out.
- **Low Stock** (`oxblood` fill, `bone` text) — total stock ≤ 5.
- **Sold Out** (`ink/80` with backdrop-blur, `bone-muted` text) — overlay treatment so the imagery still reads underneath.
- **Sale** (`bone` fill, `oxblood` text) — present only when `compareAtCents` is set on the product.

### Product card

Shape: 4:5 aspect on the imagery, name + price below in a `body-sm` flex row. Hover behavior: image cross-fades to the second image (500ms ease), and a `Quick Add` primary button slides up from the bottom edge of the imagery. On touch, the hover button is hidden — the user goes to the PDP instead.

Disabled state (sold out): no hover button, "SOLD OUT" badge appears over the imagery, name and price desaturate to `bone-muted`.

### Input — newsletter, filter, search

Bordered (`bone/20`), transparent fill, square corners. The input + adjacent submit button share a single border with a vertical rule between them — the form reads as one object, not two. Placeholder is `bone-dim`. On focus, the border becomes solid `bone`.

### Cart drawer line item

80px square thumbnail (4:5 aspect), product name (`label`), variant detail (`body-sm`, `bone-muted`), price (right-aligned `body-sm`). Quantity stepper is a 3-cell row with hairline borders, `−` / number / `+`. Remove is a `body-sm` underlined "Remove" link, never a trash icon — the label doesn't use icons for verb actions.

### Accordion

PDP-only. Single-item-open at a time. Plus/minus indicator on the right (text characters, not icons). Header is `label`-tracked uppercase 14px, content is `body-sm`. Hairline divider top and bottom of the whole accordion stack, divider between each item.

## Do's and Don'ts

### Do

- **Use Archivo for display, Inter for body. Always.** When a designer reaches for a third typeface, they're solving a problem that should have been solved with weight or scale.
- **Use the `label` treatment (12px, 0.2em tracking, uppercase) for small caption-sized text wherever the text is structural** — nav, badges, button copy, section eyebrows, footer headers. The consistency of this micro-treatment is half the brand voice.
- **Tint every neutral toward warm.** `ink` is `#0A0A0A` not `#000`; `bone` is `#F5F2EC` not `#FFFFFF`. The warmth is a signature.
- **Reserve oxblood for punctuation moments.** When in doubt about whether something should be `oxblood`, the answer is no.
- **Lead with imagery. Pad with whitespace.** Hero is full-bleed. Section-to-section gap is `2xl` (96px) minimum, `3xl` (128px) where the section breaks a thematic chapter.
- **Use hairline rules (`bone/10`) for structure, never shadows.**
- **Honor `prefers-reduced-motion`** in framer-motion variants — drawer/modal animations should set `transition.duration` to 0 when this preference is on. *(Currently a known gap — fix during the audit pass.)*

### Don't

- **No drop shadows.** None. If you're tempted, you need a tonal-layer surface or a hairline rule instead.
- **No `border-radius` above 0.** The brand is square corners. Even on inputs, even on imagery thumbnails, even on buttons. The exception is fully-circular elements (color swatches, hotspot pins) — those are 100%, not "rounded-lg".
- **No body copy below 14px.** Anything smaller must be `label`-tracked uppercase or it's wrong.
- **No exclamation marks in copy. No emoji. No multiple consecutive CTAs ("Shop now! Sign up! Follow!").** One CTA per section.
- **No light-mode toggle, no light-mode-friendly screens, no "we'll figure out light mode later."** Dark is the brand.
- **No icon-only verb buttons.** "Remove" is a word, not a trash can. "Add" is a word, not a plus. The exceptions are the cart trigger (uses the word "Cart"), the close button on modals (uses the word "Close"), and the menu hamburger (still has visible underlying intent — it's the menu, the only interactive element in that corner).
- **No auto-playing video, no scroll-jacking, no animated gradients, no entrance animations on every section.** Motion is expensive; spend it carefully.
- **No icons-as-decoration.** If a checkmark or an arrow is appearing, it must be doing semantic work (e.g. the `→` after "Shop Drop 04" indicating a forward action, the `+/−` in the accordion). Bullet-icon decoration on feature lists is wrong.
