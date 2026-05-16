import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { Manifesto } from '@/components/about/Manifesto';
import { Atelier } from '@/components/about/Atelier';
import { Timeline } from '@/components/about/Timeline';
import { Production } from '@/components/about/Production';
import { Values } from '@/components/about/Values';

/**
 * About — brand narrative, founder story, timeline, and values.
 *
 * Counters audit finding #7: the current Shopify site has no brand narrative,
 * no founder story, and no about page. This page gets parallax, editorial
 * layout, and a timeline — things Shopify's plain-text "about" pages can't do.
 */
export const metadata: Metadata = {
  title: 'About',
  description:
    'Our story — heavyweight streetwear in limited chapters, made in Portugal. Our manifesto, our timeline, our values.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Manifesto />
      <Atelier />
      <Timeline />
      <Production />
      <Values />
    </>
  );
}
