import { FactSheet } from '../../design-system/components/FactSheet';
import type { Lang } from '../../design-system/components/i18n';
import type { TechName } from '../../design-system/components/techPaths';

interface ProjectFactsProps {
  lang: Lang;
  facts: { label: string; value?: string; tech?: TechName[]; href?: string }[];
}

/** The design system's FactSheet; a fact with href becomes a link (the project's website). */
export function ProjectFacts({ lang, facts }: ProjectFactsProps) {
  return (
    <FactSheet
      lang={lang}
      facts={facts.map((f) => ({
        label: f.label,
        tech: f.tech,
        value: f.href ? (
          <a href={f.href} target="_blank" rel="noopener">
            {f.value}
          </a>
        ) : (
          f.value
        ),
      }))}
    />
  );
}
