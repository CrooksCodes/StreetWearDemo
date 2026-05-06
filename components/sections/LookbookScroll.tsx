import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

/**
 * LookbookScroll — horizontal-scroll editorial section on the homepage.
 *
 * Built with native CSS scroll-snap (no JS carousel library). Each panel
 * is a 80vw image, snap-aligned. Touch trackpads and phones get the same
 * native momentum scroll the user expects.
 *
 * Image-quality strategy for these placeholders:
 *
 * Unsplash images are served through Imgix, so we use Imgix URL params to
 * force a server-side portrait crop with smart focal-point detection
 * (`crop=faces,entropy` — try faces first, fall back to the most "visually
 * interesting" region). This delivers an image already cropped to 3:4,
 * sharper than letting the browser's `object-cover` guess at the crop.
 *
 *   ?w=1800&h=2400 — 3:4 aspect, sized for ~2x retina headroom on desktop
 *   &fit=crop      — crop to fit instead of letterboxing
 *   &crop=faces,entropy — keep the subject centered
 *   &q=90          — quality, sharp without bloating the file
 *
 * Real product photography (already shot portrait) replaces all of this
 * for the pitch — these are placeholders, not the final treatment.
 */
const UNSPLASH_PORTRAIT = 'auto=format&fit=crop&crop=faces,entropy&w=1800&h=2400&q=90';

const PANELS: Array<{ src: string; alt: string; caption: string }> = [
  {
    src: `https://images.unsplash.com/photo-1591047139829-d91aecb6caea?${UNSPLASH_PORTRAIT}`,
    alt: 'Editorial — onyx mockneck hoodie styled with cargo trouser',
    caption: '01 — Concrete Series',
  },
  {
    src: `https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?${UNSPLASH_PORTRAIT}`,
    alt: 'Editorial — oxblood full-zip shot in monochrome',
    caption: '02 — Oxblood Study',
  },
  {
    src: `https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?${UNSPLASH_PORTRAIT}`,
    alt: 'Editorial — souvenir bomber detail',
    caption: '03 — Reverse Weave',
  },
  {
    src: `https://images.unsplash.com/photo-1614975059251-992f11792b9f?${UNSPLASH_PORTRAIT}`,
    alt: 'Editorial — reflective hoodie under headlights',
    caption: '04 — After Hours',
  },
];

export function LookbookScroll() {
  return (
    <section
      aria-labelledby="lookbook-scroll-heading"
      className="relative py-20 md:py-28"
    >
      <Container width="wide" className="mb-10 flex items-end justify-between">
        <h2 id="lookbook-scroll-heading" className="font-display text-display-2 leading-none">
          Editorial
        </h2>
        <Link
          href="/lookbook"
          className="text-xs uppercase tracking-widest text-bone underline underline-offset-4 hover:text-bone-muted"
        >
          View Lookbook →
        </Link>
      </Container>

      {/* Grid instead of horizontal scroll — every panel is fully visible at
          once on desktop, no scroll affordance to communicate. Mobile keeps
          stacking, tablet pairs, desktop fits all four side-by-side. */}
      <Container width="wide">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {PANELS.map((panel, i) => (
            <article
              key={i}
              className="relative aspect-[3/4] overflow-hidden bg-ink-50"
            >
              <Image
                src={panel.src}
                alt={panel.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                // quality 90 (default 75) — small file-size cost, visibly
                // sharper rendering on these large editorial panels.
                quality={90}
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 font-display text-xl text-bone">
                {panel.caption}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
