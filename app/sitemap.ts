import type { MetadataRoute } from 'next';
import { products } from '@/lib/products';

/**
 * Auto-generated sitemap served at /sitemap.xml.
 *
 * Walks the product catalogue programmatically — when products are added in
 * Supabase, the sitemap regenerates on the next build with no manual upkeep.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://projectvitoria.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/shop`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/lookbook`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/archive`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/journal`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/drops/drop-05`, lastModified, changeFrequency: 'daily', priority: 0.8 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
