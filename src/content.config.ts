// Content collections: Astro reads these files at build time and checks every field against the schema,
// so a missing translation or a broken image path fails the build instead of reaching the site.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Same text in both languages, side by side in one file, so a translation is never forgotten.
 * Strict: an unknown key fails the build. In YAML, an unquoted comma inside { pt: ..., en: ... }
 * splits the text into a new key, and this is what catches it.
 */
const localized = z.strictObject({ pt: z.string(), en: z.string() });
const localizedList = z.strictObject({ pt: z.array(z.string()), en: z.array(z.string()) });
const tech = z.enum(['java', 'spring', 'postgresql', 'mysql', 'rails', 'react', 'typescript', 'docker', 'git']);

/** One project per folder: src/content/projects/<slug>/project.yaml plus its images. */
const projects = defineCollection({
  loader: glob({ pattern: '*/project.yaml', base: './src/content/projects', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: ({ image }) => {
    const picture = z.object({ src: image(), alt: localized, caption: localized.optional() });
    const block = z.discriminatedUnion('type', [
      z.object({ type: z.literal('prose'), text: localizedList }),
      z.object({ type: z.literal('quote'), text: localized, cite: z.string().optional() }),
      z.object({ type: z.literal('stats'), items: z.array(z.object({ value: z.string(), label: localized })) }),
      picture.extend({ type: z.literal('figure'), size: z.enum(['text', 'wide', 'full']).optional(), frame: z.enum(['none', 'dark']).optional() }),
      z.object({ type: z.literal('gallery'), items: z.array(picture), columns: z.union([z.literal(2), z.literal(3)]).optional(), frame: z.enum(['none', 'dark']).optional() }),
      z.object({ type: z.literal('logo-animation'), caption: localized.optional() }),
    ]);
    return z.object({
      title: z.string(),
      /** Position in the list of projects (Home and "next project"). */
      order: z.number(),
      template: z.enum(['case-study', 'quick']),
      /** One or two sentences: the card text on the Home and the page's description. */
      summary: localized,
      hero: z.object({ logo: z.enum(['monogram']).optional(), image: image().optional(), subtitle: localized.optional() }).optional(),
      facts: z.array(z.object({ label: localized, value: localized.optional(), tech: z.array(tech).optional() })),
      chapters: z.array(z.object({ title: localized, blocks: z.array(block) })).optional(),
    });
  },
});

export const collections = { projects };
