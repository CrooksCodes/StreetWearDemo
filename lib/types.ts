/**
 * Domain types for the clothing brand demo.
 *
 * These types describe the storefront's data model. They mirror the Prisma schema
 * in /prisma/schema.prisma — when we wire the demo to Supabase, these stay
 * largely as-is and become the API surface between server actions and components.
 */

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type Category = 'hoodies' | 'tees' | 'outerwear' | 'bottoms' | 'accessories';

/**
 * A single SKU — a specific size/color combination of a product.
 * Stock is per-variant because that's how real inventory works.
 */
export interface Variant {
  id: string;
  size: Size;
  color: string;
  /** Hex code for the swatch — keeps the Variant type self-contained for renderers. */
  colorHex: string;
  /** Units available. 0 = sold out, ≤ 3 = "low stock" badge. */
  stock: number;
  sku: string;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  /** ISO 8601 — keeps it serializable across the server/client boundary. */
  createdAt: string;
  /** Optional uploaded review photo URL. */
  photoUrl?: string;
  verifiedBuyer: boolean;
}

export interface ProductSpecs {
  /** Grams per square meter — heavyweight streetwear lives or dies on this number. */
  gsm: number;
  fabric: string;
  fit: string;
  /** Country of manufacture — buyers in this segment care. */
  madeIn: string;
  modelInfo: string;
  careInstructions: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Subtitle/tagline shown under the name on PDP. */
  tagline: string;
  /** Price in CAD cents — money in cents avoids float math. */
  priceCents: number;
  /** Optional MSRP in cents to render strikethrough pricing. */
  compareAtCents?: number;
  category: Category;
  description: string;
  /** Long-form copy for the PDP description tab — supports double-line-break paragraphs. */
  longDescription: string;
  images: ProductImage[];
  variants: Variant[];
  specs: ProductSpecs;
  reviews: Review[];
  /** Marks the item as part of the current "drop" — homepage featured grid pulls these. */
  isLatestDrop: boolean;
  /** Newly released — drives the "NEW" badge. */
  isNew: boolean;
  /** Cross-sell — slugs of products to show in "Complete the look". */
  relatedSlugs: string[];
  /** Chapter ID this product belongs to — used by the archive. */
  chapter?: string;
  /** True for sold-out past-drop items shown only in the archive, not the shop. */
  isArchived?: boolean;
}

/**
 * A "chapter" is the label's term for a seasonal drop.
 * Each chapter is a curated set of products with its own editorial identity.
 */
export interface Chapter {
  id: string;
  index: number;
  name: string;
  dateRange: string;
  description: string;
}

/**
 * Journal article categories — maps to editorial content pillars.
 */
export type ArticleCategory = 'Process' | 'Culture' | 'Material' | 'Design';

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  heroImage: ProductImage;
  readTime: number;
  publishedAt: string;
  isFeatured?: boolean;
}

/**
 * Upcoming drop data for countdown/reveal mechanic.
 */
export interface UpcomingDrop {
  id: string;
  name: string;
  tagline: string;
  dropDate: string;
  teaserImages: ProductImage[];
  teaserCopy: string;
}

/**
 * Cart line item — a chosen variant of a product, with quantity.
 * The full Product is embedded so the cart drawer can render without
 * a second DB lookup; in production this is fine because the cart
 * lives client-side until checkout.
 */
export interface CartLine {
  /** Stable id so React lists don't reorder when quantities change. */
  lineId: string;
  product: Product;
  variant: Variant;
  quantity: number;
}
