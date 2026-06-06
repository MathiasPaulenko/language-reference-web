import fs from 'fs';
const c = fs.readFileSync('src/content/vocabulary/words.mdx', 'utf8');
const lines = c.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('word: "of"')) {
    console.log(lines.slice(i, i + 6).join('\n'));
    break;
  }
}
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('word: "the"')) {
    console.log(lines.slice(i, i + 6).join('\n'));
    break;
  }
}
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('word: "and"')) {
    console.log(lines.slice(i, i + 6).join('\n'));
    break;
  }
}
