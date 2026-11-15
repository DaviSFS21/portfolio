// Scroll reveal from the brand's motion rules: blocks marked data-reveal="up" | "right" | "in"
// fade in when they enter the screen, in duration-reveal with ease-reveal.
// The hidden start state only applies while <html> has the class ds-reveal-ready, so a page that
// never calls initReveal (or runs without JavaScript) shows everything.
// Pages that want no flash add ds-reveal-ready in an inline <head> script; if initReveal then never
// runs, a CSS fallback shows the blocks after 4s.

const READY = 'ds-reveal-ready';
const ON = 'ds-reveal-on';
const REVEALED = 'is-revealed';

const reducedMotion = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

/** Start revealing [data-reveal] blocks under `root`. Returns a function that stops observing. */
export function initReveal(root: ParentNode = document): () => void {
  const html = document.documentElement;
  if (reducedMotion() || !('IntersectionObserver' in window)) {
    html.classList.remove(READY);
    return () => {};
  }
  html.classList.add(READY, ON);

  const observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        observer.unobserve(el);
        el.classList.add(REVEALED);
        // Once shown, drop the reveal styles so the block's own transitions (card hover) work again.
        const done = () => {
          el.removeEventListener('transitionend', onEnd);
          el.removeAttribute('data-reveal');
          el.classList.remove(REVEALED);
        };
        const onEnd = (e: Event) => {
          if (e.target === el) done();
        };
        el.addEventListener('transitionend', onEnd);
        window.setTimeout(done, 3000);
      }
    },
    { rootMargin: '0px 0px -10% 0px' }
  );

  root.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
  return () => observer.disconnect();
}
