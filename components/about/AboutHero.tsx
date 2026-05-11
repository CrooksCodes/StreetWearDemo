import Image from 'next/image';
import { Container } from '@/components/ui/Container';

/**
 * AboutHero — full-bleed hero for the About page.
 *
 * Same structural pattern as the homepage Hero but with a
 * brand-statement headline instead of a product CTA.
 */
export function AboutHero() {
  return (
    <section className="relative min-h-[80svh] w-full overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=2400&q=85"
        alt="Vitória atelier — fabric bolts and cutting table in warm light"
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />

      <Container
        width="wide"
        className="relative flex min-h-[80svh] flex-col justify-end pb-20 pt-32 md:pb-32 md:pt-40"
      >
        <div className="max-w-3xl">
          <p className="mb-6 text-xs uppercase tracking-widest text-bone-muted">About</p>
          <h1 className="font-display text-display-1 leading-none tracking-tight text-bone">
            We make chapters,
            <br />
            <span className="italic text-bone-muted">not collections.</span>
          </h1>
        </div>
      </Container>
    </section>
  );
}
