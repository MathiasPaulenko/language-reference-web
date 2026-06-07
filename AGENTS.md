# Agent Rules for Grammar Atlas

## Project Identity

**Grammar Atlas** is a multilingual grammar reference and comparison platform. It is NOT a language course or school. It is a reference library and comparison tool.

> Core idea: "Understand grammar through language comparison."

Users compare how the same grammar concept works across multiple languages while consuming the content in their preferred interface language.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Core Framework | **Astro v5** (SSG, routing, layouts, SEO) |
| Interactive Layer | **Astro islands** (`<script>` + vanilla TS); **Preact** only if a component genuinely needs reactivity |
| Language | **TypeScript** (strict mode, `verbatimModuleSyntax`) |
| Content | **MDX** + Astro Content Layer API (Zod schemas, `glob` loader) |
| Styling | **Tailwind CSS v4** (CSS-first, `@theme` tokens) |
| Search | **Pagefind** (static, no backend) |
| Analytics | **Google Analytics 4** (measurement ID: `G-R0H8MJ5V1P`) |
| Deployment | **GitHub Pages** + GitHub Actions |

---

## Directory Structure

```
language-reference-web/
├── src/
│   ├── components/
│   │   ├── astro/           # Astro UI components (Header, Footer, cards…)
│   │   ├── interactive/     # Client-side islands (vanilla TS / Preact)
│   │   └── shared/          # Shared utilities
│   ├── config/
│   │   └── languages.ts     # SINGLE SOURCE OF TRUTH for languages (see §5)
│   ├── data/
│   │   └── topics.ts        # Static data: topic list, indexes, etc.
│   ├── layouts/
│   │   └── BaseLayout.astro # SEO, hreflang, fonts, header/footer
│   ├── pages/
│   │   ├── [lang]/          # Locale-prefixed routes (en, es, zh…)
│   │   │   ├── index.astro              # Localized homepage
│   │   │   ├── vocabulary/
│   │   │   │   ├── [...slug].astro      # Vocabulary landing page
│   │   │   │   └── words.astro          # Essential words table (paginated)
│   │   │   ├── grammar/
│   │   │   ├── flashcards/
│   │   │   ├── learning-paths/
│   │   │   │   ├── [...slug].astro      # Landing page
│   │   │   │   └── [languageCode].astro # Per-language roadmap
│   │   │   ├── topics/
│   │   │   ├── comparisons/
│   │   │   ├── guides/
│   │   │   ├── cheatsheets/
│   │   │   └── languages/
│   │   └── index.astro      # Root redirect → /en/
│   ├── content/
│   │   ├── config.ts        # Zod schemas (Content Layer API)
│   │   ├── languages/       # Per-language grammar reference
│   │   ├── topics/          # Language-agnostic grammar concepts
│   │   ├── comparisons/     # Side-by-side grammar comparisons
│   │   ├── guides/          # Audience-oriented guides
│   │   ├── cheatsheets/     # Quick-reference tables
│   │   └── vocabulary/      # Word lists and phrase collections (MDX with frontmatter)
│   ├── i18n/
│   │   ├── index.ts         # getUI(locale), languageName(ui, code)
│   │   ├── en.json          # UI strings (canonical)
│   │   ├── es.json
│   │   └── zh.json
│   ├── lib/
│   │   └── utils.ts         # withBase(), localePath(), sectionPath()
│   └── styles/
│       └── global.css       # Tailwind v4 tokens, animations, base styles
├── scripts/                 # Build/generation scripts (translation caches, MDX generators)
├── public/                  # Static assets
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions CI/CD
├── astro.config.mjs         # i18n routing, Tailwind, base path
├── tsconfig.json
├── tailwind.config.js
└── .gitignore
```

---

## Development Rules

### 1. Astro Components

- Use `.astro` files for pages and layouts.
- Define typed props with explicit interfaces.
- Keep business logic in `.ts` utilities, not inline in templates.
- Use `getStaticPaths()` for all dynamic routes (this is a static site).
- Set `<html lang="{lang}" dir="{dir}">` dynamically per page for i18n and Pagefind.

