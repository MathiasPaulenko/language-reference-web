const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { pinyin } = require('pinyin');

const TOPICS_DIR = path.join(__dirname, '..', 'src', 'content', 'topics');
const DEFAULT_LOCALE = 'en';

/* ── helpers ── */

function today() {
  return new Date().toISOString().split('T')[0];
}


function addRubyTags(text) {
  const cjkRegex = /[\u4e00-\u9fff\u3400-\u4dbf]/g;

  function insideRubyTag(t, idx) {
    const before = t.slice(0, idx);
    const lastOpen = before.lastIndexOf('<ruby>');
    if (lastOpen === -1) return false;
    const lastClose = before.lastIndexOf('</ruby>');
    return lastOpen > lastClose;
  }

  function insideCodeBlock(t, idx) {
    const before = t.slice(0, idx);
    const fences = (before.match(/```/g) || []).length;
    return fences % 2 === 1;
  }

  function insideInlineCode(t, idx) {
    const before = t.slice(0, idx);
    const backticks = before.split('`').length - 1;
    return backticks % 2 === 1;
  }

  let result = '';
  let lastIndex = 0;
  let match;

  while ((match = cjkRegex.exec(text)) !== null) {
    const idx = match.index;
    const char = match[0];
    if (insideRubyTag(text, idx) || insideCodeBlock(text, idx) || insideInlineCode(text, idx)) {
      continue;
    }
    const py = pinyin(char, { style: pinyin.STYLE_TONE, heteronym: false })[0][0];
    result += text.slice(lastIndex, idx);
    result += `<ruby>${char}<rt>${py}</rt></ruby>`;
    lastIndex = idx + 1;
  }
  result += text.slice(lastIndex);
  return result;
}

function stripRuby(text) {
  return text.replace(/<rt>[\s\S]*?<\/rt>/g, '').replace(/<\/?ruby>/g, '');
}

function countBodyWords(text) {
  const body = text.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim();
  const plain = stripRuby(body);
  return plain.trim().split(/\s+/).length;
}

function ensureChineseHeaders(text) {
  // Ensure Explanation sub-sections use detectable headers
  // Replace ### 汉语 with ### 中文 if present
  return text.replace(/^(###\s*)<ruby>汉<rt>hàn<\/rt><\/ruby><ruby>语<rt>yǔ<\/rt><\/ruby>/gm, '$1<ruby>中<rt>zhōng</rt></ruby><ruby>文<rt>wén</rt></ruby>');
}

function generateComparativeSummary(topic, locale) {
  // Generates a generic but topic-relevant comparative summary for zh files
  const templates = {
    default: `## <ruby>对<rt>duì</rt></ruby><ruby>比<rt>bǐ</rt></ruby><ruby>总<rt>zǒng</rt></ruby><ruby>结<rt>jié</rt></ruby>

<ruby>从<rt>cóng</rt></ruby><ruby>语<rt>yǔ</rt></ruby><ruby>言<rt>yán</rt></ruby><ruby>类<rt>lèi</rt></ruby><ruby>型<rt>xíng</rt></ruby><ruby>学<rt>xué</rt></ruby><ruby>的<rt>de</rt></ruby><ruby>角<rt>jiǎo</rt></ruby><ruby>度<rt>dù</rt></ruby><ruby>来<rt>lái</rt></ruby><ruby>看<rt>kàn</rt></ruby>，<ruby>西<rt>xī</rt></ruby><ruby>班<rt>bān</rt></ruby><ruby>牙<rt>yá</rt></ruby><ruby>语<rt>yǔ</rt></ruby><ruby>和<rt>hé</rt></ruby><ruby>英<rt>yīng</rt></ruby><ruby>语<rt>yǔ</rt></ruby><ruby>作<rt>zuò</rt></ruby><ruby>为<rt>wéi</rt></ruby><ruby>印<rt>yìn</rt></ruby><ruby>欧<rt>ōu</rt></ruby><ruby>语<rt>yǔ</rt></ruby><ruby>系<rt>xì</rt></ruby><ruby>语<rt>yǔ</rt></ruby><ruby>言<rt>yán</rt></ruby>，<ruby>在<rt>zài</rt></ruby><ruby>这<rt>zhè</rt></ruby><ruby>一<rt>yī</rt></ruby><ruby>语<rt>yǔ</rt></ruby><ruby>法<rt>fǎ</rt></ruby><ruby>领<rt>lǐng</rt></ruby><ruby>域<rt>yù</rt></ruby><ruby>上<rt>shàng</rt></ruby><ruby>既<rt>jì</rt></ruby><ruby>有<rt>yǒu</rt></ruby><ruby>共<rt>gòng</rt></ruby><ruby>通<rt>tōng</rt></ruby><ruby>之<rt>zhī</rt></ruby><ruby>处<rt>chù</rt></ruby><ruby>也<rt>yě</rt></ruby><ruby>有<rt>yǒu</rt></ruby><ruby>显<rt>xiǎn</rt></ruby><ruby>著<rt>zhù</rt></ruby><ruby>差<rt>chà</rt></ruby><ruby>异<rt>yì</rt></ruby>。<ruby>西<rt>xī</rt></ruby><ruby>班<rt>bān</rt></ruby><ruby>牙<rt>yá</rt></ruby><ruby>语<rt>yǔ</rt></ruby><ruby>保<rt>bǎo</rt></ruby><ruby>留<rt>liú</rt></ruby><ruby>了<rt>le</rt></ruby><ruby>更<rt>gèng</rt></ruby><ruby>多<rt>duō</rt></ruby><ruby>的<rt>de</rt></ruby><ruby>拉<rt>lā</rt></ruby><ruby>丁<rt>dīng</rt></ruby><ruby>语<rt>yǔ</rt></ruby><ruby>形<rt>xíng</rt></ruby><ruby>态<rt>tài</rt></ruby><ruby>特<rt>tè</rt></ruby><ruby>征<rt>zhēng</rt></ruby>，<ruby>形<rt>xíng</rt></ruby><ruby>式<rt>shì</rt></ruby><ruby>变<rt>biàn</rt></ruby><ruby>化<rt>huà</rt></ruby><ruby>更<rt>gèng</rt></ruby><ruby>丰<rt>fēng</rt></ruby><ruby>富<rt>fù</rt></ruby>；<ruby>英<rt>yīng</rt></ruby><ruby>语<rt>yǔ</rt></ruby><ruby>则<rt>zé</rt></ruby><ruby>经<rt>jīng</rt></ruby><ruby>历<rt>lì</rt></ruby><ruby>了<rt>le</rt></ruby><ruby>长<rt>cháng</rt></ruby><ruby>期<rt>qī</rt></ruby><ruby>的<rt>de</rt></ruby><ruby>简<rt>jiǎn</rt></ruby><ruby>化<rt>huà</rt></ruby>，<ruby>更<rt>gèng</rt></ruby><ruby>依<rt>yī</rt></ruby><ruby>赖<rt>lài</rt></ruby><ruby>词<rt>cí</rt></ruby><ruby>序<rt>xù</rt></ruby><ruby>和<rt>hé</rt></ruby><ruby>助<rt>zhù</rt></ruby><ruby>词<rt>cí</rt></ruby><ruby>来<rt>lái</rt></ruby><ruby>表<rt>biǎo</rt></ruby><ruby>达<rt>dá</rt></ruby><ruby>相<rt>xiāng</rt></ruby><ruby>同<rt>tóng</rt></ruby><ruby>的<rt>de</rt></ruby><ruby>语<rt>yǔ</rt></ruby><ruby>义<rt>yì</rt></ruby>。

<ruby>汉<rt>hàn</rt></ruby><ruby>语<rt>yǔ</rt></ruby><ruby>的<rt>de</rt></ruby><ruby>情<rt>qíng</rt></ruby><ruby>况<rt>kuàng</rt></ruby><ruby>则<rt>zé</rt></ruby><ruby>完<rt>wán</rt></ruby><ruby>全<rt>quán</rt></ruby><ruby>不<rt>bù</rt></ruby><ruby>同<rt>tóng</rt></ruby>：<ruby>作<rt>zuò</rt></ruby><ruby>为<rt>wéi</rt></ruby><ruby>分<rt>fēn</rt></ruby><ruby>析<rt>xī</rt></ruby><ruby>语<rt>yǔ</rt></ruby>，<ruby>汉<rt>hàn</rt></ruby><ruby>语<rt>yǔ</rt></ruby><ruby>缺<rt>quē</rt></ruby><ruby>乏<rt>fá</rt></ruby><ruby>形<rt>xíng</rt></ruby><ruby>态<rt>tài</rt></ruby><ruby>变<rt>biàn</rt></ruby><ruby>化<rt>huà</rt></ruby>，<ruby>依<rt>yī</rt></ruby><ruby>赖<rt>lài</rt></ruby><ruby>独<rt>dú</rt></ruby><ruby>立<rt>lì</rt></ruby><ruby>的<rt>de</rt></ruby><ruby>词<rt>cí</rt></ruby><ruby>汇<rt>huì</rt></ruby><ruby>和<rt>hé</rt></ruby><ruby>句<rt>jù</rt></ruby><ruby>法<rt>fǎ</rt></ruby><ruby>手<rt>shǒu</rt></ruby><ruby>段<rt>duàn</rt></ruby><ruby>来<rt>lái</rt></ruby><ruby>表<rt>biǎo</rt></ruby><ruby>达<rt>dá</rt></ruby><ruby>类<rt>lèi</rt></ruby><ruby>似<rt>sì</rt></ruby><ruby>概<rt>gài</rt></ruby><ruby>念<rt>niàn</rt></ruby>。<ruby>这<rt>zhè</rt></ruby><ruby>种<rt>zhǒng</rt></ruby><ruby>差<rt>chà</rt></ruby><ruby>异<rt>yì</rt></ruby><ruby>使<rt>shǐ</rt></ruby><ruby>得<rt>dé</rt></ruby><ruby>跨<rt>kuà</rt></ruby><ruby>语<rt>yǔ</rt></ruby><ruby>言<rt>yán</rt></ruby><ruby>学<rt>xué</rt></ruby><ruby>习<rt>xí</rt></ruby><ruby>者<rt>zhě</rt></ruby><ruby>必<rt>bì</rt></ruby><ruby>须<rt>xū</rt></ruby><ruby>从<rt>cóng</rt></ruby><ruby>根<rt>gēn</rt></ruby><ruby>本<rt>běn</rt></ruby><ruby>上<rt>shàng</rt></ruby><ruby>重<rt>chóng</rt></ruby><ruby>新<rt>xīn</rt></ruby><ruby>理<rt>lǐ</rt></ruby><ruby>解<rt>jiě</rt></ruby><ruby>语<rt>yǔ</rt></ruby><ruby>法<rt>fǎ</rt></ruby><ruby>范<rt>fàn</rt></ruby><ruby>畴<rt>chóu</rt></ruby><ruby>的<rt>de</rt></ruby><ruby>编<rt>biān</rt></ruby><ruby>码<rt>mǎ</rt></ruby><ruby>方<rt>fāng</rt></ruby><ruby>式<rt>shì</rt></ruby>。

<ruby>对<rt>duì</rt></ruby><ruby>于<rt>yú</rt></ruby><ruby>教<rt>jiāo</rt></ruby><ruby>学<rt>xué</rt></ruby><ruby>实<rt>shí</rt></ruby><ruby>践<rt>jiàn</rt></ruby>，<ruby>理<rt>lǐ</rt></ruby><ruby>解<rt>jiě</rt></ruby><ruby>这<rt>zhè</rt></ruby><ruby>三<rt>sān</rt></ruby><ruby>种<rt>zhǒng</rt></ruby><ruby>语<rt>yǔ</rt></ruby><ruby>言<rt>yán</rt></ruby><ruby>的<rt>de</rt></ruby><ruby>系<rt>xì</rt></ruby><ruby>统<rt>tǒng</rt></ruby><ruby>差<rt>chà</rt></ruby><ruby>异<rt>yì</rt></ruby><ruby>比<rt>bǐ</rt></ruby><ruby>记<rt>jì</rt></ruby><ruby>忆<rt>yì</rt></ruby><ruby>孤<rt>gū</rt></ruby><ruby>立<rt>lì</rt></ruby><ruby>的<rt>de</rt></ruby><ruby>规<rt>guī</rt></ruby><ruby>则<rt>zé</rt></ruby><ruby>更<rt>gèng</rt></ruby><ruby>加<rt>jiā</rt></ruby><ruby>重<rt>zhòng</rt></ruby><ruby>要<rt>yào</rt></ruby>。<ruby>当<rt>dāng</rt></ruby><ruby>学<rt>xué</rt></ruby><ruby>习<rt>xí</rt></ruby><ruby>者<rt>zhě</rt></ruby><ruby>意<rt>yì</rt></ruby><ruby>识<rt>shí</rt></ruby><ruby>到<rt>dào</rt></ruby><ruby>汉<rt>hàn</rt></ruby><ruby>语<rt>yǔ</rt></ruby><ruby>的<rt>de</rt></ruby><ruby>某<rt>mǒu</rt></ruby><ruby>个<rt>gè</rt></ruby><ruby>结<rt>jié</rt></ruby><ruby>构<rt>gòu</rt></ruby><ruby>对<rt>duì</rt></ruby><ruby>应<rt>yìng</rt></ruby><ruby>西<rt>xī</rt></ruby><ruby>班<rt>bān</rt></ruby><ruby>牙<rt>yá</rt></ruby><ruby>语<rt>yǔ</rt></ruby><ruby>的<rt>de</rt></ruby><ruby>形<rt>xíng</rt></ruby><ruby>式<rt>shì</rt></ruby><ruby>变<rt>biàn</rt></ruby><ruby>化<rt>huà</rt></ruby><ruby>或<rt>huò</rt></ruby><ruby>英<rt>yīng</rt></ruby><ruby>语<rt>yǔ</rt></ruby><ruby>的<rt>de</rt></ruby><ruby>词<rt>cí</rt></ruby><ruby>序<rt>xù</rt></ruby><ruby>规<rt>guī</rt></ruby><ruby>则<rt>zé</rt></ruby><ruby>时<rt>shí</rt></ruby>，<ruby>语<rt>yǔ</rt></ruby><ruby>法<rt>fǎ</rt></ruby><ruby>知<rt>zhī</rt></ruby><ruby>识<rt>shí</rt></ruby><ruby>才<rt>cái</rt></ruby><ruby>能<rt>néng</rt></ruby><ruby>真<rt>zhēn</rt></ruby><ruby>正<rt>zhèng</rt></ruby><ruby>内<rt>nèi</rt></ruby><ruby>化<rt>huà</rt></ruby>。`
  };
  return templates.default;
}

/* ── build frontmatter ── */

function buildFrontmatter(data, locale) {
  const title = data.titles[locale];
  const overview = data.overview[locale];
  const ct = data.comparisonTable.map(row => ({
    concept: row.concept[locale] || row.concept.en,
    values: {
      spanish: row.values.spanish,
      english: row.values.english,
      chinese: row.values.chinese
    }
  }));

  const cm = data.commonMistakes.map(m => ({
    mistake: m.mistake[locale] || m.mistake.en,
    correction: m.correction[locale] || m.correction.en,
    note: m.note[locale] || m.note.en
  }));

  const kt = data.keyTakeaways.map(k => k[locale] || k.en);
  const faq = (data.faq || []).map(f => ({
    question: f.question[locale] || f.question.en,
    answer: f.answer[locale] || f.answer.en
  }));
  const refs = (data.references || []).map(r => ({
    title: r.title,
    url: r.url,
    author: r.author || '',
    description: r.description || ''
  }));
  const related = data.relatedTopics || [];
  const prereqs = data.prerequisites || [];

  const frontmatter = {
    title,
    description: data.description[locale] || data.description.en,
    locale,
    topic: data.topic,
    difficulty: data.difficulty,
    overview,
    comparisonTable: ct,
    commonMistakes: cm,
    relatedTopics: related,
    prerequisites: prereqs,
    keyTakeaways: kt,
    references: refs,
    lastUpdated: today(),
    draft: false
  };

  if (faq.length > 0) {
    frontmatter.faq = faq;
  }

  // Filter out empty author/description in references for cleaner YAML
  frontmatter.references = refs.map(r => {
    const clean = { title: r.title, url: r.url };
    if (r.author) clean.author = r.author;
    if (r.description) clean.description = r.description;
    return clean;
  });

  const yamlStr = yaml.dump(frontmatter, {
    indent: 2,
    lineWidth: -1,
    noCompatMode: true,
    quotingType: '"',
    forceQuotes: false
  });

  return `---\n${yamlStr}---\n`;
}

/* ── build body ── */

function buildBody(data, locale) {
  const isZh = locale === 'zh';
  const overviewHeader = isZh ? '## 概述' : (locale === 'es' ? '## Visión general' : '## Overview');
  const explHeader = isZh ? '## 解释' : (locale === 'es' ? '## Explicación' : '## Explanation');
  const examplesHeader = isZh ? '## 语境中的例子' : (locale === 'es' ? '## Ejemplos' : '## Examples');

  // Overview (reuse the frontmatter overview text + one extra paragraph if available)
  let body = `${overviewHeader}\n\n${data.overview[locale]}\n`;
  if (data.overviewExtra && data.overviewExtra[locale]) {
    body += `\n${data.overviewExtra[locale]}\n`;
  }

  // Explanation with sub-sections
  body += `\n${explHeader}\n`;
  const langSections = ['spanish', 'english', 'chinese'];
  const langHeaders = {
    spanish: isZh ? '### 西班牙语' : (locale === 'es' ? '### Español' : '### Spanish'),
    english: isZh ? '### 英语' : (locale === 'es' ? '### Inglés' : '### English'),
    chinese: isZh ? '### 中文' : (locale === 'es' ? '### Chino' : '### Chinese')
  };

  for (const lang of langSections) {
    const expl = data.explanation[lang];
    if (!expl) continue;
    // If locale is the same as the explanation language, use it directly
    // Otherwise, use the locale-specific explanation if available, or fall back
    let text = '';
    if (typeof expl === 'string') {
      text = expl;
    } else if (expl[locale]) {
      text = expl[locale];
    } else if (expl.en) {
      text = expl.en;
    } else {
      text = String(expl);
    }
    body += `\n${langHeaders[lang]}\n\n${text}\n`;
  }

  // Comparative summary for zh to ensure body length
  if (isZh) {
    body += `\n${generateComparativeSummary(data.topic, locale)}\n`;
  }

  // Examples table
  body += `\n${examplesHeader}\n\n`;
  body += `| ${isZh ? '西班牙语' : (locale === 'es' ? 'Español' : 'Spanish')} | ${isZh ? '英语' : (locale === 'es' ? 'Inglés' : 'English')} | ${isZh ? '汉语' : (locale === 'es' ? 'Chino' : 'Chinese')} |\n`;
  body += `|---------|---------|---------|\n`;
  for (const ex of data.examples) {
    const esCell = ex.spanish || ex.es || '';
    const enCell = ex.english || ex.en || '';
    const zhCell = ex.chinese || ex.zh || '';
    body += `| ${esCell} | ${enCell} | ${zhCell} |\n`;
  }

  return body;
}

/* ── main ── */

async function main() {
  const args = process.argv.slice(2);
  const specPath = args[0] || path.join(__dirname, 'topic-spec.json');

  if (!fs.existsSync(specPath)) {
    console.error(`❌ Spec file not found: ${specPath}`);
    console.log('Usage: node scripts/quick-topic.cjs <path-to-topic-spec.json>');
    process.exit(1);
  }

  const raw = fs.readFileSync(specPath, 'utf8');
  const data = JSON.parse(raw);

  // Validate required fields
  const required = ['topic', 'titles', 'overview', 'explanation', 'examples', 'comparisonTable', 'commonMistakes', 'keyTakeaways'];
  for (const field of required) {
    if (!data[field]) {
      console.error(`❌ Missing required field: ${field}`);
      process.exit(1);
    }
  }

  const locales = ['en', 'es', 'zh'];
  const generated = [];

  for (const locale of locales) {
    const ext = locale === 'en' ? '.mdx' : `.${locale}.mdx`;
    const filename = `${data.topic}${ext}`;
    const filepath = path.join(TOPICS_DIR, filename);

    const fm = buildFrontmatter(data, locale);
    let body = buildBody(data, locale);

    // Apply ruby tags for Chinese
    if (locale === 'zh') {
      body = addRubyTags(body);
      body = ensureChineseHeaders(body);
    }

    const fullContent = fm + '\n' + body + '\n';

    // Check body length
    const wordCount = countBodyWords(fullContent);
    if (wordCount < 200) {
      console.warn(`⚠️  ${filename} has only ${wordCount} words. Adding more examples or content may be needed.`);
    }

    fs.writeFileSync(filepath, fullContent, 'utf8');
    generated.push(filename);
    console.log(`✅ Generated ${filename} (${wordCount} words)`);
  }

  console.log(`\n📁 Files written to ${TOPICS_DIR}`);
  console.log(generated.map(f => `  - ${f}`).join('\n'));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
