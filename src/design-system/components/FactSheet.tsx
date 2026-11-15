import React from './react';
import { COPY } from './i18n';
import type { Lang } from './i18n';
import { TechIcon } from './TechIcon';
import type { TechName } from './techPaths';

export interface Fact {
  /** "Papel", "Período", "Stack"… */
  label: string;
  /** Plain text or any inline content (a link, for instance). */
  value?: unknown;
  /** Technologies rendered as Devicon icons with their names. */
  tech?: TechName[];
}

export interface FactSheetProps {
  facts: Fact[];
  /** Heading above the sheet. Default: "Ficha técnica" / "Fact sheet". Pass "" to hide it. */
  title?: string;
  lang?: Lang;
  className?: string;
}

/** The project's fact sheet: label/value pairs under a thick rule, in as many columns as fit. */
export function FactSheet({ facts, title, lang = 'pt', className }: FactSheetProps) {
  const heading = title == null ? COPY[lang].factSheet : title;
  return (
    <section className={'ds-facts' + (className ? ' ' + className : '')}>
      <div className="ds-container">
        {heading && <h2 className="ds-label ds-facts-title">{heading}</h2>}
        <dl className="ds-facts-list">
          {facts.map(f => (
            <div key={f.label} className="ds-fact">
              <dt className="ds-label">{f.label}</dt>
              <dd>
                {f.value as any}
                {f.tech && f.tech.length > 0 && (
                  <span className="ds-fact-tech">
                    {f.tech.map(name => <TechIcon key={name} name={name} showLabel />)}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
