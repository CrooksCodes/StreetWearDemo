import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { LatestDrop } from '@/components/sections/LatestDrop';
import { LookbookScroll } from '@/components/sections/LookbookScroll';
import { Story } from '@/components/sections/Story';
import { PressMarquee } from '@/components/sections/PressMarquee';
import { UGCGrid } from '@/components/sections/UGCGrid';
import { EmailCapture } from '@/components/sections/EmailCapture';

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
    'Vitória — heavyweight, garment-dyed streetwear in limited drops. Made in Portugal. Shop the Spring 2026 chapter.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LatestDrop />
      <LookbookScroll />
      <PressMarquee />
      <Story />
      <UGCGrid />
      <EmailCapture />
    </>
  );
}
