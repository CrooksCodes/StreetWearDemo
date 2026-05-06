'use client';

import { useMemo, useState } from 'react';
import type { Product, Size, Variant } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { SizeSelector } from './SizeSelector';
import { useCart } from '@/lib/store/cart';

/**
 * ProductDetail — right-column buy box on the PDP.
 *
 * Owns the size/color selection state and the add-to-cart trigger. The mobile
 * "sticky add to cart" bar at the bottom of the viewport is rendered from here
 * so it shares the selection state without prop-drilling through a wrapper.
 */
export function ProductDetail({
  product,
  avgRating,
}: {
  product: Product;
  avgRating: number | null;
}) {
  const addLine = useCart((s) => s.addLine);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.variants[0]?.color ?? '',
  );
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  // Available colors derived from variants — supports multi-color products
  // even though the demo currently has one color per product.
  const colors = useMemo(() => {
    const map = new Map<string, { color: string; hex: string }>();
    for (const v of product.variants) {
      if (!map.has(v.color)) map.set(v.color, { color: v.color, hex: v.colorHex });
    }
    return Array.from(map.values());
  }, [product.variants]);

  // Variants matching the selected color — passed to SizeSelector.
  const variantsForColor = product.variants.filter((v) => v.color === selectedColor);

  const selectedVariant: Variant | undefined = product.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize,
  );

  const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
  const isLowStock = selectedVariant !== undefined && selectedVariant.stock > 0 && selectedVariant.stock <= 3;
  const canAdd = selectedVariant !== undefined && selectedVariant.stock > 0;

  const onAdd = () => {
    if (!selectedVariant || selectedVariant.stock === 0) return;
    addLine(product, selectedVariant, 1);
  };

  return (
    <div className="flex flex-col gap-6 md:sticky md:top-24 md:max-h-[calc(100vh-7rem)] md:self-start md:overflow-y-auto md:pr-1">
      {/* Title + meta */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          {product.isNew && <Badge kind="new" />}
          {totalStock === 0 && <Badge kind="soldOut" />}
        </div>
        <h1 className="mt-3 font-display text-display-3 leading-none">{product.name}</h1>
        <p className="mt-2 text-sm text-bone-muted">{product.tagline}</p>

        {avgRating !== null && (
          <div className="mt-4 flex items-center gap-2">
            <StarRating rating={avgRating} className="text-bone" />
            <span className="text-xs text-bone-muted">
              {avgRating.toFixed(1)} ({product.reviews.length})
            </span>
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-3">
        {product.compareAtCents !== undefined && (
          <span className="text-bone-dim line-through">
            {formatPrice(product.compareAtCents)}
          </span>
        )}
        <span className="font-display text-2xl">{formatPrice(product.priceCents)}</span>
      </div>

      <p className="text-sm leading-relaxed text-bone-muted">{product.description}</p>

      {/* Color selector — swatch row. */}
      {colors.length > 0 && (
        <div>
          <p className="mb-3 text-xs uppercase tracking-widest text-bone-muted">
            Color <span className="text-bone">— {selectedColor}</span>
          </p>
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c.color}
                type="button"
                onClick={() => setSelectedColor(c.color)}
                aria-pressed={selectedColor === c.color}
                aria-label={`Select color ${c.color}`}
                className={`h-8 w-8 rounded-full border-2 transition ${
                  selectedColor === c.color ? 'border-bone' : 'border-transparent hover:border-bone/40'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size selector — modal-linked size guide inside. */}
      <SizeSelector
        variants={variantsForColor}
        selectedSize={selectedSize}
        onSelect={setSelectedSize}
      />

      {isLowStock && (
        <p className="text-xs uppercase tracking-widest text-oxblood-light">
          Only {selectedVariant?.stock} left in {selectedSize}
        </p>
      )}

      <Button onClick={onAdd} disabled={!canAdd} fullWidth size="lg">
        {!selectedSize
          ? 'Select a Size'
          : !canAdd
          ? 'Sold Out'
          : `Add to Cart — ${formatPrice(product.priceCents)}`}
      </Button>

      <ul className="grid grid-cols-3 gap-2 border-y border-bone/10 py-4 text-center text-[10px] uppercase tracking-widest text-bone-muted">
        <li>Free returns</li>
        <li>Secure checkout</li>
        <li>Made in {product.specs.madeIn}</li>
      </ul>

      {/* Sticky mobile CTA — fixed to viewport bottom on small screens only. */}
      <StickyMobileBar
        priceCents={product.priceCents}
        canAdd={canAdd}
        sizeSelected={selectedSize !== null}
        onAdd={onAdd}
      />
    </div>
  );
}

function StickyMobileBar({
  priceCents,
  canAdd,
  sizeSelected,
  onAdd,
}: {
  priceCents: number;
  canAdd: boolean;
  sizeSelected: boolean;
  onAdd: () => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-bone/10 bg-ink/95 px-4 py-3 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-between gap-3">
        <span className="font-display text-lg">{formatPrice(priceCents)}</span>
        <Button onClick={onAdd} disabled={!canAdd} className="flex-1">
          {!sizeSelected ? 'Select Size' : canAdd ? 'Add to Cart' : 'Sold Out'}
        </Button>
      </div>
    </div>
  );
}