### 2. Interactive Layer (Astro Islands First)

- **Default to Astro components with `<script>` islands** for interactivity (language selector, tabs, accordions, theme toggle).
- Write client-side logic in **vanilla TypeScript**; keep it scoped to the component.
- Only reach for **Preact** when a component genuinely needs reactive state or complex UI. Add the integration on demand.
- When using a framework island, hydrate with the right directive (`client:load`, `client:visible`, `client:idle`) — prefer `client:visible`/`client:idle` to minimize JS.
- Do **not** add Angular, React, or other heavy frameworks — keep the bundle minimal for Core Web Vitals.

### 3. TypeScript

- `strict: true` is mandatory.
- `moduleResolution: "Bundler"` for Astro compatibility.
- `verbatimModuleSyntax: true` — use `import type` for type-only imports.
- Target ES2022.
- Avoid `any`; use `unknown` + type guards.
- Prefer `const` and `readonly`.

### 4. Content Architecture (Astro Content Layer)

- Define Zod schemas in `src/content/config.ts` (Content Layer API with `glob` loader, NOT legacy `type: 'content'`).
- Validate all frontmatter at build time.
- Use consistent content IDs across languages for fallback.
- Use MDX for rich content with embedded components.
- Every content schema extends `baseFields` (title, description, locale, overview, comparisonTable, commonMistakes, relatedTopics, lastUpdated, draft) to enforce the canonical page structure (vision §17).

### 5. Internationalization (i18n) — Data-Driven for N Languages

**`src/config/languages.ts` is the single source of truth.**

- Two independent concerns:
  1. **Languages analyzed** — grammar documented/compared (code + name + color).
  2. **Interface locales** — UI language the user reads in (code + label + htmlLang + dir).
- **Adding an interface language** (e.g. Japanese):
  1. Add entry to `interfaceLocales`.
  2. Add localized segments in `sectionSlugs`.
  3. Create `src/i18n/<code>.json` and register it in `src/i18n/index.ts`.
  Routing, hreflang, language switcher and Astro's i18n config update automatically.
- **Adding an analyzed language** (e.g. Japanese grammar):
  1. Add entry to `analyzedLanguages` (code + name + color hex).
  2. Add its localized name under `languages` in every `src/i18n/*.json`.
  Legends, comparison tables and schemas pick it up automatically.
- **No hardcoded languages in components or styles.** All references iterate over `analyzedLanguages` / `interfaceLocales`.
- Store UI strings in `src/i18n/{lang}.json`. Use `getUI(locale)` to load bundles with fallback to `DEFAULT_LOCALE`.
- Use localized slugs for sections (`/en/topics/articles/` vs `/es/temas/articulos/`).
- `localePath(locale)` and `sectionPath(locale, section, slug?)` are the canonical helpers for building localized routes.
- `BaseLayout` emits `hreflang` for every locale variant + `x-default`, `og:locale`, `dir`, and canonical URL.

### 6. Styling (Tailwind CSS v4)

- Use utility classes; avoid custom CSS when possible.
- Tailwind v4 tokens live in `@theme` inside `src/styles/global.css`.
- **Per-language colors are NOT in CSS vars.** The single source of truth is `src/config/languages.ts` (hex colors applied inline via `style`).
- Follow responsive-first design (mobile → desktop).
- Maintain accessible color contrast ratios.
- Avoid `!important` in Tailwind utilities.

### 7. Design Consistency

All landing and index pages must follow the same visual system.

#### Hero Section (Universal)
Every hero must use **exactly** this structure:
```
<section class="border-b border-line bg-[#2a2520]">
  <div class="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
    <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent">
      {section_label}
    </p>
    <h1 class="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight text-paper sm:text-5xl">
      {page_title}
    </h1>
    <p class="mt-4 max-w-xl text-lg text-paper/70">
      {page_description}
    </p>
  </div>
</section>
```
- **Background**: always `bg-[#2a2520]` (dark warm brown)
- **Label**: `text-xs`, `uppercase`, `tracking-[0.2em]`, `text-accent`. No `font-bold`.
- **Title**: `text-paper` (white-ish)
- **Description**: `text-paper/70`
- **No `mt-8` or extra offsets** on the `<section>` element

