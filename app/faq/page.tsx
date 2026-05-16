import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

/**
 * FAQ — support page.
 *
 * Linked from the footer Support column. Two-column editorial layout: an
 * anchored intro panel on the left, the accordion on the right. Uses native
 * <details> elements so it works with zero client JavaScript.
 */
export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers on drops, sizing, fabric, shipping, and returns for The Label.',
  alternates: { canonical: '/faq' },
};

const FAQS = [
  {
    q: 'What does “limited drop” actually mean?',
    a: 'We make a chapter, sell it through, and move on. Once a piece sells out it isn’t restocked — the run is finished. Past chapters live on permanently in the Archive.',
  },
  {
    q: 'How does the sizing run?',
    a: 'Everything is cut oversized with a dropped shoulder. If you want a standard fit, take one size down. Flat-lay measurements for every size are on the Size Guide.',
  },
  {
    q: 'Why is the fabric so heavy?',
    a: 'Our hoodies use a 500 GSM cotton French terry milled in Portugal, and the tees are 280 GSM ringspun cotton. It’s built to feel structural and to last for years, not a season.',
  },
  {
    q: 'What is garment dyeing?',
    a: 'The piece is sewn first, then dyed as a finished garment. Seams and body absorb colour slightly differently, so every piece has subtle, one-of-one depth — and it softens beautifully with each wash.',
  },
  {
    q: 'Where do you ship, and how long does it take?',
    a: 'Worldwide. Canada is 2–5 business days, the US 3–7, and the rest of the world 7–14. Full rates and the return policy are on the Shipping & Returns page.',
  },
  {
    q: 'Can I change or cancel my order?',
    a: 'Email help@thelabel.example.com as soon as possible. We pack orders within two business days — if it hasn’t shipped yet, we’ll sort it.',
  },
];

export default function FaqPage() {
  return (
    <div className="pt-32 md:pt-40">
      <Container width="wide">
        <div className="grid grid-cols-1 gap-12 pb-24 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          {/* Left — anchored intro panel */}
          <aside className="md:sticky md:top-28 md:self-start">
            <p className="text-xs uppercase tracking-widest text-bone-muted">Support</p>
            <h1 className="mt-3 font-display text-display-2 leading-none">
              Frequently
              <br />
              asked.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-bone-muted">
              The questions we get most — on drops, fit, fabric, and getting your order.
            </p>

            <div className="relative mt-8 aspect-[4/3] overflow-hidden bg-ink-50">
              <Image
                src="https://images.unsplash.com/photo-1689044611227-3267fabaf76a?auto=format&fit=crop&w=1400&q=85"
                alt="The Label — editorial detail"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>

            <p className="mt-6 text-sm text-bone-muted">
              Didn’t find it?{' '}
              <Link href="/contact" className="underline underline-offset-4 hover:text-bone">
                Contact us
              </Link>
              .
            </p>
          </aside>

          {/* Right — accordion */}
          <div>
            {FAQS.map((item) => (
              <details key={item.q} className="group border-b border-bone/10 first:border-t">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-base font-medium text-bone marker:content-['']">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xl text-bone-muted transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="-mt-1 pb-6 pr-10 text-base leading-relaxed text-bone-muted">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
