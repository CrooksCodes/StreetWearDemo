import type { Metadata } from 'next';
import { products } from '@/lib/products';
import { ShopGrid } from '@/components/shop/ShopGrid';
import { Container } from '@/components/ui/Container';

/**
 * Shop / collection page.
 *
 * Server-renders the full catalogue and hands it to the client `ShopGrid`,
 * which owns the filter/sort state. Splitting it this way keeps the initial
 * HTML payload SEO-rich (every product card appears in source) while
 * interactivity stays a hydrated layer on top.
 */
export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Shop Vitória — heavyweight hoodies, garment-dyed tees, reverse-weave outerwear. Made in Portugal in limited drops.',
  alternates: { canonical: '/shop' },
};

export default function ShopPage() {
  return (
    <div className="pt-32 md:pt-40">
      <Container width="wide">
        <header className="mb-12 border-b border-bone/10 pb-8 md:mb-16 md:pb-12">
          <p className="text-xs uppercase tracking-widest text-bone-muted">All Pieces</p>
          <h1 className="mt-3 font-display text-display-2 leading-none">Shop</h1>
          <p className="mt-4 max-w-xl text-sm text-bone-muted">
            {products.length} pieces. Garment-dyed. Made in small batches.
          </p>
        </header>

        <ShopGrid products={products} />
      </Container>
    </div>
  );
}
