'use client';

import { useMemo, useState } from 'react';
import type { Product, Category, Size } from '@/lib/types';
import { ProductCard } from '@/components/product/ProductCard';
import { ShopFilters, type FilterState, INITIAL_FILTERS } from './ShopFilters';

/**
 * ShopGrid — owns the filter and sort state for /shop.
 *
 * State lives at the page level (not in URL/searchParams) for the demo;
 * upgrading to URL-driven filters is a one-liner with `nuqs` or Next's
 * `useSearchParams` when the catalogue grows.
 */
export type SortKey = 'newest' | 'priceAsc' | 'priceDesc';

export function ShopGrid({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sort, setSort] = useState<SortKey>('newest');

  const filtered = useMemo(() => {
    const list = products.filter((p) => {
      // Category filter — empty array == "all".
      if (filters.categories.length > 0 && !filters.categories.includes(p.category)) {
        return false;
      }
      // Size filter — match any variant in any selected size.
      if (filters.sizes.length > 0) {
        const hasSize = p.variants.some((v) => filters.sizes.includes(v.size));
        if (!hasSize) return false;
      }
      // Color filter — case-insensitive match against any variant.
      if (filters.colors.length > 0) {
        const hasColor = p.variants.some((v) =>
          filters.colors.some((c) => v.color.toLowerCase().includes(c.toLowerCase())),
        );
        if (!hasColor) return false;
      }
      // Price filter — checked in cents.
      const priceCents = p.priceCents;
      if (filters.maxPriceCents !== null && priceCents > filters.maxPriceCents) return false;
      return true;
    });

    // Apply sort. "newest" uses isNew flag first, then keeps catalogue order.
    return [...list].sort((a, b) => {
      switch (sort) {
        case 'priceAsc':
          return a.priceCents - b.priceCents;
        case 'priceDesc':
          return b.priceCents - a.priceCents;
        case 'newest':
        default:
          return Number(b.isNew) - Number(a.isNew);
      }
    });
  }, [products, filters, sort]);

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-[240px_1fr]">
      <ShopFilters
        filters={filters}
        onChange={setFilters}
        productCount={filtered.length}
      />

      <div>
        {/* Sort row — sticky to viewport top while scrolling the grid. */}
        <div className="sticky top-20 z-10 mb-6 flex items-center justify-between border-b border-bone/10 bg-ink/85 py-4 backdrop-blur-md">
          <p className="text-xs uppercase tracking-widest text-bone-muted">
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
          </p>
          <label className="flex items-center gap-3 text-xs uppercase tracking-widest">
            <span className="text-bone-muted">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-bone/20 bg-transparent px-3 py-2 text-bone focus:border-bone focus:outline-none"
            >
              <option value="newest" className="bg-ink">Newest</option>
              <option value="priceAsc" className="bg-ink">Price — Low to High</option>
              <option value="priceDesc" className="bg-ink">Price — High to Low</option>
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <p className="py-24 text-center text-sm text-bone-muted">
            No pieces match these filters. Try clearing them.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Re-export types used by callers.
export type { Category, Size };
