import fs from 'fs';
function r(chars, py) { return chars.split('').map((c, i) => `<ruby>${c}<rt>${py[i]}</rt></ruby>`).join(''); }
const phrases = [
  // SCHOOL & EDUCATION (20)
  ["I go to school", "Voy a la escuela", "我去上学", ["wǒ", "qù", "shàng", "xué"], "Attend school.", "school"],
  ["I study...", "Estudio...", "我学习...", ["wǒ", "xué", "xí"], "Learning subject.", "school"],
  ["I have homework", "Tengo tarea", "我有作业", ["wǒ", "yǒu", "zuò", "yè"], "School assignments.", "school"],
  ["I have an exam", "Tengo un examen", "我有考试", ["wǒ", "yǒu", "kǎo", "shì"], "Test scheduled.", "school"],
  ["I passed", "Aprobé", "我通过了", ["wǒ", "tōng", "guò", "le"], "Successful test.", "school"],
  ["I failed", "Reprobé", "我没通过", ["wǒ", "méi", "tōng", "guò"], "Unsuccessful test.", "school"],
  ["I need to study", "Necesito estudiar", "我需要学习", ["wǒ", "xū", "yào", "xué", "xí"], "Prepare for test.", "school"],
  ["I graduated", "Me gradué", "我毕业了", ["wǒ", "bì", "yè", "le"], "Completed school.", "school"],
  ["I'm in college", "Estoy en la universidad", "我在上大学", ["wǒ", "zài", "shàng", "dà", "xué"], "University student.", "school"],
  ["I'm in high school", "Estoy en la secundaria", "我在上高中", ["wǒ", "zài", "shàng", "gāo", "zhōng"], "Secondary student.", "school"],
  ["What grade are you in?", "¿En qué grado estás?", "你几年级了？", ["nǐ", "jǐ", "nián", "jí", "le"], "Ask school level.", "school"],
  ["I have a degree in...", "Tengo un título en...", "我有...学位", ["wǒ", "yǒu", "xué", "wèi"], "Academic qualification.", "school"],
  ["I'm taking a course", "Estoy tomando un curso", "我在上课", ["wǒ", "zài", "shàng", "kè"], "Enrolled in class.", "school"],
  ["The class is cancelled", "La clase está cancelada", "课取消了", ["kè", "qǔ", "xiāo", "le"], "No class today.", "school"],
  ["I'm late for class", "Llego tarde a clase", "我上课迟到了", ["wǒ", "shàng", "kè", "chí", "dào", "le"], "Not on time.", "school"],
  ["I need a tutor", "Necesito un tutor", "我需要家教", ["wǒ", "xū", "yào", "jiā", "jiào"], "Need help learning.", "school"],
  ["I have a presentation", "Tengo una presentación", "我有一个演讲", ["wǒ", "yǒu", "yí", "gè", "yǎn", "jiǎng"], "Oral report.", "school"],
  ["I'm writing a paper", "Estoy escribiendo un ensayo", "我在写论文", ["wǒ", "zài", "xiě", "lùn", "wén"], "Academic writing.", "school"],
  ["I need a book", "Necesito un libro", "我需要一本书", ["wǒ", "xū", "yào", "yì", "běn", "shū"], "Need reading material.", "school"],
  ["The library", "La biblioteca", "图书馆", ["tú", "shū", "guǎn"], "Place for books.", "school"],
  // HOBBIES & INTERESTS (15)
  ["I like reading", "Me gusta leer", "我喜欢读书", ["wǒ", "xǐ", "huan", "dú", "shū"], "Enjoy books.", "hobbies"],
  ["I like music", "Me gusta la música", "我喜欢音乐", ["wǒ", "xǐ", "huan", "yīn", "yuè"], "Enjoy songs.", "hobbies"],
  ["I play guitar", "Toco guitarra", "我弹吉他", ["wǒ", "tán", "jí", "tā"], "Musical instrument.", "hobbies"],
  ["I play piano", "Toco piano", "我弹钢琴", ["wǒ", "tán", "gāng", "qín"], "Musical instrument.", "hobbies"],
  ["I like sports", "Me gustan los deportes", "我喜欢运动", ["wǒ", "xǐ", "huan", "yùn", "dòng"], "Enjoy athletics.", "hobbies"],
  ["I play soccer", "Juego fútbol", "我踢足球", ["wǒ", "tī", "zú", "qiú"], "Sport activity.", "hobbies"],
  ["I play basketball", "Juego baloncesto", "我打篮球", ["wǒ", "dǎ", "lán", "qiú"], "Sport activity.", "hobbies"],
  ["I like swimming", "Me gusta nadar", "我喜欢游泳", ["wǒ", "xǐ", "huan", "yóu", "yǒng"], "Water sport.", "hobbies"],
  ["I like cooking", "Me gusta cocinar", "我喜欢做饭", ["wǒ", "xǐ", "huan", "zuò", "fàn"], "Food preparation.", "hobbies"],
  ["I like dancing", "Me gusta bailar", "我喜欢跳舞", ["wǒ", "xǐ", "huan", "tiào", "wǔ"], "Movement to music.", "hobbies"],
  ["I like singing", "Me gusta cantar", "我喜欢唱歌", ["wǒ", "xǐ", "huan", "chàng", "gē"], "Vocal music.", "hobbies"],
  ["I like photography", "Me gusta la fotografía", "我喜欢摄影", ["wǒ", "xǐ", "huan", "shè", "yǐng"], "Taking pictures.", "hobbies"],
  ["I like traveling", "Me gusta viajar", "我喜欢旅行", ["wǒ", "xǐ", "huan", "lǚ", "xíng"], "Visiting places.", "hobbies"],
  ["I like movies", "Me gustan las películas", "我喜欢看电影", ["wǒ", "xǐ", "huan", "kàn", "diàn", "yǐng"], "Watching films.", "hobbies"],
  ["I like video games", "Me gustan los videojuegos", "我喜欢玩游戏", ["wǒ", "xǐ", "huan", "wán", "yóu", "xì"], "Gaming hobby.", "hobbies"],
  // TECHNOLOGY (15)
  ["I need WiFi", "Necesito WiFi", "我需要无线网络", ["wǒ", "xū", "yào", "wú", "xiàn", "wǎng", "luò"], "Internet connection.", "tech"],
  ["What's the password?", "¿Cuál es la contraseña?", "密码是什么？", ["mì", "mǎ", "shì", "shén", "me"], "Ask password.", "tech"],
  ["My phone died", "Mi teléfono se apagó", "我手机没电了", ["wǒ", "shǒu", "jī", "méi", "diàn", "le"], "No battery.", "tech"],
  ["I need to charge my phone", "Necesito cargar mi teléfono", "我需要给手机充电", ["wǒ", "xū", "yào", "gěi", "shǒu", "jī", "chōng", "diàn"], "Charge battery.", "tech"],
  ["The internet is slow", "Internet está lento", "网速很慢", ["wǎng", "sù", "hěn", "màn"], "Poor connection.", "tech"],
  ["I can't connect", "No puedo conectar", "我连接不上", ["wǒ", "lián", "jiē", "bù", "shàng"], "Connection failed.", "tech"],
  ["Send me a message", "Envíame un mensaje", "给我发消息", ["gěi", "wǒ", "fā", "xiāo", "xi"], "Text request.", "tech"],
  ["Call me", "Llámame", "给我打电话", ["gěi", "wǒ", "dǎ", "diàn", "huà"], "Phone request.", "tech"],
  ["Text me", "Mándame un mensaje", "给我发短信", ["gěi", "wǒ", "fā", "duǎn", "xìn"], "SMS request.", "tech"],
  ["I got your email", "Recibí tu correo", "我收到你的邮件了", ["wǒ", "shōu", "dào", "nǐ", "de", "yóu", "jiàn", "le"], "Email received.", "tech"],
  ["I sent you an email", "Te envié un correo", "我给你发邮件了", ["wǒ", "gěi", "nǐ", "fā", "yóu", "jiàn", "le"], "Email sent.", "tech"],
  ["Check your inbox", "Revisa tu bandeja", "查看你的收件箱", ["chá", "kàn", "nǐ", "de", "shōu", "jiàn", "xiāng"], "Look at email.", "tech"],
  ["Download this", "Descarga esto", "下载这个", ["xià", "zài", "zhè", "gè"], "Get file.", "tech"],
  ["Upload a photo", "Sube una foto", "上传一张照片", ["shàng", "chuán", "yì", "zhāng", "zhào", "piàn"], "Share image.", "tech"],
  ["Turn off the phone", "Apaga el teléfono", "关掉手机", ["guān", "diào", "shǒu", "jī"], "Power off.", "tech"],
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
console.log('Batch 9: 50 more (total 400)');
