import Image from 'next/image';
import type { Article } from '@/lib/types';

/**
 * FeaturedArticle — hero treatment for the journal's top story.
 *
 * Mobile-first: the image and the text are stacked in normal flow, so the
 * display-size title can never overflow a fixed-ratio box. From `md` up it
 * becomes the editorial hero — text overlaid on the image, bottom-left, with
 * a gradient scrim for contrast.
 */
export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <article className="group md:relative">
      {/* Image */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-ink-50 md:aspect-[16/9]">
        <Image
          src={article.heroImage.url}
          alt={article.heroImage.alt}
          fill
          sizes="100vw"
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />

        {/* Scrim — only needed where text overlays the image (md and up). */}
        <div className="absolute inset-0 hidden bg-gradient-to-t from-ink via-ink/50 to-transparent md:block" />

        {/* Category badge */}
        <span className="absolute left-4 top-4 inline-block bg-bone px-2 py-1 text-[10px] font-medium uppercase tracking-widest text-ink md:left-10 md:top-10">
          {article.category}
        </span>
      </div>

      {/* Content — in normal flow below the image on mobile, overlaid on md+. */}
      <div className="mt-5 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:p-10">
        <h2 className="max-w-3xl font-display text-3xl leading-tight md:text-display-2 md:leading-none">
          {article.title}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-bone-muted md:mt-4 md:text-base">
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
