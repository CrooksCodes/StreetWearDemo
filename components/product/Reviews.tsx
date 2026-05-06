import Image from 'next/image';
import type { Review } from '@/lib/types';
import { StarRating } from '@/components/ui/StarRating';
import { averageRating } from '@/lib/utils';

/**
 * Reviews — PDP review section. Shows aggregate rating + individual cards.
 *
 * Server-rendered (no client interactivity needed for read-only display);
 * keeps the JS bundle on the PDP smaller and lets the rating stars appear
 * in the initial HTML payload, which Lighthouse credits as fast LCP content.
 */
export function Reviews({ reviews }: { reviews: Review[] }) {
  const avg = averageRating(reviews.map((r) => r.rating));

  if (reviews.length === 0) {
    return (
      <section aria-labelledby="reviews-heading" className="py-12">
        <h2 id="reviews-heading" className="font-display text-3xl">
          Reviews
        </h2>
        <p className="mt-4 text-sm text-bone-muted">
          No reviews yet. Be the first to share your fit.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="reviews-heading" className="py-12">
      <header className="mb-10 flex flex-col gap-2 border-b border-bone/10 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="reviews-heading" className="font-display text-3xl">
            Reviews
          </h2>
          <p className="mt-2 text-sm text-bone-muted">
            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} from verified buyers
          </p>
        </div>
        {avg !== null && (
          <div className="flex items-center gap-3">
            <StarRating rating={avg} size={20} className="text-bone" />
            <span className="font-display text-2xl">{avg.toFixed(1)}</span>
            <span className="text-xs uppercase tracking-widest text-bone-muted">/ 5</span>
          </div>
        )}
      </header>

      <ul className="grid gap-8 md:grid-cols-2">
        {reviews.map((review) => (
          <li key={review.id} className="border-b border-bone/10 pb-8 last:border-b-0">
            <div className="flex items-center gap-3">
              <StarRating rating={review.rating} className="text-bone" />
              {review.verifiedBuyer && (
                <span className="text-[10px] uppercase tracking-widest text-bone-muted">
                  Verified Buyer
                </span>
              )}
            </div>

            <h3 className="mt-3 text-base font-medium text-bone">{review.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-bone-muted">{review.body}</p>

            {review.photoUrl && (
              <div className="relative mt-4 aspect-[4/5] w-32 overflow-hidden bg-ink-50">
                <Image
                  src={review.photoUrl}
                  alt={`Photo from ${review.author}'s review`}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            )}

            <p className="mt-4 text-xs text-bone-dim">
              {review.author} · {new Date(review.createdAt).toLocaleDateString('en-CA', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
