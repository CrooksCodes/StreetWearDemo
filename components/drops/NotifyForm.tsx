'use client';

import { useState, type FormEvent } from 'react';

/**
 * NotifyForm — email capture for drop notifications.
 *
 * Same visual pattern as EmailCapture but with "Notify Me" copy.
 * Currently a no-op submit (demo only).
 */
export function NotifyForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setStatus('submitting');
    await new Promise((r) => setTimeout(r, 600));
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <p className="text-sm text-bone">
        You&apos;re on the list. We&apos;ll email you when Drop 05 goes live.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-md border border-bone/20"
      aria-label="Drop notification signup"
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
        {status === 'submitting' ? 'Sending…' : 'Notify Me'}
      </button>
    </form>
  );
}
