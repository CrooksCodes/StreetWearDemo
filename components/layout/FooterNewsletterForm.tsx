'use client';

import { useState, type FormEvent } from 'react';

/**
 * Footer newsletter form — split out as a client component because the parent
 * Footer is a server component (faster initial render, smaller JS payload),
 * but the form needs an onSubmit handler.
 */
export function FooterNewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    // Demo no-op. Wire to a Supabase insert when promoting past mock data.
    setSubmitted(true);
  };

  if (submitted) {
    return <p className="text-sm text-bone">✓ You're on the list.</p>;
  }

  return (
    <form className="flex border border-bone/20" onSubmit={onSubmit}>
      <input
        type="email"
        placeholder="email"
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm placeholder:text-bone-dim focus:outline-none"
        required
      />
      <button
        type="submit"
        className="border-l border-bone/20 px-4 text-xs uppercase tracking-widest hover:bg-bone hover:text-ink"
      >
        Join
      </button>
    </form>
  );
}
