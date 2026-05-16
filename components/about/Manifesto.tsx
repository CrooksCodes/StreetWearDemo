import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';

/**
 * Manifesto — editorial brand-ethos section.
 *
 * The declarative statements are paired with photography in alternating
 * left/right rows so the section reads like a magazine spread rather than
 * a centered wall of display type.
 */
const BLOCKS = [
  {
    image:
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Model in a heavyweight hoodie against a poster-covered wall',
    reverse: false,
    lines: [
      { text: 'We don’t follow seasons.', muted: false },
      { text: 'We don’t restock.', muted: true },
    ],
  },
  {
    image:
      'https://images.unsplash.com/photo-1604520164966-8ca929961ebe?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Editorial side profile of a model in a boxy knit',
    reverse: true,
    lines: [
      { text: 'We make a chapter,', muted: false },
      { text: 'sell it through,', muted: false },
      { text: 'and move on.', muted: false },
    ],
  },
  {
    image:
      'https://images.unsplash.com/photo-1689044611227-3267fabaf76a?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Editorial shot of a model in a souvenir bomber',
    reverse: false,
    lines: [
      { text: 'The pieces you wear today', muted: true },
      { text: 'won’t exist twelve', muted: true },
      { text: 'months from now.', muted: true },
    ],
  },
];

export function Manifesto() {
  return (
    <section aria-labelledby="manifesto-heading" className="py-24 md:py-32">
      <Container width="wide">
        <p className="text-xs uppercase tracking-widest text-bone-muted">Manifesto</p>
        <h2 id="manifesto-heading" className="sr-only">
          Manifesto
        </h2>

        <div className="mt-12 space-y-16 md:mt-20 md:space-y-28">
          {BLOCKS.map((block) => (
            <div
              key={block.image}
              className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16"
            >
              <div
                className={cn(
                  'relative aspect-[4/5] overflow-hidden bg-ink-50',
                  block.reverse && 'md:order-last',
                )}
              >
                <Image
                  src={block.image}
                  alt={block.imageAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="font-display text-display-3 leading-tight">
                {block.lines.map((line) => (
                  <p key={line.text} className={line.muted ? 'text-bone-muted' : undefined}>
                    {line.text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
