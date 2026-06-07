import fs from 'fs';
function r(chars, py) { return chars.split('').map((c, i) => `<ruby>${c}<rt>${py[i]}</rt></ruby>`).join(''); }
const phrases = [
  // WEATHER (20)
  ["What's the weather like?", "¿Qué tiempo hace?", "天气怎么样？", ["tiān", "qì", "zěn", "me", "yàng"], "Ask about weather.", "weather"],
  ["It's sunny", "Está soleado", "晴天", ["qíng", "tiān"], "Clear sky.", "weather"],
  ["It's cloudy", "Está nublado", "多云", ["duō", "yún"], "Covered sky.", "weather"],
  ["It's raining", "Está lloviendo", "下雨了", ["xià", "yǔ", "le"], "Rain falling.", "weather"],
  ["It's snowing", "Está nevando", "下雪了", ["xià", "xuě", "le"], "Snow falling.", "weather"],
  ["It's windy", "Hace viento", "刮风了", ["guā", "fēng", "le"], "Strong breeze.", "weather"],
  ["It's foggy", "Hay niebla", "有雾", ["yǒu", "wù"], "Low visibility.", "weather"],
  ["It's hot", "Hace calor", "很热", ["hěn", "rè"], "High temperature.", "weather"],
  ["It's cold", "Hace frío", "很冷", ["hěn", "lěng"], "Low temperature.", "weather"],
  ["It's humid", "Está húmedo", "很潮湿", ["hěn", "cháo", "shī"], "Moist air.", "weather"],
  ["It's dry", "Está seco", "很干燥", ["hěn", "gān", "zào"], "Dry air.", "weather"],
  ["The weather is nice", "Hace buen tiempo", "天气很好", ["tiān", "qì", "hěn", "hǎo"], "Pleasant weather.", "weather"],
  ["The weather is bad", "Hace mal tiempo", "天气不好", ["tiān", "qì", "bù", "hǎo"], "Unpleasant weather.", "weather"],
  ["It's freezing", "Está helado", "冻死了", ["dòng", "sǐ", "le"], "Very cold.", "weather"],
  ["It's pouring", "Está diluviando", "下大雨了", ["xià", "dà", "yǔ", "le"], "Heavy rain.", "weather"],
  ["There's a storm", "Hay una tormenta", "暴风雨来了", ["bào", "fēng", "yǔ", "lái", "le"], "Storm approaching.", "weather"],
  ["It's thundering", "Está tronando", "打雷了", ["dǎ", "léi", "le"], "Thunder heard.", "weather"],
  ["It's lightning", "Hay relámpagos", "闪电了", ["shǎn", "diàn", "le"], "Lightning seen.", "weather"],
  ["The temperature is...", "La temperatura es...", "温度是...", ["wēn", "dù", "shì"], "State temperature.", "weather"],
  ["Bring an umbrella", "Lleva un paraguas", "带把伞", ["dài", "bǎ", "sǎn"], "Rain preparation.", "weather"],
  // FAMILY & RELATIONSHIPS (15)
  ["My family", "Mi familia", "我的家人", ["wǒ", "de", "jiā", "rén"], "Relatives.", "family"],
  ["My mother", "Mi madre", "我妈妈", ["wǒ", "mā", "ma"], "Female parent.", "family"],
  ["My father", "Mi padre", "我爸爸", ["wǒ", "bà", "ba"], "Male parent.", "family"],
  ["My parents", "Mis padres", "我父母", ["wǒ", "fù", "mǔ"], "Both parents.", "family"],
  ["My brother", "Mi hermano", "我哥哥", ["wǒ", "gē", "ge"], "Male sibling.", "family"],
  ["My sister", "Mi hermana", "我姐姐", ["wǒ", "jiě", "jie"], "Female sibling.", "family"],
  ["My husband", "Mi esposo", "我丈夫", ["wǒ", "zhàng", "fu"], "Spouse (male).", "family"],
  ["My wife", "Mi esposa", "我妻子", ["wǒ", "qī", "zi"], "Spouse (female).", "family"],
  ["My son", "Mi hijo", "我儿子", ["wǒ", "ér", "zi"], "Male child.", "family"],
  ["My daughter", "Mi hija", "我女儿", ["wǒ", "nǚ", "ér"], "Female child.", "family"],
  ["My friend", "Mi amigo", "我的朋友", ["wǒ", "de", "péng", "you"], "Close companion.", "family"],
  ["My boyfriend", "Mi novio", "我男朋友", ["wǒ", "nán", "péng", "you"], "Male partner.", "family"],
  ["My girlfriend", "Mi novia", "我女朋友", ["wǒ", "nǚ", "péng", "you"], "Female partner.", "family"],
  ["We're engaged", "Estamos comprometidos", "我们订婚了", ["wǒ", "men", "dìng", "hūn", "le"], "Betrothed.", "family"],
  ["We're married", "Estamos casados", "我们结婚了", ["wǒ", "men", "jié", "hūn", "le"], "Married couple.", "family"],
  // WORK & BUSINESS (15)
  ["I work at...", "Trabajo en...", "我在...工作", ["wǒ", "zài", "gōng", "zuò"], "Employment location.", "work"],
  ["I'm a student", "Soy estudiante", "我是学生", ["wǒ", "shì", "xué", "sheng"], "Learning occupation.", "work"],
  ["I'm a teacher", "Soy profesor", "我是老师", ["wǒ", "shì", "lǎo", "shī"], "Teaching occupation.", "work"],
  ["I'm a doctor", "Soy doctor", "我是医生", ["wǒ", "shì", "yī", "shēng"], "Medical occupation.", "work"],
  ["I'm a nurse", "Soy enfermero", "我是护士", ["wǒ", "shì", "hù", "shi"], "Nursing occupation.", "work"],
  ["I'm an engineer", "Soy ingeniero", "我是工程师", ["wǒ", "shì", "gōng", "chéng", "shī"], "Engineering occupation.", "work"],
  ["I'm a manager", "Soy gerente", "我是经理", ["wǒ", "shì", "jīng", "lǐ"], "Management occupation.", "work"],
  ["I'm unemployed", "Estoy desempleado", "我失业了", ["wǒ", "shī", "yè", "le"], "Without job.", "work"],
  ["I have a meeting", "Tengo una reunión", "我有一个会议", ["wǒ", "yǒu", "yí", "gè", "huì", "yì"], "Scheduled conference.", "work"],
  ["I have a deadline", "Tengo una fecha límite", "我有一个截止日期", ["wǒ", "yǒu", "yí", "gè", "jié", "zhǐ", "rì", "qī"], "Time limit.", "work"],
  ["I'm busy", "Estoy ocupado", "我很忙", ["wǒ", "hěn", "máng"], "Occupied with tasks.", "work"],
  ["I'm free", "Estoy libre", "我有空", ["wǒ", "yǒu", "kòng"], "Available time.", "work"],
  ["I work from home", "Trabajo desde casa", "我在家工作", ["wǒ", "zài", "jiā", "gōng", "zuò"], "Remote work.", "work"],
  ["I need a vacation", "Necesito vacaciones", "我需要休假", ["wǒ", "xū", "yào", "xiū", "jià"], "Need time off.", "work"],
  ["I quit", "Renuncié", "我辞职了", ["wǒ", "cí", "zhí", "le"], "Left job.", "work"],
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
console.log('Batch 8: 50 more (total 350)');
