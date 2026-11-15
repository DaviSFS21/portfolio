import type { Lang } from '../design-system/components/i18n';

/**
 * URL locales (Astro i18n) mapped to the design system's language codes.
 * English lives at the root, Portuguese under /pt-br/.
 */
export const LOCALES = {
  en: { lang: 'en', htmlLang: 'en', home: '/' },
  'pt-br': { lang: 'pt', htmlLang: 'pt-BR', home: '/pt-br/' },
} as const satisfies Record<string, { lang: Lang; htmlLang: string; home: string }>;

export type Locale = keyof typeof LOCALES;
