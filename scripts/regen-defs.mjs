import fs from 'fs';

const MDX = 'src/content/vocabulary/words.mdx';
const CACHE = 'scripts/definitions-cache.json';

const content = fs.readFileSync(MDX, 'utf8');
const wordMatches = content.match(/word: "([^"]+)"/g);
const words = wordMatches.map(m => m.match(/word: "([^"]+)"/)[1]);

const spanishMatches = content.match(/spanish: "([^"]*)"/g);
const spanish = spanishMatches.map(m => m.match(/spanish: "([^"]*)"/)[1]);

const englishMatches = content.match(/english: "([^"]*)"/g);
const english = englishMatches.map(m => m.match(/english: "([^"]*)"/)[1]);

const chineseMatches = content.match(/chinese: "([^"]*)"/g);
const chinese = chineseMatches.map(m => m.match(/chinese: "([^"]*)"/)[1]);

const cache = JSON.parse(fs.readFileSync(CACHE, 'utf8'));

function escapeYaml(str) {
  if (!str) return '';
  // Truncate to 120 chars
  let s = str.length > 120 ? str.slice(0, 117) + '...' : str;
  // Remove newlines and carriage returns
  s = s.replace(/[\r\n]/g, ' ');
  // Remove double quotes to avoid YAML breakage
  s = s.replace(/"/g, '');
  // Trim
  return s.trim();
}

let mdx = '---\ntitle: "Essential Words"\ndescription: "The 1000 most frequently used words in English, with Spanish and Chinese translations."\nlocale: en\nlastUpdated: 2026-06-06\ndraft: false\nentries:\n';
for (let i = 0; i < words.length; i++) {
  const word = words[i];
  const esWord = spanish[i] || '—';
  const enWord = english[i] || word;
  const zhWord = chinese[i] || '—';
  const def = escapeYaml(cache[word] || '');
  mdx += `  - word: "${word}"\n`;
  mdx += `    translations:\n`;
  mdx += `      spanish: "${esWord}"\n`;
  mdx += `      english: "${enWord}"\n`;
  mdx += `      chinese: "${zhWord}"\n`;
  mdx += `    definition: "${def}"\n`;
  mdx += `    tags: [common]\n`;
}
mdx += '---\n\n## Overview\n\nThese 1000 words represent the most frequently used vocabulary across everyday communication.\n';

fs.writeFileSync(MDX, mdx);
console.log('Regenerated', MDX, 'with', words.length, 'entries');
const withDef = words.filter(w => cache[w]).length;
console.log('Definitions present:', withDef);
