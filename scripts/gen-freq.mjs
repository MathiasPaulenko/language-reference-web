import fs from 'fs';
function r(chars, py) { return chars.split('').map((c, i) => `<ruby>${c}<rt>${py[i]}</rt></ruby>`).join(''); }
const phrases = [
  ["the", "el/la", "那个", ["nà", "gè"], "Definite article. Used to refer to specific nouns.", "frequency, article"],
  ["be", "ser/estar", "是", ["shì"], "Verb. Used to link subject with description or identity.", "frequency, verb"],
  ["to", "a", "去", ["qù"], "Preposition indicating direction or infinitive marker.", "frequency, preposition"],
  ["of", "de", "的", ["de"], "Preposition showing possession, origin, or relationship.", "frequency, preposition"],
  ["and", "y", "和", ["hé"], "Conjunction joining words, phrases, or clauses.", "frequency, conjunction"],
  ["a", "un/una", "一", ["yī"], "Indefinite article used before singular countable nouns.", "frequency, article"],
  ["in", "en", "在", ["zài"], "Preposition indicating location or time within something.", "frequency, preposition"],
  ["that", "ese/esa", "那", ["nà"], "Demonstrative pronoun or conjunction introducing clauses.", "frequency, pronoun"],
  ["have", "tener/haber", "有", ["yǒu"], "Verb expressing possession, experience, or obligation.", "frequency, verb"],
  ["I", "yo", "我", ["wǒ"], "First-person singular pronoun referring to oneself.", "frequency, pronoun"],
  ["it", "ello", "它", ["tā"], "Third-person singular neuter pronoun.", "frequency, pronoun"],
  ["for", "para/por", "为了", ["wèi", "le"], "Preposition indicating purpose, benefit, or duration.", "frequency, preposition"],
  ["not", "no", "不", ["bù"], "Adverb negating verbs, adjectives, or other adverbs.", "frequency, adverb"],
  ["on", "sobre/en", "在...上", ["zài", "shàng"], "Preposition indicating position atop or specific days.", "frequency, preposition"],
  ["with", "con", "和...一起", ["hé", "yì", "qǐ"], "Preposition indicating accompaniment or means.", "frequency, preposition"],
  ["he", "él", "他", ["tā"], "Third-person singular masculine pronoun.", "frequency, pronoun"],
  ["as", "como", "作为", ["zuò", "wéi"], "Conjunction or preposition indicating role, function, or comparison.", "frequency, conjunction"],
  ["you", "tú/usted", "你", ["nǐ"], "Second-person pronoun addressing one or more people.", "frequency, pronoun"],
  ["do", "hacer", "做", ["zuò"], "Auxiliary verb for questions and negatives; also main verb meaning perform.", "frequency, verb"],
  ["at", "en/a", "在", ["zài"], "Preposition indicating exact location or time point.", "frequency, preposition"],
  ["this", "este/esta", "这", ["zhè"], "Demonstrative indicating something near the speaker.", "frequency, pronoun"],
  ["but", "pero", "但是", ["dàn", "shì"], "Conjunction introducing a contrast or exception.", "frequency, conjunction"],
  ["his", "su (de él)", "他的", ["tā", "de"], "Possessive adjective belonging to a male person.", "frequency, possessive"],
  ["by", "por", "通过", ["tōng", "guò"], "Preposition indicating means, agent, or proximity.", "frequency, preposition"],
  ["from", "desde/de", "从", ["cóng"], "Preposition indicating origin, source, or starting point.", "frequency, preposition"],
  ["they", "ellos/ellas", "他们", ["tā", "men"], "Third-person plural pronoun.", "frequency, pronoun"],
  ["we", "nosotros", "我们", ["wǒ", "men"], "First-person plural pronoun including the speaker.", "frequency, pronoun"],
  ["say", "decir", "说", ["shuō"], "Verb meaning to speak, express, or state something.", "frequency, verb"],
  ["her", "su (de ella)/la", "她的", ["tā", "de"], "Possessive adjective or object pronoun for female.", "frequency, possessive"],
  ["she", "ella", "她", ["tā"], "Third-person singular feminine pronoun.", "frequency, pronoun"],
  ["or", "o", "或者", ["huò", "zhě"], "Conjunction presenting an alternative choice.", "frequency, conjunction"],
  ["an", "un/una", "一", ["yī"], "Indefinite article used before vowel sounds.", "frequency, article"],
  ["will", "（futuro）", "将", ["jiāng"], "Modal verb expressing future tense or willingness.", "frequency, modal"],
  ["my", "mi", "我的", ["wǒ", "de"], "First-person singular possessive adjective.", "frequency, possessive"],
  ["one", "uno", "一", ["yī"], "Number or indefinite pronoun replacing a noun.", "frequency, number"],
  ["all", "todo/todos", "所有", ["suǒ", "yǒu"], "Determiner or pronoun meaning the entire quantity.", "frequency, determiner"],
  ["would", "（condicional）", "会", ["huì"], "Modal verb expressing hypothetical situations or polite requests.", "frequency, modal"],
  ["there", "ahí/allí", "那里", ["nà", "lǐ"], "Adverb indicating place; also used in existential sentences.", "frequency, adverb"],
  ["their", "su (de ellos)", "他们的", ["tā", "men", "de"], "Third-person plural possessive adjective.", "frequency, possessive"],
  ["what", "qué", "什么", ["shén", "me"], "Interrogative pronoun asking for information or identification.", "frequency, question"],
  ["so", "así que/tan", "所以", ["suǒ", "yǐ"], "Conjunction or adverb indicating result or degree.", "frequency, conjunction"],
  ["up", "arriba", "向上", ["xiàng", "shàng"], "Adverb or preposition indicating higher position or completion.", "frequency, adverb"],
  ["out", "fuera", "出去", ["chū", "qù"], "Adverb or preposition indicating exit or external position.", "frequency, adverb"],
  ["if", "si", "如果", ["rú", "guǒ"], "Conjunction introducing a conditional clause.", "frequency, conjunction"],
  ["about", "sobre/acerca de", "关于", ["guān", "yú"], "Preposition concerning a topic or approximate amount.", "frequency, preposition"],
  ["who", "quién", "谁", ["shuí"], "Interrogative or relative pronoun referring to people.", "frequency, question"],
  ["get", "obtener/conseguir", "得到", ["dé", "dào"], "Verb meaning to obtain, receive, or become.", "frequency, verb"],
  ["which", "cuál/que", "哪个", ["nǎ", "gè"], "Interrogative or relative pronoun asking for selection.", "frequency, question"],
  ["go", "ir", "去", ["qù"], "Verb indicating movement away from the speaker.", "frequency, verb"],
  ["me", "me", "我", ["wǒ"], "First-person singular object pronoun.", "frequency, pronoun"],
  ["when", "cuándo", "什么时候", ["shén", "me", "shí", "hou"], "Interrogative or conjunction referring to time.", "frequency, question"],
  ["make", "hacer/crear", "制作", ["zhì", "zuò"], "Verb meaning to create, cause, or force something.", "frequency, verb"],
  ["can", "poder", "能", ["néng"], "Modal verb expressing ability, permission, or possibility.", "frequency, modal"],
  ["like", "gustar/como", "喜欢", ["xǐ", "huan"], "Verb or preposition expressing preference or similarity.", "frequency, verb"],
  ["time", "tiempo/hora", "时间", ["shí", "jiān"], "Noun referring to duration, moment, or occasion.", "frequency, noun"],
  ["no", "no", "没有", ["méi", "yǒu"], "Determiner or adverb expressing negation or refusal.", "frequency, negation"],
  ["just", "solo/justo", "只是", ["zhǐ", "shì"], "Adverb meaning merely, exactly, or recently.", "frequency, adverb"],
  ["him", "lo/le", "他", ["tā"], "Third-person singular masculine object pronoun.", "frequency, pronoun"],
  ["know", "saber/conocer", "知道", ["zhī", "dào"], "Verb meaning to have information or be acquainted with.", "frequency, verb"],
  ["take", "tomar/llevar", "拿", ["ná"], "Verb meaning to grasp, carry, or require.", "frequency, verb"],
  ["people", "gente/personas", "人们", ["rén", "men"], "Noun referring to human beings in general.", "frequency, noun"],
  ["into", "dentro de", "进入", ["jìn", "rù"], "Preposition indicating movement inside something.", "frequency, preposition"],
  ["year", "año", "年", ["nián"], "Noun referring to a period of 365 days.", "frequency, noun"],
  ["your", "tu/su", "你的", ["nǐ", "de"], "Second-person possessive adjective.", "frequency, possessive"],
  ["good", "bueno", "好", ["hǎo"], "Adjective meaning positive, satisfactory, or kind.", "frequency, adjective"],
  ["some", "algunos/algunas", "一些", ["yì", "xiē"], "Determiner indicating an unspecified quantity.", "frequency, determiner"],
  ["could", "podría", "可以", ["kě", "yǐ"], "Modal verb expressing past ability or polite possibility.", "frequency, modal"],
  ["them", "los/las/les", "他们", ["tā", "men"], "Third-person plural object pronoun.", "frequency, pronoun"],
  ["see", "ver", "看见", ["kàn", "jiàn"], "Verb meaning to perceive with the eyes or understand.", "frequency, verb"],
  ["other", "otro", "其他", ["qí", "tā"], "Adjective or pronoun referring to alternative ones.", "frequency, adjective"],
  ["than", "que (comparativo)", "比", ["bǐ"], "Conjunction used in comparisons.", "frequency, conjunction"],
  ["then", "entonces", "然后", ["rán", "hòu"], "Adverb indicating sequence, consequence, or that time.", "frequency, adverb"],
  ["now", "ahora", "现在", ["xiàn", "zài"], "Adverb referring to the present moment.", "frequency, adverb"],
  ["look", "mirar/verse", "看", ["kàn"], "Verb meaning to direct eyes toward or appear.", "frequency, verb"],
  ["only", "solo/sólo", "只", ["zhǐ"], "Adverb or adjective restricting to a single thing.", "frequency, adverb"],
  ["come", "venir", "来", ["lái"], "Verb indicating movement toward the speaker.", "frequency, verb"],
  ["its", "su (de eso)", "它的", ["tā", "de"], "Possessive adjective for things or animals.", "frequency, possessive"],
  ["over", "sobre/encima", "在...上方", ["zài", "shàng", "fāng"], "Preposition or adverb indicating above or across.", "frequency, preposition"],
  ["think", "pensar/creer", "想", ["xiǎng"], "Verb meaning to use the mind to form ideas or opinions.", "frequency, verb"],
  ["also", "también", "也", ["yě"], "Adverb adding similar information.", "frequency, adverb"],
  ["back", "atrás/espalda", "后面", ["hòu", "miàn"], "Adverb or noun indicating return or rear position.", "frequency, adverb"],
  ["after", "después de", "在...之后", ["zài", "zhī", "hòu"], "Preposition or conjunction indicating later time or sequence.", "frequency, preposition"],
  ["use", "usar/utilizar", "使用", ["shǐ", "yòng"], "Verb meaning to employ for a purpose.", "frequency, verb"],
  ["two", "dos", "二", ["èr"], "Number following one.", "frequency, number"],
  ["how", "cómo", "怎么", ["zěn", "me"], "Interrogative adverb asking about manner or degree.", "frequency, question"],
  ["our", "nuestro", "我们的", ["wǒ", "men", "de"], "First-person plural possessive adjective.", "frequency, possessive"],
  ["work", "trabajo/trabajar", "工作", ["gōng", "zuò"], "Noun or verb referring to effort or employment.", "frequency, noun"],
  ["first", "primero", "第一", ["dì", "yī"], "Ordinal number or adverb indicating initial position.", "frequency, number"],
  ["well", "bien", "好", ["hǎo"], "Adverb meaning satisfactorily or in good health.", "frequency, adverb"],
  ["way", "camino/manera", "方式", ["fāng", "shì"], "Noun referring to method, direction, or distance.", "frequency, noun"],
  ["even", "incluso/aún", "甚至", ["shèn", "zhì"], "Adverb or adjective emphasizing extreme or equal degree.", "frequency, adverb"],
  ["new", "nuevo", "新", ["xīn"], "Adjective meaning recently made, discovered, or unfamiliar.", "frequency, adjective"],
  ["want", "querer", "想要", ["xiǎng", "yào"], "Verb expressing desire or need for something.", "frequency, verb"],
  ["because", "porque", "因为", ["yīn", "wèi"], "Conjunction introducing a reason or cause.", "frequency, conjunction"],
  ["any", "cualquiera/alguno", "任何", ["rèn", "hé"], "Determiner or pronoun referring to no matter which one.", "frequency, determiner"],
  ["these", "estos/estas", "这些", ["zhè", "xiē"], "Demonstrative plural referring to things near the speaker.", "frequency, pronoun"],
  ["give", "dar", "给", ["gěi"], "Verb meaning to transfer possession to someone.", "frequency, verb"],
  ["day", "día", "天", ["tiān"], "Noun referring to a 24-hour period or daytime.", "frequency, noun"],
  ["most", "más/la mayoría", "最", ["zuì"], "Determiner or adverb indicating greatest quantity or degree.", "frequency, determiner"],
  ["us", "nos", "我们", ["wǒ", "men"], "First-person plural object pronoun.", "frequency, pronoun"],
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

fs.writeFileSync('src/content/vocabulary/frequency-lists.mdx', `---
title: "Frequency Lists"
description: "The 100 most frequently used words in English, with Spanish and Chinese translations."
locale: en
lastUpdated: 2026-06-07
draft: false
entries:
${entries}---

## Overview

These are the most common words in English based on corpus frequency data, essential for building vocabulary foundations.
`, 'utf8');
console.log('Frequency list: 100 words');
