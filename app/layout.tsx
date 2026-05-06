/* -----------------------------------------------------------------------------
 * Root layout — Project Vitória.
 *
 * SEO architecture (walk-through for the pitch):
 *
 * 1. `metadata` export below sets sitewide defaults (title, description, OG/Twitter
 *    cards, canonical URL via metadataBase). Every individual page file overrides
 *    `title` and `description` for page-specific SEO. Title.template gives us
 *    consistent suffixes ("Mockneck Hoodie | Vitória").
 *
 * 2. Organization JSON-LD is rendered inline at the bottom of <body> on every
 *    page. This is the structured-data signal Google uses to build the brand
 *    knowledge panel — not optional for a serious storefront.
 *
 * 3. Product JSON-LD is rendered separately on /products/[slug] (with offers,
 *    aggregateRating, review schema) — see app/products/[slug]/page.tsx.
 *
 * 4. /app/sitemap.ts and /app/robots.ts are auto-served by Next at /sitemap.xml
 *    and /robots.txt — sitemap walks the product catalogue programmatically.
 *
 * 5. All <Image /> usage takes a descriptive `alt` from the data layer.
 *    `next/image` handles lazy-loading, srcset, and AVIF/WebP encoding.
 *
 * Result target: Lighthouse 95+ on SEO, accessibility, and performance.
 * ---------------------------------------------------------------------------*/

import type { Metadata, Viewport } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';

// next/font self-hosts the font files at build time — zero round-trips to
// fonts.gstatic.com at runtime, no CLS from late-arriving glyphs.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['SOFT', 'WONK'],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://projectvitoria.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Vitória — Heavyweight Streetwear',
    template: '%s | Vitória',
  },
  description:
    'Vitória crafts heavyweight, garment-dyed streetwear in limited drops. Shop mockneck hoodies, reflective fleeces, and 280 GSM heavyweight tees made in Portugal.',
  keywords: [
    'streetwear',
    'heavyweight hoodie',
    'mockneck hoodie',
    'reflective hoodie',
    'made in Portugal',
    'Vitória',
  ],
  authors: [{ name: 'Vitória' }],
  creator: 'Vitória',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: SITE_URL,
    siteName: 'Vitória',
    title: 'Vitória — Heavyweight Streetwear',
    description:
      'Heavyweight, garment-dyed streetwear in limited drops. Made in Portugal.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vitória — heavyweight streetwear lookbook',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vitória — Heavyweight Streetwear',
    description: 'Heavyweight, garment-dyed streetwear. Made in Portugal.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
};

// Organization-level JSON-LD. Lives at /, but renders sitewide so every page
// reinforces the brand knowledge graph signal. When the client provides real
// social URLs, drop them into `sameAs` below.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vitória',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description:
    'Heavyweight, garment-dyed streetwear made in Portugal. Limited drops.',
  sameAs: [
    'https://www.instagram.com/projectvitoria',
    'https://www.tiktok.com/@projectvitoria',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-ink font-sans text-bone antialiased">
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CartDrawer />

        {/* Organization JSON-LD — rendered as application/ld+json so crawlers
            consume it but it stays out of the user-visible DOM. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
