import fs from 'fs';
function r(chars, py) { return chars.split('').map((c, i) => `<ruby>${c}<rt>${py[i]}</rt></ruby>`).join(''); }
const phrases = [
  ["I need to rest", "Necesito descansar", "我需要休息", ["wǒ", "xū", "yào", "xiū", "xi"], "Need rest.", "health"],
  ["I need to sleep", "Necesito dormir", "我需要睡觉", ["wǒ", "xū", "yào", "shuì", "jiào"], "Need sleep.", "health"],
  ["I'm in pain", "Tengo dolor", "我很痛", ["wǒ", "hěn", "tòng"], "Experiencing pain.", "health"],
  ["I need to go to the hospital", "Necesito ir al hospital", "我需要去医院", ["wǒ", "xū", "yào", "qù", "yī", "yuàn"], "Medical need.", "health"],
  ["I need a prescription", "Necesito una receta", "我需要处方", ["wǒ", "xū", "yào", "chǔ", "fāng"], "Medication order.", "health"],
  ["I feel dizzy", "Me siento mareado", "我头晕", ["wǒ", "tóu", "yūn"], "Feeling dizziness.", "health"],
  ["I feel weak", "Me siento débil", "我感觉虚弱", ["wǒ", "gǎn", "jué", "xū", "ruò"], "Lack strength.", "health"],
  ["I feel strong", "Me siento fuerte", "我感觉很强壮", ["wǒ", "gǎn", "jué", "hěn", "qiáng", "zhuàng"], "Feeling strength.", "health"],
  ["I feel relaxed", "Me siento relajado", "我感觉很放松", ["wǒ", "gǎn", "jué", "hěn", "fàng", "sōng"], "Feeling calm.", "emotions"],
  ["I feel stressed", "Me siento estresado", "我感觉压力很大", ["wǒ", "gǎn", "jué", "yā", "lì", "hěn", "dà"], "Feeling pressure.", "emotions"],
  ["I feel confused", "Me siento confundido", "我感到很困惑", ["wǒ", "gǎn", "jué", "hěn", "kùn", "huò"], "Feeling puzzled.", "emotions"],
  ["I feel hopeful", "Me siento esperanzado", "我充满希望", ["wǒ", "chōng", "mǎn", "xī", "wàng"], "Feeling optimism.", "emotions"],
  ["I feel grateful", "Me siento agradecido", "我很感激", ["wǒ", "hěn", "gǎn", "jī"], "Feeling thankful.", "emotions"],
  ["I feel guilty", "Me siento culpable", "我感到内疚", ["wǒ", "gǎn", "dào", "nèi", "jiù"], "Feeling remorse.", "emotions"],
  ["I feel jealous", "Me siento celoso", "我感到嫉妒", ["wǒ", "gǎn", "dào", "jí", "dù"], "Feeling envy.", "emotions"],
  ["I feel embarrassed", "Me siento avergonzado", "我很尴尬", ["wǒ", "hěn", "gān", "gà"], "Feeling shame.", "emotions"],
  ["I feel ashamed", "Me siento avergonzado", "我很惭愧", ["wǒ", "hěn", "cán", "kuì"], "Feeling disgrace.", "emotions"],
  ["I feel hopeful", "Me siento esperanzado", "我很有希望", ["wǒ", "hěn", "yǒu", "xī", "wàng"], "Feeling hope.", "emotions"],
  ["I feel peaceful", "Me siento en paz", "我感到很平静", ["wǒ", "gǎn", "jué", "hěn", "píng", "jìng"], "Feeling serenity.", "emotions"],
  ["I feel anxious", "Me siento ansioso", "我很焦虑", ["wǒ", "hěn", "jiāo", "lǜ"], "Feeling worry.", "emotions"],
  ["I feel depressed", "Me siento deprimido", "我很沮丧", ["wǒ", "hěn", "jǔ", "sàng"], "Feeling low.", "emotions"],
  ["I feel energetic", "Me siento con energía", "我精力充沛", ["wǒ", "jīng", "lì", "chōng", "pèi"], "Feeling vitality.", "emotions"],
  ["I feel sleepy", "Me siento somnoliento", "我很困", ["wǒ", "hěn", "kùn"], "Feeling drowsy.", "emotions"],
  ["I feel hungry", "Tengo hambre", "我很饿", ["wǒ", "hěn", "è"], "Feeling hunger.", "emotions"],
  ["I feel thirsty", "Tengo sed", "我很渴", ["wǒ", "hěn", "kě"], "Feeling thirst.", "emotions"],
  ["I feel hot", "Tengo calor", "我很热", ["wǒ", "hěn", "rè"], "Feeling warmth.", "emotions"],
  ["I feel cold", "Tengo frío", "我很冷", ["wǒ", "hěn", "lěng"], "Feeling chill.", "emotions"],
  ["I feel comfortable", "Me siento cómodo", "我感觉很舒服", ["wǒ", "gǎn", "jué", "hěn", "shū", "fu"], "Feeling ease.", "emotions"],
  ["I feel uncomfortable", "Me siento incómodo", "我感觉不舒服", ["wǒ", "gǎn", "jué", "bù", "shū", "fu"], "Feeling unease.", "emotions"],
  ["I feel safe", "Me siento seguro", "我感觉很安全", ["wǒ", "gǎn", "jué", "hěn", "ān", "quán"], "Feeling security.", "emotions"],
  ["I feel unsafe", "Me siento inseguro", "我感觉不安全", ["wǒ", "gǎn", "jué", "bù", "ān", "quán"], "Feeling danger.", "emotions"],
  ["I feel welcome", "Me siento bienvenido", "我感觉很受欢迎", ["wǒ", "gǎn", "jué", "hěn", "shòu", "huān", "yíng"], "Feeling acceptance.", "emotions"],
  ["I feel rejected", "Me siento rechazado", "我感觉被拒绝了", ["wǒ", "gǎn", "jué", "bèi", "jù", "jué", "le"], "Feeling exclusion.", "emotions"],
  ["I feel appreciated", "Me siento apreciado", "我感觉被欣赏", ["wǒ", "gǎn", "jué", "bèi", "xīn", "shǎng"], "Feeling valued.", "emotions"],
  ["I feel ignored", "Me siento ignorado", "我感觉被忽视了", ["wǒ", "gǎn", "jué", "bèi", "hū", "shì", "le"], "Feeling overlooked.", "emotions"],
  ["I feel understood", "Me siento comprendido", "我感觉被理解了", ["wǒ", "gǎn", "jué", "bèi", "lǐ", "jiě", "le"], "Feeling empathy.", "emotions"],
  ["I feel misunderstood", "Me siento incomprendido", "我感觉被误解了", ["wǒ", "gǎn", "jué", "bèi", "wù", "jiě", "le"], "Feeling misjudged.", "emotions"],
  ["I feel supported", "Me siento apoyado", "我感觉被支持了", ["wǒ", "gǎn", "jué", "bèi", "zhī", "chí", "le"], "Feeling backed.", "emotions"],
  ["I feel abandoned", "Me siento abandonado", "我感觉被抛弃了", ["wǒ", "gǎn", "jué", "bèi", "pāo", "qì", "le"], "Feeling deserted.", "emotions"],
  ["I feel inspired", "Me siento inspirado", "我感觉很受鼓舞", ["wǒ", "gǎn", "jué", "hěn", "shòu", "gǔ", "wǔ"], "Feeling motivation.", "emotions"],
  ["I feel discouraged", "Me siento desanimado", "我感觉很沮丧", ["wǒ", "gǎn", "jué", "hěn", "jǔ", "sàng"], "Feeling disheartened.", "emotions"],
  ["I feel challenged", "Me siento desafiado", "我感觉很有挑战", ["wǒ", "gǎn", "jué", "hěn", "yǒu", "tiǎo", "zhàn"], "Feeling tested.", "emotions"],
  ["I feel accomplished", "Me siento realizado", "我感觉很有成就感", ["wǒ", "gǎn", "jué", "hěn", "yǒu", "chéng", "jiù", "gǎn"], "Feeling success.", "emotions"],
  ["I feel frustrated", "Me siento frustrado", "我感觉很沮丧", ["wǒ", "gǎn", "jué", "hěn", "jǔ", "sàng"], "Feeling blocked.", "emotions"],
  ["I feel satisfied", "Me siento satisfecho", "我感觉很满意", ["wǒ", "gǎn", "jué", "hěn", "mǎn", "yì"], "Feeling content.", "emotions"],
  ["I feel dissatisfied", "Me siento insatisfecho", "我感觉不满意", ["wǒ", "gǎn", "jué", "bù", "mǎn", "yì"], "Feeling discontent.", "emotions"],
  ["I feel curious", "Me siento curioso", "我很好奇", ["wǒ", "hěn", "hào", "qí"], "Feeling interest.", "emotions"],
  ["I feel indifferent", "Me siento indiferente", "我感觉无所谓", ["wǒ", "gǎn", "jué", "wú", "suǒ", "wèi"], "Feeling apathy.", "emotions"],
  ["I feel optimistic", "Me siento optimista", "我很乐观", ["wǒ", "hěn", "lè", "guān"], "Feeling positivity.", "emotions"],
  ["I feel pessimistic", "Me siento pesimista", "我很悲观", ["wǒ", "hěn", "bēi", "guān"], "Feeling negativity.", "emotions"],
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
console.log('Batch 6: 50 more (total 300)');
