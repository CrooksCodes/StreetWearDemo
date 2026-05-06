import type { Metadata } from 'next';
import { products } from '@/lib/products';
import { Container } from '@/components/ui/Container';
import { LookbookSpread } from '@/components/lookbook/LookbookSpread';

/**
 * Lookbook — magazine-style editorial layout with shoppable hotspots.
 *
 * Each spread pairs an oversized image with a list of pinned hotspots.
 * Click a hotspot → opens the QuickView modal for that product.
 */
export const metadata: Metadata = {
  title: 'Lookbook — Spring 2026',
  description:
    'The Vitória Spring 2026 lookbook. Editorial photography of Drop 04 — shop each piece directly from the spread.',
  alternates: { canonical: '/lookbook' },
};

// Imgix-style URL params for a server-cropped 4:5 portrait. Lookbook spreads
// use 4:5 (slightly less tall than the 3:4 of the homepage scroll) because
// they're showcased larger and read more like full editorial pages.
//   crop=faces,entropy keeps the subject centered when there's a face,
//   falling back to the most "interesting" region of the photo.
const UNSPLASH_SPREAD = 'auto=format&fit=crop&crop=faces,entropy&w=2000&h=2500&q=90';

// Hotspots are positioned as percentages (left/top) so they reflow across
// breakpoints without absolute pixel math. Each pin maps to a product slug.
const SPREADS: Array<{
  imageSrc: string;
  imageAlt: string;
  caption: string;
  index: string;
  hotspots: { x: number; y: number; productSlug: string }[];
  reverse?: boolean;
}> = [
  {
    imageSrc: `https://images.unsplash.com/photo-1591047139829-d91aecb6caea?${UNSPLASH_SPREAD}`,
    imageAlt: 'Editorial — onyx mockneck hoodie styled with cargo trouser, concrete background',
    caption: 'I — Concrete Series',
    index: '01',
    hotspots: [
      { x: 50, y: 35, productSlug: 'vitoria-mockneck-hoodie-onyx' },
      { x: 55, y: 75, productSlug: 'vitoria-cargo-pant-stone' },
    ],
  },
  {
    imageSrc: `https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?${UNSPLASH_SPREAD}`,
    imageAlt: 'Editorial — oxblood full-zip hoodie, monochrome studio',
    caption: 'II — Oxblood Study',
    index: '02',
    reverse: true,
    hotspots: [{ x: 50, y: 45, productSlug: 'vitoria-zip-up-oxblood' }],
  },
  {
    imageSrc: `https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?${UNSPLASH_SPREAD}`,
    imageAlt: 'Editorial — souvenir bomber detail',
    caption: 'III — Reverse Weave',
    index: '03',
    hotspots: [{ x: 55, y: 40, productSlug: 'vitoria-bomber-jacket-stone' }],
  },
  {
    imageSrc: `https://images.unsplash.com/photo-1614975059251-992f11792b9f?${UNSPLASH_SPREAD}`,
    imageAlt: 'Editorial — graphite reflective hoodie at night',
    caption: 'IV — After Hours',
    index: '04',
    reverse: true,
    hotspots: [{ x: 48, y: 40, productSlug: 'vitoria-reflective-hoodie-graphite' }],
  },
];

export default function LookbookPage() {
  return (
    <div className="pt-32 md:pt-40">
      <Container width="wide">
        <header className="mx-auto max-w-3xl border-b border-bone/10 pb-12 text-center">
          <p className="text-xs uppercase tracking-widest text-bone-muted">Spring 2026</p>
          <h1 className="mt-4 font-display text-display-2 leading-none">Drop 04 Lookbook</h1>
          {/* Constrain the intro to ~50ch — keeps reading line-length in the
              editorial sweet spot (65-75ch max) even at desktop widths, while
              the parent header stays max-w-3xl so the h1 has room to breathe. */}
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-bone-muted">
            The fourth chapter, photographed in Lisbon over three days in February. Click any
            piece in the spreads below to add it to your cart.
          </p>
        </header>
      </Container>

      <div className="space-y-32 py-24 md:space-y-48 md:py-32">
        {SPREADS.map((spread) => (
          <LookbookSpread
            key={spread.index}
            spread={spread}
            allProducts={products}
          />
        ))}
      </div>
    </div>
  );
}
