import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Container — gives every section the same horizontal rhythm.
 * Editorial layouts breathe at large widths (max-w-screen-2xl), but tighten
 * to ~720px when content is text-heavy (set via `width="prose"`).
 */
type Width = 'wide' | 'default' | 'prose';

const widths: Record<Width, string> = {
  wide: 'max-w-screen-2xl',
  default: 'max-w-screen-xl',
  prose: 'max-w-3xl',
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  width?: Width;
  children: ReactNode;
}

export function Container({ width = 'default', className, children, ...rest }: Props) {
  return (
    <div className={cn('mx-auto w-full px-6 md:px-10', widths[width], className)} {...rest}>
      {children}
    </div>
  );
}
