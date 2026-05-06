import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

/**
 * Hero — full-bleed landing section. Single CTA, oversized type.
 *
 * The image is server-rendered with `priority` so it counts as the LCP element
 * — Next.js preloads it via <link rel="preload"> in the document head.
 */
// Note: section uses min-h-[100svh] (not h-[100svh]) so the headline stack
// can push the section taller than a short viewport — avoids ascender-
// clipping when a 4-line oversized h1 doesn't fit inside a fixed-height
// container.
export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Hero image — Unsplash placeholder; swap for client product photography. */}
      <Image
        src="https://images.unsplash.com/photo-1619603364904-c0498317e145?auto=format&fit=crop&w=2400&q=85"
        alt="Vitória heavyweight streetwear editorial — model in mockneck hoodie against concrete"
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      {/* Vignette gradient for type contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/50 to-transparent" />

      {/* pt-32/pt-40 keeps the headline clear of the fixed header bar at all
          viewports — without it, the transparent header sits directly on
          top of "Built to" when scrolled to top. */}
      <Container width="wide" className="relative flex min-h-[100svh] flex-col justify-end pb-20 pt-32 md:pb-32 md:pt-40">
        <div className="max-w-3xl">
          <p className="mb-6 text-xs uppercase tracking-widest text-bone-muted">
            Drop 04 — Spring 2026
          </p>
          <h1 className="font-display text-display-1 leading-none tracking-tight text-bone">
            Built to wear,
            <br />
            <span className="italic text-bone-muted">not to display.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-bone-muted md:text-lg">
            Heavyweight knits, garment-dyed in small batches, made in Portugal. A new
            chapter every season — never a restock.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 bg-bone px-8 py-4 text-xs uppercase tracking-widest text-ink transition-colors hover:bg-bone-muted"
            >
              Shop Drop 04
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/lookbook"
              className="text-xs uppercase tracking-widest text-bone underline underline-offset-4 hover:text-bone-muted"
            >
              View Lookbook
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
