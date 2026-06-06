import fs from 'fs';

const MDX = 'src/content/vocabulary/words.mdx';
const CACHE = 'scripts/definitions-cache.json';

// Read existing MDX
const content = fs.readFileSync(MDX, 'utf8');
const wordMatches = content.match(/word: "([^"]+)"/g);
const words = wordMatches.map(m => m.match(/word: "([^"]+)"/)[1]);

// Load cache
let cache = {};
if (fs.existsSync(CACHE)) {
  cache = JSON.parse(fs.readFileSync(CACHE, 'utf8'));
}

async function fetchDefinition(word) {
  if (cache[word] !== undefined) return cache[word];
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
    if (!res.ok) {
      cache[word] = '';
      return '';
    }
    const data = await res.json();
    // Pick first meaning from first entry
    const meaning = data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition;
    const result = meaning || '';
    cache[word] = result;
    fs.writeFileSync(CACHE, JSON.stringify(cache, null, 2));
    return result;
  } catch (e) {
    console.error('Error for', word, e.message);
    return '';
  }
}

async function main() {
  const missing = words.filter(w => cache[w] === undefined);
  console.log('Missing definitions:', missing.length);

  const batchSize = 3;
  for (let i = 0; i < missing.length; i += batchSize) {
    const batch = missing.slice(i, i + batchSize);
    await Promise.all(batch.map(fetchDefinition));
    console.log(`Progress: ${Math.min(i + batchSize, missing.length)}/${missing.length}`);
    if (i + batchSize < missing.length) await new Promise(r => setTimeout(r, 400));
  }

  // Count how many we have
  const withDef = words.filter(w => cache[w]).length;
  console.log('Words with definitions:', withDef, '/', words.length);
}

main();
