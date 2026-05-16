import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';

/**
 * Size Guide — support page with the garment measurement table.
 *
 * Linked from the footer Support column. Measurements are flat-lay, in
 * inches; demo data, to be confirmed against real production specs.
 */
export const metadata: Metadata = {
  title: 'Size Guide',
  description:
    'Flat-lay measurements for every size, with on-model fit references. The Label is cut oversized — size down for a standard fit.',
  alternates: { canonical: '/size-guide' },
};

const ROWS = [
  { size: 'XS', chest: 20, length: 27, sleeve: 23 },
  { size: 'S', chest: 21.5, length: 28, sleeve: 23.5 },
  { size: 'M', chest: 23, length: 29, sleeve: 24 },
  { size: 'L', chest: 24.5, length: 30, sleeve: 24.5 },
  { size: 'XL', chest: 26, length: 31, sleeve: 25 },
  { size: 'XXL', chest: 27.5, length: 32, sleeve: 25.5 },
];

const FIT_SHOTS = [
  {
    src: 'https://images.unsplash.com/photo-1559697242-7c922c6198c6?auto=format&fit=crop&w=1200&q=85',
    alt: 'Two models showing the oversized drop-shoulder fit',
    caption: 'Both models 6′0″, wearing size M.',
  },
  {
    src: 'https://images.unsplash.com/photo-1604520164966-8ca929961ebe?auto=format&fit=crop&w=1200&q=85',
    alt: 'Editorial side profile showing relaxed body and dropped shoulder',
    caption: 'The dropped shoulder sits well past the natural shoulder line.',
  },
];

export default function SizeGuidePage() {
  return (
    <div className="pt-32 md:pt-40">
      <Container width="wide">
        <header className="mb-12 max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-bone-muted">Support</p>
          <h1 className="mt-3 font-display text-display-2 leading-none">Size Guide</h1>
          <p className="mt-5 text-base leading-relaxed text-bone-muted">
            Every piece is cut oversized with a dropped shoulder. Measurements below are
            flat-lay, in inches. If you want a standard fit, take one size down.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12 pb-24 md:grid-cols-[1.4fr_1fr] md:gap-16">
          {/* Measurement table */}
          <div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-bone/20 text-left text-xs uppercase tracking-widest text-bone-muted">
                    <th className="py-3 pr-4 font-medium">Size</th>
                    <th className="py-3 pr-4 font-medium">Chest</th>
                    <th className="py-3 pr-4 font-medium">Body length</th>
                    <th className="py-3 font-medium">Sleeve</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r) => (
                    <tr key={r.size} className="border-b border-bone/10">
                      <td className="py-4 pr-4 font-medium uppercase tracking-widest text-bone">
                        {r.size}
                      </td>
                      <td className="py-4 pr-4 text-bone-muted">{r.chest}&quot;</td>
                      <td className="py-4 pr-4 text-bone-muted">{r.length}&quot;</td>
                      <td className="py-4 text-bone-muted">{r.sleeve}&quot;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 border border-bone/10 p-6">
              <h2 className="text-sm font-medium uppercase tracking-widest text-bone">
                How to measure
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-bone-muted">
                Lay a garment you already own and love flat. Measure the chest one inch
                below the armhole, straight across. Body length runs from the highest point
                of the shoulder to the hem. Compare to the table above — still unsure?{' '}
                <a
                  href="mailto:help@thelabel.example.com"
                  className="underline underline-offset-4 hover:text-bone"
                >
                  Email us
                </a>{' '}
                and we’ll talk you through it.
              </p>
            </div>
          </div>

          {/* On-model fit references */}
          <div className="space-y-6">
            {FIT_SHOTS.map((shot) => (
              <figure key={shot.src}>
                <div className="relative aspect-[4/5] overflow-hidden bg-ink-50">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-xs uppercase tracking-widest text-bone-muted">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
