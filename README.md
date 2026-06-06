# Grammar Atlas

A multilingual grammar reference and comparison platform.

> Core idea: "Understand grammar through language comparison."

Users compare how the same grammar concept works across multiple languages (Spanish, English, Chinese) while consuming the content in their preferred interface language (English, Spanish, Chinese).

## Tech Stack

| Layer | Technology |
|-------|------------|
| Core Framework | **Astro v5** (SSG, routing, layouts, SEO) |
| Interactive Layer | Astro islands (vanilla TS); Preact on demand |
| Language | TypeScript (strict mode, `verbatimModuleSyntax`) |
| Content | MDX + Astro Content Layer API (Zod schemas, `glob` loader) |
| Styling | Tailwind CSS v4 (CSS-first, `@theme` tokens) |
| Search | Pagefind (static, no backend) |
| Deployment | GitHub Pages + GitHub Actions |

## Development

```bash
npm install
npm run dev
npm run build   # also rebuilds Pagefind index
```

## Project Structure

```
src/
  components/astro/       # Astro UI components
  components/interactive/ # Client-side islands
  config/languages.ts     # SINGLE SOURCE OF TRUTH for languages
  content/                # Content collections (topics, comparisons, languages, guides, cheatsheets)
  i18n/                   # UI translations (en, es, zh)
  layouts/                # Astro layouts
  lib/utils.ts            # Routing helpers
  pages/[lang]/           # Locale-prefixed routes
  styles/global.css       # Tailwind v4 tokens
```

## Architecture

- **Centralized language config**: `src/config/languages.ts` drives schemas, routing, and UI. Adding a language requires editing only this file and one translation JSON.
- **Localized routing**: `[lang]` prefix for all pages. Root `/` redirects to `/en/`.
- **Data-driven**: No hardcoded languages in components. All references iterate over `analyzedLanguages` / `interfaceLocales`.
- **SEO**: hreflang alternates, sitemap, JSON-LD, OG tags, canonical URLs.

## Content

Grammar reference lives in `src/content/` as MDX with Zod-validated frontmatter. See `ref/` for the canonical grammar reference used by content authors.

## License

MIT
