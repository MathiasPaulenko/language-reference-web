import fs from 'fs';

const phrases = [
  // === GREETINGS & FAREWELLS (1-25) ===
  { w: "Hello", es: "Hola", zh: "你好", py: ["nǐ","hǎo"], def: "A common greeting.", tags: ["greeting"] },
  { w: "How are you?", es: "¿Cómo estás?", zh: "你好吗？", py: ["nǐ","hǎo","ma"], def: "Asking about someone's well-being.", tags: ["greeting","question"] },
  { w: "Good morning", es: "Buenos días", zh: "早上好", py: ["zǎo","shang","hǎo"], def: "Greeting used in the early part of the day.", tags: ["greeting"] },
  { w: "Good afternoon", es: "Buenas tardes", zh: "下午好", py: ["xià","wǔ","hǎo"], def: "Greeting used after midday.", tags: ["greeting"] },
  { w: "Good evening", es: "Buenas noches", zh: "晚上好", py: ["wǎn","shang","hǎo"], def: "Greeting used in the evening.", tags: ["greeting"] },
  { w: "Good night", es: "Buenas noches", zh: "晚安", py: ["wǎn","ān"], def: "Said before going to sleep.", tags: ["greeting"] },
  { w: "Goodbye", es: "Adiós", zh: "再见", py: ["zài","jiàn"], def: "Said when leaving.", tags: ["greeting"] },
  { w: "See you later", es: "Hasta luego", zh: "回头见", py: ["huí","tóu","jiàn"], def: "Said when expecting to meet again.", tags: ["greeting"] },
  { w: "See you tomorrow", es: "Hasta mañana", zh: "明天见", py: ["míng","tiān","jiàn"], def: "Said when meeting the next day.", tags: ["greeting"] },
  { w: "Nice to meet you", es: "Mucho gusto", zh: "很高兴认识你", py: ["hěn","gāo","xìng","rèn","shi","nǐ"], def: "Said when introduced to someone.", tags: ["greeting"] },
  { w: "Pleased to meet you", es: "Encantado", zh: "很荣幸见到你", py: ["hěn","róng","xìng","jiàn","dào","nǐ"], def: "Formal greeting upon introduction.", tags: ["greeting","formal"] },
  { w: "Welcome", es: "Bienvenido", zh: "欢迎", py: ["huān","yíng"], def: "Greeting to someone arriving.", tags: ["greeting"] },
  { w: "How do you do?", es: "¿Cómo le va?", zh: "您好", py: ["nín","hǎo"], def: "Formal greeting.", tags: ["greeting","formal"] },
  { w: "What's up?", es: "¿Qué tal?", zh: "最近怎么样", py: ["zuì","jìn","zěn","me","yàng"], def: "Casual greeting among friends.", tags: ["greeting","casual"] },
  { w: "Long time no see", es: "Cuánto tiempo", zh: "好久不见", py: ["hǎo","jiǔ","bù","jiàn"], def: "Said when meeting after a long absence.", tags: ["greeting"] },
  { w: "Have a good day", es: "Que tengas un buen día", zh: "祝你今天愉快", py: ["zhù","nǐ","jīn","tiān","yú","kuài"], def: "Wishing someone a pleasant day.", tags: ["greeting","polite"] },
  { w: "Have a good weekend", es: "Que tengas un buen fin de semana", zh: "周末愉快", py: ["zhōu","mò","yú","kuài"], def: "Wishing someone a pleasant weekend.", tags: ["greeting"] },
  { w: "Take care", es: "Cuídate", zh: "保重", py: ["bǎo","zhòng"], def: "Said when parting, wishing well-being.", tags: ["greeting"] },
  { w: "Safe travels", es: "Buen viaje", zh: "一路平安", py: ["yí","lù","píng","ān"], def: "Wishing someone a safe journey.", tags: ["greeting","travel"] },
  { w: "Good luck", es: "Buena suerte", zh: "祝你好运", py: ["zhù","nǐ","hǎo","yùn"], def: "Wishing someone success.", tags: ["greeting"] },
  { w: "Congratulations", es: "Felicidades", zh: "恭喜", py: ["gōng","xǐ"], def: "Said to celebrate someone's achievement.", tags: ["greeting","polite"] },
  { w: "Happy birthday", es: "Feliz cumpleaños", zh: "生日快乐", py: ["shēng","rì","kuài","lè"], def: "Celebrating someone's birth anniversary.", tags: ["greeting"] },
  { w: "Merry Christmas", es: "Feliz Navidad", zh: "圣诞快乐", py: ["shèng","dàn","kuài","lè"], def: "Christmas greeting.", tags: ["greeting","holiday"] },
  { w: "Happy New Year", es: "Feliz Año Nuevo", zh: "新年快乐", py: ["xīn","nián","kuài","lè"], def: "New Year greeting.", tags: ["greeting","holiday"] },
  { w: "Happy holidays", es: "Felices fiestas", zh: "节日快乐", py: ["jié","rì","kuài","lè"], def: "General holiday greeting.", tags: ["greeting","holiday"] },

  // === POLITE EXPRESSIONS (26-50) ===
  { w: "Thank you", es: "Gracias", zh: "谢谢", py: ["xiè","xiè"], def: "Expression of gratitude.", tags: ["polite"] },
  { w: "Thank you very much", es: "Muchas gracias", zh: "非常感谢", py: ["fēi","cháng","gǎn","xiè"], def: "Strong expression of gratitude.", tags: ["polite"] },
  { w: "Thanks a lot", es: "Muchísimas gracias", zh: "多谢", py: ["duō","xiè"], def: "Informal strong thanks.", tags: ["polite","casual"] },
  { w: "I appreciate it", es: "Te lo agradezco", zh: "我很感激", py: ["wǒ","hěn","gǎn","jī"], def: "Expressing appreciation.", tags: ["polite"] },
  { w: "You're welcome", es: "De nada", zh: "不客气", py: ["bù","kè","qi"], def: "Response to thanks.", tags: ["polite"] },
  { w: "No thanks", es: "No, gracias", zh: "不用了谢谢", py: ["bù","yòng","le","xiè","xiè"], def: "Politely declining an offer.", tags: ["polite"] },
  { w: "Please", es: "Por favor", zh: "请", py: ["qǐng"], def: "Polite request marker.", tags: ["polite"] },
  { w: "Excuse me", es: "Disculpe", zh: "打扰一下", py: ["dǎ","rǎo","yí","xià"], def: "Getting attention or apologizing for interruption.", tags: ["polite"] },
  { w: "Pardon me", es: "Perdón", zh: "请原谅", py: ["qǐng","yuán","liàng"], def: "Asking someone to repeat or for forgiveness.", tags: ["polite"] },
  { w: "I'm sorry", es: "Lo siento", zh: "对不起", py: ["duì","bu","qǐ"], def: "Apologizing for something.", tags: ["polite"] },
  { w: "Sorry for the trouble", es: "Perdone las molestias", zh: "麻烦你了", py: ["má","fan","nǐ","le"], def: "Apologizing for causing inconvenience.", tags: ["polite"] },
  { w: "No problem", es: "No hay problema", zh: "没问题", py: ["méi","wèn","tí"], def: "Reassuring that something is fine.", tags: ["polite","response"] },
  { w: "Don't worry", es: "No te preocupes", zh: "别担心", py: ["bié","dān","xīn"], def: "Reassuring someone.", tags: ["polite","response"] },
  { w: "It's okay", es: "Está bien", zh: "没关系", py: ["méi","guān","xi"], def: "Saying something is acceptable.", tags: ["polite","response"] },
  { w: "I apologize", es: "Mis disculpas", zh: "我道歉", py: ["wǒ","dào","qiàn"], def: "Formal apology.", tags: ["polite","formal"] },
  { w: "Forgive me", es: "Perdóname", zh: "原谅我", py: ["yuán","liàng","wǒ"], def: "Asking for forgiveness.", tags: ["polite"] },
  { w: "May I?", es: "¿Puedo?", zh: "我可以吗", py: ["wǒ","kě","yǐ","ma"], def: "Asking for permission.", tags: ["polite","question"] },
  { w: "Would you mind?", es: "¿Le importaría?", zh: "你介意吗", py: ["nǐ","jiè","yì","ma"], def: "Polite request asking if someone objects.", tags: ["polite","question"] },
  { w: "After you", es: "Después de usted", zh: "您先请", py: ["nín","xiān","qǐng"], def: "Letting someone go first.", tags: ["polite"] },
  { w: "Bless you", es: "Salud", zh: "保重", py: ["bǎo","zhòng"], def: "Said after someone sneezes.", tags: ["polite"] },
  { w: "Cheers", es: "Salud", zh: "干杯", py: ["gān","bēi"], def: "Toast when drinking.", tags: ["polite","social"] },
  { w: "My pleasure", es: "Con mucho gusto", zh: "我的荣幸", py: ["wǒ","de","róng","xìng"], def: "Happy to help.", tags: ["polite","response"] },
  { w: "Anytime", es: "En cualquier momento", zh: "随时", py: ["suí","shí"], def: "Available whenever needed.", tags: ["polite","response"] },
  { w: "With pleasure", es: "Con gusto", zh: "乐意效劳", py: ["lè","yì","xiào","láo"], def: "Willing to do something.", tags: ["polite","response"] },
  { w: "Not at all", es: "De nada", zh: "一点也不", py: ["yì","diǎn","yě","bù"], def: "Emphatic response to thanks.", tags: ["polite","response"] },

  // === QUESTIONS (51-85) ===
  { w: "What is this?", es: "¿Qué es esto?", zh: "这是什么？", py: ["zhè","shì","shén","me"], def: "Asking to identify an object.", tags: ["question"] },
  { w: "What is that?", es: "¿Qué es eso?", zh: "那是什么？", py: ["nà","shì","shén","me"], def: "Asking to identify something distant.", tags: ["question"] },
  { w: "Who is he?", es: "¿Quién es él?", zh: "他是谁？", py: ["tā","shì","shuí"], def: "Asking about a male person's identity.", tags: ["question"] },
  { w: "Who is she?", es: "¿Quién es ella?", zh: "她是谁？", py: ["tā","shì","shuí"], def: "Asking about a female person's identity.", tags: ["question"] },
  { w: "Where is it?", es: "¿Dónde está?", zh: "它在哪里？", py: ["tā","zài","nǎ","lǐ"], def: "Asking for location.", tags: ["question"] },
  { w: "Where are you?", es: "¿Dónde estás?", zh: "你在哪里？", py: ["nǐ","zài","nǎ","lǐ"], def: "Asking someone's location.", tags: ["question"] },
  { w: "When is it?", es: "¿Cuándo es?", zh: "什么时候？", py: ["shén","me","shí","hou"], def: "Asking about time.", tags: ["question"] },
  { w: "Why not?", es: "¿Por qué no?", zh: "为什么不呢？", py: ["wèi","shén","me","bù","ne"], def: "Asking for a reason against something.", tags: ["question"] },
  { w: "How much?", es: "¿Cuánto?", zh: "多少钱？", py: ["duō","shao","qián"], def: "Asking about price.", tags: ["question","shopping"] },
  { w: "How many?", es: "¿Cuántos?", zh: "多少个？", py: ["duō","shao","gè"], def: "Asking about quantity.", tags: ["question"] },
  { w: "How long?", es: "¿Cuánto tiempo?", zh: "多长时间？", py: ["duō","cháng","shí","jiān"], def: "Asking about duration.", tags: ["question"] },
  { w: "How far?", es: "¿A qué distancia?", zh: "多远？", py: ["duō","yuǎn"], def: "Asking about distance.", tags: ["question"] },
  { w: "How old are you?", es: "¿Cuántos años tienes?", zh: "你多大了？", py: ["nǐ","duō","dà","le"], def: "Asking about age.", tags: ["question","personal"] },
  { w: "What time is it?", es: "¿Qué hora es?", zh: "现在几点了？", py: ["xiàn","zài","jǐ","diǎn","le"], def: "Asking the current time.", tags: ["question","time"] },
  { w: "What's your name?", es: "¿Cómo te llamas?", zh: "你叫什么名字？", py: ["nǐ","jiào","shén","me","míng","zi"], def: "Asking someone's name.", tags: ["question","personal"] },
  { w: "Where do you live?", es: "¿Dónde vives?", zh: "你住在哪里？", py: ["nǐ","zhù","zài","nǎ","lǐ"], def: "Asking about residence.", tags: ["question","personal"] },
  { w: "Where are you from?", es: "¿De dónde eres?", zh: "你从哪里来？", py: ["nǐ","cóng","nǎ","lǐ","lái"], def: "Asking about origin.", tags: ["question","personal"] },
  { w: "What do you do?", es: "¿A qué te dedicas?", zh: "你是做什么的？", py: ["nǐ","shì","zuò","shén","me","de"], def: "Asking about occupation.", tags: ["question","work"] },
  { w: "Do you understand?", es: "¿Entiendes?", zh: "你明白吗？", py: ["nǐ","míng","bái","ma"], def: "Checking comprehension.", tags: ["question"] },
  { w: "Can you help me?", es: "¿Puedes ayudarme?", zh: "你能帮我吗？", py: ["nǐ","néng","bāng","wǒ","ma"], def: "Requesting assistance.", tags: ["question","help"] },
  { w: "Can I help you?", es: "¿Puedo ayudarte?", zh: "我能帮你吗？", py: ["wǒ","néng","bāng","nǐ","ma"], def: "Offering assistance.", tags: ["question","help"] },
  { w: "Do you speak English?", es: "¿Hablas inglés?", zh: "你会说英语吗？", py: ["nǐ","huì","shuō","yīng","yǔ","ma"], def: "Asking about language ability.", tags: ["question","language"] },
  { w: "Do you speak Spanish?", es: "¿Hablas español?", zh: "你会说西班牙语吗？", py: ["nǐ","huì","shuō","xī","bān","yá","yǔ","ma"], def: "Asking about Spanish ability.", tags: ["question","language"] },
  { w: "What happened?", es: "¿Qué pasó?", zh: "发生什么事了？", py: ["fā","shēng","shén","me","shì","le"], def: "Asking about an event.", tags: ["question"] },
  { w: "What's wrong?", es: "¿Qué pasa?", zh: "怎么了？", py: ["zěn","me","le"], def: "Asking if there's a problem.", tags: ["question"] },
  { w: "Is everything okay?", es: "¿Todo bien?", zh: "一切都好吗？", py: ["yí","qiè","dōu","hǎo","ma"], def: "Checking if things are fine.", tags: ["question"] },
  { w: "Are you sure?", es: "¿Estás seguro?", zh: "你确定吗？", py: ["nǐ","què","dìng","ma"], def: "Confirming certainty.", tags: ["question"] },
  { w: "What do you think?", es: "¿Qué piensas?", zh: "你觉得呢？", py: ["nǐ","jué","de","ne"], def: "Asking for opinion.", tags: ["question","opinion"] },
  { w: "What do you mean?", es: "¿Qué quieres decir?", zh: "你是什么意思？", py: ["nǐ","shì","shén","me","yì","si"], def: "Asking for clarification.", tags: ["question"] },
  { w: "How do you say...?", es: "¿Cómo se dice...?", zh: "怎么说...？", py: ["zěn","me","shuō"], def: "Asking for translation.", tags: ["question","language"] },
  { w: "What's the matter?", es: "¿Cuál es el problema?", zh: "有什么事吗？", py: ["yǒu","shén","me","shì","ma"], def: "Asking about a problem.", tags: ["question"] },
  { w: "Whose is this?", es: "¿De quién es esto?", zh: "这是谁的？", py: ["zhè","shì","shuí","de"], def: "Asking about ownership.", tags: ["question"] },
  { w: "Which one?", es: "¿Cuál?", zh: "哪一个？", py: ["nǎ","yí","gè"], def: "Asking to choose from options.", tags: ["question"] },

  // === RESPONSES & AGREEMENT (86-110) ===
  { w: "Yes", es: "Sí", zh: "是", py: ["shì"], def: "Affirmative response.", tags: ["response"] },
  { w: "No", es: "No", zh: "不是", py: ["bù","shì"], def: "Negative response.", tags: ["response"] },
  { w: "Maybe", es: "Tal vez", zh: "也许", py: ["yě","xǔ"], def: "Uncertain response.", tags: ["response"] },
  { w: "Probably", es: "Probablemente", zh: "可能", py: ["kě","néng"], def: "Likely but not certain.", tags: ["response"] },
  { w: "I don't know", es: "No sé", zh: "我不知道", py: ["wǒ","bù","zhī","dào"], def: "Lack of knowledge.", tags: ["response"] },
  { w: "I think so", es: "Creo que sí", zh: "我想是的", py: ["wǒ","xiǎng","shì","de"], def: "Tentative agreement.", tags: ["response"] },
  { w: "I hope so", es: "Espero que sí", zh: "我希望如此", py: ["wǒ","xī","wàng","rú","cǐ"], def: "Wishing for a positive outcome.", tags: ["response"] },
  { w: "I believe so", es: "Creo que sí", zh: "我相信如此", py: ["wǒ","xiāng","xìn","rú","cǐ"], def: "Believing something to be true.", tags: ["response"] },
  { w: "I suppose so", es: "Supongo que sí", zh: "我想是吧", py: ["wǒ","xiǎng","shì","ba"], def: "Hesitant agreement.", tags: ["response"] },
  { w: "Of course", es: "Por supuesto", zh: "当然", py: ["dāng","rán"], def: "Enthusiastic agreement.", tags: ["response"] },
  { w: "Absolutely", es: "Absolutamente", zh: "绝对", py: ["jué","duì"], def: "Strong agreement.", tags: ["response"] },
  { w: "Exactly", es: "Exactamente", zh: "完全正确", py: ["wán","quán","zhèng","què"], def: "Precise agreement.", tags: ["response"] },
  { w: "That's right", es: "Así es", zh: "对的", py: ["duì","de"], def: "Confirming correctness.", tags: ["response"] },
  { w: "That's true", es: "Es verdad", zh: "这是真的", py: ["zhè","shì","zhēn","de"], def: "Confirming truth.", tags: ["response"] },
  { w: "I agree", es: "Estoy de acuerdo", zh: "我同意", py: ["wǒ","tóng","yì"], def: "Expressing agreement.", tags: ["response","opinion"] },
  { w: "I disagree", es: "No estoy de acuerdo", zh: "我不同意", py: ["wǒ","bù","tóng","yì"], def: "Expressing disagreement.", tags: ["response","opinion"] },
  { w: "I think so too", es: "Yo también creo eso", zh: "我也这么想", py: ["wǒ","yě","zhè","me","xiǎng"], def: "Shared opinion.", tags: ["response","opinion"] },
  { w: "Me too", es: "Yo también", zh: "我也是", py: ["wǒ","yě","shì"], def: "Shared feeling or situation.", tags: ["response"] },
  { w: "Me neither", es: "Yo tampoco", zh: "我也不", py: ["wǒ","yě","bù"], def: "Shared negative feeling.", tags: ["response"] },
  { w: "So do I", es: "Yo también", zh: "我也是", py: ["wǒ","yě","shì"], def: "Same situation applies.", tags: ["response"] },
  { w: "I hope not", es: "Espero que no", zh: "我希望不是", py: ["wǒ","xī","wàng","bù","shì"], def: "Wishing against something.", tags: ["response"] },
  { w: "I doubt it", es: "Lo dudo", zh: "我怀疑", py: ["wǒ","huái","yí"], def: "Expressing skepticism.", tags: ["response"] },
  { w: "I guess so", es: "Supongo", zh: "我猜是吧", py: ["wǒ","cāi","shì","ba"], def: "Uncertain agreement.", tags: ["response"] },
  { w: "I don't think so", es: "No creo", zh: "我不这么认为", py: ["wǒ","bù","zhè","me","rèn","wéi"], def: "Tentative disagreement.", tags: ["response"] },
  { w: "I understand", es: "Entiendo", zh: "我明白了", py: ["wǒ","míng","bái","le"], def: "Comprehension achieved.", tags: ["response"] },
];

// Write part 1
let mdx = `---
title: "Essential Phrases"
description: "The 300 most frequently used everyday phrases in English, with Spanish and Chinese translations."
locale: en
lastUpdated: 2026-06-07
draft: false
entries:\n`;

for (const p of phrases) {
  const zhRuby = p.zh.split('').map((c, i) => `<ruby>${c}<rt>${p.py[i]}</rt></ruby>`).join('');
  mdx += `  - word: "${p.w}"
    translations:
      spanish: "${p.es}"
      english: "${p.w}"
      chinese: "${zhRuby}"
    definition: "${p.def}"
    tags: [${p.tags.map(t => `"${t}"`).join(', ')}]
`;
}

fs.writeFileSync('src/content/vocabulary/phrases.mdx', mdx, 'utf8');
console.log(`Wrote ${phrases.length} phrases (part 1/4)`);
