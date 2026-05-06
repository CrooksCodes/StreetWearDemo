import { cn } from '@/lib/utils';

/**
 * Marquee — pure CSS infinite scroll using the `animate-marquee` keyframe in
 * tailwind.config.ts. The trick: render the children twice and translate -50%
 * so the wrap is seamless. No JS, no library, no IntersectionObserver needed.
 */
export function Marquee({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden border-y border-bone/10 py-6',
        className,
      )}
    >
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-2xl uppercase tracking-widest text-bone-muted"
          >
            {item}
            <span className="ml-12 text-bone/30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
