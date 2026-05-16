import type { Metadata } from 'next';
import { getActiveProducts } from '@/lib/products';
import { ShopGrid } from '@/components/shop/ShopGrid';
import type { FilterState } from '@/components/shop/ShopFilters';
import type { Category } from '@/lib/types';
import { Container } from '@/components/ui/Container';

/**
 * Shop / collection page.
 *
 * Server-renders the full catalogue and hands it to the client `ShopGrid`,
 * which owns the filter/sort state. Splitting it this way keeps the initial
 * HTML payload SEO-rich (every product card appears in source) while
 * interactivity stays a hydrated layer on top.
 *
 * The page reads `searchParams` so footer / nav links can deep-link into a
 * pre-filtered grid — /shop?category=hoodies, /shop?filter=latest, etc.
 */
export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Shop The Label — heavyweight hoodies, garment-dyed tees, reverse-weave outerwear. Made in Portugal in limited drops.',
  alternates: { canonical: '/shop' },
};

const CATEGORY_LABELS: Record<Category, string> = {
  hoodies: 'Hoodies',
  tees: 'Tees',
  outerwear: 'Outerwear',
  bottoms: 'Bottoms',
  accessories: 'Accessories',
};
const VALID_CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

export default function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string; filter?: string };
}) {
  const activeProducts = getActiveProducts();

  // Seed the grid's filter state from the URL so deep links land filtered.
  const category = VALID_CATEGORIES.find((c) => c === searchParams.category);
  const latestOnly = searchParams.filter === 'latest';

  // Built explicitly (not spread from INITIAL_FILTERS): that const lives in a
  // 'use client' module, so importing its value here would yield a client
  // reference, not the real object.
  const initialFilters: FilterState = {
    categories: category ? [category] : [],
    sizes: [],
    colors: [],
    maxPriceCents: null,
    latestOnly,
  };

  // Heading reflects the entry point — a filtered view shouldn't read "Shop".
  const eyebrow = latestOnly ? 'Just Dropped' : category ? 'Category' : 'All Pieces';
  const heading = latestOnly
    ? 'Latest Drop'
    : category
      ? CATEGORY_LABELS[category]
      : 'Shop';

  return (
    <div className="pt-32 md:pt-40">
      <Container width="wide">
        <header className="mb-12 border-b border-bone/10 pb-8 md:mb-16 md:pb-12">
          <p className="text-xs uppercase tracking-widest text-bone-muted">{eyebrow}</p>
          <h1 className="mt-3 font-display text-display-2 leading-none">{heading}</h1>
          <p className="mt-4 max-w-xl text-sm text-bone-muted">
            Garment-dyed. Made in small batches. Sold in limited chapters.
          </p>
        </header>

        {/* `key` ties the grid instance to the active URL filter. Without it,
            navigating /shop → /shop?category=tees reuses the mounted ShopGrid,
            whose useState ignores the new initialFilters prop — so the grid
            would keep showing the previous (or unfiltered) result. */}
        <ShopGrid
          key={`${category ?? 'all'}-${latestOnly}`}
          products={activeProducts}
          initialFilters={initialFilters}
        />
      </Container>
    </div>
  );
}
