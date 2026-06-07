import fs from 'fs';
function r(chars, py) { return chars.split('').map((c, i) => `<ruby>${c}<rt>${py[i]}</rt></ruby>`).join(''); }
const phrases = [
  ["All right", "De acuerdo", "好的", ["hǎo", "de"], "Agreement.", "response"],
  ["Okay", "Vale", "好的", ["hǎo", "de"], "Acceptance.", "response"],
  ["Sure", "Claro", "当然", ["dāng", "rán"], "Agreement.", "response"],
  ["Here", "Aquí", "这里", ["zhè", "lǐ"], "This location.", "location"],
  ["There", "Allí", "那里", ["nà", "lǐ"], "That location.", "location"],
  ["Everywhere", "En todas partes", "到处", ["dào", "chù"], "All places.", "location"],
  ["Inside", "Dentro", "里面", ["lǐ", "miàn"], "Interior.", "location"],
  ["Outside", "Fuera", "外面", ["wài", "miàn"], "Exterior.", "location"],
  ["Up", "Arriba", "上面", ["shàng", "miàn"], "Higher position.", "location"],
  ["Down", "Abajo", "下面", ["xià", "miàn"], "Lower position.", "location"],
  ["Left", "Izquierda", "左边", ["zuǒ", "biān"], "Left side.", "location"],
  ["Right", "Derecha", "右边", ["yòu", "biān"], "Right side.", "location"],
  ["Straight ahead", "Derecho", "一直走", ["yì", "zhí", "zǒu"], "Forward direction.", "location"],
  ["Turn left", "Gira a la izquierda", "向左转", ["xiàng", "zuǒ", "zhuǎn"], "Direction command.", "location"],
  ["Turn right", "Gira a la derecha", "向右转", ["xiàng", "yòu", "zhuǎn"], "Direction command.", "location"],
  ["Go back", "Vuelve", "回去", ["huí", "qù"], "Return.", "location"],
  ["Come in", "Entra", "进来", ["jìn", "lái"], "Enter.", "location"],
  ["Go out", "Sal", "出去", ["chū", "qù"], "Exit.", "location"],
  ["Sit down", "Siéntate", "坐下", ["zuò", "xià"], "Take a seat.", "action"],
  ["Stand up", "Levántate", "站起来", ["zhàn", "qǐ", "lái"], "Rise.", "action"],
  ["Follow me", "Sígueme", "跟我来", ["gēn", "wǒ", "lái"], "Come along.", "action"],
  ["This way", "Por aquí", "这边", ["zhè", "biān"], "Indicate direction.", "location"],
  ["That way", "Por allí", "那边", ["nà", "biān"], "Indicate direction.", "location"],
  ["Near here", "Cerca de aquí", "在这附近", ["zài", "zhè", "fù", "jìn"], "Close by.", "location"],
  ["Far from here", "Lejos de aquí", "离这里很远", ["lí", "zhè", "lǐ", "hěn", "yuǎn"], "Distant.", "location"],
  ["Next to", "Al lado de", "旁边", ["páng", "biān"], "Adjacent.", "location"],
  ["In front of", "Delante de", "前面", ["qián", "miàn"], "Before.", "location"],
  ["Behind", "Detrás de", "后面", ["hòu", "miàn"], "After.", "location"],
  ["Between", "Entre", "中间", ["zhōng", "jiān"], "In the middle.", "location"],
  ["Across from", "Enfrente de", "对面", ["duì", "miàn"], "Opposite.", "location"],
  ["Today", "Hoy", "今天", ["jīn", "tiān"], "This day.", "time"],
  ["Tomorrow", "Mañana", "明天", ["míng", "tiān"], "Next day.", "time"],
  ["Yesterday", "Ayer", "昨天", ["zuó", "tiān"], "Previous day.", "time"],
  ["Now", "Ahora", "现在", ["xiàn", "zài"], "This moment.", "time"],
  ["Later", "Más tarde", "以后", ["yǐ", "hòu"], "Future moment.", "time"],
  ["Soon", "Pronto", "很快", ["hěn", "kuài"], "Near future.", "time"],
  ["Right now", "Ahora mismo", "马上", ["mǎ", "shàng"], "Immediately.", "time"],
  ["This morning", "Esta mañana", "今天早上", ["jīn", "tiān", "zǎo", "shang"], "Today's morning.", "time"],
  ["This evening", "Esta noche", "今天晚上", ["jīn", "tiān", "wǎn", "shang"], "Today's evening.", "time"],
  ["At night", "De noche", "晚上", ["wǎn", "shang"], "Night time.", "time"],
  ["Every day", "Todos los días", "每天", ["měi", "tiān"], "Daily.", "time"],
  ["Once", "Por vez", "一次", ["yí", "cì"], "One time.", "time"],
  ["Twice", "Dos veces", "两次", ["liǎng", "cì"], "Two times.", "time"],
  ["Again", "Otra vez", "再一次", ["zài", "yí", "cì"], "Repeat.", "time"],
  ["Always", "Siempre", "总是", ["zǒng", "shì"], "Every time.", "time"],
  ["Sometimes", "A veces", "有时", ["yǒu", "shí"], "Occasionally.", "time"],
  ["Never", "Nunca", "从不", ["cóng", "bù"], "Not ever.", "time"],
  ["Usually", "Usualmente", "通常", ["tōng", "cháng"], "Normally.", "time"],
  ["How much is this?", "¿Cuánto cuesta esto?", "这个多少钱？", ["zhè", "gè", "duō", "shao", "qián"], "Ask item price.", "shopping"],
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
console.log('Batch 3: 50 more (total 150)');
