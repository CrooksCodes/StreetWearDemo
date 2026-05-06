'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ProductImage } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * ProductGallery — PDP image gallery with thumbnail nav and click-to-zoom.
 *
 * Zoom is implemented as a mouse-tracking transform on the active image:
 * cheaper than a true lightbox and feels native. On touch, tap the image
 * for a full-screen view (uses the browser's native pinch-zoom in the modal).
 */
export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const active = images[activeIdx];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[80px_1fr]">
      {/* Thumbnails — vertical on desktop, horizontal scroll on mobile. */}
      <div className="order-2 flex gap-2 overflow-x-auto md:order-1 md:flex-col md:overflow-visible">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIdx(i)}
            aria-label={`Show image ${i + 1} of ${images.length}`}
            aria-current={i === activeIdx}
            className={cn(
              'relative aspect-[4/5] w-20 shrink-0 overflow-hidden border-2 transition',
              i === activeIdx ? 'border-bone' : 'border-transparent opacity-60 hover:opacity-100',
            )}
          >
            <Image src={img.url} alt={img.alt} fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      {/* Active image — click toggles zoom. */}
      <div
        className="relative order-1 aspect-[4/5] cursor-zoom-in overflow-hidden bg-ink-50 md:order-2"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoomed(false)}
        onClick={() => setZoomed((z) => !z)}
        role="button"
        tabIndex={0}
        aria-label={zoomed ? 'Click to zoom out' : 'Click to zoom in'}
      >
        {active && (
          <Image
            src={active.url}
            alt={active.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={activeIdx === 0}
            className="object-cover transition-transform duration-300"
            style={{
              transform: zoomed ? 'scale(1.6)' : 'scale(1)',
              transformOrigin: `${pos.x}% ${pos.y}%`,
            }}
          />
        )}
      </div>
    </div>
  );
}
