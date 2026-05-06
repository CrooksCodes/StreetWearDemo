'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { QuickView } from '@/components/product/QuickView';
import type { Product } from '@/lib/types';
import { cn, formatPrice } from '@/lib/utils';

/**
 * LookbookSpread — one editorial spread + its shoppable pins.
 *
 * Hotspots are absolute-positioned dots layered over the image. Clicking
 * a pin opens the QuickView modal for that product so the buyer can add
 * to cart without leaving the lookbook flow.
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

  // Resolve each hotspot's product slug to the full product record.
  const pinned = spread.hotspots
    .map((h) => ({
      ...h,
      product: allProducts.find((p) => p.slug === h.productSlug),
    }))
    .filter((h): h is { x: number; y: number; productSlug: string; product: Product } => h.product !== undefined);

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

            {pinned.map((pin) => (
              <button
                key={pin.productSlug}
                type="button"
                onClick={() => setOpenProduct(pin.product)}
                aria-label={`Shop ${pin.product.name}`}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
              >
                {/* Outer pulsing ring — pure CSS, no JS animation */}
                <span className="absolute inset-0 -m-3 animate-ping rounded-full bg-bone/30" aria-hidden="true" />
                {/* Solid pin */}
                <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-bone text-ink ring-2 ring-bone/40 group-hover:bg-bone-muted">
                  <span className="text-[10px] font-medium">+</span>
                </span>

                {/* Tooltip — appears on hover with product name + price */}
                <span className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap bg-ink/95 px-3 py-2 text-xs uppercase tracking-widest opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                  {pin.product.name} — {formatPrice(pin.product.priceCents)}
                </span>
              </button>
            ))}
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
              {pinned.length} {pinned.length === 1 ? 'piece' : 'pieces'} shown
            </p>
            <ul className="mt-3 space-y-1 text-sm text-bone-muted">
              {pinned.map((pin) => (
                <li key={pin.productSlug}>
                  <button
                    type="button"
                    onClick={() => setOpenProduct(pin.product)}
                    className="text-left underline underline-offset-4 hover:text-bone"
                  >
                    {pin.product.name} — {pin.product.tagline}
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
