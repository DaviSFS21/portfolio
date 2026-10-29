import React from './react';
import { Button } from './Button';
import { TechIcon } from './TechIcon';
import type { TechName } from './techPaths';

export interface AboutSectionProps {
  /** Title; put the last word in a <Highlight>, like "Desenvolvedor <Highlight>Fullstack</Highlight>". */
  title: unknown;
  /** One paragraph per array item. */
  text: string | string[];
  /** Portrait shown on the left (420px wide on desktop, 300px on phones). */
  photo?: { src: string; alt: string };
  /** Technologies shown as 45px Devicon icons under the text. */
  technologies?: TechName[];
  /** Text before the icons, e.g. "Algumas das tecnologias que domino/estudo:". */
  technologiesIntro?: string;
  /** Button under the text. */
  cta?: { label: string; href: string };
  /** Anchor id. Default: "sobre". */
  id?: string;
  className?: string;
}

/** "Sobre mim": portrait and text side by side, technology icons and one button. */
export function AboutSection({ title, text, photo, technologies = [], technologiesIntro, cta, id = 'sobre', className }: AboutSectionProps) {
  const paragraphs = Array.isArray(text) ? text : [text];
  return (
    <section id={id} className={'ds-about' + (className ? ' ' + className : '')}>
      <div className="ds-about-inner">
        {photo && <img className="ds-about-photo" src={photo.src} alt={photo.alt} />}
        <div className="ds-about-text">
          <h2 className="ds-block-title">{title as any}</h2>
          {paragraphs.map((p, i) => <p key={i} className="ds-about-paragraph">{p}</p>)}
          {technologiesIntro && <p className="ds-about-paragraph">{technologiesIntro}</p>}
          {technologies.length > 0 && (
            <div className="ds-about-tech">
              {technologies.map(t => <TechIcon key={t} name={t} />)}
            </div>
          )}
          {cta && <div className="ds-about-cta"><Button href={cta.href}>{cta.label}</Button></div>}
        </div>
      </div>
    </section>
  );
}
