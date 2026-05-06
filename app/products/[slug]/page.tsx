import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products, getProductBySlug, getRelatedProducts } from '@/lib/products';
import { Container } from '@/components/ui/Container';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductDetail } from '@/components/product/ProductDetail';
import { Reviews } from '@/components/product/Reviews';
import { CompleteTheLook } from '@/components/product/CompleteTheLook';
import { Accordion } from '@/components/ui/Accordion';
import { averageRating } from '@/lib/utils';

/**
 * Product detail page (PDP) — /products/[slug].
 *
 * SEO highlights for the pitch walk-through:
 *   1. `generateMetadata` produces page-specific OG/Twitter tags from product
 *      data (title, description, image). Each PDP becomes its own SERP card.
 *   2. `generateStaticParams` pre-renders every PDP at build time (static
 *      generation) — Lighthouse loves it, the host bill loves it, and crawlers
 *      get hydrated HTML on the first request.
 *   3. Product JSON-LD (schema.org/Product) is rendered inline with offers,
 *      aggregateRating, and individual review schema. This is what powers
 *      Google's rich result rating stars in search.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://projectvitoria.com';

type Params = { slug: string };

// Tells Next.js to pre-render every product slug at build time.
export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Not found' };

  const heroImage = product.images[0]?.url ?? '/og-image.jpg';

  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: 'website',
      title: `${product.name} — ${product.tagline}`,
      description: product.description,
      url: `${SITE_URL}/products/${product.slug}`,
      images: [{ url: heroImage, width: 1200, height: 1500, alt: product.images[0]?.alt ?? product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — ${product.tagline}`,
      description: product.description,
      images: [heroImage],
    },
  };
}

export default function ProductPage({ params }: { params: Params }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.relatedSlugs);
  const avgRating = averageRating(product.reviews.map((r) => r.rating));
  const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);

  // Product JSON-LD — schema.org/Product. Crawlers consume this; users never see it.
  // Including aggregateRating + review schema unlocks rich results (rating stars
  // under the SERP listing) which materially improves CTR.
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map((i) => i.url),
    sku: product.variants[0]?.sku ?? product.id,
    brand: { '@type': 'Brand', name: 'Vitória' },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/products/${product.slug}`,
      priceCurrency: 'CAD',
      price: (product.priceCents / 100).toFixed(2),
      availability: totalStock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    ...(avgRating !== null && product.reviews.length > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: avgRating.toFixed(1),
            reviewCount: product.reviews.length,
          },
          review: product.reviews.map((r) => ({
            '@type': 'Review',
            reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
            author: { '@type': 'Person', name: r.author },
            reviewBody: r.body,
            datePublished: r.createdAt,
          })),
        }
      : {}),
  };

  return (
    <article className="pt-24 md:pt-28">
      <Container width="wide">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <ProductGallery images={product.images} />
          <ProductDetail product={product} avgRating={avgRating} />
        </div>

        <section
          aria-labelledby="details-heading"
          className="mx-auto mt-20 max-w-3xl"
        >
          <h2 id="details-heading" className="sr-only">
            Product details
          </h2>
          <Accordion
            defaultOpenId="description"
            items={[
              {
                id: 'description',
                title: 'Description',
                content: (
                  // max-w-prose caps reading line-length at ~65ch — accordion
                  // sits in max-w-3xl (768px) which renders ~110ch otherwise.
                  <div className="max-w-prose space-y-4">
                    {product.longDescription
                      .split('\n\n')
                      .map((para, i) => <p key={i}>{para}</p>)}
                  </div>
                ),
              },
              {
                id: 'specs',
                title: 'Materials & Fit',
                content: (
                  <dl className="grid grid-cols-1 gap-y-3 sm:grid-cols-[140px_1fr]">
                    {product.specs.gsm > 0 && (
                      <>
                        <dt className="text-bone-dim uppercase tracking-widest text-xs">Weight</dt>
                        <dd>{product.specs.gsm} GSM</dd>
                      </>
                    )}
                    <dt className="text-bone-dim uppercase tracking-widest text-xs">Fabric</dt>
                    <dd>{product.specs.fabric}</dd>
                    <dt className="text-bone-dim uppercase tracking-widest text-xs">Fit</dt>
                    <dd>{product.specs.fit}</dd>
                    <dt className="text-bone-dim uppercase tracking-widest text-xs">Made in</dt>
                    <dd>{product.specs.madeIn}</dd>
                    <dt className="text-bone-dim uppercase tracking-widest text-xs">Model</dt>
                    <dd>{product.specs.modelInfo}</dd>
                    <dt className="text-bone-dim uppercase tracking-widest text-xs">Care</dt>
                    <dd>{product.specs.careInstructions}</dd>
                  </dl>
                ),
              },
              {
                id: 'shipping',
                title: 'Shipping & Returns',
                content: (
                  <div className="space-y-3">
                    <p>
                      Free shipping on orders over $150 CAD within Canada and the US.
                      International orders ship via DHL Express in 3–5 business days.
                    </p>
                    <p>
                      Returns are free within 30 days of delivery, in original condition with
                      tags attached. Drop the prepaid return label into any post box.
                    </p>
                    <p>
                      Final sale items (marked at checkout) are not eligible for return or
                      exchange.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <Reviews reviews={product.reviews} />
        <CompleteTheLook products={related} />
      </Container>

      {/* Product JSON-LD — see top-of-file note. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </article>
  );
}
