import Image from 'next/image';
import type { Article } from '@/lib/types';

/**
 * ArticleCard — grid card for non-featured journal articles.
 *
 * 4:3 image, category tag, title, line-clamped excerpt, and metadata row.
 * No link wrapping since the demo only shows the listing concept — no
 * individual article pages.
 */
export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-50">
        <Image
          src={article.heroImage.url}
          alt={article.heroImage.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <span className="text-[10px] font-medium uppercase tracking-widest text-bone-muted">
          {article.category}
        </span>
        <h3 className="font-display text-xl leading-tight md:text-2xl">
          {article.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-bone-muted">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-4 text-xs text-bone-dim">
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('en-CA', {
              month: 'short',
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
