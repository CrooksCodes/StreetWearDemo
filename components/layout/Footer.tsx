import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { FooterNewsletterForm } from './FooterNewsletterForm';

/**
 * Footer — Vitória brand footer.
 *
 * NOTE FOR THE PITCH: every social link below is wired to a real URL with
 * proper rel/target attributes. The current Vitória Shopify site ships with
 * the default theme's broken placeholder social links — pointing this out
 * is part of the value Jeremy is selling.
 */
const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/' },
  { label: 'YouTube', href: 'https://www.youtube.com/' },
] as const;

const SHOP_LINKS = [
  { label: 'All Products', href: '/shop' },
  { label: 'Latest Drop', href: '/shop?filter=latest' },
  { label: 'Hoodies', href: '/shop?category=hoodies' },
  { label: 'Tees', href: '/shop?category=tees' },
  { label: 'Outerwear', href: '/shop?category=outerwear' },
] as const;

const SUPPORT_LINKS = [
  { label: 'Shipping & Returns', href: '/shipping' },
  { label: 'Size Guide', href: '/size-guide' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
] as const;

export function Footer() {
  return (
    <footer className="mt-32 border-t border-bone/10 bg-ink py-16 text-bone">
      <Container width="wide">
        {/* Oversized brand mark — sets editorial tone before the link grid. */}
        <p className="font-display text-display-2 leading-none tracking-widest">VITÓRIA</p>
        <p className="mt-4 max-w-md text-sm text-bone-muted">
          Heavyweight, garment-dyed streetwear in limited drops. Made in Portugal.
        </p>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-bone-muted">Shop</p>
            <ul className="space-y-2 text-sm">
              {SHOP_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-bone-muted">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-bone-muted">Support</p>
            <ul className="space-y-2 text-sm">
              {SUPPORT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-bone-muted">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-bone-muted">Follow</p>
            <ul className="space-y-2 text-sm">
              {SOCIAL.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-bone-muted"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-bone-muted">Newsletter</p>
            <p className="mb-3 text-sm text-bone-muted">10% off + early access on drops.</p>
            <FooterNewsletterForm />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-bone/10 pt-8 text-xs text-bone-dim md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Vitória. All rights reserved.</p>
          <p className="uppercase tracking-widest">
            Site by{' '}
            <a
              href="https://jeremycrooks.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bone-muted hover:text-bone"
            >
              Jeremy Crooks
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
