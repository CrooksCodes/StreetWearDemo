import type { Metadata } from 'next';
import type { ReactNode } from 'react';

/**
 * Drop 05 layout — exports metadata since the page is a client component.
 */
export const metadata: Metadata = {
  title: 'Drop 05 — Coming Soon',
  description:
    'Drop 05 — Fall 2026. Three new silhouettes, one new fabric, the heaviest chapter we\'ve ever cut. Sign up to be notified.',
  alternates: { canonical: '/drops/drop-05' },
};

export default function DropLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
