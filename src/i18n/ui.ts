import type { Lang } from '../design-system/components/i18n';

/** Site copy that is not part of the design system's COPY (src/design-system/components/i18n.ts). */
export const UI = {
  en: {
    title: 'Davi Soares | Software Engineer',
    description: 'Davi Soares, software engineer. Projects, brand identities and contact.',
    themeGroup: 'Theme',
    dark: 'Dark',
    light: 'Light',
    lightTheme: 'Light theme',
  },
  pt: {
    title: 'Davi Soares | Software Engineer',
    description: 'Davi Soares, software engineer. Projetos, identidades visuais e contato.',
    themeGroup: 'Tema',
    dark: 'Escuro',
    light: 'Claro',
    lightTheme: 'Tema claro',
  },
} as const satisfies Record<Lang, Record<string, string>>;
