import fs from 'fs';
import { pinyin } from 'pinyin';

const topicsDir = 'd:/Codigo/language-reference-web/src/content/topics';
const files = fs.readdirSync(topicsDir).filter(f => f.endsWith('.mdx'));

const rubyRegex = /<ruby>[\s\S]*?<\/ruby>/g;
const chineseCharRegex = /[\u4e00-\u9fff]+/g;

function wrapChinese(text) {
  const parts = text.split(/(<ruby>[\s\S]*?<\/ruby>)/g);
  return parts.map((part, idx) => {
    if (idx % 2 === 1) return part;
    return part.replace(chineseCharRegex, (match) => {
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
  const filePath = topicsDir + '/' + file;
  const content = fs.readFileSync(filePath, 'utf8');
  const withoutRuby = content.replace(rubyRegex, '');
  const unwrapped = withoutRuby.match(chineseCharRegex);
  if (!unwrapped) return;

  const newContent = wrapChinese(content);
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    const oldCount = (content.match(/<ruby>/g) || []).length;
    const newCount = (newContent.match(/<ruby>/g) || []).length;
    const added = newCount - oldCount;
    if (added > 0) {
      console.log(file + ': +' + added);
      totalFixed += added;
    }
  }
});

console.log('Total fixed: ' + totalFixed);
