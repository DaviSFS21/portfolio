import { ProjectHero } from '../../design-system/components/ProjectHero';
import { Logo } from '../../design-system/components/Logo';
import type { Lang } from '../../design-system/components/i18n';

interface CaseHeroProps {
  lang: Lang;
  title: string;
  subtitle?: string;
  /** The brand's own mark drawn inline (white on the gradient), or an image URL. */
  logo?: 'monogram';
  imageSrc?: string;
}

/** Top of a case study: the project's mark in white on the gradient, as the guideline asks. */
export function CaseHero({ lang, title, subtitle, logo, imageSrc }: CaseHeroProps) {
  const media = logo ? <Logo logo={logo} variant="white" label="" /> : imageSrc ? <img src={imageSrc} alt="" /> : undefined;
  return <ProjectHero lang={lang} title={title} subtitle={subtitle} media={media} />;
}
