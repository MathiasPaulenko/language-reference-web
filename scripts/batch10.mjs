import fs from 'fs';
function r(chars, py) { return chars.split('').map((c, i) => `<ruby>${c}<rt>${py[i]}</rt></ruby>`).join(''); }
const phrases = [
  // MONEY (20)
  ["I have money", "Tengo dinero", "我有钱", ["wǒ", "yǒu", "qián"], "Possess currency.", "money"],
  ["I don't have money", "No tengo dinero", "我没有钱", ["wǒ", "méi", "yǒu", "qián"], "Lack currency.", "money"],
  ["I need money", "Necesito dinero", "我需要钱", ["wǒ", "xū", "yào", "qián"], "Require funds.", "money"],
  ["I want to withdraw", "Quiero retirar", "我想取钱", ["wǒ", "xiǎng", "qǔ", "qián"], "Get cash.", "money"],
  ["I want to deposit", "Quiero depositar", "我想存钱", ["wǒ", "xiǎng", "cún", "qián"], "Put money in.", "money"],
  ["I want to transfer", "Quiero transferir", "我想转账", ["wǒ", "xiǎng", "zhuǎn", "zhàng"], "Move money.", "money"],
  ["What's the exchange rate?", "¿Cuál es el tipo de cambio?", "汇率是多少？", ["huì", "lǜ", "shì", "duō", "shao"], "Currency conversion.", "money"],
  ["I want to exchange", "Quiero cambiar", "我想换钱", ["wǒ", "xiǎng", "huàn", "qián"], "Change currency.", "money"],
  ["Too expensive", "Demasiado caro", "太贵了", ["tài", "guì", "le"], "High cost.", "money"],
  ["Too cheap", "Demasiado barato", "太便宜了", ["tài", "pián", "yi", "le"], "Low cost.", "money"],
  ["It's a good deal", "Es una buena oferta", "很划算", ["hěn", "huá", "suàn"], "Good value.", "money"],
  ["It's a waste", "Es un desperdicio", "太浪费了", ["tài", "làng", "fèi", "le"], "Unnecessary expense.", "money"],
  ["I can't afford it", "No puedo pagarlo", "我买不起", ["wǒ", "mǎi", "bu", "qǐ"], "Too costly.", "money"],
  ["I'll save money", "Ahorraré dinero", "我会省钱", ["wǒ", "huì", "shěng", "qián"], "Reduce spending.", "money"],
  ["I spent too much", "Gasté demasiado", "我花太多了", ["wǒ", "huā", "tài", "duō", "le"], "Overspent.", "money"],
  ["I need a loan", "Necesito un préstamo", "我需要贷款", ["wǒ", "xū", "yào", "dài", "kuǎn"], "Borrow money.", "money"],
  ["I need a receipt", "Necesito un recibo", "我需要收据", ["wǒ", "xū", "yào", "shōu", "jù"], "Proof of purchase.", "money"],
  ["The bill is wrong", "La cuenta está mal", "账单错了", ["zhàng", "dān", "cuò", "le"], "Incorrect total.", "money"],
  ["Split the bill", "Dividamos la cuenta", "AA制", ["A", "A", "zhì"], "Each pays own.", "money"],
  ["It's free", "Es gratis", "免费", ["miǎn", "fèi"], "No cost.", "money"],
  // TRANSPORTATION (15)
  ["Where is the bus stop?", "¿Dónde está la parada de bus?", "公交车站在哪里？", ["gōng", "jiāo", "chē", "zhàn", "zài", "nǎ", "lǐ"], "Find bus stop.", "transport"],
  ["Where is the train station?", "¿Dónde está la estación de tren?", "火车站在哪里？", ["huǒ", "chē", "zhàn", "zài", "nǎ", "lǐ"], "Find train station.", "transport"],
  ["What time does it leave?", "¿A qué hora sale?", "几点出发？", ["jǐ", "diǎn", "chū", "fā"], "Departure time.", "transport"],
  ["What time does it arrive?", "¿A qué hora llega?", "几点到达？", ["jǐ", "diǎn", "dào", "dá"], "Arrival time.", "transport"],
  ["Is it direct?", "¿Es directo?", "直达吗？", ["zhí", "dá", "ma"], "No transfers.", "transport"],
  ["I need a transfer", "Necesito hacer transbordo", "我需要换乘", ["wǒ", "xū", "yào", "huàn", "chéng"], "Change vehicles.", "transport"],
  ["First class", "Primera clase", "头等舱", ["tóu", "děng", "cāng"], "Luxury travel.", "transport"],
  ["Economy class", "Clase económica", "经济舱", ["jīng", "jì", "cāng"], "Standard travel.", "transport"],
  ["Window seat", "Asiento de ventanilla", "靠窗座位", ["kào", "chuāng", "zuò", "wèi"], "Seat preference.", "transport"],
  ["Aisle seat", "Asillo de pasillo", "靠过道座位", ["kào", "guò", "dào", "zuò", "wèi"], "Seat preference.", "transport"],
  ["Boarding pass", "Tarjeta de embarque", "登机牌", ["dēng", "jī", "pái"], "Flight document.", "transport"],
  ["Passport", "Pasaporte", "护照", ["hù", "zhào"], "Travel document.", "transport"],
  ["Visa", "Visa", "签证", ["qiān", "zhèng"], "Entry permit.", "transport"],
  ["Delayed", "Retrasado", "延误了", ["yán", "wù", "le"], "Late departure.", "transport"],
  ["Cancelled", "Cancelado", "取消了", ["qǔ", "xiāo", "le"], "No longer operating.", "transport"],
  // HOME (15)
  ["I'm at home", "Estoy en casa", "我在家", ["wǒ", "zài", "jiā"], "In residence.", "home"],
  ["I live alone", "Vivo solo", "我一个人住", ["wǒ", "yí", "gè", "rén", "zhù"], "Solo living.", "home"],
  ["I live with...", "Vivo con...", "我和...一起住", ["wǒ", "hé", "yì", "qǐ", "zhù"], "Shared residence.", "home"],
  ["This is my room", "Esta es mi habitación", "这是我的房间", ["zhè", "shì", "wǒ", "de", "fáng", "jiān"], "Personal space.", "home"],
  ["Turn on the light", "Enciende la luz", "开灯", ["kāi", "dēng"], "Illuminate room.", "home"],
  ["Turn off the light", "Apaga la luz", "关灯", ["guān", "dēng"], "Darken room.", "home"],
  ["Open the window", "Abre la ventana", "开窗", ["kāi", "chuāng"], "Let air in.", "home"],
  ["Close the door", "Cierra la puerta", "关门", ["guān", "mén"], "Secure entrance.", "home"],
  ["It's too noisy", "Está muy ruidoso", "太吵了", ["tài", "chǎo", "le"], "Loud environment.", "home"],
  ["It's too quiet", "Está muy callado", "太安静了", ["tài", "ān", "jìng", "le"], "Silent environment.", "home"],
  ["Make the bed", "Haz la cama", "整理床铺", ["zhěng", "lǐ", "chuáng", "pù"], "Tidy bedding.", "home"],
  ["Clean the room", "Limpia la habitación", "打扫房间", ["dǎ", "sǎo", "fáng", "jiān"], "Tidy space.", "home"],
  ["Wash the dishes", "Lava los platos", "洗碗", ["xǐ", "wǎn"], "Clean tableware.", "home"],
  ["Take out the trash", "Saca la basura", "倒垃圾", ["dǎo", "lā", "jī"], "Remove waste.", "home"],
  ["Water the plants", "Riega las plantas", "浇花", ["jiāo", "huā"], "Hydrate plants.", "home"],
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
console.log('Batch 10: 50 more (total 450)');
