import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Conventional `cn` helper: clsx for conditional class joining, tailwind-merge
 * to dedupe conflicting Tailwind utilities (e.g. `p-2` overriding `p-4`).
 * Used everywhere in this codebase — same pattern Jeremy uses on jeremycrooks.ca.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format an integer cent value as a CAD currency string.
 * We store all money in cents (priceCents, compareAtCents) so we never do
 * floating-point arithmetic on user-visible totals.
 */
export function formatPrice(cents: number, currency: string = 'CAD'): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

/**
 * Average a product's review ratings. Returns null when there are no reviews
 * so callers can render a fallback ("No reviews yet") instead of "0.0".
 */
export function averageRating(ratings: number[]): number | null {
  if (ratings.length === 0) return null;
  const sum = ratings.reduce((acc, r) => acc + r, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
}

/** Free-shipping threshold in cents. Drives the cart drawer progress bar. */
export const FREE_SHIPPING_THRESHOLD_CENTS = 15000;
