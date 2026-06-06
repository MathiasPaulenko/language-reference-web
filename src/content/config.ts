import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { localeCodes, analyzedLanguageCodes } from '../config/languages';

/* ------------------------------------------------------------------ */
/* Shared building blocks (derived from central language config)      */
/* ------------------------------------------------------------------ */

/** Interface locale the entry is written in. */
const locale = z.enum(localeCodes);

/** A language whose grammar is being documented/compared. */
const analyzedLanguage = z.enum(analyzedLanguageCodes);

/**
 * A single comparison-table row: one grammar concept and its realization
 * in each compared language (keyed by analyzed-language code).
 */
const comparisonRow = z.object({
  concept: z.string(),
  values: z.record(analyzedLanguage, z.string()),
});

/** A common mistake plus its correction (vision §17 — Common Mistakes). */
const commonMistake = z.object({
  mistake: z.string(),
  correction: z.string(),
  note: z.string().optional(),
  /** Which analyzed language this mistake targets (for per-language filtering). */
  language: analyzedLanguage.optional(),
});

/**
 * Fields shared by every content entry to enforce the canonical page
 * structure (vision §17): Overview, Explanation, Comparison Table,
 * Examples, Common Mistakes, Related Topics. Prose sections live in the
 * MDX body; structured sections are typed here for SEO/GEO reuse.
 */
const baseFields = {
  title: z.string(),
  description: z.string(),
  locale,
  /** Short overview used for cards, meta description, and GEO answers. */
  overview: z.string().optional(),
  comparisonTable: z.array(comparisonRow).optional(),
  summaryTable: z.array(comparisonRow).optional(),
  commonMistakes: z.array(commonMistake).optional(),
  relatedTopics: z.array(z.string()).optional(),
  prerequisites: z.array(z.string()).optional(),
  keyTakeaways: z.array(z.string()).optional(),
  lastUpdated: z.coerce.date().optional(),
  draft: z.boolean().default(false),
};

function loader(dir: string) {
  return glob({ pattern: '**/*.{md,mdx}', base: `src/content/${dir}` });
}

/* ------------------------------------------------------------------ */
/* Collections                                                        */
/* ------------------------------------------------------------------ */

/** Per-language reference material (vision §9 "Languages"). */
const languages = defineCollection({
  loader: loader('languages'),
  schema: z.object({
    ...baseFields,
    language: analyzedLanguage,
  }),
});

/** Language-agnostic grammar concepts (vision §9 "Topics"). */
const topics = defineCollection({
  loader: loader('topics'),
  schema: z.object({
    ...baseFields,
    topic: z.string(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  }),
});

/** The core comparative content (vision §9 "Comparisons"). */
const comparisons = defineCollection({
  loader: loader('comparisons'),
  schema: z.object({
    ...baseFields,
    grammarConcept: z.string(),
    languagesCompared: z.array(analyzedLanguage).min(2),
  }),
});

/** Audience-oriented guides (vision §9 "Guides"). */
const guides = defineCollection({
  loader: loader('guides'),
  schema: z.object({
    ...baseFields,
    targetAudience: z.string(),
  }),
});

/** Quick-reference cheatsheets (vision §9 "Cheatsheets"). */
const cheatsheets = defineCollection({
  loader: loader('cheatsheets'),
  schema: z.object({
    ...baseFields,
    topics: z.array(z.string()),
  }),
});

/** Vocabulary entries: words, phrases, expressions. */
const vocabEntry = z.object({
  word: z.string(),
  translations: z.record(analyzedLanguage, z.string()),
  definition: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const vocabulary = defineCollection({
  loader: loader('vocabulary'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    locale,
    lastUpdated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    entries: z.array(vocabEntry).optional(),
  }),
});

export const collections = { languages, topics, comparisons, guides, cheatsheets, vocabulary };
