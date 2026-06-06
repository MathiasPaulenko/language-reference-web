import fs from 'fs';
import { pinyin } from 'pinyin';

const MDX = 'src/content/vocabulary/words.mdx';
const CACHE = 'scripts/zh-cache.json';
const MANUAL = 'scripts/zh-manual.json';

// Load cache and manual overrides
let cache = JSON.parse(fs.readFileSync(CACHE, 'utf8'));
const manual = JSON.parse(fs.readFileSync(MANUAL, 'utf8'));

// Apply manual overrides
for (const [k, v] of Object.entries(manual)) {
  cache[k] = v;
}

// Read existing MDX to get word list + spanish
const content = fs.readFileSync(MDX, 'utf8');
const wordMatches = content.match(/word: "([^"]+)"/g);
const words = wordMatches.map(m => m.match(/word: "([^"]+)"/)[1]);
const spanishMatches = content.match(/spanish: "([^"]*)"/g);
const spanish = spanishMatches.map(m => m.match(/spanish: "([^"]*)"/)[1]);

function toRuby(zh) {
  if (!zh || zh === '—') return '—';
  const py = pinyin(zh, { style: 'tone' });
  const chars = [...zh];
  let html = '';
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const tone = py[i] ? py[i][0] : '';
    if (/\p{Script=Han}/u.test(char)) {
      html += '<ruby>' + char + '<rt>' + tone + '</rt></ruby>';
    } else {
      html += char;
    }
  }
  return html;
}

// Build MDX
let mdx = '---\ntitle: "Essential Words"\ndescription: "The 1000 most frequently used words in English, with Spanish and Chinese translations."\nlocale: en\nlastUpdated: 2026-06-06\ndraft: false\nentries:\n';
for (let i = 0; i < words.length; i++) {
  const word = words[i];
  const esWord = spanish[i] || '—';
  const zhWord = cache[word] || '—';
  const zhHtml = zhWord !== '—' ? toRuby(zhWord) : '—';
  mdx += `  - word: "${word}"\n`;
  mdx += `    translations:\n`;
  mdx += `      spanish: "${esWord}"\n`;
  mdx += `      english: "${word}"\n`;
  mdx += `      chinese: "${zhHtml}"\n`;
  mdx += `    definition: ""\n`;
  mdx += `    tags: [common]\n`;
}
mdx += '---\n\n## Overview\n\nThese 1000 words represent the most frequently used vocabulary across everyday communication.\n';

fs.writeFileSync(MDX, mdx);
console.log('Updated', MDX, 'with', words.length, 'entries');
