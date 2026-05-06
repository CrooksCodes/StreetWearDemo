'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import type { Product, Size, Variant } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/store/cart';

/**
 * QuickView — a compact PDP shown in a modal. Triggered from product cards
 * when the user wants to add to cart without leaving the listing page.
 *
 * Intentionally not a "full PDP minus features": only essentials live here
 * (image, name, size selector, add-to-cart, link to full PDP for everything
 * else). Buyers stay in flow; full detail is one click away.
 */
export function QuickView({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const addLine = useCart((s) => s.addLine);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Available sizes derived from variants — a size with stock 0 stays in the
  // selector but renders as disabled. Better UX than hiding the option.
  const sizes = useMemo(
    () =>
      Array.from(new Map(product.variants.map((v) => [v.size, v])).values()),
    [product.variants],
  );

  const selectedVariant: Variant | undefined = sizes.find((v) => v.size === selectedSize);
  const canAdd = selectedVariant !== undefined && selectedVariant.stock > 0;

  const handleAdd = () => {
    if (!selectedVariant || selectedVariant.stock === 0) return;
    addLine(product, selectedVariant, 1);
    onClose();
  };

  const heroImage = product.images[activeImageIdx] ?? product.images[0];

  return (
    <Modal open={open} onClose={onClose} ariaLabel={`Quick view: ${product.name}`} panelClassName="max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Image side */}
        <div className="relative aspect-[4/5] bg-ink">
          {heroImage && (
            <Image
              src={heroImage.url}
              alt={heroImage.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          )}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImageIdx(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`h-1.5 w-1.5 rounded-full transition ${
                    i === activeImageIdx ? 'bg-bone' : 'bg-bone/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Detail side */}
        <div className="flex flex-col gap-6 p-6 md:p-10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quick view"
            className="self-end text-xs uppercase tracking-widest text-bone-muted hover:text-bone"
          >
            Close
          </button>

          <div>
            <h2 className="font-display text-3xl text-bone">{product.name}</h2>
            <p className="mt-1 text-sm text-bone-muted">{product.tagline}</p>
            <p className="mt-4 text-lg text-bone">{formatPrice(product.priceCents)}</p>
          </div>

          <p className="text-sm leading-relaxed text-bone-muted">{product.description}</p>

          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-bone-muted">Size</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((v) => {
                const active = v.size === selectedSize;
                const disabled = v.stock === 0;
                return (
                  <button
                    key={v.id}
                    type="button"
                    disabled={disabled}
                    onClick={() => setSelectedSize(v.size)}
                    aria-pressed={active}
                    className={`min-w-[3rem] border px-3 py-2 text-xs uppercase tracking-widest transition ${
                      active
                        ? 'border-bone bg-bone text-ink'
                        : 'border-bone/20 text-bone hover:border-bone'
                    } ${disabled ? 'cursor-not-allowed text-bone-dim line-through hover:border-bone/20' : ''}`}
                  >
                    {v.size}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <Button onClick={handleAdd} disabled={!canAdd} fullWidth>
              {canAdd ? 'Add to Cart' : selectedSize ? 'Sold Out' : 'Select a Size'}
            </Button>
            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="text-center text-xs uppercase tracking-widest text-bone-muted underline underline-offset-4 hover:text-bone"
            >
              View Full Details
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
