import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

/**
 * Shipping & Returns — support / policy page.
 *
 * Linked from the footer Support column. Static placeholder copy;
 * real policy text goes here once the store is live.
 */
export const metadata: Metadata = {
  title: 'Shipping & Returns',
  description:
    'Shipping timelines, rates, and the return policy for The Label — heavyweight streetwear made in Portugal.',
  alternates: { canonical: '/shipping' },
};

const SECTIONS = [
  {
    title: 'Dispatch',
    body: 'Orders are picked and packed within two business days from our studio in Toronto. You’ll get a tracking link by email the moment your parcel leaves us.',
  },
  {
    title: 'Shipping rates',
    body: 'Canada — free over $150 CAD, otherwise $12 flat. United States — $18 flat, 3–7 business days. Rest of world — calculated at checkout, 7–14 business days. Duties and taxes are the recipient’s responsibility outside Canada.',
  },
  {
    title: 'Returns',
    body: 'Unworn pieces with tags attached can be returned within 30 days of delivery for a full refund to the original payment method. Drops are limited, so we don’t offer exchanges — return the piece and reorder while stock lasts.',
  },
  {
    title: 'Faulty pieces',
    body: 'Every garment is inspected before it ships. If something slipped through, email us within 30 days with a photo and we’ll make it right — repair, replacement, or refund.',
  },
];

export default function ShippingPage() {
  return (
    <div className="pt-32 md:pt-40">
      <Container width="wide">
        <header className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-bone-muted">Support</p>
          <h1 className="mt-3 font-display text-display-2 leading-none">Shipping &amp; Returns</h1>
          <p className="mt-5 text-base leading-relaxed text-bone-muted">
            Sewn in Portugal, packed by hand in our Toronto studio, sent worldwide. Here’s
            exactly what happens after you check out.
          </p>
        </header>

        <div className="relative aspect-[16/9] overflow-hidden bg-ink-50 md:aspect-[21/8]">
          <Image
            src="https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?auto=format&fit=crop&w=2400&q=85"
            alt="The Label studio — garments and packing table"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Hairline-divided grid — each policy reads as its own editorial panel. */}
        <div className="mt-12 grid gap-px border border-bone/10 bg-bone/10 md:grid-cols-2">
          {SECTIONS.map((s, i) => (
            <section key={s.title} className="bg-ink p-8 md:p-10">
              <p className="font-display text-5xl leading-none text-bone-dim">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h2 className="mt-5 text-sm font-medium uppercase tracking-widest text-bone">
                {s.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-bone-muted">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="mb-24 mt-12 flex flex-col items-start gap-4 border-t border-bone/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-bone-muted">
            Still have a question about your order?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-bone px-8 py-4 text-xs uppercase tracking-widest text-ink transition-colors hover:bg-bone-muted"
          >
            Contact us
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </div>
  );
}
