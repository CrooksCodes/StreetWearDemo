'use client';

import { useEffect } from 'react';

/**
 * ScrollToTopOnLoad — forces the viewport to the top on a hard load / refresh.
 *
 * Browsers restore the previous scroll position on reload by default. Setting
 * `scrollRestoration` to 'manual' disables that, and the scrollTo call lands
 * the user at the top. Mounted once in the root layout; client-side route
 * changes are already handled by Next's own scroll handling.
 */
export function ScrollToTopOnLoad() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
