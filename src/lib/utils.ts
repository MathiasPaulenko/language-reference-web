import { sectionSlug, interfaceLocales, type LocaleCode, type SectionKey } from '../config/languages';
import pinyinModule from 'pinyin';
const pinyin = (typeof pinyinModule === 'function' ? pinyinModule : (pinyinModule as any).default || pinyinModule) as any;

const BASE = import.meta.env.BASE_URL;

/**
 * Build an absolute in-site path that respects the configured `base`
 * (e.g. the GitHub Pages subpath) and always ends with a trailing slash.
 */
export function withBase(path: string): string {
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const base = BASE.replace(/\/+$/, '');
  if (clean === '') return `${base}/`;
  return `${base}/${clean}/`;
}

/**
 * Build a locale-prefixed path, e.g. localePath('en', 'topics') -> /base/en/topics/.
 * The optional `path` is appended after the locale segment.
 */
export function localePath(locale: LocaleCode, path = ''): string {
  return withBase(`${locale}/${path}`.replace(/\/+$/, ''));
}

/**
 * Build a path to a section using its localized slug, e.g.
 * sectionPath('es', 'topics') -> /base/es/temas/.
 */
export function sectionPath(locale: LocaleCode, section: SectionKey, slug = ''): string {
  const localized = sectionSlug(section, locale);
  return localePath(locale, slug ? `${localized}/${slug}` : localized);
}

const CHINESE_RE = /[\u4e00-\u9fff]+/;

/** Build hreflang alternates for a content page with translations. */
export function contentAlternates(
  slug: string,
  section: SectionKey,
  localeMap: Map<string, unknown>,
): { locale: LocaleCode; href: string }[] {
  return interfaceLocales
    .filter((loc) => localeMap.has(loc.code))
    .map((loc) => ({
      locale: loc.code,
      href: sectionPath(loc.code, section, slug),
    }));
}

/** Build hreflang alternates for an index/listing page. */
export function indexAlternates(section: SectionKey): { locale: LocaleCode; href: string }[] {
  return interfaceLocales.map((loc) => ({
    locale: loc.code,
    href: sectionPath(loc.code, section),
  }));
}

/** Build hreflang alternates for a static page (e.g. about, contact). */
export function pageAlternates(path: string): { locale: LocaleCode; href: string }[] {
  return interfaceLocales.map((loc) => ({
    locale: loc.code,
    href: localePath(loc.code, path),
  }));
}

/**
 * Convert Chinese characters in a string to <ruby> tags with pinyin.
 * Skips processing if the string already contains HTML (to avoid double-processing).
 * Returns the original string if no Chinese characters are found.
 */
export function withPinyin(text: string): string {
  if (!text || !CHINESE_RE.test(text)) return text;
  if (text.includes('<ruby')) return text; // Already has ruby tags

  return text.replace(/[\u4e00-\u9fff]+/g, (match) => {
    const rubies = Array.from(match).map((char) => {
      const py = pinyin(char, { style: pinyin.STYLE_TONE })[0][0];
      return `<ruby>${char}<rt>${py}</rt></ruby>`;
    });
    return rubies.join('');
  });
}
