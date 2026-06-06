import fs from 'fs';
import { pinyin } from 'pinyin';

const MDX = 'src/content/vocabulary/words.mdx';
const CACHE = 'scripts/zh-cache.json';

// Read existing MDX to get word list + spanish/english
const content = fs.readFileSync(MDX, 'utf8');
const wordMatches = content.match(/word: "([^"]+)"/g);
const words = wordMatches.map(m => m.match(/word: "([^"]+)"/)[1]);

// Extract existing spanish translations from MDX
const spanishMatches = content.match(/spanish: "([^"]*)"/g);
const spanish = spanishMatches.map(m => m.match(/spanish: "([^"]*)"/)[1]);

let cache = {};
if (fs.existsSync(CACHE)) {
  cache = JSON.parse(fs.readFileSync(CACHE, 'utf8'));
}

async function translate(word) {
  if (cache[word]) return cache[word];
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|zh-CN`);
    const data = await res.json();
    const trans = data?.responseData?.translatedText || '';
    // If API returns same word or error, mark as missing
    const result = trans && trans.toLowerCase() !== word.toLowerCase() ? trans : '';
    cache[word] = result;
    fs.writeFileSync(CACHE, JSON.stringify(cache, null, 2));
    return result;
  } catch (e) {
    console.error('Error:', word, e.message);
    return '';
  }
}

function toRuby(zh) {
  if (!zh) return '';
  const py = pinyin(zh, { style: pinyin.STYLE_TONE });
  const chars = [...zh];
  let html = '';
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const tone = py[i] ? py[i][0] : '';
    // Only wrap Han characters in ruby
    if (/\p{Script=Han}/u.test(char)) {
      html += '<ruby>' + char + '<rt>' + tone + '</rt></ruby>';
    } else {
      html += char;
    }
  }
  return html;
}

async function main() {
  const batchSize = 5;
  for (let i = 0; i < words.length; i += batchSize) {
    const batch = words.slice(i, i + batchSize);
    console.log(`Batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(words.length/batchSize)}: ${batch.join(', ')}`);
    await Promise.all(batch.map(async (w) => {
      if (!cache[w]) {
        await translate(w);
      }
    }));
    if (i + batchSize < words.length) {
      await new Promise(r => setTimeout(r, 600));
    }
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
}

main();
