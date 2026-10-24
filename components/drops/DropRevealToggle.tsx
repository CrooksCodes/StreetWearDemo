'use client';

/**
 * DropRevealToggle — demo-only button that triggers the teaser reveal.
 *
 * Click it to preview the blur-clear animation. In production this would
 * be triggered by the countdown reaching zero.
 */
export function DropRevealToggle({
  revealed,
  onReveal,
}: {
  revealed: boolean;
  onReveal: () => void;
}) {
  if (revealed) return null;

  return (
    <button
      type="button"
      onClick={onReveal}
      className="border border-bone/20 px-6 py-3 text-xs uppercase tracking-widest text-bone transition-colors hover:bg-bone hover:text-ink"
    >
      Reveal Drop (demo)
    </button>
  );
}
