import { Marquee } from '@/components/ui/Marquee';

/**
 * PressMarquee — "as worn by / press" placeholder strip.
 * Replace these names with actual press wins if any ever land.
 */
const PRESS = [
  'HIGHSNOBIETY',
  'COMPLEX',
  'HYPEBEAST',
  'GQ',
  'i-D MAGAZINE',
  'COOL HUNTING',
  'SSENSE EDITORIAL',
] as const;

export function PressMarquee() {
  return <Marquee items={PRESS} />;
}
