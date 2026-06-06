import fs from 'fs';
import path from 'path';
import { pinyin } from 'pinyin';

const topicsDir = 'd:/Codigo/language-reference-web/src/content/topics';
const files = fs.readdirSync(topicsDir).filter(f => f.endsWith('.mdx'));

function processSegment(text) {
  const parts = text.split(/(<ruby>[\s\S]*?<\/ruby>)/g);
  return parts.map((part, idx) => {
    if (idx % 2 === 1) return part;
    return part.replace(/[\u4e00-\u9fff]+/g, (match) => {
      const chars = [...match];
      const pys = pinyin(match, { style: 'tone' });
      let result = '';
      chars.forEach((c, i) => {
        result += '<ruby>' + c + '<rt>' + pys[i][0] + '</rt></ruby>';
      });
      return result;
    });
  }).join('');
}

let totalFixed = 0;

files.forEach(file => {
  const filePath = path.join(topicsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  const fmMatch = content.match(/^(---\n[\s\S]*?\n---)/);
  let frontmatter = '';
  let body = content;
  if (fmMatch) {
    frontmatter = fmMatch[1];
    body = content.slice(fmMatch[1].length);
  }

  const newFrontmatter = frontmatter.replace(/(:\s*)([^\"\n]*[\u4e00-\u9fff][^\"\n]*)/g, (match, prefix, value) => {
    if (value.includes('<ruby>')) return match;
    return prefix + processSegment(value);
  });

  const codeBlockRegex = /(```[\s\S]*?```)/g;
  const bodyParts = body.split(codeBlockRegex);
  const newBody = bodyParts.map((part, idx) => {
    if (idx % 2 === 1) return part;
    return processSegment(part);
  }).join('');

  const newContent = newFrontmatter + newBody;

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    const oldCount = (content.match(/<ruby>/g) || []).length;
    const newCount = (newContent.match(/<ruby>/g) || []).length;
    const added = newCount - oldCount;
    if (added > 0) {
      console.log(file + ': +' + added + ' ruby tags');
      totalFixed += added;
    }
  }
});

console.log('Total new ruby tags: ' + totalFixed);
