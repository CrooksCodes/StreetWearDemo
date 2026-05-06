'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

/**
 * Root error boundary for the App Router.
 *
 * Required by Next.js — without it, an uncaught render error in any segment
 * falls through to the framework default, which is what produces the
 * "Missing required error components, refreshing…" message in dev.
 *
 * Must be a Client Component (hence `'use client'`) so it can render
 * recovery UI even after a server-component throw.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production this is where we'd ship to Sentry / Logtail. For the
    // demo we just log; the digest is the redacted server-side error id.
    console.error('Vitória — render error:', error);
  }, [error]);

  return (
    <Container
      width="wide"
      className="flex min-h-[70vh] flex-col items-center justify-center pt-32 text-center"
    >
      <p className="text-xs uppercase tracking-widest text-bone-muted">Error</p>
      <h1 className="mt-4 font-display text-display-2 leading-none">
        Something didn't render the way it should.
      </h1>
      <p className="mt-4 max-w-md text-sm text-bone-muted">
        The page hit an unexpected state. Try again — and if it persists, head home.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="bg-bone px-8 py-4 text-xs uppercase tracking-widest text-ink hover:bg-bone-muted"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-bone underline underline-offset-4 hover:text-bone-muted"
        >
          Return Home
        </Link>
      </div>
    </Container>
  );
}
