/**
 * Template registry for quick topic generation.
 * Maps grammatical category → template builder function.
 *
 * Categories:
 *   verbal       → verbs, tenses, mood, participles, infinitives, gerunds, aspect
 *   nominal      → nouns, articles, pronouns, gender, number, determiners, adjectives
 *   syntactic    → word order, clauses, questions, subordination, coordination, negation
 *   pragmatic    → honorifics, register, hedges, politeness, speech acts
 *
 * Usage:
 *   const { getTemplate } = require('./templates');
 *   const spec = getTemplate('verbal')({ topic: 'gerunds', titles: { ... } });
 */

const verbal = require('./verbal.cjs');
const nominal = require('./nominal.cjs');
const syntactic = require('./syntactic.cjs');
const pragmatic = require('./pragmatic.cjs');

const registry = {
  verbal,
  nominal,
  syntactic,
  pragmatic
};

/**
 * Get a template builder by category name.
 * Falls back to verbal if category not found.
 */
function getTemplate(category) {
  const builder = registry[category];
  if (!builder) {
    console.warn(`⚠️  Unknown template category "${category}". Falling back to "verbal". Available: ${Object.keys(registry).join(', ')}`);
    return verbal;
  }
  return builder;
}

/**
 * List all available template categories.
 */
function listTemplates() {
  return Object.keys(registry);
}

module.exports = { getTemplate, listTemplates, registry };
