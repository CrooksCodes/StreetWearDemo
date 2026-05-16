'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CountdownTimer — real-time countdown with Framer Motion digit flip animation.
 *
 * Ticks every second. Calls `onExpired` when the countdown reaches zero.
 * Each digit block flips with a Y-axis rotation for a mechanical clock feel.
 */

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: string): TimeLeft {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden bg-ink-50 sm:h-20 sm:w-20 md:h-24 md:w-24">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="font-display text-2xl leading-none sm:text-3xl md:text-4xl"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] uppercase tracking-widest text-bone-dim">{label}</span>
    </div>
  );
}

export function CountdownTimer({
  targetDate,
  onExpired,
}: {
  targetDate: string;
  onExpired?: () => void;
}) {
  // Start from a static placeholder, not getTimeLeft(): that reads Date.now(),
  // which differs between the server render and client hydration (the
  // per-second value drifts), causing a hydration mismatch. The real value is
  // computed on mount in the effect below, before the first tick.
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTime(getTimeLeft(targetDate));

    const interval = setInterval(() => {
      const next = getTimeLeft(targetDate);
      setTime(next);

      if (next.days === 0 && next.hours === 0 && next.minutes === 0 && next.seconds === 0) {
        clearInterval(interval);
        onExpired?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onExpired]);

  return (
    <div className="flex items-center gap-3 sm:gap-4 md:gap-6" aria-label="Countdown timer">
      <Digit value={time.days} label="Days" />
      <span className="font-display text-2xl text-bone-dim" aria-hidden="true">:</span>
      <Digit value={time.hours} label="Hours" />
      <span className="font-display text-2xl text-bone-dim" aria-hidden="true">:</span>
      <Digit value={time.minutes} label="Min" />
      <span className="font-display text-2xl text-bone-dim" aria-hidden="true">:</span>
      <Digit value={time.seconds} label="Sec" />
    </div>
  );
}
