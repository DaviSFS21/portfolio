import React from './react';
import { COPY } from './i18n';
import type { Lang } from './i18n';
import { Icon } from './Icon';
import { Highlight } from './Highlight';
import { Logo } from './Logo';

export interface SocialLink {
  type: 'linkedin' | 'github' | 'instagram';
  /** Visible text, e.g. "Davi Soares" or "DaviSFS21". */
  label: string;
  href: string;
}

export interface ContactsProps {
  lang?: Lang;
  /** Resume PDF. Renders "Veja o meu currículo [aqui]" with the highlight as the link. */
  resumeHref?: string;
  socials?: SocialLink[];
  email?: string;
  /** Show the monogram under the resume callout: theme ink by default, full color on mouse over (like the site's image swap). Default: true. */
  showLogo?: boolean;
  /** Anchor id. Default: "contatos". */
  id?: string;
  className?: string;
}

/** Contact block above the footer: resume callout, social links and e-mail, each under a callout title. */
export function Contacts({ lang = 'pt', resumeHref, socials = [], email, showLogo = true, id = 'contatos', className }: ContactsProps) {
  const t = COPY[lang];
  return (
    <section id={id} className={'ds-contacts' + (className ? ' ' + className : '')}>
      <div className="ds-container ds-contacts-grid">
        <div className="ds-contacts-col">
          {resumeHref && (
            <div className="ds-contacts-block">
              <h2 className="ds-callout">
                {t.resume} <Highlight href={resumeHref} target="_blank">{t.resumeLink}</Highlight>
              </h2>
              {showLogo && (
                <div className="ds-contacts-logo">
                  <Logo className="ds-contacts-logo-base" variant="ink" label="Monograma de Davi Soares" />
                  <Logo className="ds-contacts-logo-hover" variant="color" label="" />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="ds-contacts-col">
          {socials.length > 0 && (
            <div className="ds-contacts-block">
              <h2 className="ds-callout">{t.socials}</h2>
              <ul className="ds-contacts-links">
                {socials.map(s => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener">
                      <Icon name={s.type} /> {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {email && (
            <div className="ds-contacts-block">
              <h2 className="ds-callout">{t.emailCallout}</h2>
              <ul className="ds-contacts-links">
                <li>
                  <a href={'mailto:' + email}>
                    <Icon name="envelope-o" /> {email}
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
