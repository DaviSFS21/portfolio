import React, { useRef } from './react';
import { COPY } from './i18n';
import type { Lang } from './i18n';
import { AnimatedLogo } from './AnimatedLogo';

export interface HeroProps {
  /** Role under the signature. Default: "software engineer" (English in both languages). */
  role?: string;
  /** Page title read by screen readers and search engines (the signature itself is decorative). Default: "Davi Soares". */
  name?: string;
  /** Language for the scroll label. Default: 'pt'. */
  lang?: Lang;
  /** Where the scroll indicator points. Default: "#sobre". */
  scrollTarget?: string;
  /** Scroll indicator label. Default: "Sobre mim" / "About me". */
  scrollLabel?: string;
  /** Section height. Default (CSS): the screen minus the header, so header + hero fill the first screen. */
  height?: string;
  className?: string;
}

/** Top of the site: gradient-hero at full height, the animated white signature, the role and a scroll indicator. */
export function Hero({ role = 'software engineer', name = 'Davi Soares', lang = 'pt', scrollTarget = '#sobre', scrollLabel, height, className }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  return (
    <section ref={sectionRef} className={'ds-hero' + (className ? ' ' + className : '')} style={height ? { minHeight: height } : undefined}>
      <h1 className="ds-sr-only">{name}</h1>
      <AnimatedLogo
        className="ds-hero-logo"
        logo="signature"
        variant="white"
        boundsRef={sectionRef}
        guideColor="#ffffff"
        guideOpacity={0.38}
        label=""
      />
      <p className="ds-hero-role">{role}</p>
      <a className="ds-scroll" href={scrollTarget}>
        <span className="ds-scroll-mouse" aria-hidden="true" />
        <span className="ds-scroll-label">{scrollLabel || COPY[lang].aboutMe}</span>
      </a>
    </section>
  );
}
