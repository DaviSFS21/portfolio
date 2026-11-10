import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import type { Locale } from '../../i18n/locales';
import { LOCALES } from '../../i18n/locales';
import { projectHref } from '../../i18n/routes';
import { PROJECTS } from '../../data/home';

const src = async (img: ImageMetadata, width: number) =>
  img.format === 'svg' ? img.src : (await getImage({ src: img, width, format: 'webp' })).src;

/** Card for "next project": the one after `slug` in the Home's order, back to the first after the last. Always the wide card. */
export async function nextProjectCard(slug: string, locale: Locale) {
  const { lang } = LOCALES[locale];
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  return {
    variant: 'wide' as const,
    title: next.title,
    description: next.description[lang],
    href: projectHref(locale, next.slug),
    // Half-card projects show a brand mark, not a screenshot: the wide card keeps it at the Home's logo size.
    image: { src: await src(next.image, 1040), alt: next.alt[lang], width: next.imageWidth, logo: next.variant === 'half' },
  };
}
