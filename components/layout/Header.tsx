'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart, selectCartCount } from '@/lib/store/cart';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';

/**
 * Header — sticky top nav. Transparent over the hero, opaque after scroll.
 *
 * The cart count badge uses Zustand's selector pattern so the header only
 * re-renders when the count changes, not when other cart state shifts.
 */
const NAV = [
  { label: 'Shop', href: '/shop' },
  { label: 'Archive', href: '/archive' },
  { label: 'Journal', href: '/journal' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'About', href: '/about' },
] as const;

export function Header() {
  const cartCount = useCart(selectCartCount);
  const openDrawer = useCart((s) => s.openDrawer);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled || mobileOpen
          ? 'border-b border-bone/10 bg-ink/85 backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <Container width="wide" className="flex h-16 items-center justify-between md:h-20">
        {/* Mobile menu trigger — hamburger; absolute-positioned label flag for a11y. */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden"
          aria-expanded={mobileOpen}
          aria-label="Open menu"
        >
          <span className="block h-px w-6 bg-bone before:mb-1.5 before:block before:h-px before:w-6 before:bg-bone before:content-[''] after:mt-1.5 after:block after:h-px after:w-6 after:bg-bone after:content-['']" />
        </button>

        {/* Desktop nav — left of brand. */}
        <nav className="hidden gap-8 text-xs uppercase tracking-widest md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-bone hover:text-bone-muted">
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Brand — centred, oversized, editorial serif. */}
        <Link
          href="/"
          aria-label="Vitória — home"
          className="absolute left-1/2 -translate-x-1/2 font-display text-2xl tracking-widest md:text-3xl"
        >
          VITÓRIA
        </Link>

        {/* Cart trigger — right side. */}
        <button
          type="button"
          onClick={openDrawer}
          aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
          className="text-xs uppercase tracking-widest text-bone hover:text-bone-muted"
        >
          Cart {cartCount > 0 && <span className="text-bone-muted">({cartCount})</span>}
        </button>
      </Container>

      {/* Mobile drop-down menu — appears below the bar when open. */}
      {mobileOpen && (
        <div className="border-t border-bone/10 md:hidden">
          <Container width="wide" className="flex flex-col gap-4 py-6">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMobileOpen(false)}
                className="text-base uppercase tracking-widest text-bone"
              >
                {n.label}
              </Link>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}
