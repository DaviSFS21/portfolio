import { ProjectsSection } from '../../design-system/components/ProjectsSection';
import { ProjectCard } from '../../design-system/components/ProjectCard';
import type { ProjectCardProps } from '../../design-system/components/ProjectCard';
import type { Lang } from '../../design-system/components/i18n';

interface ProjectsProps {
  lang: Lang;
  /** Cards ready to render: localized text and optimized image URLs (built in Home.astro). */
  cards: (ProjectCardProps & { key: string })[];
}

export function Projects({ lang, cards }: ProjectsProps) {
  return (
    <ProjectsSection lang={lang}>
      {cards.map(({ key, ...card }) => (
        <ProjectCard key={key} {...card} />
      ))}
    </ProjectsSection>
  );
}
