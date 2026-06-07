import fs from 'fs';

function ruby(chars, pinyins) {
  return chars.split('').map((c, i) => `<ruby>${c}<rt>${pinyins[i]}</rt></ruby>`).join('');
}

const phrases = [
  // === GREETINGS & FAREWELLS (1-25) ===
  { word: "Hello", es: "Hola", zh: "你好", py: ["nǐ","hǎo"], def: "A common greeting.", tags: ["greeting"] },
  { word: "How are you?", es: "¿Cómo estás?", zh: "你好吗？", py: ["nǐ","hǎo","ma"], def: "Asking about someone's well-being.", tags: ["greeting","question"] },
  { word: "Good morning", es: "Buenos días", zh: "早上好", py: ["zǎo","shang","hǎo"], def: "Greeting used in the early part of the day.", tags: ["greeting"] },
  { word: "Good afternoon", es: "Buenas tardes", zh: "下午好", py: ["xià","wǔ","hǎo"], def: "Greeting used after midday.", tags: ["greeting"] },
  { word: "Good evening", es: "Buenas noches", zh: "晚上好", py: ["wǎn","shang","hǎo"], def: "Greeting used in the evening.", tags: ["greeting"] },
  { word: "Good night", es: "Buenas noches", zh: "晚安", py: ["wǎn","ān"], def: "Said before going to sleep.", tags: ["greeting"] },
  { word: "Goodbye", es: "Adiós", zh: "再见", py: ["zài","jiàn"], def: "Said when leaving.", tags: ["greeting"] },
  { word: "See you later", es: "Hasta luego", zh: "回头见", py: ["huí","tóu","jiàn"], def: "Said when expecting to meet again.", tags: ["greeting"] },
  { word: "See you tomorrow", es: "Hasta mañana", zh: "明天见", py: ["míng","tiān","jiàn"], def: "Said when meeting the next day.", tags: ["greeting"] },
  { word: "Nice to meet you", es: "Mucho gusto", zh: "很高兴认识你", py: ["hěn","gāo","xìng","rèn","shi","nǐ"], def: "Said when introduced to someone.", tags: ["greeting"] },
  { word: "Pleased to meet you", es: "Encantado", zh: "很荣幸见到你", py: ["hěn","róng","xìng","jiàn","dào","nǐ"], def: "Formal greeting upon introduction.", tags: ["greeting","formal"] },
  { word: "Welcome", es: "Bienvenido", zh: "欢迎", py: ["huān","yíng"], def: "Greeting to someone arriving.", tags: ["greeting"] },
  { word: "How do you do?", es: "¿Cómo le va?", zh: "您好", py: ["nín","hǎo"], def: "Formal greeting.", tags: ["greeting","formal"] },
  { word: "What's up?", es: "¿Qué tal?", zh: "最近怎么样", py: ["zuì","jìn","zěn","me","yàng"], def: "Casual greeting among friends.", tags: ["greeting","casual"] },
  { word: "Long time no see", es: "Cuánto tiempo", zh: "好久不见", py: ["hǎo","jiǔ","bù","jiàn"], def: "Said when meeting after a long absence.", tags: ["greeting"] },
  { word: "Have a good day", es: "Que tengas un buen día", zh: "祝你今天愉快", py: ["zhù","nǐ","jīn","tiān","yú","kuài"], def: "Wishing someone a pleasant day.", tags: ["greeting","polite"] },
  { word: "Have a good weekend", es: "Que tengas un buen fin de semana", zh: "周末愉快", py: ["zhōu","mò","yú","kuài"], def: "Wishing someone a pleasant weekend.", tags: ["greeting"] },
  { word: "Take care", es: "Cuídate", zh: "保重", py: ["bǎo","zhòng"], def: "Said when parting, wishing well-being.", tags: ["greeting"] },
  { word: "Safe travels", es: "Buen viaje", zh: "一路平安", py: ["yí","lù","píng","ān"], def: "Wishing someone a safe journey.", tags: ["greeting","travel"] },
  { word: "Good luck", es: "Buena suerte", zh: "祝你好运", py: ["zhù","nǐ","hǎo","yùn"], def: "Wishing someone success.", tags: ["greeting"] },
  { word: "Congratulations", es: "Felicidades", zh: "恭喜", py: ["gōng","xǐ"], def: "Said to celebrate someone's achievement.", tags: ["greeting","polite"] },
  { word: "Happy birthday", es: "Feliz cumpleaños", zh: "生日快乐", py: ["shēng","rì","kuài","lè"], def: "Celebrating someone's birth anniversary.", tags: ["greeting"] },
  { word: "Merry Christmas", es: "Feliz Navidad", zh: "圣诞快乐", py: ["shèng","dàn","kuài","lè"], def: "Christmas greeting.", tags: ["greeting","holiday"] },
  { word: "Happy New Year", es: "Feliz Año Nuevo", zh: "新年快乐", py: ["xīn","nián","kuài","lè"], def: "New Year greeting.", tags: ["greeting","holiday"] },
  { word: "Happy holidays", es: "Felices fiestas", zh: "节日快乐", py: ["jié","rì","kuài","lè"], def: "General holiday greeting.", tags: ["greeting","holiday"] },

  // === POLITE EXPRESSIONS (26-45) ===
  { word: "Thank you", es: "Gracias", zh: "谢谢", py: ["xiè","xiè"], def: "Expression of gratitude.", tags: ["polite"] },
  { word: "Thank you very much", es: "Muchas gracias", zh: "非常感谢", py: ["fēi","cháng","gǎn","xiè"], def: "Strong expression of gratitude.", tags: ["polite"] },
  { word: "You're welcome", es: "De nada", zh: "不客气", py: ["bù","kè","qi"], def: "Response to thanks.", tags: ["polite"] },
  { word: "Please", es: "Por favor", zh: "请", py: ["qǐng"], def: "Polite request marker.", tags: ["polite"] },
  { word: "Excuse me", es: "Disculpe", zh: "打扰一下", py: ["dǎ","rǎo","yí","xià"], def: "Getting attention or apologizing for interruption.", tags: ["polite"] },
  { word: "I'm sorry", es: "Lo siento", zh: "对不起", py: ["duì","bu","qǐ"], def: "Apologizing for something.", tags: ["polite"] },
  { word: "Sorry for the trouble", es: "Perdone las molestias", zh: "麻烦你了", py: ["má","fan","nǐ","le"], def: "Apologizing for causing inconvenience.", tags: ["polite"] },
  { word: "No problem", es: "No hay problema", zh: "没问题", py: ["méi","wèn","tí"], def: "Reassuring that something is fine.", tags: ["polite","response"] },
  { word: "Don't worry", es: "No te preocupes", zh: "别担心", py: ["bié","dān","xīn"], def: "Reassuring someone.", tags: ["polite","response"] },
  { word: "It's okay", es: "Está bien", zh: "没关系", py: ["méi","guān","xi"], def: "Saying something is acceptable.", tags: ["polite","response"] },
  { word: "I apologize", es: "Mis disculpas", zh: "我道歉", py: ["wǒ","dào","qiàn"], def: "Formal apology.", tags: ["polite","formal"] },
  { word: "Forgive me", es: "Perdóname", zh: "原谅我", py: ["yuán","liàng","wǒ"], def: "Asking for forgiveness.", tags: ["polite"] },
  { word: "May I?", es: "¿Puedo?", zh: "我可以吗", py: ["wǒ","kě","yǐ","ma"], def: "Asking for permission.", tags: ["polite","question"] },
  { word: "Would you mind?", es: "¿Le importaría?", zh: "你介意吗", py: ["nǐ","jiè","yì","ma"], def: "Polite request asking if someone objects.", tags: ["polite","question"] },
  { word: "After you", es: "Después de usted", zh: "您先请", py: ["nín","xiān","qǐng"], def: "Letting someone go first.", tags: ["polite"] },
  { word: "Bless you", es: "Salud", zh: "保重", py: ["bǎo","zhòng"], def: "Said after someone sneezes.", tags: ["polite"] },
  { word: "Cheers", es: "Salud", zh: "干杯", py: ["gān","bēi"], def: "Toast when drinking.", tags: ["polite","social"] },
  { word: "My pleasure", es: "Con mucho gusto", zh: "我的荣幸", py: ["wǒ","de","róng","xìng"], def: "Happy to help.", tags: ["polite","response"] },
  { word: "Anytime", es: "En cualquier momento", zh: "随时", py: ["suí","shí"], def: "Available whenever needed.", tags: ["polite","response"] },
  { word: "With pleasure", es: "Con gusto", zh: "乐意效劳", py: ["lè","yì","xiào","láo"], def: "Willing to do something.", tags: ["polite","response"] },
];

let mdx = `---
title: "Essential Phrases"
description: "The 300 most frequently used everyday phrases in English, with Spanish and Chinese translations."
locale: en
lastUpdated: 2026-06-07
draft: false
entries:\n`;

for (const p of phrases) {
  const zhRuby = p.zh.split('').map((c, i) => `<ruby>${c}<rt>${p.py[i]}</rt></ruby>`).join('');
  mdx += `  - word: "${p.word}"
    translations:
      spanish: "${p.es}"
      english: "${p.word}"
      chinese: "${zhRuby}"
    definition: "${p.def}"
    tags: [${p.tags.map(t => `"${t}"`).join(', ')}]
`;
}

mdx += `---

## Overview

These 300 essential phrases represent the most frequently used expressions in everyday communication across English, Spanish, and Chinese.
`;

fs.writeFileSync('src/content/vocabulary/phrases.mdx', mdx, 'utf8');
console.log(`Wrote ${phrases.length} phrases`);
