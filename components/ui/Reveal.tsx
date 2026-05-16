'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Reveal — scroll-triggered entrance wrapper.
 *
 * A single quiet fade-up as the element enters the viewport, fired once.
 * Deliberately restrained per DESIGN.md ("things hold still on purpose") —
 * this is an arrival cue, not decoration. The custom ease settles fast and
 * never overshoots, so sections feel placed rather than bounced in.
 *
 * Pass `delay` (index * step) on siblings to stagger a grid. Honors
 * prefers-reduced-motion: when set, content renders immediately, unanimated.
 */
interface RevealProps {
  children: ReactNode;
  /** Stagger offset in seconds — pass `index * 0.06` or similar on grids. */
  delay?: number;
  /** Travel distance in px before settling. */
  y?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
