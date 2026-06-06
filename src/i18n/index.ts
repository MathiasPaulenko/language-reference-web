import en from './en.json';
import es from './es.json';
import zh from './zh.json';
import {
  DEFAULT_LOCALE,
  getAnalyzedLanguage,
  type LocaleCode,
  type AnalyzedLanguageCode,
} from '../config/languages';

/** Shape of a UI translation bundle (inferred from the canonical English file). */
export type UIStrings = typeof en;

const bundles: Record<LocaleCode, UIStrings> = {
  en,
  es: es as UIStrings,
  zh: zh as UIStrings,
};

/**
 * Return the full UI string bundle for a locale, falling back to the default
 * locale when a translation is missing (vision §8 — default to English).
 */
export function getUI(locale: LocaleCode): UIStrings {
  return bundles[locale] ?? bundles[DEFAULT_LOCALE];
}

/**
 * Localized display name for an analyzed language, falling back to the
 * English name from the central config when a translation is missing.
 */
export function languageName(ui: UIStrings, code: AnalyzedLanguageCode): string {
  const names = ui.languages as Record<string, string>;
  return names[code] ?? getAnalyzedLanguage(code)?.name ?? code;
}
