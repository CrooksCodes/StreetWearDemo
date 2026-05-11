import type { UpcomingDrop } from './types';

/**
 * Upcoming drop data for the countdown/reveal mechanic.
 *
 * The drop date is set to September 2026 — far enough in the future
 * that the countdown timer always shows positive values during the pitch.
 */

const teaserImg = (id: string, alt: string) => ({
  url: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`,
  alt,
});

export const upcomingDrop: UpcomingDrop = {
  id: 'drop_05',
  name: 'Drop 05',
  tagline: 'Fall 2026 — The next chapter.',
  dropDate: '2026-09-15T12:00:00-04:00',
  teaserImages: [
    teaserImg('photo-1591047139829-d91aecb6caea', 'Teaser 01 — silhouette of outerwear piece'),
    teaserImg('photo-1551489186-cf8726f514f8', 'Teaser 02 — fabric texture close-up'),
    teaserImg('photo-1620799140408-edc6dcb6d633', 'Teaser 03 — hardware detail'),
  ],
  teaserCopy:
    'Three new silhouettes. One new fabric. The heaviest chapter we\'ve ever cut. Sign up to be first in line.',
};
