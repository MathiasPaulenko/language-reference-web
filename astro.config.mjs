import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import rehypeSlug from 'rehype-slug';
// Single source of truth for languages (see src/config/languages.ts).
// Adding a new interface language only requires editing that file.
import { localeCodes, DEFAULT_LOCALE, sectionSlugs } from './src/config/languages';

/*
 * Generate static redirects so localized section slugs resolve to the
 * actual Astro pages. e.g. /es/temas/ -> /es/topics/.
 * This is fully data-driven: adding a new locale only requires adding
 * its slugs to src/config/languages.ts.
 */
const redirects = Object.entries(sectionSlugs).reduce((acc, [section, byLocale]) => {
  for (const code of localeCodes) {
    const localized = byLocale[code];
    if (localized !== section) {
      acc[`/${code}/${localized}/`] = `/${code}/${section}/`;
    }
  }
  return acc;
}, {});

export default defineConfig({
  site: 'https://grammarnavigator.com',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [...localeCodes],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  redirects,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/redirect/'),
      xslURL: 'https://grammarnavigator.com/sitemap-style.xsl',
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: Object.fromEntries(localeCodes.map((code) => [code, code])),
      },
    }),
    mdx({
      rehypePlugins: [rehypeSlug],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
