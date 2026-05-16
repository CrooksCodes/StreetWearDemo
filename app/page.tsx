import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { LatestDrop } from '@/components/sections/LatestDrop';
import { LookbookScroll } from '@/components/sections/LookbookScroll';
import { Story } from '@/components/sections/Story';
import { PressMarquee } from '@/components/sections/PressMarquee';
import { UGCGrid } from '@/components/sections/UGCGrid';
import { DropTeaser } from '@/components/sections/DropTeaser';
import { EmailCapture } from '@/components/sections/EmailCapture';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Homepage.
 *
 * Page-level metadata overrides the sitewide defaults from app/layout.tsx —
 * the home page gets its own optimized title and description, primarily for
 * the SERP snippet.
 *
 * Composition is intentionally flat: each section is its own component so
 * the order can be reshuffled (or sections temporarily disabled) without
 * touching the underlying section logic.
 */
export const metadata: Metadata = {
  title: 'Heavyweight Streetwear · Drop 04',
  description:
    'Heavyweight, garment-dyed streetwear in limited drops. Made in Portugal. Shop the Spring 2026 chapter.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      {/* Hero animates on load; LatestDrop / LookbookScroll / UGCGrid run their
          own staggered child reveals. The remaining sections get a single quiet
          fade-up as they scroll into view. */}
      <Hero />
      <LatestDrop />
      <LookbookScroll />
      <Reveal>
        <PressMarquee />
      </Reveal>
      <Reveal>
        <Story />
      </Reveal>
      <UGCGrid />
      <Reveal>
        <DropTeaser />
      </Reveal>
      <Reveal>
        <EmailCapture />
      </Reveal>
    </>
  );
}
