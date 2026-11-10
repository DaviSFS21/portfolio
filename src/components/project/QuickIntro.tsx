import { ProjectIntro } from '../../design-system/components/ProjectIntro';
import { Button } from '../../design-system/components/Button';
import type { Lang } from '../../design-system/components/i18n';

interface QuickIntroProps {
  lang: Lang;
  title: string;
  kicker?: string;
  lead?: string;
  /** Back to the Home's projects section, in the page's language. */
  backHref: string;
  site?: { href: string; label: string };
}

/** Top of a quick project: back link, kicker, title, lead and the button to the live website. */
export function QuickIntro({ lang, title, kicker, lead, backHref, site }: QuickIntroProps) {
  const actions = site ? (
    <Button href={site.href} target="_blank">
      {site.label}
    </Button>
  ) : undefined;
  return <ProjectIntro lang={lang} title={title} kicker={kicker} lead={lead} backHref={backHref} actions={actions} />;
}
