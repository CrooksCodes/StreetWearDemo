import type { Article } from './types';

/**
 * Mock article catalogue for the Journal.
 *
 * Same pattern as products.ts — static data that becomes Supabase queries
 * when the build goes live. One featured article sits at the top as a
 * full-width hero, the rest fill the grid below.
 */

const heroImg = (id: string, alt: string) => ({
  url: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=85`,
  alt,
});

export const articles: Article[] = [
  {
    id: 'art_001',
    slug: 'why-500-gsm',
    title: 'Why 500 GSM',
    excerpt:
      'Most hoodies are 280–320 GSM. We start at 420 and peak at 500. Here\'s what happens when you double the weight of a French terry — and why it changes how the garment moves, drapes, and ages.',
    category: 'Material',
    heroImage: heroImg('photo-1685328403732-64be6bb9d112', 'Heavyweight French terry hoodie in stone, cropped to the chest and cuffs'),
    readTime: 7,
    publishedAt: '2026-04-15',
    isFeatured: true,
  },
  {
    id: 'art_002',
    slug: 'portugal-factory-diary',
    title: 'Factory Diary: Porto, March 2026',
    excerpt:
      'A week inside the mill that cuts our fabric. Third-generation family operation, 40 employees, zero fast-fashion clients. We walked the floor and documented every step from raw cotton bale to finished bolt.',
    category: 'Process',
    heroImage: heroImg('photo-1561122156-fe23366e47d3', 'Portuguese textile factory interior with fabric rolls'),
    readTime: 9,
    publishedAt: '2026-03-28',
  },
  {
    id: 'art_003',
    slug: 'garment-dyeing-explained',
    title: 'Garment Dyeing, Explained',
    excerpt:
      'Garment dyeing means the piece is sewn first, then dyed as a finished garment. The seams absorb colour differently than the body — which is exactly the point. Every piece becomes one of one.',
    category: 'Material',
    heroImage: heroImg('photo-1587701712213-826b561028f7', 'Garment dyeing vats in textile workshop'),
    readTime: 5,
    publishedAt: '2026-03-10',
  },
  {
    id: 'art_004',
    slug: 'chapters-not-collections',
    title: 'Chapters, Not Collections',
    excerpt:
      'Seasonal collections assume a brand will always exist in the same form. Chapters assume the brand is a story — with a beginning, a middle, and eventually an end. Here\'s why we chose the second model.',
    category: 'Culture',
    heroImage: heroImg('photo-1611075760601-7c8d0bb90b6d', 'Editorial portrait of founder in a heavyweight hoodie'),
    readTime: 6,
    publishedAt: '2026-02-20',
  },
];

export function getFeaturedArticle(): Article {
  return (articles.find((a) => a.isFeatured) ?? articles[0])!;
}

export function getNonFeaturedArticles(): Article[] {
  const featured = getFeaturedArticle();
  return articles.filter((a) => a.id !== featured.id);
}
