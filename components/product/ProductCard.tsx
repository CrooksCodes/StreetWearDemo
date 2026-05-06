'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/store/cart';
import { QuickView } from './QuickView';

/**
 * ProductCard — used in shop grid, latest-drop section, lookbook hotspots.
 *
 * Hover behaviour: image swaps to the second product image (when available).
 * Touch devices won't get the swap (no hover state) which is fine — the
 * image gallery on the PDP is where they'll see all angles.
 *
 * Quick-add: clicks the first in-stock variant. For products with multiple
 * sizes/colors, this opens the QuickView modal to require an explicit choice
 * — adding "M" to cart by default would frustrate the buyer.
 */
export function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const addLine = useCart((s) => s.addLine);

  const primaryImage = product.images[0];
  const hoverImage = product.images[1] ?? primaryImage;

  // Stock-aware UI flags. We compute these once on render so the card's
  // badge logic is centralised here — child components don't re-derive it.
  const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
  const isSoldOut = totalStock === 0;
  const isLowStock = totalStock > 0 && totalStock <= 5;
  const isSingleVariant = product.variants.length === 1;
  const onSale = product.compareAtCents !== undefined;

  const handleQuickAdd = () => {
    // If there's only one variant, add it directly. Otherwise force a choice.
    if (isSingleVariant) {
      const variant = product.variants[0];
      if (variant && variant.stock > 0) {
        addLine(product, variant, 1);
      }
      return;
    }
    setQuickViewOpen(true);
  };

  return (
    <>
      <article
        className="group relative flex flex-col"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Badge stack — top-left over imagery. Stacks if multiple apply. */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
          {product.isNew && !isSoldOut && <Badge kind="new" />}
          {isLowStock && <Badge kind="lowStock" />}
          {isSoldOut && <Badge kind="soldOut" />}
          {onSale && !isSoldOut && <Badge kind="sale" />}
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="relative block aspect-[4/5] overflow-hidden bg-ink-50"
          aria-label={`View ${product.name} — ${product.tagline}`}
        >
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-opacity duration-500"
              style={{ opacity: hovered ? 0 : 1 }}
            />
          )}
          {hoverImage && (
            <Image
              src={hoverImage.url}
              alt={hoverImage.alt}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-opacity duration-500"
              style={{ opacity: hovered ? 1 : 0 }}
            />
          )}

          {/* Quick-add button — appears on hover, sits at the bottom of imagery.
              On touch devices the user goes straight to PDP; on desktop they
              can add without leaving the grid. */}
          <div className="absolute inset-x-3 bottom-3 hidden translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:block">
            <Button
              variant="primary"
              size="sm"
              fullWidth
              disabled={isSoldOut}
              onClick={(e) => {
                // Prevent the parent <Link>'s navigation — quick-add is a
                // separate intent from "view product".
                e.preventDefault();
                e.stopPropagation();
                handleQuickAdd();
              }}
            >
              {isSoldOut ? 'Sold Out' : 'Quick Add'}
            </Button>
          </div>
        </Link>

        <div className="mt-4 flex items-baseline justify-between gap-3">
          <div className="min-w-0">
            {/* Product name is a second-level heading: each card is a section
                under the page's <h1>. Using <h3> here would skip a level and
                break the document outline for screen-reader nav. */}
            <h2 className="truncate text-sm font-medium uppercase tracking-widest text-bone">
              {product.name}
            </h2>
            <p className="mt-1 truncate text-xs text-bone-muted">{product.tagline}</p>
          </div>
          <div className="flex shrink-0 items-baseline gap-2 text-sm">
            {onSale && product.compareAtCents !== undefined && (
              <span className="text-bone-dim line-through">
                {formatPrice(product.compareAtCents)}
              </span>
            )}
            <span className={onSale ? 'text-oxblood-light' : 'text-bone'}>
              {formatPrice(product.priceCents)}
            </span>
          </div>
        </div>
      </article>

      <QuickView product={product} open={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
    </>
  );
}
