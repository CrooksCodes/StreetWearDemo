# The Label: Streetwear Storefront

A demo storefront I built for a made-up streetwear label.

Live: [streetwear-crookscodes.vercel.app](https://streetwear-crookscodes.vercel.app)

Built by [Jeremy Crooks](https://crookscodes.com).

---

## Why I built it

I wanted to show what a custom built store can do compared to a stock Shopify theme. Every page here is built around one brand instead of a general template.

---

## What's here

Every page is hand-built, deployed to Vercel, and styled to fit the brand.

- **13 routes**: Homepage, Shop, Product Detail, Lookbook, Archive, Journal, About, an upcoming drop countdown page, and the support pages (Size Guide, Shipping, FAQ, Contact), plus error and not-found states.
- **A product data model** (`/lib/types.ts` + `/prisma/schema.prisma`). The Prisma schema is ready to go onto Supabase once I move past mock data.
- **A working cart**: slide-out drawer with quantity controls, a free shipping progress bar, a cross-sell carousel in the drawer, and a row of trust badges. It persists across page loads via `localStorage`.
- **SEO** (see the SEO section below).
- **A custom design system** (`tailwind.config.ts`). No shadcn, no UI library. I built every component by hand so I own all the code and the bundle stays small.

---

## Run it locally

Requires Node 18.18+ (tested on Node 20 and 22).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Pages to view

| Route | What it shows |
| --- | --- |
| `/` | Full-bleed hero, latest drop grid (hover image swap and quick-add), editorial scroll, parallax brand story, press marquee, UGC grid, newsletter signup, footer with social links (placeholder URLs). |
| `/shop` | Filterable grid (size, color, category, price), sort dropdown, NEW / LOW STOCK / SOLD OUT badges, quick-view modal from the cards. |
| `/products/heavyweight-hoodie-onyx` | Product page: image gallery with click-to-zoom, sticky mobile add-to-cart, color and size selector with a size guide modal, reviews with verified buyer badges and photos, "Complete the Look" cross-sell, accordion for materials and shipping. |
| `/lookbook` | Magazine style layout with shoppable hotspots. Click any pin in a spread to open quick-view for that piece. |
| `/archive` | Past chapters: sold out pieces grouped by chapter, greyscale until hovered (or scrolled into view on phones). |
| `/journal` | Featured story hero plus an article grid. |
| `/about` | Brand story: hero, manifesto, values, timeline, production and atelier sections. |
| `/drops/drop-05` | Upcoming drop page: countdown timer, teaser gallery, notify-me form, and a demo reveal toggle. |
| `/size-guide`, `/shipping`, `/faq`, `/contact` | Support pages: measurement tables, shipping and returns policy, accordion FAQ, and a contact form. |
| `/sitemap.xml` | Generated from the product catalogue. |
| `/robots.txt` | Generated. |

### Other commands

```bash
npm run typecheck     # strict TypeScript check (zero `any`)
npm run lint          # next/eslint with @typescript-eslint
npm run build         # production build, static product pages prerender at build time
npm run format        # prettier across the codebase
```

---

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 14** (App Router) | Server components by default, file-based routing, built-in image optimization, static generation for product pages. |
| Language | **TypeScript** (strict, `noUncheckedIndexedAccess`) | Fewer runtime surprises. |
| Styling | **Tailwind CSS** | No CSS-in-JS runtime cost, design tokens in `tailwind.config.ts`. |
| Animation | **Framer Motion** | Used sparingly: drawer transitions, modal animations, scroll parallax in the brand story section. |
| State | **Zustand** | One store at `/lib/store/cart.ts` with `localStorage` persistence. No Redux, no providers. |
| Data | **Prisma** + **Supabase** (Postgres) | Schema lives at `/prisma/schema.prisma`. The demo runs on the mock catalogue in `/lib/products.ts` until I wire up the real DB. |
| Hosting | **Vercel** | Deploys on `git push`. |

---

## Project structure

```
app/                          # Next.js App Router
  layout.tsx                  # Sitewide metadata + Organization JSON-LD
  page.tsx                    # Homepage
  globals.css                 # Tailwind layers + design tokens
  sitemap.ts                  # /sitemap.xml, walks the product catalogue
  robots.ts                   # /robots.txt
  error.tsx / not-found.tsx   # Error and 404 states
  shop/page.tsx
  products/[slug]/
    page.tsx                  # Product page, generateStaticParams for prerendering
    not-found.tsx
  lookbook/page.tsx
  archive/page.tsx
  journal/page.tsx
  about/page.tsx
  drops/drop-05/              # Upcoming drop page (layout.tsx carries metadata)
  size-guide/ shipping/ faq/ contact/   # Support pages

components/
  layout/                     # Header, Footer, CartDrawer
  product/                    # ProductCard, QuickView, ProductGallery, etc.
  shop/                       # ShopGrid, ShopFilters
  lookbook/                   # LookbookSpread
  archive/                    # ChapterSection, ArchiveProductCard
  journal/                    # FeaturedArticle, ArticleCard
  about/                      # AboutHero, Manifesto, Values, Timeline, etc.
  drops/                      # CountdownTimer, TeaserGallery, NotifyForm, etc.
  support/                    # ContactForm
  sections/                   # Homepage sections (Hero, LatestDrop, Story, etc.)
  ui/                         # Hand-built primitives (Button, Modal, Accordion, etc.)

lib/
  types.ts                    # Domain types, mirror prisma/schema.prisma
  products.ts                 # Mock catalogue (11 active + 6 archived), swap for DB queries later
  articles.ts                 # Mock journal articles
  drops.ts                    # Upcoming drop data
  store/cart.ts               # Zustand cart store
  utils.ts                    # cn() helper, currency formatting

prisma/
  schema.prisma               # Product, Variant, Review, ProductSpecs, ProductImage
```

---

## SEO

All of this is in the source:

- **Sitewide metadata** (`app/layout.tsx`): Open Graph, Twitter cards, theme color, canonical URLs via `metadataBase`. Page files override `title` and `description` for their own search snippets.
- **Organization JSON-LD**: sitewide structured data that tells crawlers about the brand (it's what feeds Google's brand knowledge panel). Rendered at the bottom of `<body>` in the root layout.
- **Product JSON-LD** (`app/products/[slug]/page.tsx`): full schema.org Product with offers, aggregateRating, and individual reviews. This is what gets rating stars under search listings.
- **`sitemap.ts` and `robots.ts`**: generated automatically. The sitemap walks the product catalogue, so a product added in Supabase later shows up in the sitemap on the next build.
- **`generateStaticParams` on product pages**: every product page is prerendered at build time, so crawlers get full HTML on the first request.
- **Descriptive `alt` text** on every `<Image>`, pulled from the data layer.
- **`next/font`**: Inter and Archivo are self-hosted at build time, so there are no requests to fonts.gstatic.com (zero CLS, faster LCP).

Lighthouse target: 95+ on Performance, Accessibility and SEO.

---

## Wiring up Supabase

To move from mock data to a real backend:

1. Create a Supabase project and put the connection string in `.env.local` as `DATABASE_URL`.
2. Run `npx prisma migrate dev --name init` to apply the schema in `prisma/schema.prisma`.
3. Seed the database with the records in `/lib/products.ts` (run once via a `scripts/seed.ts`).
4. Replace the `products` imports from `@/lib/products` in page files with Prisma queries (`prisma.product.findMany(...)`).
5. The components don't need to change, since `/lib/types.ts` already mirrors the Prisma schema.

`.env.example` has the variables you need.

---

## Before going live

- Swap the Unsplash placeholder URLs in `/lib/products.ts` for real product photos. Each product takes 3 or 4 images.
- Replace the placeholder hero image at the top of `components/sections/Hero.tsx`.
- Update the social links in `components/layout/Footer.tsx` and the Organization `sameAs` array in `app/layout.tsx`.
- Replace the `SITE_URL` default in `app/layout.tsx`, `app/sitemap.ts` and `app/robots.ts` with the live domain (or set `NEXT_PUBLIC_SITE_URL` in env).
