'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/Container';

/**
 * Production — two-column parallax section (reuses Story.tsx pattern).
 *
 * Tells the Portugal manufacturing story with the same scroll-driven
 * parallax that powers the homepage Story section.
 */
export function Production() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section ref={ref} aria-labelledby="production-heading" className="py-24 md:py-32">
      <Container width="wide" className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[3/4] overflow-hidden bg-ink-50">
          <motion.div style={{ y }} className="absolute inset-x-0 top-[-15%] bottom-[-15%]">
            <Image
              src="https://images.unsplash.com/photo-1649114383220-c4f0f0dbafbe?auto=format&fit=crop&w=1600&q=85"
              alt="Portuguese textile mill — weaving looms and cotton rolls"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-widest text-bone-muted">Production</p>
          <h2
            id="production-heading"
            className="mt-3 font-display text-display-3 leading-tight"
          >
            Made in Portugal. On purpose.
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-bone-muted">
            <p>
              Every garment is cut and sewn in a third-generation family mill outside
              Porto. Forty employees, no fast-fashion clients, no minimum order pressure.
            </p>
            <p>
              We chose Portugal because it&apos;s where the heaviest French terry in Europe is
              milled — 500 GSM fabric that most manufacturers won&apos;t touch because it
              breaks their consumer-grade sewing machines.
            </p>
            <p>
              The mill runs our fabric on industrial lockstitch machines built for upholstery.
              The result is a garment that feels structural — not stiff, but present. You
              know you&apos;re wearing something.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
