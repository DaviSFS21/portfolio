import React from './react';
import { COPY } from './i18n';
import type { Lang } from './i18n';

export interface ProjectsSectionProps {
  /** Section title. Default: "Projetos" / "Projects". */
  title?: string;
  lang?: Lang;
  /** Anchor id. Default: "projetos". */
  id?: string;
  /** ProjectCard elements. Wide cards take a full row; half cards pair up two per row. */
  children?: unknown;
  className?: string;
}

/** The projects section: gradient-projects background, centered section-title and a two-column card grid. */
export function ProjectsSection({ title, lang = 'pt', id = 'projetos', children, className }: ProjectsSectionProps) {
  return (
    <section id={id} className={'ds-projects' + (className ? ' ' + className : '')}>
      <div className="ds-container">
        <h2 className="ds-section-title">{title || COPY[lang].projects}</h2>
        <div className="ds-projects-grid">{children as any}</div>
      </div>
    </section>
  );
}
