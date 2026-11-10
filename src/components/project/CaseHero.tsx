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
  /** The project's own brand gradient, in place of the site's purple one. */
  background?: string;
  /** The project's own typeface for the subtitle (its @font-face lives in global.css). */
  subtitleFont?: string;
  /** Size factor for that typeface (Beetle runs small). */
  subtitleScale?: number;
}

/** Top of a case study: the project's mark in white on the gradient, as the guideline asks. */
export function CaseHero({ lang, title, subtitle, logo, imageSrc, background, subtitleFont, subtitleScale }: CaseHeroProps) {
  const media = logo ? <Logo logo={logo} variant="white" label="" /> : imageSrc ? <img src={imageSrc} alt="" /> : undefined;
  return <ProjectHero lang={lang} title={title} subtitle={subtitle} media={media} background={background} subtitleFont={subtitleFont} subtitleScale={subtitleScale} />;
}
