import React, { useState } from './react';
import { COPY } from './i18n';
import type { Lang } from './i18n';

export interface LanguageSwitchProps {
  /** Active language. Pass it with onChange to control the switch; alone it is the starting value. */
  lang?: Lang;
  /** Called with the chosen language (button mode). */
  onChange?: (lang: Lang) => void;
  /** Link mode: each option is a link to that language's page, like the site's pt-br.html / index.html. */
  hrefs?: Partial<Record<Lang, string>>;
  /** Option labels. Default: PT / EN. */
  labels?: Partial<Record<Lang, string>>;
  className?: string;
}

const LANGS: Lang[] = ['pt', 'en'];

/** Two-position switch for PT / EN. The active option looks like the highlight (marca-texto). */
export function LanguageSwitch({ lang, onChange, hrefs, labels, className }: LanguageSwitchProps) {
  const [internal, setInternal] = useState<Lang>(lang || 'pt');
  const active = onChange && lang ? lang : internal;
  const text = { pt: 'PT', en: 'EN', ...labels };
  const select = (next: Lang) => {
    if (!(onChange && lang)) setInternal(next);
    if (onChange) onChange(next);
  };
  return (
    <div className={'ds-lang' + (className ? ' ' + className : '')} role="group" aria-label={COPY[active].languageGroup} data-active={active}>
      <span className="ds-lang-knob" aria-hidden="true" />
      {LANGS.map(l =>
        hrefs && hrefs[l] ? (
          <a key={l} className="ds-lang-option" href={hrefs[l]} hrefLang={l === 'pt' ? 'pt-BR' : 'en'} aria-current={l === active ? 'true' : undefined}>
            {text[l]}
          </a>
        ) : (
          <button key={l} type="button" className="ds-lang-option" aria-pressed={l === active} onClick={() => select(l)}>
            {text[l]}
          </button>
        )
      )}
    </div>
  );
}
