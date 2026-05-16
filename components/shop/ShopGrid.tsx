'use client';

import { useMemo, useState } from 'react';
import type { Product, Category, Size } from '@/lib/types';
import { ProductCard } from '@/components/product/ProductCard';
import { ShopFilters, type FilterState, INITIAL_FILTERS } from './ShopFilters';
import { cn } from '@/lib/utils';

/**
 * ShopGrid — owns the filter and sort state for /shop.
 *
 * The page seeds `initialFilters` from the URL (e.g. /shop?category=hoodies
 * or /shop?filter=latest) so footer / nav links land on a pre-filtered grid;
 * after that, all filter changes are client-side. A full URL sync is a
 * one-liner with `nuqs` or `useSearchParams` when the catalogue grows.
 */
export type SortKey = 'newest' | 'priceAsc' | 'priceDesc';

export function ShopGrid({
  products,
  initialFilters = INITIAL_FILTERS,
}: {
  products: Product[];
  initialFilters?: FilterState;
}) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sort, setSort] = useState<SortKey>('newest');
  // Mobile only — filters are collapsed by default so /shop opens straight
  // onto the product grid rather than a full screen of filter controls.
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFilterCount =
    filters.categories.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.maxPriceCents !== null ? 1 : 0) +
    (filters.latestOnly ? 1 : 0);

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
      // Latest-drop filter — driven by the /shop?filter=latest entry point.
      if (filters.latestOnly && !p.isLatestDrop) return false;
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
    <div>
      {/* Mobile-only filter toggle — keeps the product grid at the top of the
          page on phones; the sidebar is always visible from `md` up. */}
      <button
        type="button"
        onClick={() => setFiltersOpen((o) => !o)}
        aria-expanded={filtersOpen}
        className="mb-6 flex w-full items-center justify-between border border-bone/20 px-4 py-3 text-xs uppercase tracking-widest text-bone md:hidden"
      >
        <span>
          Filter{activeFilterCount > 0 && ` (${activeFilterCount})`}
        </span>
        <span aria-hidden="true" className="text-base leading-none">
          {filtersOpen ? '−' : '+'}
        </span>
      </button>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr] md:gap-12">
        <div className={cn('md:block', filtersOpen ? 'block' : 'hidden')}>
          <ShopFilters
            filters={filters}
            onChange={setFilters}
            productCount={filtered.length}
          />
        </div>

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
    </div>
  );
}

// Re-export types used by callers.
export type { Category, Size };
