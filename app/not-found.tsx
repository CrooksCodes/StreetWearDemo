import Link from 'next/link';
import { Container } from '@/components/ui/Container';

/**
 * Root 404 boundary for the App Router.
 *
 * Without this file, Next.js falls back to a built-in error overlay that
 * (in dev) emits "Missing required error components, refreshing…" — the
 * App Router contract requires a route-tree-level not-found component.
 *
 * The product-specific 404 at app/products/[slug]/not-found.tsx still
 * applies for missing product slugs; this catches everything else.
 */
export default function NotFound() {
  return (
    <Container
      width="wide"
      className="flex min-h-[70vh] flex-col items-center justify-center pt-32 text-center"
    >
      <p className="text-xs uppercase tracking-widest text-bone-muted">404</p>
      <h1 className="mt-4 font-display text-display-2 leading-none">
        That page isn't part of this chapter.
      </h1>
      <p className="mt-4 max-w-md text-sm text-bone-muted">
        Either the link is from a previous drop or it never existed.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-3 bg-bone px-8 py-4 text-xs uppercase tracking-widest text-ink hover:bg-bone-muted"
      >
        Return Home
      </Link>
    </Container>
  );
}