#### Method Section
After the hero, every landing page should show a "How it Works" section:
```
<section class="border-y border-line bg-paper-deep">
  <p class="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">Method</p>
  <h2 class="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
  {/* 4 numbered cards in a grid */}
</section>
```
- Cards: `rounded-2xl border border-line bg-paper`, numbered `01–04` in a circle
- Hover: `-translate-y-1`, `border-accent/30`, `shadow-lg`

#### Cards (Categories / Languages / Paths)
All card grids must use this pattern:
```
<a class="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-all hover:shadow-lg hover:border-accent/20">
  {/* Optional color bar */}
  <div class="h-1.5 w-full" style={`background:${color}`} />
  <div class="flex flex-1 flex-col p-8">
    {/* Icon + title + code */}
    {/* Description */}
    {/* Metadata grid with hover reveal */}
    <span class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ...">
      CTA <span>→</span>
    </span>
  </div>
</a>
```
- 3-column grid on desktop: `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`
- Arrow CTA with `group-hover:translate-x-1`

#### Vocabulary Sub-Pages
Words, phrases, expressions, and frequency-lists share a **common layout**:
- Same hero structure (see above)
- Breadcrumb nav below hero
- Language filter buttons
- Paginated table or grid
- Client-side vanilla TS for filtering (no framework)

### 8. SEO & GEO

- Every page needs: title, description, canonical URL, OG tags, `hreflang` alternates.
- Add structured data (JSON-LD) for grammar concepts.
- Generate sitemaps per language.
- Optimize for both traditional search (Google) and AI search (ChatGPT, Perplexity).
- Content structure per page:
  1. Overview
  2. Explanation
  3. Comparison Table
  4. Examples
  5. Common Mistakes
  6. Related Topics

### 8. Search (Pagefind)

- Rebuild Pagefind index on every build: `npm run build && pagefind --site dist`.
- Exclude nav/footer from indexing with `data-pagefind-ignore`.
- Ensure every page has correct `<html lang="...">` for language auto-detection.

### 9. Deployment (GitHub Pages)

- All deploys go through GitHub Actions.
- Set `site` and `base` in `astro.config.mjs` for GitHub Pages subpath.
- Use `trailingSlash: 'always'` for static hosting compatibility.
- Root `/index.html` uses `meta-refresh` redirect to the default locale (`/en/`).

---

## Content Strategy

- **70% Comparative Content**, 30% Language-Specific.
- Focus on comparisons: "Spanish vs English Articles" instead of "What are articles in English?"
- MVP topics: Articles, Pronouns, Tenses, Questions, Word Order.
- Each grammar concept page must include:
  - Side-by-side comparison tables
  - Real examples in all compared languages
  - Common mistakes for multilingual learners

### Content Style Rules

- **Chinese pinyin is mandatory**: Every Chinese character in MDX (body content and frontmatter) must be wrapped in `<ruby>` tags with pinyin in `<rt>`. Example: `<ruby>这<rt>zhè</rt></ruby><ruby>本<rt>běn</rt></ruby><ruby>书<rt>shū</rt></ruby>`.
- **Cross-link articles**: Every new article must link to existing related topics in `relatedTopics` frontmatter and inline in the body prose where relevant. This builds the graph of grammar concepts.

---

## Workflow Rules

- **Before coding**: Verify the task against the project vision and content strategy.
- **Before committing**: Run `npm run build` locally to ensure no build errors.
- **Before deploying**: Ensure all content frontmatter validates against Zod schemas.
- Keep PRs small and focused on a single section or feature.
- Document architectural decisions in code comments when non-obvious.

---

## Communication Style

- Be terse and direct.
- Use file paths with line numbers when referencing code.
- Ask for clarification only when genuinely uncertain.
- Implement changes rather than only suggesting them, unless the user asks for discussion.
- End every task with a concise summary of what was done.
