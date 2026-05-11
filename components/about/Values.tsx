import Link from 'next/link';
import { Container } from '@/components/ui/Container';

/**
 * Values — 3-column grid of brand pillars with a shop CTA.
 *
 * "Limited by Design", "Built to Last", "Made by Hand" — these
 * are the value props that differentiate from mall-brand streetwear.
 */
const PILLARS = [
  {
    title: 'Limited by Design',
    body: 'We make a chapter, sell it through, and move on. No restocks, no overproduction, no clearance rack. When it\'s gone, it\'s gone.',
  },
  {
    title: 'Built to Last',
    body: '500 GSM French terry, YKK Excella zippers, double-needle lockstitch. Every material decision is made for the decade, not the season.',
  },
  {
    title: 'Made by Hand',
    body: 'Cut and sewn in a family-run mill outside Porto. Garment-dyed after sewing so every piece absorbs colour differently — one of one by nature.',
  },
] as const;

export function Values() {
  return (
    <section aria-labelledby="values-heading" className="border-t border-bone/10 py-24 md:py-32">
      <Container width="wide">
        <header className="mb-16 text-center">
          <p className="text-xs uppercase tracking-widest text-bone-muted">Values</p>
          <h2 id="values-heading" className="mt-3 font-display text-display-3 leading-none">
            What we stand on
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="text-center">
              <h3 className="text-sm font-medium uppercase tracking-widest text-bone">
                {pillar.title}
              </h3>
              <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-bone-muted">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-bone px-8 py-4 text-xs uppercase tracking-widest text-ink transition-colors hover:bg-bone-muted"
          >
            Shop Current Chapter
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
