import fs from 'fs';
function r(chars, py) { return chars.split('').map((c, i) => `<ruby>${c}<rt>${py[i]}</rt></ruby>`).join(''); }
const phrases = [
  ["How long does it take?", "¿Cuánto tiempo toma?", "需要多长时间？", ["xū", "yào", "duō", "cháng", "shí", "jiān"], "Ask duration.", "travel"],
  ["I want to go to...", "Quiero ir a...", "我想去...", ["wǒ", "xiǎng", "qù"], "Express destination.", "travel"],
  ["I need a taxi", "Necesito un taxi", "我需要出租车", ["wǒ", "xū", "yào", "chū", "zū", "chē"], "Request taxi.", "travel"],
  ["Stop here, please", "Pare aquí, por favor", "请在这里停", ["qǐng", "zài", "zhè", "lǐ", "tíng"], "Request stop.", "travel"],
  ["What stop is this?", "¿Qué parada es esta?", "这是哪一站？", ["zhè", "shì", "nǎ", "yí", "zhàn"], "Identify stop.", "travel"],
  ["One ticket, please", "Un billete, por favor", "一张票", ["yì", "zhāng", "piào"], "Request ticket.", "travel"],
  ["Round trip", "Ida y vuelta", "往返", ["wǎng", "fǎn"], "Return ticket.", "travel"],
  ["I want to check in", "Quiero hacer el check-in", "我想办理入住", ["wǒ", "xiǎng", "bàn", "lǐ", "rù", "zhù"], "Hotel arrival.", "travel"],
  ["I want to check out", "Quiero hacer el check-out", "我想办理退房", ["wǒ", "xiǎng", "bàn", "lǐ", "tuì", "fáng"], "Hotel departure.", "travel"],
  ["I have a reservation", "Tengo una reserva", "我有预订", ["wǒ", "yǒu", "yù", "dìng"], "Confirm booking.", "travel"],
  ["What floor?", "¿Qué piso?", "几楼？", ["jǐ", "lóu"], "Ask floor.", "travel"],
  ["The elevator", "El ascensor", "电梯", ["diàn", "tī"], "Lift.", "travel"],
  ["The stairs", "Las escaleras", "楼梯", ["lóu", "tī"], "Staircase.", "travel"],
  ["Room service", "Servicio de habitación", "客房服务", ["kè", "fáng", "fú", "wù"], "Hotel service.", "travel"],
  ["Wake-up call", "Llamada de despertador", "叫醒服务", ["jiào", "xǐng", "fú", "wù"], "Morning call.", "travel"],
  ["I lost my key", "Perdí mi llave", "我丢了钥匙", ["wǒ", "diū", "le", "yào", "shi"], "Missing key.", "travel"],
  ["My room number is...", "Mi número de habitación es...", "我的房间号是...", ["wǒ", "de", "fáng", "jiān", "hào", "shì"], "Room identification.", "travel"],
  ["Is breakfast included?", "¿El desayuno está incluido?", "早餐包括吗？", ["zǎo", "cān", "bāo", "kuò", "ma"], "Ask about meals.", "travel"],
  ["What time is checkout?", "¿A qué hora es el check-out?", "几点退房？", ["jǐ", "diǎn", "tuì", "fáng"], "Ask checkout time.", "travel"],
  ["I need a doctor", "Necesito un doctor", "我需要医生", ["wǒ", "xū", "yào", "yī", "shēng"], "Medical need.", "health"],
  ["I don't feel well", "No me siento bien", "我不舒服", ["wǒ", "bù", "shū", "fu"], "Feeling ill.", "health"],
  ["It hurts here", "Me duele aquí", "这里疼", ["zhè", "lǐ", "téng"], "Indicate pain.", "health"],
  ["I have a headache", "Tengo dolor de cabeza", "我头疼", ["wǒ", "tóu", "téng"], "Head pain.", "health"],
  ["I have a fever", "Tengo fiebre", "我发烧了", ["wǒ", "fā", "shāo", "le"], "High temperature.", "health"],
  ["I have a cold", "Tengo un resfriado", "我感冒了", ["wǒ", "gǎn", "mào", "le"], "Common cold.", "health"],
  ["Call an ambulance", "Llama una ambulancia", "叫救护车", ["jiào", "jiù", "hù", "chē"], "Emergency call.", "health"],
  ["Where is the emergency room?", "¿Dónde está la sala de emergencias?", "急诊室在哪里？", ["jí", "zhěn", "shì", "zài", "nǎ", "lǐ"], "Find ER.", "health"],
  ["I'm pregnant", "Estoy embarazada", "我怀孕了", ["wǒ", "huái", "yùn", "le"], "Pregnancy.", "health"],
  ["I'm diabetic", "Soy diabético", "我有糖尿病", ["wǒ", "yǒu", "táng", "niào", "bìng"], "Medical condition.", "health"],
  ["I take this medicine", "Tomo este medicamento", "我吃这种药", ["wǒ", "chī", "zhè", "zhǒng", "yào"], "Medication.", "health"],
  ["I love you", "Te quiero", "我爱你", ["wǒ", "ài", "nǐ"], "Express love.", "emotions"],
  ["I miss you", "Te extraño", "我想你", ["wǒ", "xiǎng", "nǐ"], "Feel absence.", "emotions"],
  ["I like you", "Me gustas", "我喜欢你", ["wǒ", "xǐ", "huan", "nǐ"], "Express fondness.", "emotions"],
  ["I'm happy", "Estoy feliz", "我很高兴", ["wǒ", "hěn", "gāo", "xìng"], "Feeling joy.", "emotions"],
  ["I'm sad", "Estoy triste", "我很难过", ["wǒ", "hěn", "nán", "guò"], "Feeling sorrow.", "emotions"],
  ["I'm tired", "Estoy cansado", "我很累", ["wǒ", "hěn", "lèi"], "Need rest.", "emotions"],
  ["I'm bored", "Estoy aburrido", "我很无聊", ["wǒ", "hěn", "wú", "liáo"], "Lack interest.", "emotions"],
  ["I'm excited", "Estoy emocionado", "我很兴奋", ["wǒ", "hěn", "xīng", "fèn"], "Feeling excitement.", "emotions"],
  ["I'm nervous", "Estoy nervioso", "我很紧张", ["wǒ", "hěn", "jǐn", "zhāng"], "Feeling anxiety.", "emotions"],
  ["I'm scared", "Tengo miedo", "我很害怕", ["wǒ", "hěn", "hài", "pà"], "Feeling fear.", "emotions"],
  ["I'm angry", "Estoy enojado", "我很生气", ["wǒ", "hěn", "shēng", "qì"], "Feeling anger.", "emotions"],
  ["I'm surprised", "Estoy sorprendido", "我很惊讶", ["wǒ", "hěn", "jīng", "yà"], "Feeling surprise.", "emotions"],
  ["I'm disappointed", "Estoy decepcionado", "我很失望", ["wǒ", "hěn", "shī", "wàng"], "Feeling let down.", "emotions"],
  ["I'm proud of you", "Estoy orgulloso de ti", "我为你骄傲", ["wǒ", "wèi", "nǐ", "jiāo", "ào"], "Express pride.", "emotions"],
  ["I feel lonely", "Me siento solo", "我感到孤独", ["wǒ", "gǎn", "dào", "gū", "dú"], "Feeling isolation.", "emotions"],
  ["I feel sick", "Me siento mal", "我觉得恶心", ["wǒ", "jué", "de", "ě", "xīn"], "Feeling nausea.", "health"],
  ["I feel better", "Me siento mejor", "我感觉好多了", ["wǒ", "gǎn", "jué", "hǎo", "duō", "le"], "Recovery.", "health"],
  ["I'm fine", "Estoy bien", "我很好", ["wǒ", "hěn", "hǎo"], "Good condition.", "health"],
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
console.log('Batch 5: 50 more (total 250)');
