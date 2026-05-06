import { cn } from '@/lib/utils';

/**
 * Badge — product card metadata flags ("NEW", "LOW STOCK", "SOLD OUT", "SALE").
 * Always positioned absolutely over imagery, so it has its own contrast layer.
 */
export type BadgeKind = 'new' | 'lowStock' | 'soldOut' | 'sale';

const kindClasses: Record<BadgeKind, string> = {
  new: 'bg-bone text-ink',
  lowStock: 'bg-oxblood text-bone',
  soldOut: 'bg-ink/80 text-bone-muted backdrop-blur-sm',
  sale: 'bg-bone text-oxblood',
};

const kindLabels: Record<BadgeKind, string> = {
  new: 'New',
  lowStock: 'Low Stock',
  soldOut: 'Sold Out',
  sale: 'Sale',
};

export function Badge({ kind, className }: { kind: BadgeKind; className?: string }) {
  return (
    <span
      className={cn(
        'inline-block px-2 py-1 text-[10px] font-medium uppercase tracking-widest',
        kindClasses[kind],
        className,
      )}
    >
      {kindLabels[kind]}
    </span>
  );
}
