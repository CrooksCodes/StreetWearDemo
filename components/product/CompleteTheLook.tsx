import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';

/**
 * CompleteTheLook — cross-sell carousel on the PDP.
 *
 * Horizontal scroll on mobile (snap-to), grid on desktop.
 * Uses the same ProductCard as the shop grid for visual consistency.
 */
export function CompleteTheLook({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="cross-sell-heading" className="border-t border-bone/10 py-16">
      <h2 id="cross-sell-heading" className="mb-8 font-display text-3xl">
        Complete the Look
      </h2>

      <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 scrollbar-none">
        {products.map((p) => (
          <div key={p.id} className="w-72 shrink-0 snap-start md:w-auto">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
