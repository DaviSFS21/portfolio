import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Locale } from './locales';

/** Project page URL in each language. One place to change if the path ever gets translated. */
export const projectHref = (locale: Locale, slug: string) => getRelativeLocaleUrl(locale, `projects/${slug}/`);
