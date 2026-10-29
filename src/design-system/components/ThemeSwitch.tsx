import React, { useEffect, useState } from './react';
import { COPY } from './i18n';
import type { Lang } from './i18n';
import { Icon } from './Icon';
import { getTheme, toggleTheme } from './theme';

export interface ThemeSwitchProps {
  lang?: Lang;
  className?: string;
}

/**
 * Header button that switches dark / light with the 45° sweep.
 * Shows where it takes you: the sun on dark, the moon on light. Which icon shows comes from CSS on
 * html[data-theme], so the right one appears even before the page's JavaScript runs.
 */
export function ThemeSwitch({ lang = 'pt', className }: ThemeSwitchProps) {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const sync = () => setLight(getTheme() === 'light');
    sync();
    // Follow changes made anywhere (another switch, devtools), not only clicks here.
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);
  return (
    <button
      type="button"
      className={'ds-theme-toggle' + (className ? ' ' + className : '')}
      aria-label={COPY[lang].lightTheme}
      aria-pressed={light}
      onClick={() => toggleTheme()}
    >
      <Icon name="sun-o" className="ds-theme-toggle-sun" />
      <Icon name="moon-o" className="ds-theme-toggle-moon" />
    </button>
  );
}
