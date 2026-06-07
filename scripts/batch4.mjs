import fs from 'fs';
function r(chars, py) { return chars.split('').map((c, i) => `<ruby>${c}<rt>${py[i]}</rt></ruby>`).join(''); }
const phrases = [
  ["It's expensive", "Es caro", "很贵", ["hěn", "guì"], "High price.", "shopping"],
  ["It's cheap", "Es barato", "很便宜", ["hěn", "pián", "yi"], "Low price.", "shopping"],
  ["I'll take it", "Me lo llevo", "我要这个", ["wǒ", "yào", "zhè", "gè"], "Purchase decision.", "shopping"],
  ["I'm just looking", "Solo estoy mirando", "我只是看看", ["wǒ", "zhǐ", "shì", "kàn", "kan"], "Browsing.", "shopping"],
  ["Do you have...?", "¿Tienes...?", "你有...吗？", ["nǐ", "yǒu", "ma"], "Ask availability.", "shopping"],
  ["I want...", "Quiero...", "我想要...", ["wǒ", "xiǎng", "yào"], "Express desire.", "shopping"],
  ["I need...", "Necesito...", "我需要...", ["wǒ", "xū", "yào"], "Express need.", "shopping"],
  ["I like this", "Me gusta esto", "我喜欢这个", ["wǒ", "xǐ", "huan", "zhè", "gè"], "Positive preference.", "shopping"],
  ["Can I try this?", "¿Puedo probar esto?", "我能试试这个吗？", ["wǒ", "néng", "shì", "shi", "zhè", "gè", "ma"], "Test product.", "shopping"],
  ["It's too big", "Es demasiado grande", "太大了", ["tài", "dà", "le"], "Size issue.", "shopping"],
  ["It's too small", "Es demasiado pequeño", "太小了", ["tài", "xiǎo", "le"], "Size issue.", "shopping"],
  ["Can I return this?", "¿Puedo devolver esto?", "我能退这个吗？", ["wǒ", "néng", "tuì", "zhè", "gè", "ma"], "Ask return policy.", "shopping"],
  ["Can I pay by card?", "¿Puedo pagar con tarjeta?", "我能刷卡吗？", ["wǒ", "néng", "shuā", "kǎ", "ma"], "Payment method.", "shopping"],
  ["Cash only", "Solo efectivo", "只收现金", ["zhǐ", "shōu", "xiàn", "jīn"], "Payment restriction.", "shopping"],
  ["Keep the change", "Quédese con el cambio", "不用找了", ["bù", "yòng", "zhǎo", "le"], "Tip or convenience.", "shopping"],
  ["It's on sale", "Está en oferta", "在打折", ["zài", "dǎ", "zhé"], "Discounted.", "shopping"],
  ["I'm hungry", "Tengo hambre", "我饿了", ["wǒ", "è", "le"], "Need food.", "food"],
  ["I'm thirsty", "Tengo sed", "我渴了", ["wǒ", "kě", "le"], "Need drink.", "food"],
  ["What would you like?", "¿Qué te gustaría?", "你想要什么？", ["nǐ", "xiǎng", "yào", "shén", "me"], "Offer choice.", "food"],
  ["I'd like to order", "Quisiera pedir", "我想点菜", ["wǒ", "xiǎng", "diǎn", "cài"], "Place order.", "food"],
  ["The menu, please", "La carta, por favor", "请给我菜单", ["qǐng", "gěi", "wǒ", "cài", "dān"], "Request menu.", "food"],
  ["What do you recommend?", "¿Qué recomiendas?", "你有什么推荐？", ["nǐ", "yǒu", "shén", "me", "tuī", "jiàn"], "Ask suggestion.", "food"],
  ["I'll have the...", "Tomaré el...", "我要...", ["wǒ", "yào"], "Make selection.", "food"],
  ["Can I get the bill?", "¿Me trae la cuenta?", "能给我账单吗？", ["néng", "gěi", "wǒ", "zhàng", "dān", "ma"], "Request check.", "food"],
  ["Check, please", "La cuenta, por favor", "买单", ["mǎi", "dān"], "Request bill.", "food"],
  ["Is this spicy?", "¿Esto es picante?", "这个辣吗？", ["zhè", "gè", "là", "ma"], "Ask about spice.", "food"],
  ["I'm vegetarian", "Soy vegetariano", "我是素食者", ["wǒ", "shì", "sù", "shí", "zhě"], "Dietary preference.", "food"],
  ["I don't eat meat", "No como carne", "我不吃肉", ["wǒ", "bù", "chī", "ròu"], "Dietary restriction.", "food"],
  ["I'm allergic to...", "Soy alérgico a...", "我对...过敏", ["wǒ", "duì", "guò", "mǐn"], "Allergy warning.", "food"],
  ["Delicious", "Delicioso", "好吃", ["hǎo", "chī"], "Tasty.", "food"],
  ["Not good", "No está bueno", "不好吃", ["bù", "hǎo", "chī"], "Not tasty.", "food"],
  ["It's cold", "Está frío", "凉了", ["liáng", "le"], "Not warm.", "food"],
  ["It's hot", "Está caliente", "很烫", ["hěn", "tàng"], "High temperature.", "food"],
  ["More water, please", "Más agua, por favor", "请再给我一些水", ["qǐng", "zài", "gěi", "wǒ", "yì", "xiē", "shuǐ"], "Request water.", "food"],
  ["I'm full", "Estoy lleno", "我吃饱了", ["wǒ", "chī", "bǎo", "le"], "Satiated.", "food"],
  ["It was delicious", "Estaba delicioso", "很好吃", ["hěn", "hǎo", "chī"], "Compliment food.", "food"],
  ["Where is the bathroom?", "¿Dónde está el baño?", "洗手间在哪里？", ["xǐ", "shǒu", "jiān", "zài", "nǎ", "lǐ"], "Find restroom.", "travel"],
  ["Where is the exit?", "¿Dónde está la salida?", "出口在哪里？", ["chū", "kǒu", "zài", "nǎ", "lǐ"], "Find exit.", "travel"],
  ["Where is the entrance?", "¿Dónde está la entrada?", "入口在哪里？", ["rù", "kǒu", "zài", "nǎ", "lǐ"], "Find entrance.", "travel"],
  ["Where is the station?", "¿Dónde está la estación?", "车站在哪里？", ["chē", "zhàn", "zài", "nǎ", "lǐ"], "Find station.", "travel"],
  ["Where is the airport?", "¿Dónde está el aeropuerto?", "机场在哪里？", ["jī", "chǎng", "zài", "nǎ", "lǐ"], "Find airport.", "travel"],
  ["Where is the hotel?", "¿Dónde está el hotel?", "酒店在哪里？", ["jiǔ", "diàn", "zài", "nǎ", "lǐ"], "Find hotel.", "travel"],
  ["Where is the bank?", "¿Dónde está el banco?", "银行在哪里？", ["yín", "háng", "zài", "nǎ", "lǐ"], "Find bank.", "travel"],
  ["Where is the hospital?", "¿Dónde está el hospital?", "医院在哪里？", ["yī", "yuàn", "zài", "nǎ", "lǐ"], "Find hospital.", "travel"],
  ["Where is the pharmacy?", "¿Dónde está la farmacia?", "药店在哪里？", ["yào", "diàn", "zài", "nǎ", "lǐ"], "Find pharmacy.", "travel"],
  ["How do I get to...?", "¿Cómo llego a...?", "怎么去...？", ["zěn", "me", "qù"], "Ask directions.", "travel"],
  ["Is it far?", "¿Está lejos?", "远吗？", ["yuǎn", "ma"], "Ask distance.", "travel"],
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
console.log('Batch 4: 50 more (total 200)');
