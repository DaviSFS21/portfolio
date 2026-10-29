import React from './react';
import { COPY } from './i18n';
import type { Lang } from './i18n';

export interface FooterProps {
  lang?: Lang;
  /** Copyright year. Default: the current year. */
  year?: number;
  /** Where the author's name links. Default: the GitHub profile. */
  authorHref?: string;
  className?: string;
}

/** Copyright strip: gradient-footer with footer-overlay, one centered line. */
export function Footer({ lang = 'pt', year = new Date().getFullYear(), authorHref = 'https://github.com/DaviSFS21', className }: FooterProps) {
  const t = COPY[lang];
  return (
    <footer className={'ds-footer' + (className ? ' ' + className : '')}>
      <div className="ds-footer-inner">
        {t.designedBy}{' '}
        <a href={authorHref} target="_blank" rel="noopener">Davi Soares</a>. © {year} {t.rights}
      </div>
    </footer>
  );
}
