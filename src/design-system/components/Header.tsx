import React from './react';
import { COPY } from './i18n';
import type { Lang } from './i18n';
import { Icon } from './Icon';
import { Flag } from './Flag';
import { LanguageSwitch } from './LanguageSwitch';
import type { LanguageSwitchProps } from './LanguageSwitch';

export interface HeaderProps {
  /** Name shown on the left, in Bebas Neue. Default: "Davi Soares". */
  name?: string;
  /** Link for the name. Default: "/". */
  homeHref?: string;
  /** Current language. Default: 'pt'. */
  lang?: Lang;
  /** Show the "idioma: pt-br ›" hint that fades out after 4.5s, like the site. Default: false. */
  hint?: boolean;
  /** Props passed to the LanguageSwitch (onChange or hrefs). */
  languageSwitch?: Omit<LanguageSwitchProps, 'lang'>;
  /** Brazil flag after the name, as origin (not language). Default: false. */
  origin?: boolean;
  /** Extra controls after the language switch, like the theme switch. */
  children?: React.ReactNode;
  className?: string;
}

/** Site header: name on the left, language switch on the right, on the page surface. */
export function Header({ name = 'Davi Soares', homeHref = '/', lang = 'pt', hint = false, origin = false, languageSwitch, children, className }: HeaderProps) {
  return (
    <header className={'ds-header' + (className ? ' ' + className : '')}>
      <div className="ds-header-brand">
        <a className="ds-header-name" href={homeHref}>{name}</a>
        {origin && <Flag label={COPY[lang].brazil} />}
      </div>
      <div className="ds-header-actions">
        {hint && (
          <span className="ds-header-hint">
            {COPY[lang].languageHint} <Icon name="angle-right" />
          </span>
        )}
        <LanguageSwitch lang={lang} {...languageSwitch} />
        {children}
      </div>
    </header>
  );
}
