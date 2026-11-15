import { AboutSection } from '../../design-system/components/AboutSection';
import { Highlight } from '../../design-system/components/Highlight';
import type { Lang } from '../../design-system/components/i18n';
import { ABOUT, TECHNOLOGIES } from '../../data/home';

interface AboutProps {
  lang: Lang;
  /** Optimized photo URL (built by astro:assets in Home.astro). */
  photoSrc: string;
}

/** "Sobre mim" with the role as title: "Software" + "Engineer" in the highlight. */
export function About({ lang, photoSrc }: AboutProps) {
  const t = ABOUT[lang];
  return (
    <AboutSection
      title={
        <>
          Software <Highlight>Engineer</Highlight>
        </>
      }
      text={t.text}
      technologiesIntro={t.technologiesIntro}
      technologies={TECHNOLOGIES}
      cta={{ label: t.cta, href: '#contatos' }}
      photo={{ src: photoSrc, alt: t.photoAlt }}
    />
  );
}
