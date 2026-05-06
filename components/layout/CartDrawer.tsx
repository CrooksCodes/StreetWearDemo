'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart, selectCartSubtotalCents } from '@/lib/store/cart';
import { Button } from '@/components/ui/Button';
import { formatPrice, FREE_SHIPPING_THRESHOLD_CENTS } from '@/lib/utils';
import { products } from '@/lib/products';
import { cn } from '@/lib/utils';

/**
 * CartDrawer — slide-out shopping cart.
 *
 * Composition:
 *   - Free-shipping progress bar (clear value-prop UX)
 *   - Line items with quantity controls and remove
 *   - Cross-sell carousel (a few products from the catalogue, deduped against
 *     items already in cart)
 *   - Trust badges row (a quick row of icons that increases conversion)
 *
 * State lives in /lib/store/cart.ts (Zustand, persisted). This component is
 * "use client" because it consumes that store and animates with framer-motion.
 */
export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const closeDrawer = useCart((s) => s.closeDrawer);
  const lines = useCart((s) => s.lines);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeLine = useCart((s) => s.removeLine);
  const subtotal = useCart(selectCartSubtotalCents);

  // Body scroll lock while drawer open.
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // ESC closes the drawer.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeDrawer]);

  // Free shipping progress — clamp to 100% when threshold reached.
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD_CENTS) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD_CENTS - subtotal, 0);

  // Cross-sell candidates — products not already in cart, take first 3.
  const inCartIds = new Set(lines.map((l) => l.product.id));
  const crossSell = products.filter((p) => !inCartIds.has(p.id)).slice(0, 4);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            onClick={closeDrawer}
            className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            // Per DESIGN.md: no `box-shadow` on UI surfaces. The drawer
            // reads as a layer through its tonal bg (ink-100) and the
            // hairline border-l, never a soft elevation.
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-bone/10 bg-ink-100 text-bone"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <header className="flex items-center justify-between border-b border-bone/10 px-6 py-5">
              <h2 className="font-display text-2xl">Cart</h2>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close cart"
                className="text-xs uppercase tracking-widest text-bone-muted hover:text-bone"
              >
                Close
              </button>
            </header>

            {/* Free-shipping progress bar */}
            <div className="border-b border-bone/10 px-6 py-4">
              {remaining > 0 ? (
                <p className="text-xs text-bone-muted">
                  Add{' '}
                  <span className="text-bone">{formatPrice(remaining)}</span> for free
                  shipping
                </p>
              ) : (
                <p className="text-xs text-bone">✓ Free shipping unlocked</p>
              )}
              <div className="mt-2 h-px w-full bg-bone/10">
                <div
                  className="h-px bg-bone transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Lines */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
                  <p className="font-display text-2xl text-bone-muted">Your cart is empty</p>
                  <Link
                    href="/shop"
                    onClick={closeDrawer}
                    className="text-xs uppercase tracking-widest text-bone underline underline-offset-4"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-bone/10">
                  {lines.map((line) => {
                    const img = line.product.images[0];
                    return (
                      <li key={line.lineId} className="flex gap-4 py-4">
                        <Link
                          href={`/products/${line.product.slug}`}
                          onClick={closeDrawer}
                          className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden bg-ink"
                        >
                          {img && (
                            <Image
                              src={img.url}
                              alt={img.alt}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          )}
                        </Link>

                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="truncate text-sm uppercase tracking-widest">
                                {line.product.name}
                              </p>
                              <p className="text-xs text-bone-muted">
                                {line.variant.color} · {line.variant.size}
                              </p>
                            </div>
                            <p className="text-sm">{formatPrice(line.product.priceCents)}</p>
                          </div>

                          <div className="mt-auto flex items-center justify-between pt-3">
                            {/* Quantity stepper */}
                            <div
                              className="flex items-center border border-bone/20"
                              role="group"
                              aria-label={`Quantity for ${line.product.name}`}
                            >
                              <button
                                type="button"
                                onClick={() => updateQuantity(line.lineId, line.quantity - 1)}
                                aria-label="Decrease quantity"
                                className="px-3 py-1 text-bone hover:bg-bone/5"
                              >
                                −
                              </button>
                              <span className="min-w-[2rem] px-2 text-center text-sm">
                                {line.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(line.lineId, line.quantity + 1)}
                                aria-label="Increase quantity"
                                disabled={line.quantity >= line.variant.stock}
                                className="px-3 py-1 text-bone hover:bg-bone/5 disabled:cursor-not-allowed disabled:text-bone-dim"
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeLine(line.lineId)}
                              className="text-xs uppercase tracking-widest text-bone-muted underline underline-offset-4 hover:text-bone"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Cross-sell — only when cart has items */}
              {lines.length > 0 && crossSell.length > 0 && (
                <div className="mt-8 border-t border-bone/10 pt-6">
                  <p className="mb-4 text-xs uppercase tracking-widest text-bone-muted">
                    You might also like
                  </p>
                  <div className="-mx-2 flex gap-3 overflow-x-auto px-2 scrollbar-none">
                    {crossSell.map((p) => (
                      <Link
                        key={p.id}
                        href={`/products/${p.slug}`}
                        onClick={closeDrawer}
                        className="w-32 shrink-0"
                      >
                        <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                          {p.images[0] && (
                            <Image
                              src={p.images[0].url}
                              alt={p.images[0].alt}
                              fill
                              sizes="128px"
                              className="object-cover"
                            />
                          )}
                        </div>
                        <p className="mt-2 truncate text-xs uppercase tracking-widest">
                          {p.name}
                        </p>
                        <p className="text-xs text-bone-muted">{formatPrice(p.priceCents)}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer — subtotal, trust badges, checkout */}
            <footer className="border-t border-bone/10 bg-ink px-6 py-5">
              <div className="mb-4 flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-widest text-bone-muted">
                  Subtotal
                </span>
                <span className="font-display text-2xl">{formatPrice(subtotal)}</span>
              </div>

              <Button fullWidth disabled={lines.length === 0} aria-label="Proceed to checkout">
                Checkout
              </Button>

              {/* Trust badges row — quick scannable signals before payment commitment. */}
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-widest text-bone-muted">
                <TrustBadge label="Free returns" />
                <TrustBadge label="Secure checkout" />
                <TrustBadge label="Made in Portugal" />
              </div>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function TrustBadge({ label }: { label: string }) {
  return (
    <div className={cn('flex flex-col items-center gap-1 border border-bone/10 py-2')}>
      <span aria-hidden="true" className="text-bone">
        ✓
      </span>
      <span>{label}</span>
    </div>
  );
}
