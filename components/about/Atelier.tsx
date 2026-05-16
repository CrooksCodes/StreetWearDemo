import Image from 'next/image';
import { Container } from '@/components/ui/Container';

/**
 * Atelier — three-up editorial image strip.
 *
 * Breaks up the text-heavy About page with process photography:
 * fabric, stitch, and finishing detail from the Porto mill.
 */
const SHOTS = [
  {
    src: 'https://images.unsplash.com/photo-1624353656309-8be1a6c457be?auto=format&fit=crop&w=1200&q=85',
    alt: 'Raw French terry on the cutting table before sewing',
    caption: 'The cloth',
  },
  {
    src: 'https://images.unsplash.com/photo-1547069553-12f23c839aaa?auto=format&fit=crop&w=1200&q=85',
    alt: 'Double-needle lockstitch detail under the machine',
    caption: 'The stitch',
  },
  {
    src: 'https://images.unsplash.com/photo-1594035795072-3fcd236b7d83?auto=format&fit=crop&w=1200&q=85',
    alt: 'Finished knit weave, close-up after the garment dye',
    caption: 'The finish',
  },
] as const;

export function Atelier() {
  return (
    <section aria-labelledby="atelier-heading" className="py-24 md:py-32">
      <Container width="wide">
        <header className="mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-widest text-bone-muted">Inside the Atelier</p>
          <h2
            id="atelier-heading"
            className="mt-3 font-display text-display-3 leading-tight"
          >
            Fabric, stitch, finish.
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
          {SHOTS.map((shot) => (
            <figure key={shot.src}>
              <div className="relative aspect-[3/4] overflow-hidden bg-ink-50">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <figcaption className="mt-3 text-xs uppercase tracking-widest text-bone-muted">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
