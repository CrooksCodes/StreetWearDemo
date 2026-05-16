'use client';

import { useState, type FormEvent } from 'react';

/**
 * ContactForm — client component for the /contact page.
 *
 * Demo no-op submit (mirrors FooterNewsletterForm). Wire to a server action
 * or a Supabase insert + transactional email when promoting past mock data.
 */
const TOPICS = ['Order help', 'Sizing', 'Returns', 'Wholesale & press', 'Something else'];

const fieldClass =
  'w-full border border-bone/20 bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone-dim focus:border-bone focus:outline-none';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-bone/20 px-8 py-12 text-center">
        <p className="font-display text-3xl leading-none">Message sent.</p>
        <p className="mt-3 text-sm leading-relaxed text-bone-muted">
          Thanks for reaching out — a real person will reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-widest text-bone-muted">
            Name
          </span>
          <input type="text" name="name" autoComplete="name" required className={fieldClass} />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-widest text-bone-muted">
            Email
          </span>
          <input type="email" name="email" autoComplete="email" required className={fieldClass} />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-xs uppercase tracking-widest text-bone-muted">
          Topic
        </span>
        <select name="topic" required className={`${fieldClass} appearance-none`}>
          {TOPICS.map((t) => (
            <option key={t} value={t} className="bg-ink">
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-2 block text-xs uppercase tracking-widest text-bone-muted">
          Message
        </span>
        <textarea name="message" rows={6} required className={`${fieldClass} resize-y`} />
      </label>

      <button
        type="submit"
        className="w-full bg-bone px-8 py-4 text-xs uppercase tracking-widest text-ink transition-colors hover:bg-bone-muted"
      >
        Send message
      </button>
    </form>
  );
}
