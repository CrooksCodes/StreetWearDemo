'use client';

import { useState } from 'react';
import type { Size, Variant } from '@/lib/types';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';

/**
 * SizeSelector — PDP size picker with an inline link to a size guide modal.
 *
 * Sold-out sizes stay visible (struck through) so the buyer knows the size
 * exists but isn't available — better signal than silently omitting them.
 */
export function SizeSelector({
  variants,
  selectedSize,
  onSelect,
}: {
  variants: Variant[];
  selectedSize: Size | null;
  onSelect: (size: Size) => void;
}) {
  const [guideOpen, setGuideOpen] = useState(false);

  // De-duplicate by size — one button per size, even if multiple colors share it.
  const uniqueSizes = Array.from(new Map(variants.map((v) => [v.size, v])).values());

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-bone-muted">
          Size {selectedSize && <span className="text-bone">— {selectedSize}</span>}
        </p>
        <button
          type="button"
          onClick={() => setGuideOpen(true)}
          className="text-xs uppercase tracking-widest text-bone-muted underline underline-offset-4 hover:text-bone"
        >
          Size Guide
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {uniqueSizes.map((v) => {
          const active = v.size === selectedSize;
          const disabled = v.stock === 0;
          return (
            <button
              key={v.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(v.size)}
              aria-pressed={active}
              aria-label={`Size ${v.size}${disabled ? ', sold out' : ''}`}
              className={cn(
                'min-w-[3.5rem] border px-4 py-3 text-xs uppercase tracking-widest transition',
                active
                  ? 'border-bone bg-bone text-ink'
                  : 'border-bone/20 text-bone hover:border-bone',
                disabled && 'cursor-not-allowed text-bone-dim line-through hover:border-bone/20',
              )}
            >
              {v.size}
            </button>
          );
        })}
      </div>

      <SizeGuide open={guideOpen} onClose={() => setGuideOpen(false)} />
    </div>
  );
}

function SizeGuide({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} ariaLabel="Size guide" panelClassName="max-w-3xl">
      <div className="p-8 md:p-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl">Size Guide</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-xs uppercase tracking-widest text-bone-muted hover:text-bone"
          >
            Close
          </button>
        </div>

        <p className="mb-6 text-sm text-bone-muted">
          Measurements taken from a flat garment in centimetres. Pieces are cut oversized;
          if you sit between sizes, take the smaller for a closer fit.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-bone/10 text-xs uppercase tracking-widest text-bone-muted">
              <tr>
                <th className="py-3 pr-4">Size</th>
                <th className="py-3 pr-4">Chest</th>
                <th className="py-3 pr-4">Length</th>
                <th className="py-3 pr-4">Sleeve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bone/10">
              {[
                { size: 'XS', chest: 54, length: 67, sleeve: 60 },
                { size: 'S', chest: 57, length: 69, sleeve: 62 },
                { size: 'M', chest: 60, length: 71, sleeve: 64 },
                { size: 'L', chest: 63, length: 73, sleeve: 66 },
                { size: 'XL', chest: 66, length: 75, sleeve: 68 },
                { size: 'XXL', chest: 69, length: 77, sleeve: 70 },
              ].map((row) => (
                <tr key={row.size}>
                  <td className="py-3 pr-4 text-bone">{row.size}</td>
                  <td className="py-3 pr-4 text-bone-muted">{row.chest} cm</td>
                  <td className="py-3 pr-4 text-bone-muted">{row.length} cm</td>
                  <td className="py-3 pr-4 text-bone-muted">{row.sleeve} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}
