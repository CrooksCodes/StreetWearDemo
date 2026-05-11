'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { CountdownTimer } from '@/components/drops/CountdownTimer';
import { NotifyForm } from '@/components/drops/NotifyForm';
import { upcomingDrop } from '@/lib/drops';

/**
 * DropTeaser — compact homepage section: countdown + blurred image + notify form.
 *
 * Sits between UGCGrid and EmailCapture on the homepage. Links to the
 * full /drops/drop-05 page for the complete experience.
 */
export function DropTeaser() {
  const [expired, setExpired] = useState(false);

  return (
    <section aria-labelledby="drop-teaser-heading" className="border-y border-bone/10 py-24 md:py-32">
      <Container width="default" className="text-center">
        <p className="text-xs uppercase tracking-widest text-bone-muted">Coming Soon</p>
        <h2
          id="drop-teaser-heading"
          className="mt-3 font-display text-display-2 leading-none"
        >
          {upcomingDrop.name}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-bone-muted">
          {upcomingDrop.tagline}
        </p>

        {/* Blurred teaser image */}
        <div className="mx-auto mt-10 max-w-sm">
          <motion.div
            className="relative aspect-[3/4] overflow-hidden bg-ink-50"
            animate={{
              filter: expired
                ? 'blur(0px) saturate(1)'
                : 'blur(20px) saturate(0.3)',
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {upcomingDrop.teaserImages[0] && (
              <Image
                src={upcomingDrop.teaserImages[0].url}
                alt={upcomingDrop.teaserImages[0].alt}
                fill
                sizes="(min-width: 768px) 400px, 80vw"
                className="object-cover"
              />
            )}
          </motion.div>
        </div>

        {/* Countdown */}
        <div className="mt-10 flex justify-center">
          <CountdownTimer targetDate={upcomingDrop.dropDate} onExpired={() => setExpired(true)} />
        </div>

        {/* Notify form */}
        <div className="mx-auto mt-10 flex justify-center">
          <NotifyForm />
        </div>

        <Link
          href="/drops/drop-05"
          className="mt-8 inline-block text-xs uppercase tracking-widest text-bone underline underline-offset-4 hover:text-bone-muted"
        >
          See full drop preview →
        </Link>
      </Container>
    </section>
  );
}
