import React, { useEffect, useState } from './react';
import { COPY } from './i18n';
import type { Lang } from './i18n';
import { Icon } from './Icon';

export interface BackToTopProps {
  lang?: Lang;
  /** Scroll distance in px before the button appears. Default: the viewport height (the end of the hero). */
  threshold?: number;
  /** Fixed 30px from the bottom-right corner. Default: true. With false it renders in place, always visible. */
  fixed?: boolean;
  className?: string;
}

const reducedMotion = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

/** Square button that appears after the hero and scrolls back to the top. */
export function BackToTop({ lang = 'pt', threshold, fixed = true, className }: BackToTopProps) {
  const [visible, setVisible] = useState(!fixed);
  useEffect(() => {
    if (!fixed) return;
    const onScroll = () => setVisible(window.scrollY > (threshold != null ? threshold : window.innerHeight));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [fixed, threshold]);
  const classes = ['ds-back-to-top', fixed ? 'is-fixed' : '', visible ? 'is-visible' : '', className || ''].filter(Boolean).join(' ');
  return (
    <button
      type="button"
      className={classes}
      aria-label={COPY[lang].backToTop}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' })}
    >
      <Icon name="chevron-up" />
    </button>
  );
}
