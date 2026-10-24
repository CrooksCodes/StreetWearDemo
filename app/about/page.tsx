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
 * Parallax hero, editorial layout, and a timeline — the brand narrative
 * most stores reduce to a plain-text about page.
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
