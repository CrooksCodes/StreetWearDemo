# Product

## Register

brand

## Users

Streetwear buyers, late teens through mid-thirties, predominantly male but not exclusively. They follow brand drops, watch release calendars, and treat an in-stock notification as a small adrenaline event. They've bought from Aimé Leon Dore, Fear of God Essentials, Represent, Stüssy, and at least one direct-from-mill knitwear brand from Portugal. They distinguish a 280 GSM tee from a 220 GSM one by feel.

Their context when shopping: scrolling on phone in the evening or weekend morning, often in dark mode by default. They will read every spec — fabric, GSM, made-in country, fit notes — before adding to cart. They do not need to be sold; they need to be respected enough to be given the information.

The job to be done: see what's in the chapter, decide if the construction and proportion match the brand's reputation, and add the right size before it sells through. Speed-to-confidence matters more than speed-to-checkout.

## Product Purpose

The label is a small-batch streetwear label producing heavyweight, garment-dyed pieces in Portugal in limited "chapters" — never restocked. The storefront's job is not to sell as much as possible. It's to communicate that the work is considered, the construction is real, and the volume is limited.

Success looks like: the visitor can tell within 5 seconds of landing that this is a brand operating at a different bar than a default Shopify theme. They feel the same restraint they'd feel walking into a curated retail space — empty walls, oversized type, one piece per spotlight. The site reads as the work of a person, not a marketplace template.

## Brand Personality

Three words: **considered, restrained, masculine** — though "masculine" here means the architectural-Brutalist sense (heavy, monochrome, structural), not the bro-marketing sense.

Voice: declarative, short sentences, confident enough to leave silences. We don't yell about the GSM; we list it. We don't call ourselves "luxury"; the price tag, the materials, and the typography do that work.

Emotional goal: the visitor should feel like they've been let into something. Not invited — *let in*.

## References

Sites and brands the visual and editorial work should aspire to:

- **Aimé Leon Dore** (aimeleondore.com) — editorial calm, oversized type, deeply confident in negative space.
- **Fear of God / Essentials** (fearofgod.com) — restraint as luxury signal.
- **Tekla** (teklafabrics.com) — Scandinavian-quiet product photography, type-forward.
- **Represent** (representclo.com) — for the streetwear silhouette and dark-palette confidence.
- **A.P.C.** (apc-us.com) — minimal nav, fashion-magazine product layouts.
- **Linear's company pages** (linear.app/company) — for typography hierarchy and editorial pace, even though Linear is a SaaS product.

## Anti-references

What this should explicitly NOT look like, and why:

- **Default Shopify themes** (Dawn, Debut, Brooklyn) — the entire reason the label is rebuilding. Generic spacing, default fonts, broken placeholder social links, "Featured collection" headers. This is the bar we're rising above and the visitor will know immediately.
- **Fast-fashion direct-to-consumer sites** (Princess Polly, Fashion Nova, SHEIN) — neon sale banners, urgency timers, three different "Add to Cart" colors competing on one page, popups within seconds of landing.
- **Streetwear hype sites with maximum motion** (some of the louder Hypebeast advertisers) — auto-playing video everywhere, animated gradients, every element vibrating. The label is the opposite end of that spectrum: things hold still on purpose.
- **Bootstrap / Material defaults** — rounded-2xl on everything, drop shadows on every card, blue primary buttons. The genericness of "good enough" UI.

## Strategic Design Principles

1. **Restraint is the brand.** When in doubt, remove. One accent color. One display typeface. One CTA per section. Negative space is a feature, not unused real estate.

2. **Type does the talking.** The display typeface (Archivo, weight 900) carries the streetwear weight. The body sans (Inter) carries information. We use weight, scale, and tracking — not color or icons — to set hierarchy.

3. **Dark is canonical, not optional.** This isn't "with a dark mode toggle." The brand voice is the dark palette. We do not honor `prefers-color-scheme`.

4. **Information is respect.** Show GSM, fabric composition, country of manufacture, fit notes, model height + size worn. The buyer is sophisticated; matching their level is the differentiator.

5. **Editorial photography over product photography.** Cropped, atmospheric, environmental. The bomber on a model in Lisbon, not the bomber on a white-cyc background.

6. **Motion only where it earns its place.** Drawer slide-out: yes. Modal fade: yes. Hover image swap on cards: yes. Auto-playing carousels, scroll-jacking, parallax-on-everything: no. Honor `prefers-reduced-motion`.

7. **Working details are part of the brand.** Real social URLs in the footer. Real `alt` attributes. Real focus rings. Real structured data. The visitor doesn't see these directly, but their absence is what makes a site feel cheap.

## Accessibility & Inclusion

- **WCAG 2.1 AA** as the floor. Off-white-on-near-black achieves AAA on body copy.
- All interactive elements have visible `:focus-visible` rings (2px bone, 2px offset).
- All `<Image>` components carry descriptive `alt` text from the data layer, not duplicated or empty.
- The size selector announces sold-out states to screen readers (`aria-label="Size L, sold out"`), not just visual strikethrough.
- Cart drawer and modals trap focus, are announced as `role="dialog"`, and close on Escape.
- Honor `prefers-reduced-motion` — drawer/modal animations should respect it (currently a known gap; flag during audit).
- Color is never the sole signal. Low-stock warnings combine color (oxblood) with text ("Only 2 left").
