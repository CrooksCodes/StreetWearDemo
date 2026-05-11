'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { CountdownTimer } from '@/components/drops/CountdownTimer';
import { TeaserGallery } from '@/components/drops/TeaserGallery';
import { NotifyForm } from '@/components/drops/NotifyForm';
import { DropRevealToggle } from '@/components/drops/DropRevealToggle';
import { upcomingDrop } from '@/lib/drops';

/**
 * Drop 05 page — the "wow" feature for the pitch.
 *
 * Centered layout: label → display title → teaser copy → countdown →
 * demo reveal button → notify form → teaser gallery. On reveal, blur
 * clears with staggered animation and a post-reveal CTA fades in.
 *
 * This is a client component because it manages reveal state and the
 * countdown timer. Metadata is exported from the sibling layout.tsx.
 */
export default function DropPage() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="pt-32 md:pt-40 pb-24 md:pb-32">
      <Container width="default" className="flex flex-col items-center text-center">
        <p className="text-xs uppercase tracking-widest text-bone-muted">Coming Soon</p>
        <h1 className="mt-3 font-display text-display-2 leading-none">
          {upcomingDrop.name}
        </h1>
        <p className="mt-4 text-sm text-bone-muted">{upcomingDrop.tagline}</p>
        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-bone-muted">
          {upcomingDrop.teaserCopy}
        </p>

        {/* Countdown */}
        <div className="mt-12">
          <CountdownTimer
            targetDate={upcomingDrop.dropDate}
            onExpired={() => setRevealed(true)}
          />
        </div>

        {/* Demo reveal toggle */}
        <div className="mt-10">
          <DropRevealToggle revealed={revealed} onReveal={() => setRevealed(true)} />
        </div>

        {/* Notify form */}
        <div className="mt-10">
          <NotifyForm />
        </div>

        {/* Teaser gallery */}
        <div className="mt-16 w-full max-w-3xl">
          <TeaserGallery images={upcomingDrop.teaserImages} revealed={revealed} />
        </div>

        {/* Post-reveal CTA */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12"
            >
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 bg-bone px-8 py-4 text-xs uppercase tracking-widest text-ink transition-colors hover:bg-bone-muted"
              >
                Shop Drop 04 while you wait
                <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}
