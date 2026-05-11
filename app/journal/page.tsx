import type { Metadata } from 'next';
import { getFeaturedArticle, getNonFeaturedArticles } from '@/lib/articles';
import { FeaturedArticle } from '@/components/journal/FeaturedArticle';
import { ArticleCard } from '@/components/journal/ArticleCard';
import { Container } from '@/components/ui/Container';

/**
 * Journal — editorial content hub.
 *
 * Counters audit finding #6: the current Shopify site has no blog, no content
 * engine, and /blog returns a 404. This page demonstrates magazine-quality
 * editorial layout vs Shopify's generic blog template.
 */
export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Stories behind the fabric, the factory, and the philosophy. The Vitória Journal — materials, process, and culture.',
  alternates: { canonical: '/journal' },
};

export default function JournalPage() {
  const featured = getFeaturedArticle();
  const rest = getNonFeaturedArticles();

  return (
    <div className="pt-32 md:pt-40">
      <Container width="wide">
        <header className="mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-widest text-bone-muted">Stories</p>
          <h1 className="mt-3 font-display text-display-2 leading-none">Journal</h1>
        </header>

        <FeaturedArticle article={featured} />

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 md:mt-24">
          {rest.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </Container>
    </div>
  );
}
