'use client';

import { useEffect, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Modal — accessible dialog with backdrop, ESC-to-close, body scroll lock.
 * Built from scratch (no Radix/shadcn) so the markup and animation are owned
 * end-to-end and the bundle stays small.
 */
interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel: string;
  /** Tailwind size override for the panel. */
  panelClassName?: string;
}

export function Modal({ open, onClose, children, ariaLabel, panelClassName }: Props) {
  // Lock body scroll while open so the modal is the only scroll container.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // ESC closes the modal — keyboard-first behaviour for accessibility.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
        >
          <button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className={cn(
              // Per DESIGN.md: no `box-shadow` on UI surfaces. Separation
              // here is carried by the tonal-layer background (ink-50 sits
              // above ink), the hairline ring at bone/10, and the backdrop
              // blur on the scrim — never a soft elevation.
              'relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-ink-50 text-bone ring-1 ring-bone/10',
              panelClassName,
            )}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
