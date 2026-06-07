import fs from 'fs';

function r(chars, py) {
  return chars.split('').map((c, i) => `<ruby>${c}<rt>${py[i]}</rt></ruby>`).join('');
}

const phrases = [
  ["Hello", "Hola", "你好", ["nǐ", "hǎo"], "A common greeting.", "greeting"],
  ["How are you?", "¿Cómo estás?", "你好吗？", ["nǐ", "hǎo", "ma"], "Asking about well-being.", "greeting,question"],
  ["Good morning", "Buenos días", "早上好", ["zǎo", "shang", "hǎo"], "Morning greeting.", "greeting"],
  ["Good afternoon", "Buenas tardes", "下午好", ["xià", "wǔ", "hǎo"], "Afternoon greeting.", "greeting"],
  ["Good evening", "Buenas noches", "晚上好", ["wǎn", "shang", "hǎo"], "Evening greeting.", "greeting"],
  ["Good night", "Buenas noches", "晚安", ["wǎn", "ān"], "Before sleep.", "greeting"],
  ["Goodbye", "Adiós", "再见", ["zài", "jiàn"], "Said when leaving.", "greeting"],
  ["See you later", "Hasta luego", "回头见", ["huí", "tóu", "jiàn"], "Expecting to meet again.", "greeting"],
  ["See you tomorrow", "Hasta mañana", "明天见", ["míng", "tiān", "jiàn"], "Meeting next day.", "greeting"],
  ["Nice to meet you", "Mucho gusto", "很高兴认识你", ["hěn", "gāo", "xìng", "rèn", "shi", "nǐ"], "Upon introduction.", "greeting"],
  ["Welcome", "Bienvenido", "欢迎", ["huān", "yíng"], "Greeting an arrival.", "greeting"],
  ["How do you do?", "¿Cómo le va?", "您好", ["nín", "hǎo"], "Formal greeting.", "greeting,formal"],
  ["What's up?", "¿Qué tal?", "最近怎么样", ["zuì", "jìn", "zěn", "me", "yàng"], "Casual greeting.", "greeting,casual"],
  ["Long time no see", "Cuánto tiempo", "好久不见", ["hǎo", "jiǔ", "bù", "jiàn"], "After long absence.", "greeting"],
  ["Have a good day", "Que tengas un buen día", "祝你今天愉快", ["zhù", "nǐ", "jīn", "tiān", "yú", "kuài"], "Wish pleasant day.", "greeting,polite"],
  ["Take care", "Cuídate", "保重", ["bǎo", "zhòng"], "Wish well-being.", "greeting"],
  ["Safe travels", "Buen viaje", "一路平安", ["yí", "lù", "píng", "ān"], "Wish safe journey.", "greeting,travel"],
  ["Good luck", "Buena suerte", "祝你好运", ["zhù", "nǐ", "hǎo", "yùn"], "Wish success.", "greeting"],
  ["Congratulations", "Felicidades", "恭喜", ["gōng", "xǐ"], "Celebrate achievement.", "greeting,polite"],
  ["Happy birthday", "Feliz cumpleaños", "生日快乐", ["shēng", "rì", "kuài", "lè"], "Birthday wish.", "greeting"],
  ["Merry Christmas", "Feliz Navidad", "圣诞快乐", ["shèng", "dàn", "kuài", "lè"], "Christmas greeting.", "greeting,holiday"],
  ["Happy New Year", "Feliz Año Nuevo", "新年快乐", ["xīn", "nián", "kuài", "lè"], "New Year greeting.", "greeting,holiday"],
  ["Thank you", "Gracias", "谢谢", ["xiè", "xiè"], "Expression of gratitude.", "polite"],
  ["Thank you very much", "Muchas gracias", "非常感谢", ["fēi", "cháng", "gǎn", "xiè"], "Strong gratitude.", "polite"],
  ["You're welcome", "De nada", "不客气", ["bù", "kè", "qi"], "Response to thanks.", "polite"],
  ["Please", "Por favor", "请", ["qǐng"], "Polite request.", "polite"],
  ["Excuse me", "Disculpe", "打扰一下", ["dǎ", "rǎo", "yí", "xià"], "Get attention.", "polite"],
  ["I'm sorry", "Lo siento", "对不起", ["duì", "bu", "qǐ"], "Apologizing.", "polite"],
  ["No problem", "No hay problema", "没问题", ["méi", "wèn", "tí"], "Reassuring.", "polite,response"],
  ["Don't worry", "No te preocupes", "别担心", ["bié", "dān", "xīn"], "Reassuring someone.", "polite,response"],
  ["It's okay", "Está bien", "没关系", ["méi", "guān", "xi"], "Something is acceptable.", "polite,response"],
  ["May I?", "¿Puedo?", "我可以吗", ["wǒ", "kě", "yǐ", "ma"], "Ask permission.", "polite,question"],
  ["Would you mind?", "¿Le importaría?", "你介意吗", ["nǐ", "jiè", "yì", "ma"], "Polite request.", "polite,question"],
  ["After you", "Después de usted", "您先请", ["nín", "xiān", "qǐng"], "Let someone go first.", "polite"],
  ["Bless you", "Salud", "保重", ["bǎo", "zhòng"], "After sneezing.", "polite"],
  ["Cheers", "Salud", "干杯", ["gān", "bēi"], "Drinking toast.", "polite,social"],
  ["My pleasure", "Con mucho gusto", "我的荣幸", ["wǒ", "de", "róng", "xìng"], "Happy to help.", "polite,response"],
  ["Anytime", "En cualquier momento", "随时", ["suí", "shí"], "Available anytime.", "polite,response"],
  ["What is this?", "¿Qué es esto?", "这是什么？", ["zhè", "shì", "shén", "me"], "Identify an object.", "question"],
  ["What is that?", "¿Qué es eso?", "那是什么？", ["nà", "shì", "shén", "me"], "Identify distant object.", "question"],
  ["Who is he?", "¿Quién es él?", "他是谁？", ["tā", "shì", "shuí"], "Male identity.", "question"],
  ["Who is she?", "¿Quién es ella?", "她是谁？", ["tā", "shì", "shuí"], "Female identity.", "question"],
  ["Where is it?", "¿Dónde está?", "它在哪里？", ["tā", "zài", "nǎ", "lǐ"], "Ask location.", "question"],
  ["Where are you?", "¿Dónde estás?", "你在哪里？", ["nǐ", "zài", "nǎ", "lǐ"], "Someone's location.", "question"],
  ["When is it?", "¿Cuándo es?", "什么时候？", ["shén", "me", "shí", "hou"], "Ask time.", "question"],
  ["Why not?", "¿Por qué no?", "为什么不呢？", ["wèi", "shén", "me", "bù", "ne"], "Reason against.", "question"],
  ["How much?", "¿Cuánto?", "多少钱？", ["duō", "shao", "qián"], "Ask price.", "question,shopping"],
  ["How many?", "¿Cuántos?", "多少个？", ["duō", "shao", "gè"], "Ask quantity.", "question"],
];

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

fs.writeFileSync('src/content/vocabulary/phrases.mdx', `---
title: "Essential Phrases"
description: "The most frequently used everyday phrases in English, with Spanish and Chinese translations."
locale: en
lastUpdated: 2026-06-07
draft: false
entries:
${entries}---

## Overview

These essential phrases represent the most frequently used expressions in everyday communication across English, Spanish, and Chinese.
`, 'utf8');

console.log('Batch 1: 50 phrases');
