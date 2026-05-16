'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartLine, Product, Variant } from '@/lib/types';

/**
 * Cart store — Zustand with localStorage persistence.
 *
 * Why Zustand: lightweight, no provider boilerplate, plays well with Next.js
 * server components (only the components that touch state mark themselves
 * "use client"). Per Jeremy's stack rules, this is the only state library used.
 *
 * Why persisted: e-commerce buyers expect their cart to survive a refresh.
 * We persist to localStorage so the experience matches Shopify's default.
 */

interface CartState {
  lines: CartLine[];
  isOpen: boolean;

  // Actions — kept on the same store rather than split into a separate hook,
  // because the cart is small and the indirection is not worth it.
  addLine: (product: Product, variant: Variant, quantity?: number) => void;
  removeLine: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,

      addLine: (product, variant, quantity = 1) =>
        set((state) => {
          // Same product + variant should merge quantities, not create a new line.
          const existing = state.lines.find((l) => l.variant.id === variant.id);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.variant.id === variant.id ? { ...l, quantity: l.quantity + quantity } : l,
              ),
              isOpen: true,
            };
          }
          const lineId = `${variant.id}_${Date.now()}`;
          return {
            lines: [...state.lines, { lineId, product, variant, quantity }],
            isOpen: true,
          };
        }),

      removeLine: (lineId) =>
        set((state) => ({ lines: state.lines.filter((l) => l.lineId !== lineId) })),

      updateQuantity: (lineId, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => l.lineId !== lineId)
              : state.lines.map((l) => (l.lineId === lineId ? { ...l, quantity } : l)),
        })),

      clear: () => set({ lines: [] }),
      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),
      toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => localStorage),
      // Only persist the cart contents — drawer open/close is ephemeral UI state.
      partialize: (state) => ({ lines: state.lines }) as Partial<CartState>,
    },
  ),
);

/** Total item count across all lines — for the header cart badge. */
export const selectCartCount = (state: CartState): number =>
  state.lines.reduce((acc, line) => acc + line.quantity, 0);

/** Subtotal in cents — sum of (variant price × quantity). */
export const selectCartSubtotalCents = (state: CartState): number =>
  state.lines.reduce((acc, line) => acc + line.product.priceCents * line.quantity, 0);
