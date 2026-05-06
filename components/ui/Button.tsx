import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Button — hand-built, no shadcn. Three variants:
 *  - primary: oxblood-on-bone, headline CTAs
 *  - secondary: bone outline, default action
 *  - ghost: no border, used inline (e.g., remove from cart)
 *
 * Sizing aligns with the editorial tracking — the wide letterspacing is a
 * Vitória brand cue and matches the typographic system in tailwind.config.ts.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-bone text-ink hover:bg-bone/90 active:bg-bone/80 disabled:bg-bone/40',
  secondary:
    'border border-bone/30 text-bone hover:border-bone hover:bg-bone/5 disabled:opacity-40',
  ghost: 'text-bone hover:text-bone/70 underline underline-offset-4 disabled:opacity-40',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = 'primary', size = 'md', fullWidth = false, className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-sans font-medium uppercase tracking-widest',
        'transition-colors duration-200 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});
