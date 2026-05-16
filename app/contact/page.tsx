import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { ContactForm } from '@/components/support/ContactForm';

/**
 * Contact — support page with a contact form and direct channels.
 *
 * Linked from the footer Support column. The form is a demo no-op
 * (see ContactForm); channels point at real mailto / social destinations.
 */
export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with The Label — order help, sizing questions, wholesale and press enquiries.',
  alternates: { canonical: '/contact' },
};

const CHANNELS = [
  {
    label: 'Customer care',
    detail: 'help@thelabel.example.com',
    href: 'mailto:help@thelabel.example.com',
    note: 'Orders, sizing, returns.',
  },
  {
    label: 'Wholesale & press',
    detail: 'studio@thelabel.example.com',
    href: 'mailto:studio@thelabel.example.com',
    note: 'Stockist enquiries, press, collaborations.',
  },
  {
    label: 'Instagram',
    detail: '@thelabel',
    href: 'https://www.instagram.com/',
    note: 'DMs open — often the fastest way to reach us.',
  },
];

export default function ContactPage() {
  return (
    <div className="pt-32 md:pt-40">
      <Container width="wide">
        <header className="mb-12 max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-bone-muted">Support</p>
          <h1 className="mt-3 font-display text-display-2 leading-none">Get in touch</h1>
          <p className="mt-5 text-base leading-relaxed text-bone-muted">
            A small team in a 400-square-foot Toronto studio. No call centre, no bots —
            you’ll always get a person.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12 pb-24 md:grid-cols-2 md:gap-16">
          {/* Left — channels + studio image */}
          <div>
            <div className="space-y-8">
              {CHANNELS.map((c) => (
                <div key={c.label} className="border-b border-bone/10 pb-6 last:border-0">
                  <p className="text-xs uppercase tracking-widest text-bone-muted">
                    {c.label}
                  </p>
                  <a
                    href={c.href}
                    {...(c.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="mt-2 inline-block break-all font-display text-lg underline underline-offset-4 hover:text-bone-muted sm:text-xl lg:text-2xl"
                  >
                    {c.detail}
                  </a>
                  <p className="mt-2 text-sm text-bone-muted">{c.note}</p>
                </div>
              ))}
            </div>

            <div className="relative mt-10 aspect-[4/3] overflow-hidden bg-ink-50">
              <Image
                src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1400&q=85"
                alt="The Label — editorial portrait"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right — contact form */}
          <div>
            <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-bone">
              Send a message
            </h2>
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
