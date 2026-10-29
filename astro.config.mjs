// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://davisoares.com.br',
  integrations: [react()],
  i18n: {
    // English at the root (like the current index.html), Portuguese under /pt-br/.
    defaultLocale: 'en',
    locales: ['en', 'pt-br'],
    routing: { prefixDefaultLocale: false },
  },
});
