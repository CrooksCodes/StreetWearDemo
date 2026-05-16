import type { Config } from 'tailwindcss';

/**
 * Design system for the clothing brand demo.
 *
 * Aesthetic targets: Fear of God, Aimé Leon Dore, Represent, Essentials.
 * Dark-by-default, off-white type, single accent (deep burgundy) used sparingly
 * — accent should feel like a punctuation mark, not a wash.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Near-black, tinted warm toward the oxblood hue. The shift is sub-perceptual
        // (R=11, G=9, B=8 vs equal-channel #0A0A0A) but it's enough to give the
        // canvas a body warmth that pure neutrals lack. Per DESIGN.md: tint every
        // neutral toward the brand hue rather than leaving it mathematically grey.
        ink: {
          DEFAULT: '#0B0908',
          50: '#1B1816',
          100: '#15120F',
        },
        // Off-white, paper-cream rather than sterile white. `dim` is sized to
        // clear WCAG AA (4.5:1) on `ink` for body text — verified against the
        // warm-tinted ink (#0B0908) since slight warming tightened the ratio
        // vs. the original neutral #0A0A0A.
        bone: {
          DEFAULT: '#F5F2EC',
          muted: '#A8A39B',
          dim: '#807C75',
        },
        // Single accent — deep oxblood burgundy
        oxblood: {
          DEFAULT: '#6E1A24',
          light: '#8E2330',
        },
      },
      fontFamily: {
        // Archivo carries the display weight — a tight grotesque, not a serif.
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
        display: ['var(--font-archivo)', 'ui-sans-serif', 'system-ui'],
      },
      fontWeight: {
        // Display headings render black by default — see .font-display in
        // globals.css. Kept here so utilities like `font-display-black` read
        // intentionally at call sites.
        'display-black': '900',
      },
      fontSize: {
        // Streetwear display sizes — homepage hero needs to feel oversized
        // and poster-heavy. Tracking is pulled tighter than editorial defaults
        // so the heavy grotesque reads as one solid block.
        'display-1': ['clamp(3rem, 10vw, 8rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'display-2': ['clamp(2.5rem, 8vw, 6rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'display-3': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '0.96', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        widest: '0.2em',
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
