import Image from 'next/image';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

/**
 * ArchiveProductCard — simplified product card for sold-out archive items.
 *
 * Grayscale image, "SOLD OUT" badge, specs row. No quick-add, no hover swap —
 * these items can't be purchased, they exist to show the brand's history.
 */
export function ArchiveProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-50">
        {/* SOLD OUT badge */}
        <span className="absolute left-3 top-3 z-10 inline-block bg-ink/80 px-2 py-1 text-[10px] font-medium uppercase tracking-widest text-bone-muted backdrop-blur-sm">
          Sold Out
        </span>

        {product.images[0] && (
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
          />
        )}
      </div>

      <div className="mt-4">
        <h3 className="truncate text-sm font-medium uppercase tracking-widest text-bone">
          {product.name}
        </h3>
        <p className="mt-1 truncate text-xs text-bone-muted">{product.tagline}</p>
        <div className="mt-2 flex items-baseline gap-4 text-xs text-bone-dim">
          <span>{formatPrice(product.priceCents)}</span>
          {product.specs.gsm > 0 && <span>{product.specs.gsm} GSM</span>}
          <span>{product.specs.madeIn}</span>
        </div>
      </div>
    </article>
  );
}
