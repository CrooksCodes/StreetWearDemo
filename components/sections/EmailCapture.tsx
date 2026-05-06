'use client';

import { useState, type FormEvent } from 'react';
import { Container } from '@/components/ui/Container';

/**
 * EmailCapture — full-bleed newsletter signup with a real value-prop.
 *
 * Currently a no-op submit (UI demo only). When wiring to Supabase, replace
 * the handler with a server action that inserts into a `subscribers` table.
 */
export function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setStatus('submitting');
    // Demo: simulate a network round-trip. Replace with Supabase insert.
    await new Promise((r) => setTimeout(r, 600));
    setStatus('success');
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="border-y border-bone/10 py-24 md:py-32"
    >
      <Container width="default" className="text-center">
        <p className="text-xs uppercase tracking-widest text-bone-muted">Sign Up</p>
        <h2
          id="newsletter-heading"
          className="mt-3 font-display text-display-2 leading-tight"
        >
          10% off.
          <br />
          <span className="italic text-bone-muted">Early access on every drop.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-bone-muted">
          We send fewer than four emails a year. When we do send one, it's because something is
          ending or beginning.
        </p>

        {status === 'success' ? (
          <p className="mx-auto mt-10 max-w-md text-sm text-bone">
            ✓ You're on the list. Check your inbox for a 10% code.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-10 flex max-w-md border border-bone/20"
            aria-label="Newsletter signup"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your email"
              aria-label="Email address"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm placeholder:text-bone-dim focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="border-l border-bone/20 px-6 text-xs uppercase tracking-widest hover:bg-bone hover:text-ink disabled:opacity-50"
            >
              {status === 'submitting' ? 'Sending…' : 'Subscribe'}
            </button>
          </form>
        )}
      </Container>
    </section>
  );
}
