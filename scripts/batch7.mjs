import fs from 'fs';
function r(chars, py) { return chars.split('').map((c, i) => `<ruby>${c}<rt>${py[i]}</rt></ruby>`).join(''); }
const phrases = [
  ["Call the police", "Llama a la policía", "报警", ["bào", "jǐng"], "Emergency call.", "emergency"],
  ["Fire", "Fuego", "着火了", ["zháo", "huǒ", "le"], "Fire emergency.", "emergency"],
  ["Help", "Ayuda", "救命", ["jiù", "mìng"], "Call for assistance.", "emergency"],
  ["Watch out", "Cuidado", "小心", ["xiǎo", "xīn"], "Warning of danger.", "emergency"],
  ["Look out", "¡Cuidado!", "注意", ["zhù", "yì"], "Warning.", "emergency"],
  ["Be careful", "Ten cuidado", "小心点", ["xiǎo", "xīn", "diǎn"], "Caution advice.", "emergency"],
  ["Hurry up", "Apúrate", "快点", ["kuài", "diǎn"], "Move faster.", "action"],
  ["Slow down", "Despacio", "慢点", ["màn", "diǎn"], "Reduce speed.", "action"],
  ["Wait a moment", "Espera un momento", "等一下", ["děng", "yí", "xià"], "Brief pause.", "action"],
  ["Let's go", "Vamos", "我们走吧", ["wǒ", "men", "zǒu", "ba"], "Suggest departure.", "action"],
  ["Come here", "Ven aquí", "过来", ["guò", "lái"], "Request approach.", "action"],
  ["Go away", "Vete", "走开", ["zǒu", "kāi"], "Request departure.", "action"],
];
let mdx = fs.readFileSync('src/content/vocabulary/phrases.mdx', 'utf8');
let entries = '';
for (const p of phrases) {
  entries += `  - word: "${p[0]}"
    translations:
      spanish: "${p[1]}"
      english: "${p[0]}"
      chinese: "${r(p[2], p[3])}"
    definition: "${p[4]}"
    tags: [${p[5].split(',').map(t => `"${t}"`).join(', ')}]
`;
}
const parts = mdx.split('---\n\n## Overview');
mdx = parts[0] + entries + '---\n\n## Overview' + parts[1];
fs.writeFileSync('src/content/vocabulary/phrases.mdx', mdx, 'utf8');
console.log('Batch 7: 12 more (total 300)');
