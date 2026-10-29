import React from './react';
import { COPY } from './i18n';
import type { Lang } from './i18n';

export interface ProjectHeroProps {
  /** Project name. Visible when there is no `media`; otherwise it stays as a hidden h1 for screen readers and search engines. */
  title: string;
  /** The project's mark or cover (an <img>, a <Logo>, an <AnimatedLogo>…), centered on the gradient. */
  media?: unknown;
  /** Width of the media box (any CSS width). Default: up to 420px, shrinking with the viewport. */
  mediaWidth?: string;
  /** Line under the mark, like the site's "brand guideline". */
  subtitle?: string;
  lang?: Lang;
  /** Where the scroll indicator points. Default: "#conteudo". */
  scrollTarget?: string;
  /** Default: "Projeto" / "Project". */
  scrollLabel?: string;
  /** Default: "100vh", like the site's project pages. */
  height?: string;
  className?: string;
}

/** Top of a case study: gradient-hero at full height with the project's mark and a subtitle, like the site's /idv pages. */
export function ProjectHero({ title, media, mediaWidth, subtitle, lang = 'pt', scrollTarget = '#conteudo', scrollLabel, height = '100vh', className }: ProjectHeroProps) {
  return (
    <section className={'ds-hero ds-project-hero' + (className ? ' ' + className : '')} style={{ minHeight: height }}>
      {media ? (
        <>
          <h1 className="ds-sr-only">{title}</h1>
          <div className="ds-project-hero-media" style={mediaWidth ? { width: mediaWidth } : undefined}>{media as any}</div>
        </>
      ) : (
        <h1 className="ds-project-hero-title">{title}</h1>
      )}
      {subtitle && <p className="ds-project-hero-subtitle">{subtitle}</p>}
      <a className="ds-scroll" href={scrollTarget}>
        <span className="ds-scroll-mouse" aria-hidden="true" />
        <span className="ds-scroll-label">{scrollLabel || COPY[lang].project}</span>
      </a>
    </section>
  );
}
