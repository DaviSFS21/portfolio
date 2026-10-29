// Dark / light theme on <html data-theme>. Dark is the default (the brand's face).
// The change sweeps across the page at 45°, from the bottom-left corner to the top-right one:
// the same direction the color fills the logo. Uses the View Transitions API when the browser has it;
// otherwise, or with reduced motion, the theme changes at once.

export type Theme = 'dark' | 'light';

/** localStorage key that keeps the visitor's choice. */
export const THEME_STORAGE_KEY = 'theme';

/** Class on <html> while the sweep runs; the ::view-transition rules in bundle.css hang on it. */
const SWEEP_CLASS = 'ds-theme-sweeping';

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

const reducedMotion = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode or blocked storage: the theme still changes for this visit.
  }
}

/** Switch to `theme`, with the 45° sweep unless `animate` is false. */
export function setTheme(theme: Theme, { animate = true }: { animate?: boolean } = {}) {
  if (theme === getTheme()) return;
  const doc = document as ViewTransitionDocument;
  if (!animate || reducedMotion() || !doc.startViewTransition) {
    apply(theme);
    return;
  }
  const root = document.documentElement;
  root.classList.add(SWEEP_CLASS);
  const transition = doc.startViewTransition(() => apply(theme));
  transition.finished.finally(() => root.classList.remove(SWEEP_CLASS));
}

export function toggleTheme(options?: { animate?: boolean }) {
  setTheme(getTheme() === 'light' ? 'dark' : 'light', options);
}
