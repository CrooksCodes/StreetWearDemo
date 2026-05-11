import type { Chapter, Product } from '@/lib/types';
import { ArchiveProductCard } from './ArchiveProductCard';

/**
 * ChapterSection — a single chapter in the archive, with its editorial header
 * and a grid of archived products.
 *
 * The oversized chapter numeral is the dominant visual element — it anchors
 * the section the way a chapter number anchors a book page.
 */
export function ChapterSection({
  chapter,
  products,
}: {
  chapter: Chapter;
  products: Product[];
}) {
  const numeral = String(chapter.index).padStart(2, '0');

  return (
    <section aria-labelledby={`chapter-${chapter.id}`} className="py-16 md:py-24">
      <header className="mb-12 md:mb-16">
        <p className="text-xs uppercase tracking-widest text-bone-muted">
          Chapter {numeral}
        </p>
        <h2
          id={`chapter-${chapter.id}`}
          className="mt-3 font-display text-display-3 leading-none"
        >
          {chapter.name}
        </h2>
        <p className="mt-2 text-sm text-bone-dim">{chapter.dateRange}</p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-bone-muted">
          {chapter.description}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ArchiveProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
