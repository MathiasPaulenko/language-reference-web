import fs from 'fs';
function r(chars, py) { return chars.split('').map((c, i) => `<ruby>${c}<rt>${py[i]}</rt></ruby>`).join(''); }
const phrases = [
  ["A blessing in disguise", "Una bendición disfrazada", "因祸得福", ["yīn", "huò", "dé", "fú"], "A good thing that seemed bad at first.", "idiom, optimism"],
  ["A dime a dozen", "A dos por peso", "多得是", ["duō", "de", "shì"], "Very common and easy to get.", "idiom, common"],
  ["Actions speak louder than words", "Las acciones hablan más que las palabras", "行动胜于言辞", ["xíng", "dòng", "shèng", "yú", "yán", "cí"], "What you do is more important than what you say.", "idiom, action"],
  ["All bark and no bite", "Mucho ruido y pocas nueces", "光说不做", ["guāng", "shuō", "bù", "zuò"], "Threatening but not acting.", "idiom, threat"],
  ["An arm and a leg", "Un ojo de la cara", "天价", ["tiān", "jià"], "Very expensive.", "idiom, money"],
  ["Apple of my eye", "La niña de mis ojos", "掌上明珠", ["zhǎng", "shàng", "míng", "zhū"], "Someone cherished above all others.", "idiom, love"],
  ["As right as rain", "Como nuevo", "完全健康", ["wán", "quán", "jiàn", "kāng"], "Perfectly fine and healthy.", "idiom, health"],
  ["Barking up the wrong tree", "Ir por mal camino", "找错对象", ["zhǎo", "cuò", "duì", "xiàng"], "Pursuing the wrong course of action.", "idiom, mistake"],
  ["Be glad to see the back of", "Alegrarse de que se vaya", "很高兴看到某人离开", ["hěn", "gāo", "xìng", "kàn", "dào", "mǒu", "rén", "lí", "kāi"], "Happy when someone leaves.", "idiom, relief"],
  ["Beat a dead horse", "Matar el tiempo", "徒劳无功", ["tú", "láo", "wú", "gōng"], "Waste effort on something already decided.", "idiom, futile"],
  ["Bite off more than you can chew", "Abrirse más de la cuenta", "贪多嚼不烂", ["tān", "duō", "jiáo", "bù", "làn"], "Take on a task too big to handle.", "idiom, overcommit"],
  ["By the skin of your teeth", "Por los pelos", "勉强", ["miǎn", "qiǎng"], "Just barely succeed.", "idiom, narrow"],
  ["Cash cow", "Vaca lechera", "摇钱树", ["yáo", "qián", "shù"], "A reliable source of income.", "idiom, business"],
  ["Caught between a rock and a hard place", "Entre la espada y la pared", "进退两难", ["jìn", "tuì", "liǎng", "nán"], "Face a difficult choice with no easy options.", "idiom, dilemma"],
  ["Chew the fat", "Charlar", "闲聊", ["xián", "liáo"], "Have a friendly chat.", "idiom, chat"],
  ["Close but no cigar", "Casi pero no", "差一点", ["chà", "yì", "diǎn"], "Nearly successful but not quite.", "idiom, near"],
  ["Cold turkey", "De golpe", "突然戒断", ["tū", "rán", "jiè", "duàn"], "Quit something abruptly.", "idiom, addiction"],
  ["Come rain or shine", "Haga sol o llueva", "风雨无阻", ["fēng", "yǔ", "wú", "zǔ"], "No matter what happens.", "idiom, determination"],
  ["Cut to the chase", "Ir al grano", "开门见山", ["kāi", "mén", "jiàn", "shān"], "Get to the point quickly.", "idiom, direct"],
  ["Dead ringer", "Idéntico", "一模一样", ["yì", "mú", "yí", "yàng"], "Looks exactly like someone else.", "idiom, similarity"],
  ["Don't cry over spilt milk", "A lo hecho, pecho", "覆水难收", ["fù", "shuǐ", "nán", "shōu"], "Don't worry about past mistakes.", "idiom, regret"],
  ["Don't put all your eggs in one basket", "No pongas todos los huevos en una canasta", "不要孤注一掷", ["bù", "yào", "gū", "zhù", "yí", "zhì"], "Don't risk everything on one venture.", "idiom, caution"],
  ["Drastic times call for drastic measures", "A grandes males, grandes remedios", "非常时期非常手段", ["fēi", "cháng", "shí", "qī", "fēi", "cháng", "shǒu", "duàn"], "Extreme situations require extreme actions.", "idiom, extreme"],
  ["Elvis has left the building", "Se acabó el espectáculo", "结束了", ["jié", "shù", "le"], "The show is over.", "idiom, end"],
  ["Every dog has its day", "Todos tenemos un día de gloria", "人人都有得意时", ["rén", "rén", "dōu", "yǒu", "dé", "yì", "shí"], "Everyone gets a chance eventually.", "idiom, chance"],
  ["Far from it", "Ni mucho menos", "远非如此", ["yuǎn", "fēi", "rú", "cǐ"], "Not at all what was suggested.", "idiom, denial"],
  ["Feel a bit under the weather", "Sentirse mal", "身体不舒服", ["shēn", "tǐ", "bù", "shū", "fu"], "Feeling slightly sick.", "idiom, health"],
  ["Give the benefit of the doubt", "Dar el beneficio de la duda", "姑且相信", ["gū", "qiě", "xiāng", "xìn"], "Believe someone despite uncertainty.", "idiom, trust"],
  ["Go down in flames", "Irse a pique", "一败涂地", ["yí", "bài", "tú", "dì"], "Fail spectacularly.", "idiom, failure"],
  ["Go on a wild goose chase", "Ir tras un imposible", "徒劳无功", ["tú", "láo", "wú", "gōng"], "Pursue a futile or hopeless quest.", "idiom, futile"],
  ["Good things come to those who wait", "Las cosas buenas vienen a quienes esperan", "好事多磨", ["hǎo", "shì", "duō", "mó"], "Patience will be rewarded.", "idiom, patience"],
  ["He lost his head", "Perdió la cabeza", "惊慌失措", ["jīng", "huāng", "shī", "cuò"], "Panic and lose control.", "idiom, panic"],
  ["Heard it on the grapevine", "Lo oí por ahí", "小道消息", ["xiǎo", "dào", "xiāo", "xi"], "Hear rumors from unofficial sources.", "idiom, rumor"],
  ["Hit the ground running", "Empezar con pie derecho", "马上投入", ["mǎ", "shàng", "tóu", "rù"], "Start immediately with full effort.", "idiom, start"],
  ["Hold your horses", "Espera un momento", "别急", ["bié", "jí"], "Wait and be patient.", "idiom, patience"],
  ["In the same boat", "En la misma situación", "同病相怜", ["tóng", "bìng", "xiāng", "lián"], "In the same difficult situation.", "idiom, shared"],
  ["Keep your chin up", "No te desanimes", "振作起来", ["zhèn", "zuò", "qǐ", "lái"], "Stay positive in difficult times.", "idiom, encouragement"],
  ["Kick the bucket", "Estirar la pata", "蹬腿了", ["dēng", "tuǐ", "le"], "Die or break down.", "idiom, death"],
  ["Kill time", "Matar el tiempo", "消磨时间", ["xiāo", "mó", "shí", "jiān"], "Pass time while waiting.", "idiom, time"],
  ["Let sleeping dogs lie", "No despertar al león dormido", "别惹麻烦", ["bié", "rě", "má", "fan"], "Don't disturb a situation that could cause trouble.", "idiom, caution"],
  ["Make a long story short", "Para no hacerlo largo", "长话短说", ["cháng", "huà", "duǎn", "shuō"], "Summarize briefly.", "idiom, brief"],
  ["Missed the boat", "Perdió el tren", "错失良机", ["cuò", "shī", "liáng", "jī"], "Missed an opportunity.", "idiom, opportunity"],
  ["No pain, no gain", "Sin esfuerzo no hay recompensa", "不劳无获", ["bù", "láo", "wú", "huò"], "Suffering is needed for success.", "idiom, effort"],
  ["On the fence", "Indeciso", "犹豫不决", ["yóu", "yù", "bù", "jué"], "Unable to decide.", "idiom, indecision"],
  ["Out of the blue", "De la nada", "突如其来", ["tū", "rú", "qí", "lái"], "Unexpectedly and suddenly.", "idiom, surprise"],
  ["Over the moon", "En la gloria", "高兴坏了", ["gāo", "xìng", "huài", "le"], "Extremely happy.", "idiom, happiness"],
  ["Play devil's advocate", "Jugar al abogado del diablo", "故意唱反调", ["gù", "yì", "chàng", "fǎn", "diào"], "Argue against for the sake of debate.", "idiom, debate"],
  ["Put a sock in it", "Cierra el pico", "闭嘴", ["bì", "zuǐ"], "Be quiet.", "idiom, silence"],
  ["Read between the lines", "Leer entre líneas", "领会言外之意", ["lǐng", "huì", "yán", "wài", "zhī", "yì"], "Understand the hidden meaning.", "idiom, insight"],
  ["Right off the bat", "Desde el principio", "一开始", ["yí", "kāi", "shǐ"], "From the very beginning.", "idiom, start"],
  ["Ring a bell", "Sonar familiar", "有点印象", ["yǒu", "diǎn", "yìn", "xiàng"], "Sound familiar.", "idiom, memory"],
  ["Run out of steam", "Quedarse sin energía", "精疲力尽", ["jīng", "pí", "lì", "jìn"], "Lose energy or enthusiasm.", "idiom, tired"],
  ["Skeleton in the closet", "Un secreto vergonzoso", "不可告人的秘密", ["bù", "kě", "gào", "rén", "de", "mì", "mì"], "A hidden embarrassing secret.", "idiom, secret"],
  ["Something fishy", "Algo raro", "可疑", ["kě", "yí"], "Suspicious or doubtful.", "idiom, suspicion"],
  ["Spill the tea", "Contar el chisme", "八卦", ["bā", "guà"], "Share gossip.", "idiom, gossip"],
];
let mdx = fs.readFileSync('src/content/vocabulary/expressions.mdx', 'utf8');
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
fs.writeFileSync('src/content/vocabulary/expressions.mdx', mdx, 'utf8');
console.log('Expressions batch: 50 more (total 100)');
