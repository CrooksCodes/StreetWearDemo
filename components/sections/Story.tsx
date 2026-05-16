'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/Container';

/**
 * Story — brand origin story with a parallax image.
 *
 * Parallax is implemented with framer-motion's `useScroll` tracking the section's
 * progress through the viewport, then mapping that 0-1 range onto a translateY.
 * Subtle: -15% to +15% over the section's height, no excessive motion.
 */
export function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section ref={ref} className="relative py-24 md:py-32">
      <Container width="wide" className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[3/4] overflow-hidden bg-ink-50">
          <motion.div style={{ y }} className="absolute inset-x-0 top-[-15%] bottom-[-15%]">
            <Image
              src="https://images.unsplash.com/photo-1582225905616-c3adc77ada6b?auto=format&fit=crop&w=1600&q=85"
              alt="Founder portrait — black and white, atelier"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-widest text-bone-muted">Origin</p>
          <h2 className="mt-3 font-display text-display-3 leading-tight">
            We don't make collections. We make chapters.
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-bone-muted">
            <p>
              The label started in 2024 in a 400-square-foot studio in Toronto. One heavyweight
              hoodie, sewn from a 500 GSM French terry sourced from a Portuguese mill that
              had stopped taking new clients in 2019.
            </p>
            <p>
              We don't restock. We don't follow seasons. We make a chapter, we sell it
              through, and we move on. The pieces you wear from us today won't exist
              twelve months from now — and that's the point.
            </p>
            <p className="text-bone">
              — Founder
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
