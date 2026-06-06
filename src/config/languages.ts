/**
 * Central language configuration for Grammar Atlas.
 *
 * Two independent concerns are modelled here (see vision §8, §15):
 *   1. `analyzedLanguages` — the languages whose grammar we document/compare.
 *   2. `interfaceLocales`  — the languages the UI/content is presented in.
 *
 * The architecture must scale to any number of languages, so every schema,
 * route and component derives its allowed values from THIS file only.
 *
 * ── To add a new INTERFACE language (e.g. Japanese) ──────────────────
 *   1. Add an entry to `interfaceLocales` below.
 *   2. Add localized segments for it in `sectionSlugs`.
 *   3. Create `src/i18n/<code>.json` and register it in `src/i18n/index.ts`.
 *   Routing, hreflang, the language switcher and Astro's i18n config all
 *   update automatically.
 *
 * ── To add a new ANALYZED language (e.g. Japanese grammar) ───────────
 *   1. Add an entry to `analyzedLanguages` below (code + name + color).
 *   2. Add its localized name under `languages` in every `src/i18n/*.json`.
 *   Legends, comparison tables and schemas pick it up automatically.
 */

/* ------------------------------------------------------------------ */
/* Interface locales (the UI language the user reads in)              */
/* ------------------------------------------------------------------ */

export interface InterfaceLocale {
  readonly code: string;
  readonly label: string; // shown in the language switcher
  readonly htmlLang: string; // value for <html lang="">
  readonly dir: 'ltr' | 'rtl';
}

export const interfaceLocales = [
  { code: 'en', label: 'EN', htmlLang: 'en', dir: 'ltr' },
  { code: 'es', label: 'ES', htmlLang: 'es', dir: 'ltr' },
  { code: 'zh', label: '中文', htmlLang: 'zh', dir: 'ltr' },
] as const satisfies readonly InterfaceLocale[];

export type LocaleCode = (typeof interfaceLocales)[number]['code'];

export const DEFAULT_LOCALE: LocaleCode = 'en';

export const localeCodes = interfaceLocales.map((l) => l.code) as [LocaleCode, ...LocaleCode[]];

export function isLocale(value: string): value is LocaleCode {
  return localeCodes.includes(value as LocaleCode);
}

export function getLocale(code: string): InterfaceLocale | undefined {
  return interfaceLocales.find((l) => l.code === code);
}

/* ------------------------------------------------------------------ */
/* Analyzed languages (the grammar we document)                       */
/* ------------------------------------------------------------------ */

export interface AnalyzedLanguage {
  readonly code: string; // stable id used in frontmatter
  readonly name: string; // English fallback display name
  readonly color: string; // legend color (hex) — the single source of truth
}

export const analyzedLanguages = [
  { code: 'spanish', name: 'Spanish', color: '#b4452a' },
  { code: 'english', name: 'English', color: '#2b5c8a' },
  { code: 'chinese', name: 'Chinese', color: '#2f7a6b' },
] as const satisfies readonly AnalyzedLanguage[];

export type AnalyzedLanguageCode = (typeof analyzedLanguages)[number]['code'];

export const analyzedLanguageCodes = analyzedLanguages.map((l) => l.code) as [
  AnalyzedLanguageCode,
  ...AnalyzedLanguageCode[],
];

export function getAnalyzedLanguage(code: string): AnalyzedLanguage | undefined {
  return analyzedLanguages.find((l) => l.code === code);
}

/* ------------------------------------------------------------------ */
/* Sections — localized slugs per interface locale (§8, §15)          */
/* ------------------------------------------------------------------ */

export type SectionKey = 'languages' | 'topics' | 'comparisons' | 'guides' | 'cheatsheets' | 'vocabulary' | 'learningPaths' | 'flashcards';

/**
 * Localized URL segment for each section, per interface locale.
 * e.g. /en/topics/ vs /es/temas/.
 */
export const sectionSlugs: Record<SectionKey, Record<LocaleCode, string>> = {
  languages: { en: 'languages', es: 'idiomas', zh: 'languages' },
  topics: { en: 'topics', es: 'temas', zh: 'topics' },
  comparisons: { en: 'comparisons', es: 'comparaciones', zh: 'comparisons' },
  guides: { en: 'guides', es: 'guias', zh: 'guides' },
  cheatsheets: { en: 'cheatsheets', es: 'chuletas', zh: 'cheatsheets' },
  vocabulary: { en: 'vocabulary', es: 'vocabulario', zh: 'vocabulary' },
  learningPaths: { en: 'learning-paths', es: 'rutas', zh: 'learning-paths' },
  flashcards: { en: 'flashcards', es: 'flashcards', zh: 'flashcards' },
};

export function sectionSlug(section: SectionKey, locale: LocaleCode): string {
  return sectionSlugs[section][locale];
}
