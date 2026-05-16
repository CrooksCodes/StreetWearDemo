'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { QuickView } from '@/components/product/QuickView';
import type { Product } from '@/lib/types';
import { cn, formatPrice } from '@/lib/utils';

/**
 * LookbookSpread — one editorial spread + its shoppable pieces.
 *
 * The image is left clean — no markers layered over the photography.
 * Shoppable pieces live in the caption column as prominent buttons; each
 * opens the QuickView modal so the buyer can add to cart without leaving
 * the lookbook flow.
 */
interface SpreadData {
  imageSrc: string;
  imageAlt: string;
  caption: string;
  index: string;
  hotspots: { x: number; y: number; productSlug: string }[];
  reverse?: boolean;
}

export function LookbookSpread({
  spread,
  allProducts,
}: {
  spread: SpreadData;
  allProducts: Product[];
}) {
  const [openProduct, setOpenProduct] = useState<Product | null>(null);

  // Resolve each spread's product slugs to the full product records.
  const pieces = spread.hotspots
    .map((h) => allProducts.find((p) => p.slug === h.productSlug))
    .filter((p): p is Product => p !== undefined);

  return (
    <>
      <Container width="wide">
        <div
          className={cn(
            'grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16',
            spread.reverse && 'md:grid-flow-dense',
          )}
        >
          {/* Image with hotspots */}
          <div
            className={cn(
              'relative aspect-[4/5] overflow-hidden bg-ink-50 md:col-span-8',
              spread.reverse && 'md:col-start-5',
            )}
          >
            <Image
              src={spread.imageSrc}
              alt={spread.imageAlt}
              fill
              sizes="(min-width: 768px) 65vw, 100vw"
              quality={90}
              className="object-cover object-top"
            />
          </div>

          {/* Caption */}
          <div
            className={cn(
              'md:col-span-4',
              spread.reverse && 'md:col-start-1 md:row-start-1',
            )}
          >
            <p className="font-display text-7xl text-bone-dim md:text-8xl">{spread.index}</p>
            <p className="mt-2 font-display text-2xl">{spread.caption}</p>
            <p className="mt-6 text-xs uppercase tracking-widest text-bone-muted">
              Shop the look — {pieces.length} {pieces.length === 1 ? 'piece' : 'pieces'}
            </p>
            <ul className="mt-4 space-y-3">
              {pieces.map((product) => (
                <li key={product.slug}>
                  <button
                    type="button"
                    onClick={() => setOpenProduct(product)}
                    aria-label={`Shop ${product.name}`}
                    className="group flex w-full items-center justify-between gap-4 border border-bone/20 px-5 py-4 text-left transition-colors hover:border-bone hover:bg-bone hover:text-ink"
                  >
                    <span>
                      <span className="block text-sm font-medium uppercase tracking-widest">
                        {product.name}
                      </span>
                      <span className="mt-1 block text-xs text-bone-muted group-hover:text-ink/70">
                        {product.tagline}
                      </span>
                    </span>
                    <span className="flex items-center gap-3 whitespace-nowrap text-xs uppercase tracking-widest">
                      {formatPrice(product.priceCents)}
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {openProduct && (
        <QuickView
          product={openProduct}
          open={openProduct !== null}
          onClose={() => setOpenProduct(null)}
        />
      )}
    </>
  );
}
