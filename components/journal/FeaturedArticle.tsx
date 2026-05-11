import Image from 'next/image';
import type { Article } from '@/lib/types';

/**
 * FeaturedArticle — full-width 16:9 hero for the journal's top story.
 *
 * Gradient overlay ensures the title is always readable regardless of
 * the hero image's luminance. Category badge sits top-left.
 */
export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <article className="group relative aspect-[16/9] w-full overflow-hidden bg-ink-50">
      <Image
        src={article.heroImage.url}
        alt={article.heroImage.alt}
        fill
        sizes="100vw"
        priority
        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
      />

      {/* Gradient overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />

      {/* Category badge */}
      <span className="absolute left-6 top-6 inline-block bg-bone px-2 py-1 text-[10px] font-medium uppercase tracking-widest text-ink md:left-10 md:top-10">
        {article.category}
      </span>

      {/* Content overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
        <h2 className="max-w-3xl font-display text-display-2 leading-none">
          {article.title}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-bone-muted">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs uppercase tracking-widest text-bone-dim">
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('en-CA', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
          <span aria-hidden="true">·</span>
          <span>{article.readTime} min read</span>
        </div>
      </div>
    </article>
  );
}
