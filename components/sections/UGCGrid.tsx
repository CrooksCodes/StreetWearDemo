import Image from 'next/image';
import { Container } from '@/components/ui/Container';

/**
 * UGCGrid — Instagram-style 4-up grid of customer/community photography.
 * Mock data; in production this pulls from the Instagram Basic Display API
 * (or a curated set in Supabase) and links each tile to the buyable product.
 */
const POSTS: Array<{ src: string; alt: string; handle: string }> = [
  {
    src: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80',
    alt: 'Customer wearing onyx mockneck hoodie',
    handle: '@studio.calle',
  },
  {
    src: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80',
    alt: 'Customer wearing oxblood full-zip outdoors',
    handle: '@vincentwears',
  },
  {
    src: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80',
    alt: 'Customer wearing souvenir bomber in city',
    handle: '@taoluxe',
  },
  {
    src: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=80',
    alt: 'Customer wearing reflective hoodie at night',
    handle: '@noir.archive',
  },
];

export function UGCGrid() {
  return (
    <section aria-labelledby="ugc-heading" className="py-24 md:py-32">
      <Container width="wide">
        <header className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-bone-muted">@projectvitoria</p>
            <h2 id="ugc-heading" className="mt-2 font-display text-display-3 leading-none">
              As worn.
            </h2>
          </div>
          <a
            href="https://www.instagram.com/projectvitoria"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest text-bone underline underline-offset-4 hover:text-bone-muted"
          >
            Follow ↗
          </a>
        </header>

        <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
          {POSTS.map((post, i) => (
            <a
              key={i}
              href="https://www.instagram.com/projectvitoria"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-ink-50"
              aria-label={`Open Instagram — post by ${post.handle}`}
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/40" />
              <p className="absolute bottom-3 left-3 text-xs uppercase tracking-widest text-bone opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {post.handle}
              </p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
