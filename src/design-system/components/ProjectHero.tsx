import React from './react';
import { COPY } from './i18n';
import type { Lang } from './i18n';

export interface ProjectHeroProps {
  /** Project name. Visible when there is no `media`; otherwise it stays as a hidden h1 for screen readers and search engines. */
  title: string;
  /** The project's mark or cover (an <img>, a <Logo>, an <AnimatedLogo>…), centered on the gradient. */
  media?: unknown;
  /** Fixed width of the media box (any CSS width). Default: the mark is up to 240px high, shrinking with the viewport, whatever its proportion. */
  mediaWidth?: string;
  /** Line under the mark, like the site's "brand guideline". */
  subtitle?: string;
  lang?: Lang;
  /** Where the scroll indicator points. Default: "#conteudo". */
  scrollTarget?: string;
  /** Default: "Projeto" / "Project". */
  scrollLabel?: string;
  /** Section height. Default (CSS): the screen minus the header, so header + hero fill the first screen. */
  height?: string;
  /** The project's own brand gradient (any CSS background) in place of gradient-hero. Only the project's colors, never a new one. */
  background?: string;
  /** The project's own typeface for the subtitle (a CSS font-family; the page loads the font). Default: the body font. */
  subtitleFont?: string;
  /** Size factor for that typeface when it runs small or large, so the subtitle keeps the usual visual size. Default: 1. */
  subtitleScale?: number;
  className?: string;
}

/** Top of a case study: gradient-hero at full height with the project's mark and a subtitle, like the site's /idv pages. */
export function ProjectHero({ title, media, mediaWidth, subtitle, lang = 'pt', scrollTarget = '#conteudo', scrollLabel, height, background, subtitleFont, subtitleScale, className }: ProjectHeroProps) {
  const subtitleStyle: Record<string, string | number> = {};
  if (subtitleFont) subtitleStyle.fontFamily = subtitleFont;
  if (subtitleScale) subtitleStyle['--ds-subtitle-scale'] = subtitleScale;
  const style = height || background ? { ...(height ? { minHeight: height } : {}), ...(background ? { background } : {}) } : undefined;
  return (
    <section className={'ds-hero ds-project-hero' + (className ? ' ' + className : '')} style={style}>
      {media ? (
        <>
          <h1 className="ds-sr-only">{title}</h1>
          <div className={'ds-project-hero-media' + (mediaWidth ? ' ds-project-hero-media--width' : '')} style={mediaWidth ? { width: mediaWidth } : undefined}>{media as any}</div>
        </>
      ) : (
        <h1 className="ds-project-hero-title">{title}</h1>
      )}
      {subtitle && <p className="ds-project-hero-subtitle" style={Object.keys(subtitleStyle).length ? (subtitleStyle as any) : undefined}>{subtitle}</p>}
      <a className="ds-scroll" href={scrollTarget}>
        <span className="ds-scroll-mouse" aria-hidden="true" />
        <span className="ds-scroll-label">{scrollLabel || COPY[lang].project}</span>
      </a>
    </section>
  );
}
