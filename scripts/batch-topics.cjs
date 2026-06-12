/**
 * batch-topics.cjs
 * Generate multiple topic files from a batch specification.
 *
 * Usage:
 *   node scripts/batch-topics.cjs <path-to-batch-spec.json>
 *
 * The batch spec is an array of topic entries. Each entry can be:
 * 1. A full spec object (same as topic-spec.json)
 * 2. A minimal object with `template`, `topic`, `titles`, `description` —
 *    the template will fill in the rest with placeholders.
 *
 * Example batch-spec.json:
 * [
 *   {
 *     "template": "verbal",
 *     "topic": "gerunds",
 *     "titles": { "en": "Gerunds", "es": "Gerundios", "zh": "动名词" },
 *     "description": { "en": "...", "es": "...", "zh": "..." }
 *   },
 *   {
 *     "template": "nominal",
 *     "topic": "articles",
 *     "titles": { "en": "Articles", "es": "Artículos", "zh": "冠词" },
 *     "description": { "en": "...", "es": "...", "zh": "..." }
 *   }
 * ]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { getTemplate } = require('./templates/index.cjs');

const TOPICS_DIR = path.join(__dirname, '..', 'src', 'content', 'topics');

function main() {
  const args = process.argv.slice(2);
  const batchPath = args[0] || path.join(__dirname, 'batch-spec.json');

  if (!fs.existsSync(batchPath)) {
    console.error(`❌ Batch spec not found: ${batchPath}`);
    console.log('Usage: node scripts/batch-topics.cjs <path-to-batch-spec.json>');
    process.exit(1);
  }

  const batch = JSON.parse(fs.readFileSync(batchPath, 'utf8'));
  if (!Array.isArray(batch)) {
    console.error('❌ Batch spec must be a JSON array of topic entries.');
    process.exit(1);
  }

  const generatedSpecs = [];
  const skipped = [];

  for (const entry of batch) {
    const topicKey = entry.topic || entry.titles?.en || 'unknown';
    console.log(`\n▶ Processing: ${topicKey}`);

    let spec;
    if (entry.template) {
      const builder = getTemplate(entry.template);
      spec = builder(entry);
      console.log(`  Using template: ${entry.template}`);
    } else {
      spec = entry;
      console.log(`  Using full spec (no template)`);
    }

    const specPath = path.join(__dirname, `spec-${spec.topic}.json`);
    fs.writeFileSync(specPath, JSON.stringify(spec, null, 2), 'utf8');

    try {
      execSync(`node "${path.join(__dirname, 'quick-topic.cjs')}" "${specPath}"`, {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..')
      });
      generatedSpecs.push(specPath);
    } catch (err) {
      console.error(`❌ Failed to generate ${topicKey}`);
      skipped.push(topicKey);
    }
  }

  // Cleanup temp specs
  for (const sp of generatedSpecs) {
    try { fs.unlinkSync(sp); } catch {}
  }

  console.log('\n📁 Batch generation complete.');
  console.log(`   Generated: ${batch.length - skipped.length}`);
  if (skipped.length > 0) {
    console.log(`   Skipped: ${skipped.join(', ')}`);
  }
}

main();
