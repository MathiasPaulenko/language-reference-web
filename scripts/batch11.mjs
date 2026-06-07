import fs from 'fs';
function r(chars, py) { return chars.split('').map((c, i) => `<ruby>${c}<rt>${py[i]}</rt></ruby>`).join(''); }
const phrases = [
  // MAKING PLANS (15)
  ["What are you doing?", "¿Qué estás haciendo?", "你在做什么？", ["nǐ", "zài", "zuò", "shén", "me"], "Ask current activity.", "plans"],
  ["What are you doing tonight?", "¿Qué haces esta noche?", "你今晚做什么？", ["nǐ", "jīn", "wǎn", "zuò", "shén", "me"], "Ask evening plans.", "plans"],
  ["What are you doing this weekend?", "¿Qué haces este fin de semana?", "你这个周末做什么？", ["nǐ", "zhè", "gè", "zhōu", "mò", "zuò", "shén", "me"], "Ask weekend plans.", "plans"],
  ["Do you want to...?", "¿Quieres...?", "你想...吗？", ["nǐ", "xiǎng", "ma"], "Invite someone.", "plans"],
  ["Let's go out", "Vamos a salir", "我们出去吧", ["wǒ", "men", "chū", "qù", "ba"], "Suggest going out.", "plans"],
  ["Let's stay in", "Quedémonos en casa", "我们待在家里吧", ["wǒ", "men", "dài", "zài", "jiā", "lǐ", "ba"], "Suggest staying home.", "plans"],
  ["Let's meet at...", "Nos vemos en...", "我们在...见面吧", ["wǒ", "men", "zài", "jiàn", "miàn", "ba"], "Suggest meeting place.", "plans"],
  ["What time works for you?", "¿A qué hora te va bien?", "你几点方便？", ["nǐ", "jǐ", "diǎn", "fāng", "biàn"], "Ask availability.", "plans"],
  ["I'm busy", "Estoy ocupado", "我很忙", ["wǒ", "hěn", "máng"], "Not available.", "plans"],
  ["I'm free", "Estoy libre", "我有空", ["wǒ", "yǒu", "kòng"], "Available.", "plans"],
  ["That sounds good", "Suena bien", "听起来不错", ["tīng", "qǐ", "lái", "bù", "cuò"], "Accept plan.", "plans"],
  ["That sounds fun", "Suena divertido", "听起来很有趣", ["tīng", "qǐ", "lái", "hěn", "yǒu", "qù"], "Excited about plan.", "plans"],
  ["I have plans", "Tengo planes", "我有安排了", ["wǒ", "yǒu", "ān", "pái", "le"], "Already occupied.", "plans"],
  ["Rain check", "Otra vez será", "下次吧", ["xià", "cì", "ba"], "Postpone plan.", "plans"],
  ["I'll be there", "Estaré ahí", "我会到的", ["wǒ", "huì", "dào", "de"], "Confirm attendance.", "plans"],
  // ON THE PHONE (15)
  ["Hello, this is...", "Hola, soy...", "你好，我是...", ["nǐ", "hǎo", "wǒ", "shì"], "Phone greeting.", "phone"],
  ["Can I speak to...?", "¿Puedo hablar con...?", "我能和...说话吗？", ["wǒ", "néng", "hé", "shuō", "huà", "ma"], "Ask for someone.", "phone"],
  ["Who is calling?", "¿Quién llama?", "请问是谁？", ["qǐng", "wèn", "shì", "shuí"], "Ask caller identity.", "phone"],
  ["I'll call you back", "Te llamo de vuelta", "我给你回电话", ["wǒ", "gěi", "nǐ", "huí", "diàn", "huà"], "Return call.", "phone"],
  ["The line is busy", "La línea está ocupada", "电话占线", ["diàn", "huà", "zhàn", "xiàn"], "Unavailable.", "phone"],
  ["I can't hear you", "No te escucho", "我听不见", ["wǒ", "tīng", "bu", "jiàn"], "Audio problem.", "phone"],
  ["Can you hear me?", "¿Me escuchas?", "你能听见我吗？", ["nǐ", "néng", "tīng", "jiàn", "wǒ", "ma"], "Check audio.", "phone"],
  ["Speak louder", "Habla más alto", "大声一点", ["dà", "shēng", "yì", "diǎn"], "Increase volume.", "phone"],
  ["Speak slower", "Habla más despacio", "说慢一点", ["shuō", "màn", "yì", "diǎn"], "Reduce speed.", "phone"],
  ["You have the wrong number", "Te equivocaste de número", "你打错了", ["nǐ", "dǎ", "cuò", "le"], "Incorrect number.", "phone"],
  ["I'll text you", "Te mando un mensaje", "我给你发短信", ["wǒ", "gěi", "nǐ", "fā", "duǎn", "xìn"], "Send SMS.", "phone"],
  ["Leave a message", "Deja un mensaje", "留言", ["liú", "yán"], "Voicemail request.", "phone"],
  ["I'll leave a message", "Dejaré un mensaje", "我会留言的", ["wǒ", "huì", "liú", "yán", "de"], "Leave voicemail.", "phone"],
  ["The call dropped", "Se cortó la llamada", "电话断了", ["diàn", "huà", "duàn", "le"], "Disconnected.", "phone"],
  ["Bad connection", "Mala conexión", "信号不好", ["xìn", "hào", "bù", "hǎo"], "Poor signal.", "phone"],
  // COLORS & DESCRIPTIONS (10)
  ["What color?", "¿De qué color?", "什么颜色？", ["shén", "me", "yán", "sè"], "Ask color.", "description"],
  ["It's red", "Es rojo", "红色", ["hóng", "sè"], "Color red.", "description"],
  ["It's blue", "Es azul", "蓝色", ["lán", "sè"], "Color blue.", "description"],
  ["It's green", "Es verde", "绿色", ["lǜ", "sè"], "Color green.", "description"],
  ["It's yellow", "Es amarillo", "黄色", ["huáng", "sè"], "Color yellow.", "description"],
  ["It's black", "Es negro", "黑色", ["hēi", "sè"], "Color black.", "description"],
  ["It's white", "Es blanco", "白色", ["bái", "sè"], "Color white.", "description"],
  ["It's big", "Es grande", "很大", ["hěn", "dà"], "Large size.", "description"],
  ["It's small", "Es pequeño", "很小", ["hěn", "xiǎo"], "Small size.", "description"],
  ["It's beautiful", "Es hermoso", "很漂亮", ["hěn", "piào", "liang"], "Attractive.", "description"],
  // FINAL 10 MIXED
  ["I need a break", "Necesito un descanso", "我需要休息一下", ["wǒ", "xū", "yào", "xiū", "xi", "yí", "xià"], "Need pause.", "general"],
  ["I need a vacation", "Necesito vacaciones", "我需要度假", ["wǒ", "xū", "yào", "dù", "jià"], "Need time off.", "general"],
  ["I need a hug", "Necesito un abrazo", "我需要拥抱", ["wǒ", "xū", "yào", "yōng", "bào"], "Need comfort.", "general"],
  ["I need a favor", "Necesito un favor", "我需要帮忙", ["wǒ", "xū", "yào", "bāng", "máng"], "Need help.", "general"],
  ["I have an idea", "Tengo una idea", "我有一个主意", ["wǒ", "yǒu", "yí", "gè", "zhǔ", "yi"], "New thought.", "general"],
  ["I have a question", "Tengo una pregunta", "我有一个问题", ["wǒ", "yǒu", "yí", "gè", "wèn", "tí"], "Need answer.", "general"],
  ["I have a problem", "Tengo un problema", "我有一个问题", ["wǒ", "yǒu", "yí", "gè", "wèn", "tí"], "Need solution.", "general"],
  ["I have a suggestion", "Tengo una sugerencia", "我有一个建议", ["wǒ", "yǒu", "yí", "gè", "jiàn", "yì"], "Propose idea.", "general"],
  ["I have good news", "Tengo buenas noticias", "我有好消息", ["wǒ", "yǒu", "hǎo", "xiāo", "xi"], "Positive update.", "general"],
  ["I have bad news", "Tengo malas noticias", "我有坏消息", ["wǒ", "yǒu", "huài", "xiāo", "xi"], "Negative update.", "general"],
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
console.log('Batch 11: 50 more (total 500)');
