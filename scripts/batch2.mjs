import fs from 'fs';

function r(chars, py) {
  return chars.split('').map((c, i) => `<ruby>${c}<rt>${py[i]}</rt></ruby>`).join('');
}

const phrases = [
  ["How long?", "¿Cuánto tiempo?", "多长时间？", ["duō", "cháng", "shí", "jiān"], "Ask duration.", "question"],
  ["How far?", "¿A qué distancia?", "多远？", ["duō", "yuǎn"], "Ask distance.", "question"],
  ["How old are you?", "¿Cuántos años tienes?", "你多大了？", ["nǐ", "duō", "dà", "le"], "Ask age.", "question,personal"],
  ["What time is it?", "¿Qué hora es?", "现在几点了？", ["xiàn", "zài", "jǐ", "diǎn", "le"], "Current time.", "question,time"],
  ["What's your name?", "¿Cómo te llamas?", "你叫什么名字？", ["nǐ", "jiào", "shén", "me", "míng", "zi"], "Ask name.", "question,personal"],
  ["Where do you live?", "¿Dónde vives?", "你住在哪里？", ["nǐ", "zhù", "zài", "nǎ", "lǐ"], "Ask residence.", "question,personal"],
  ["Where are you from?", "¿De dónde eres?", "你从哪里来？", ["nǐ", "cóng", "nǎ", "lǐ", "lái"], "Ask origin.", "question,personal"],
  ["What do you do?", "¿A qué te dedicas?", "你是做什么的？", ["nǐ", "shì", "zuò", "shén", "me", "de"], "Ask occupation.", "question,work"],
  ["Do you understand?", "¿Entiendes?", "你明白吗？", ["nǐ", "míng", "bái", "ma"], "Check comprehension.", "question"],
  ["Can you help me?", "¿Puedes ayudarme?", "你能帮我吗？", ["nǐ", "néng", "bāng", "wǒ", "ma"], "Request help.", "question,help"],
  ["Can I help you?", "¿Puedo ayudarte?", "我能帮你吗？", ["wǒ", "néng", "bāng", "nǐ", "ma"], "Offer help.", "question,help"],
  ["Do you speak English?", "¿Hablas inglés?", "你会说英语吗？", ["nǐ", "huì", "shuō", "yīng", "yǔ", "ma"], "Ask English ability.", "question,language"],
  ["Do you speak Spanish?", "¿Hablas español?", "你会说西班牙语吗？", ["nǐ", "huì", "shuō", "xī", "bān", "yá", "yǔ", "ma"], "Ask Spanish ability.", "question,language"],
  ["What happened?", "¿Qué pasó?", "发生什么事了？", ["fā", "shēng", "shén", "me", "shì", "le"], "Ask event.", "question"],
  ["What's wrong?", "¿Qué pasa?", "怎么了？", ["zěn", "me", "le"], "Ask problem.", "question"],
  ["Are you sure?", "¿Estás seguro?", "你确定吗？", ["nǐ", "què", "dìng", "ma"], "Confirm certainty.", "question"],
  ["What do you think?", "¿Qué piensas?", "你觉得呢？", ["nǐ", "jué", "de", "ne"], "Ask opinion.", "question,opinion"],
  ["What do you mean?", "¿Qué quieres decir?", "你是什么意思？", ["nǐ", "shì", "shén", "me", "yì", "si"], "Ask clarification.", "question"],
  ["How do you say...?", "¿Cómo se dice...?", "怎么说...？", ["zěn", "me", "shuō"], "Ask translation.", "question,language"],
  ["What's the matter?", "¿Cuál es el problema?", "有什么事吗？", ["yǒu", "shén", "me", "shì", "ma"], "Ask problem.", "question"],
  ["Which one?", "¿Cuál?", "哪一个？", ["nǎ", "yí", "gè"], "Choose from options.", "question"],
  ["Yes", "Sí", "是", ["shì"], "Affirmative.", "response"],
  ["No", "No", "不是", ["bù", "shì"], "Negative.", "response"],
  ["Maybe", "Tal vez", "也许", ["yě", "xǔ"], "Uncertain.", "response"],
  ["Probably", "Probablemente", "可能", ["kě", "néng"], "Likely.", "response"],
  ["I don't know", "No sé", "我不知道", ["wǒ", "bù", "zhī", "dào"], "Lack knowledge.", "response"],
  ["I think so", "Creo que sí", "我想是的", ["wǒ", "xiǎng", "shì", "de"], "Tentative agreement.", "response"],
  ["I hope so", "Espero que sí", "我希望如此", ["wǒ", "xī", "wàng", "rú", "cǐ"], "Wish positive.", "response"],
  ["I believe so", "Creo que sí", "我相信如此", ["wǒ", "xiāng", "xìn", "rú", "cǐ"], "Believe true.", "response"],
  ["I suppose so", "Supongo que sí", "我想是吧", ["wǒ", "xiǎng", "shì", "ba"], "Hesitant agreement.", "response"],
  ["Of course", "Por supuesto", "当然", ["dāng", "rán"], "Enthusiastic yes.", "response"],
  ["Absolutely", "Absolutamente", "绝对", ["jué", "duì"], "Strong agreement.", "response"],
  ["Exactly", "Exactamente", "完全正确", ["wán", "quán", "zhèng", "què"], "Precise agreement.", "response"],
  ["That's right", "Así es", "对的", ["duì", "de"], "Confirm correct.", "response"],
  ["That's true", "Es verdad", "这是真的", ["zhè", "shì", "zhēn", "de"], "Confirm truth.", "response"],
  ["I agree", "Estoy de acuerdo", "我同意", ["wǒ", "tóng", "yì"], "Express agreement.", "response,opinion"],
  ["I disagree", "No estoy de acuerdo", "我不同意", ["wǒ", "bù", "tóng", "yì"], "Express disagreement.", "response,opinion"],
  ["Me too", "Yo también", "我也是", ["wǒ", "yě", "shì"], "Shared feeling.", "response"],
  ["Me neither", "Yo tampoco", "我也不", ["wǒ", "yě", "bù"], "Shared negative.", "response"],
  ["I hope not", "Espero que no", "我希望不是", ["wǒ", "xī", "wàng", "bù", "shì"], "Wish against.", "response"],
  ["I doubt it", "Lo dudo", "我怀疑", ["wǒ", "huái", "yí"], "Express skepticism.", "response"],
  ["I don't think so", "No creo", "我不这么认为", ["wǒ", "bù", "zhè", "me", "rèn", "wéi"], "Tentative no.", "response"],
  ["I understand", "Entiendo", "我明白了", ["wǒ", "míng", "bái", "le"], "Comprehension.", "response"],
  ["I don't understand", "No entiendo", "我不明白", ["wǒ", "bù", "míng", "bái"], "No comprehension.", "response"],
  ["I see", "Ya veo", "我明白了", ["wǒ", "míng", "bái", "le"], "Understanding.", "response"],
  ["I got it", "Entendido", "我懂了", ["wǒ", "dǒng", "le"], "Understanding achieved.", "response"],
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

// Insert before the closing ---
const parts = mdx.split('---\n\n## Overview');
mdx = parts[0] + entries + '---\n\n## Overview' + parts[1];
fs.writeFileSync('src/content/vocabulary/phrases.mdx', mdx, 'utf8');
console.log('Batch 2: 50 more phrases (total 100)');
