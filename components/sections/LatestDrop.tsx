import Link from 'next/link';
import { getLatestDrop } from '@/lib/products';
import { Container } from '@/components/ui/Container';
import { ProductCard } from '@/components/product/ProductCard';
import { Reveal } from '@/components/ui/Reveal';

/**
 * LatestDrop — featured product grid for homepage.
 *
 * Server component. Renders product cards (which themselves contain client
 * "use client" boundaries for hover and quick-add). This split lets us keep
 * server-rendered HTML for SEO and only ship the JS necessary for interaction.
 */
export function LatestDrop() {
  const drop = getLatestDrop();

  return (
    <section aria-labelledby="latest-drop-heading" className="py-24 md:py-32">
      <Container width="wide">
        <Reveal>
          <header className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-widest text-bone-muted">
                The Latest
              </p>
              <h2
                id="latest-drop-heading"
                className="mt-2 font-display text-display-2 leading-none"
              >
                Drop 04
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-widest text-bone underline underline-offset-4 hover:text-bone-muted"
            >
              Shop all →
            </Link>
          </header>
        </Reveal>

        {/* Each card fades up just behind the one before it — the grid resolves
            row by row as it scrolls in, rather than snapping all at once. */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6">
          {drop.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.07}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
