import fs from 'fs';

const CACHE = 'scripts/definitions-cache.json';
let cache = JSON.parse(fs.readFileSync(CACHE, 'utf8'));

const words = Object.keys(cache).filter(w => !cache[w]);
console.log('Missing definitions:', words.length);

async function fetchDef(word) {
  try {
    const res = await fetch(`https://api.datamuse.com/words?sp=${encodeURIComponent(word)}&md=d&max=1`);
    const data = await res.json();
    if (data && data[0] && data[0].defs && data[0].defs.length > 0) {
      // defs come as "part_of_speech\tdefinition"
      const raw = data[0].defs[0];
      const def = raw.includes('\t') ? raw.split('\t')[1] : raw;
      cache[word] = def;
      fs.writeFileSync(CACHE, JSON.stringify(cache, null, 2));
      return def;
    }
    // Mark as empty string so we don't retry
    cache[word] = '';
    fs.writeFileSync(CACHE, JSON.stringify(cache, null, 2));
    return '';
  } catch (e) {
    console.error('Error for', word, e.message);
    return '';
  }
}

async function main() {
  const batchSize = 4;
  for (let i = 0; i < words.length; i += batchSize) {
    const batch = words.slice(i, i + batchSize);
    await Promise.all(batch.map(fetchDef));
    if ((i + batchSize) % 100 === 0 || i + batchSize >= words.length) {
      console.log(`Progress: ${Math.min(i + batchSize, words.length)}/${words.length}`);
    }
    if (i + batchSize < words.length) await new Promise(r => setTimeout(r, 200));
  }
  const withDef = Object.values(cache).filter(v => v && v.length > 0).length;
  console.log('Total with definitions:', withDef, '/', Object.keys(cache).length);
}

main();
