# The Label — Streetwear Storefront

A personal project: a properly engineered e-commerce storefront for a fictional heavyweight streetwear label.

Built by [Jeremy Crooks](https://jeremycrooks.ca).

---

## What's here

This isn't a template. Every page is hand-built, deployed to Vercel, and styled to the brand's positioning. Every page is shippable.

What's already in the box:

- **13 fully composed routes**: Homepage, Shop, Product Detail, Lookbook, Archive, Journal, About, an upcoming-drop countdown page, and the support set (Size Guide, Shipping, FAQ, Contact), plus error and not-found states.
- **A real product data model** (`/lib/types.ts` + `/prisma/schema.prisma`) — the Prisma schema is ready to drop onto Supabase the moment we move past mock data.
- **A working cart**: slide-out drawer with line-item quantity controls, a free-shipping progress bar, an in-drawer cross-sell carousel, and a row of trust badges. Persists across page loads via `localStorage`.
- **Production-grade SEO** (see "SEO" section below).
- **A custom design system** (`tailwind.config.ts`) — no shadcn, no UI library. Every component is hand-built so the code is fully owned and the bundle stays small.

---

## Run it locally

Requires Node 18.18+ (tested on Node 20, 22).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Pages to view

| Route | What it demonstrates |
| --- | --- |
| `/` | Full-bleed hero, latest-drop featured grid (with hover image swap and quick-add), editorial scroll, parallax brand story, press marquee, UGC grid, newsletter capture, footer with social links (placeholder URLs). |
| `/shop` | Filterable collection grid (size, color, category, price), sort dropdown, NEW / LOW STOCK / SOLD OUT badges, quick-view modal triggered from cards. |
| `/products/heavyweight-hoodie-onyx` | PDP — image gallery with click-to-zoom, sticky mobile add-to-cart, color/size selector with size-guide modal, review section with verified-buyer badges and photos, "Complete the Look" cross-sell, accordion for materials/shipping. |
| `/lookbook` | Magazine-style editorial layout. Shoppable hotspots — click any pin in a spread to open quick-view for that piece. |
| `/archive` | Past chapters — sold-out pieces grouped by chapter, greyscale until hovered (or scrolled into view on phones). |
| `/journal` | Editorial hub — featured story hero plus an article grid. |
| `/about` | Brand story — hero, manifesto, values, timeline, production and atelier sections. |
| `/drops/drop-05` | Upcoming-drop page — countdown timer, teaser gallery, notify-me form, and a demo reveal toggle. |
| `/size-guide`, `/shipping`, `/faq`, `/contact` | Support pages — measurement tables, shipping/returns policy, accordion FAQ, and a contact form. |
| `/sitemap.xml` | Auto-generated from the product catalogue. |
| `/robots.txt` | Auto-generated. |

### Other commands

```bash
npm run typecheck     # strict TypeScript check (zero `any`)
npm run lint          # next/eslint with @typescript-eslint
npm run build         # production build — try this; static product pages prerender at build time
npm run format        # prettier across the codebase
```

---

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 14** (App Router) | Server components by default, file-based routing, built-in image optimization, automatic static generation for product pages. |
| Language | **TypeScript** (strict, `noUncheckedIndexedAccess`) | Fewer runtime surprises. |
| Styling | **Tailwind CSS** | Direct, no CSS-in-JS runtime cost, design tokens in `tailwind.config.ts`. |
| Animation | **Framer Motion** | Used sparingly — drawer transitions, modal animations, scroll-triggered parallax in the brand story section. |
| State | **Zustand** | Single store at `/lib/store/cart.ts` with `localStorage` persistence. No Redux, no providers. |
| Data | **Prisma** + **Supabase** (Postgres) | Schema lives at `/prisma/schema.prisma`. Demo runs on the mock catalogue in `/lib/products.ts` until we wire up the real DB. |
| Hosting | **Vercel** | Deploy on `git push`. |

---

## Project structure

```
app/                          # Next.js App Router
  layout.tsx                  # Sitewide metadata + Organization JSON-LD
  page.tsx                    # Homepage
  globals.css                 # Tailwind layers + design tokens
  sitemap.ts                  # /sitemap.xml — walks the product catalogue
  robots.ts                   # /robots.txt
  error.tsx / not-found.tsx   # Error and 404 states
  shop/page.tsx
  products/[slug]/
    page.tsx                  # PDP — generateStaticParams for prerendering
    not-found.tsx
  lookbook/page.tsx
  archive/page.tsx
  journal/page.tsx
  about/page.tsx
  drops/drop-05/              # Upcoming-drop page (layout.tsx carries metadata)
  size-guide/ shipping/ faq/ contact/   # Support pages

components/
  layout/                     # Header, Footer, CartDrawer
  product/                    # ProductCard, QuickView, ProductGallery, etc.
  shop/                       # ShopGrid, ShopFilters
  lookbook/                   # LookbookSpread
  archive/                    # ChapterSection, ArchiveProductCard
  journal/                    # FeaturedArticle, ArticleCard
  about/                      # AboutHero, Manifesto, Values, Timeline, …
  drops/                      # CountdownTimer, TeaserGallery, NotifyForm, …
  support/                    # ContactForm
  sections/                   # Homepage sections (Hero, LatestDrop, Story, …)
  ui/                         # Hand-built primitives (Button, Modal, Accordion, …)

lib/
  types.ts                    # Domain types — mirror prisma/schema.prisma
  products.ts                 # Mock catalogue (11 active + 6 archived) — replace with DB queries
  articles.ts                 # Mock journal articles
  drops.ts                    # Upcoming-drop data
  store/cart.ts               # Zustand cart store
  utils.ts                    # cn() helper, currency formatting

prisma/
  schema.prisma               # Product, Variant, Review, ProductSpecs, ProductImage
```

---

## SEO

Each item below is verifiable in the source:

- **Sitewide metadata** (`app/layout.tsx`) — Open Graph, Twitter cards, theme color, canonical URLs via `metadataBase`. Page-level files override `title`/`description` for page-specific SERP snippets.
- **Organization JSON-LD** — sitewide structured data signals the brand to crawlers (powers Google's brand knowledge panel). Rendered at the bottom of `<body>` in the root layout.
- **Product JSON-LD** (`app/products/[slug]/page.tsx`) — full schema.org Product with offers, aggregateRating, and individual review schema. This is what unlocks rich-result rating stars under SERP listings.
- **`sitemap.ts` and `robots.ts`** — auto-generated. The sitemap walks the live product catalogue, so adding a product in Supabase later automatically adds it to the sitemap on the next build.
- **`generateStaticParams` on PDPs** — every product page is prerendered at build time. Crawlers get hydrated HTML on the first request.
- **Descriptive `alt` text** on every `<Image>` — sourced from the data layer, never duplicated.
- **`next/font`** — Inter and Archivo are self-hosted at build time, eliminating round-trips to fonts.gstatic.com (zero CLS, faster LCP).

Lighthouse target: 95+ on Performance / Accessibility / SEO.

---

## Wiring up Supabase

Steps to graduate this from mock data to a real backend:

1. Create a Supabase project. Copy the connection string into `.env.local` as `DATABASE_URL`.
2. `npx prisma migrate dev --name init` — applies the schema in `prisma/schema.prisma`.
3. Seed the database with the records currently in `/lib/products.ts` (run once via a `scripts/seed.ts`).
4. Replace the imports of `products` from `@/lib/products` in page files with Prisma queries (`prisma.product.findMany(...)`).
5. The component layer does not change — `/lib/types.ts` already mirrors the Prisma schema.

`.env.example` has the variables needed.

---

## Before going live

- Swap the Unsplash placeholder URLs in `/lib/products.ts` for real product photography. Each product takes 3–4 images.
- Replace the placeholder hero image at the top of `components/sections/Hero.tsx`.
- Update the social links in `components/layout/Footer.tsx` and the Organization `sameAs` array in `app/layout.tsx`.
- Replace the `SITE_URL` default in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` with the live domain (or set `NEXT_PUBLIC_SITE_URL` in env).

That's the whole list.
