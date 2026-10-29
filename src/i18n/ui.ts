import type { Lang } from '../design-system/components/i18n';

/** Site copy that is not part of the design system's COPY (src/design-system/components/i18n.ts). */
export const UI = {
  en: {
    title: 'Davi Soares | Software Engineer',
    description: 'Davi Soares, software engineer. Projects, brand identities and contact.',
  },
  pt: {
    title: 'Davi Soares | Software Engineer',
    description: 'Davi Soares, software engineer. Projetos, identidades visuais e contato.',
  },
} as const satisfies Record<Lang, Record<string, string>>;
