import React from './react';
import { COPY } from './i18n';
import type { Lang } from './i18n';
import { ProjectCard } from './ProjectCard';
import type { ProjectCardProps } from './ProjectCard';

export interface NextProjectProps {
  /** The card of the project to read next. */
  project: ProjectCardProps;
  /** Default: "Próximo projeto" / "Next project". */
  title?: string;
  lang?: Lang;
  className?: string;
}

/** End of a project page: a callout and one ProjectCard on gradient-projects. */
export function NextProject({ project, title, lang = 'pt', className }: NextProjectProps) {
  return (
    <section className={'ds-next-project' + (className ? ' ' + className : '')}>
      <div className="ds-container">
        <h2 className="ds-callout ds-next-project-title">{title || COPY[lang].nextProject}</h2>
        <div className="ds-next-project-card">
          <ProjectCard newTab={false} {...project} />
        </div>
      </div>
    </section>
  );
}
