import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export default function ProductNotFound() {
  return (
    <Container width="wide" className="flex min-h-[60vh] flex-col items-center justify-center pt-32 text-center">
      <p className="text-xs uppercase tracking-widest text-bone-muted">404</p>
      <h1 className="mt-4 font-display text-display-2 leading-none">
        This piece is no longer available.
      </h1>
      <p className="mt-4 max-w-md text-sm text-bone-muted">
        Vitória chapters are limited. When something sells through, it doesn't return.
      </p>
      <Link
        href="/shop"
        className="mt-10 inline-flex items-center gap-3 bg-bone px-8 py-4 text-xs uppercase tracking-widest text-ink hover:bg-bone-muted"
      >
        Shop Current Drop
      </Link>
    </Container>
  );
}
