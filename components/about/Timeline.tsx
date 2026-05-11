'use client';

import { Container } from '@/components/ui/Container';
import { getChapters } from '@/lib/products';
import { cn } from '@/lib/utils';

/**
 * Timeline — vertical chapter timeline with a hairline spine.
 *
 * The current chapter gets an oxblood dot, past chapters get bone-dim dots.
 * Chapter 04 (the current drop) is hardcoded as current since the demo
 * is built around the Drop 04 narrative.
 */
const TIMELINE_CHAPTERS = [
  ...getChapters().map((ch) => ({
    index: ch.index,
    name: ch.name,
    dateRange: ch.dateRange,
    description: ch.description,
    isCurrent: false,
  })),
  {
    index: 4,
    name: 'Drop 04 — Spring 2026',
    dateRange: 'Spring 2026',
    description:
      'The current chapter. Heavyweight knits, garment-dyed in Portugal. Limited quantities, no restock.',
    isCurrent: true,
  },
];

export function Timeline() {
  return (
    <section aria-labelledby="timeline-heading" className="py-24 md:py-32">
      <Container width="default">
        <header className="mb-16 text-center">
          <p className="text-xs uppercase tracking-widest text-bone-muted">Timeline</p>
          <h2 id="timeline-heading" className="mt-3 font-display text-display-3 leading-none">
            Four chapters and counting
          </h2>
        </header>

        <div className="relative mx-auto max-w-2xl">
          {/* Vertical spine */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-bone/10 md:left-1/2 md:-translate-x-px" />

          <div className="space-y-16">
            {TIMELINE_CHAPTERS.map((ch) => {
              const numeral = String(ch.index).padStart(2, '0');
              return (
                <div key={ch.index} className="relative pl-12 md:pl-0">
                  {/* Dot on the spine */}
                  <div
                    className={cn(
                      'absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2 md:left-1/2 md:-translate-x-1.5',
                      ch.isCurrent
                        ? 'border-oxblood bg-oxblood'
                        : 'border-bone-dim bg-ink',
                    )}
                  />

                  <div className="md:grid md:grid-cols-2 md:gap-16">
                    {/* Left side: numeral + date */}
                    <div className="md:text-right">
                      <span className="font-display text-4xl text-bone-dim">
                        {numeral}
                      </span>
                      <p className="mt-1 text-xs uppercase tracking-widest text-bone-dim">
                        {ch.dateRange}
                      </p>
                    </div>

                    {/* Right side: name + description */}
                    <div className="mt-2 md:mt-0">
                      <h3
                        className={cn(
                          'text-sm font-medium uppercase tracking-widest',
                          ch.isCurrent ? 'text-bone' : 'text-bone-muted',
                        )}
                      >
                        {ch.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-bone-muted">
                        {ch.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
