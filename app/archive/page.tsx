import type { Metadata } from 'next';
import { getChapters, getProductsByChapter } from '@/lib/products';
import { ChapterSection } from '@/components/archive/ChapterSection';
import { Container } from '@/components/ui/Container';

/**
 * Archive — curated editorial archive of every past drop.
 *
 * Most stores delete past drops or leave them as empty collection shells.
 * Here, every chapter stays.
 */
export const metadata: Metadata = {
  title: 'Archive',
  description:
    'Every chapter, from the first tee to the last zip-up. Past drops preserved as editorial archive — nothing gets deleted.',
  alternates: { canonical: '/archive' },
};

export default function ArchivePage() {
  const chapters = getChapters();

  return (
    <div className="pt-32 md:pt-40">
      <Container width="wide">
        <header className="mb-8 text-center md:mb-12">
          <p className="text-xs uppercase tracking-widest text-bone-muted">Archive</p>
          <h1 className="mx-auto mt-3 max-w-2xl font-display text-display-2 leading-none">
            Every chapter stays.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-bone-muted">
            We don&apos;t delete past drops. Every piece we&apos;ve made lives here — sold out,
            but not forgotten.
          </p>
        </header>

        <div className="divide-y divide-bone/10">
          {chapters.map((chapter) => {
            const products = getProductsByChapter(chapter.id);
            return (
              <ChapterSection
                key={chapter.id}
                chapter={chapter}
                products={products}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
}
