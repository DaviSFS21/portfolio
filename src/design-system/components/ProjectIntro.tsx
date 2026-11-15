import React from './react';
import { COPY } from './i18n';
import type { Lang } from './i18n';

export interface ProjectIntroProps {
  /** Project name ("CT Bravus"). */
  title: string;
  /** Type and context above the title, e.g. "Landing page · Freelance". */
  kicker?: string;
  /** One or two sentences under the title. */
  lead?: string;
  /** Buttons or links under the lead (e.g. <Button href>Ver o site</Button>). */
  actions?: unknown;
  /** Back link to the projects list. Default: "/#projetos". Pass null to hide. */
  backHref?: string | null;
  lang?: Lang;
  className?: string;
}

/** Compact top of a quick project page: back link, kicker, title, lead and actions, on the page surface. */
export function ProjectIntro({ title, kicker, lead, actions, backHref = '/#projetos', lang = 'pt', className }: ProjectIntroProps) {
  const t = COPY[lang];
  return (
    <section className={'ds-project-intro' + (className ? ' ' + className : '')}>
      <div className="ds-container">
        {backHref && (
          <a className="ds-back-link" href={backHref}>
            <span aria-hidden="true">←</span> {t.projects}
          </a>
        )}
        {kicker && <p className="ds-label ds-project-intro-kicker">{kicker}</p>}
        <h1 className="ds-project-intro-title">{title}</h1>
        {lead && <p className="ds-lead">{lead}</p>}
        {actions ? <div className="ds-project-intro-actions">{actions as any}</div> : null}
      </div>
    </section>
  );
}
