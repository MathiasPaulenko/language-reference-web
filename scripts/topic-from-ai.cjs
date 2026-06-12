/**
 * topic-from-ai.cjs
 * Minimal-input topic generator.
 *
 * You provide just:
 *   - topic slug
 *   - titles (en/es/zh)
 *   - description (en/es/zh)
 *   - category (verbal|nominal|syntactic|pragmatic)
 *   - difficulty (beginner|intermediate|advanced)
 *   - relatedTopics (optional)
 *
 * The script:
 *   1. Loads the appropriate template with placeholders.
 *   2. Writes a spec JSON to scripts/ai-specs/<topic>.json.
 *   3. Prints a checklist of placeholders to fill in.
 *
 * After filling the placeholders, run:
 *   node scripts/quick-topic.cjs scripts/ai-specs/<topic>.json
 *
 * Or use --generate to auto-run quick-topic after creating the spec.
 *
 * Usage:
 *   node scripts/topic-from-ai.cjs --topic gerunds --category verbal --difficulty intermediate
 *        --titles-en "Gerunds" --titles-es "Gerundios" --titles-zh "动名词"
 *        --desc-en "Verb forms acting as nouns" --desc-es "Formas verbales que actúan como sustantivos" --desc-zh "充当名词的动词形式"
 *        --generate
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { getTemplate, listTemplates } = require('./templates/index.cjs');

const SPECS_DIR = path.join(__dirname, 'ai-specs');

function parseArgs(argv) {
  const args = {};
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        args[key] = next;
        i++;
      } else {
        args[key] = true;
      }
    } else {
      positional.push(arg);
    }
  }
  return { args, positional };
}

function showHelp() {
  console.log(`
topic-from-ai.cjs — Minimal-input topic generator

Usage:
  node scripts/topic-from-ai.cjs [options]

Required:
  --topic <slug>          Topic slug (e.g., gerunds)
  --category <cat>        Template category: ${listTemplates().join(', ')}
  --titles-en <text>
  --titles-es <text>
  --titles-zh <text>
  --desc-en <text>
  --desc-es <text>
  --desc-zh <text>

Optional:
  --difficulty <level>    beginner | intermediate | advanced (default: beginner)
  --relatedTopics <json>  JSON array of related topic slugs (default: auto)
  --generate              Auto-run quick-topic.cjs after creating spec
  --help                  Show this help

Example:
  node scripts/topic-from-ai.cjs \\
    --topic gerunds \\
    --category verbal \\
    --difficulty intermediate \\
    --titles-en "Gerunds" --titles-es "Gerundios" --titles-zh "动名词" \\
    --desc-en "Verb forms acting as nouns" \\
    --desc-es "Formas verbales que actúan como sustantivos" \\
    --desc-zh "充当名词的动词形式" \\
    --generate
`);
}

function main() {
  const { args } = parseArgs(process.argv.slice(2));

  if (args.help || !args.topic || !args.category) {
    showHelp();
    process.exit(args.help ? 0 : 1);
  }

  const topic = args.topic;
  const category = args.category;
  const difficulty = args['difficulty'] || 'beginner';

  const titles = {
    en: args['titles-en'],
    es: args['titles-es'],
    zh: args['titles-zh']
  };
  const description = {
    en: args['desc-en'],
    es: args['desc-es'],
    zh: args['desc-zh']
  };

  if (!titles.en || !titles.es || !titles.zh) {
    console.error('❌ All three title locales are required (--titles-en, --titles-es, --titles-zh)');
    process.exit(1);
  }
  if (!description.en || !description.es || !description.zh) {
    console.error('❌ All three description locales are required (--desc-en, --desc-es, --desc-zh)');
    process.exit(1);
  }

  const relatedTopics = args.relatedTopics ? JSON.parse(args.relatedTopics) : undefined;

  const builder = getTemplate(category);
  const spec = builder({ topic, titles, description, difficulty, relatedTopics });

  if (!fs.existsSync(SPECS_DIR)) {
    fs.mkdirSync(SPECS_DIR, { recursive: true });
  }

  const specPath = path.join(SPECS_DIR, `${topic}.json`);
  fs.writeFileSync(specPath, JSON.stringify(spec, null, 2), 'utf8');

  console.log(`✅ Spec written to ${specPath}`);

  // List placeholders
  const placeholders = [];
  function scan(obj, prefix = '') {
    if (typeof obj === 'string' && obj.includes('{{')) {
      const match = obj.match(/\{\{([^}]+)\}\}/);
      if (match) placeholders.push(`${prefix}: ${match[1]}`);
    } else if (Array.isArray(obj)) {
      obj.forEach((v, i) => scan(v, `${prefix}[${i}]`));
    } else if (obj && typeof obj === 'object') {
      for (const [k, v] of Object.entries(obj)) {
        scan(v, prefix ? `${prefix}.${k}` : k);
      }
    }
  }
  scan(spec);

  console.log(`\n📝 Placeholders to fill (${placeholders.length}):`);
  for (const ph of placeholders) {
    console.log(`   ${ph}`);
  }

  console.log(`\n👉 Next steps:`);
  console.log(`   1. Open ${specPath} and replace all {{...}} placeholders with real content.`);
  console.log(`   2. Run: node scripts/quick-topic.cjs ${specPath}`);

  if (args.generate) {
    console.log(`\n🚀 Auto-generating...`);
    try {
      execSync(`node "${path.join(__dirname, 'quick-topic.cjs')}" "${specPath}"`, {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..')
      });
    } catch (err) {
      console.error('❌ Generation failed. Fix the placeholders and retry manually.');
      process.exit(1);
    }
  }
}

main();
