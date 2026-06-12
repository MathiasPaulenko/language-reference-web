/**
 * Template for nominal grammar topics (nouns, articles, pronouns, gender, number, determiners, etc.)
 */

module.exports = function buildNominalSpec(data) {
  const { topic, titles, description, difficulty = 'beginner', overviewExtra } = data;

  return {
    topic,
    titles,
    description,
    difficulty,
    overview: data.overview || {
      en: `{{OVERVIEW_EN: Explain what ${titles.en} means. Describe its function in noun phrases across Spanish, English, and Chinese.}}`,
      es: `{{OVERVIEW_ES: Explica qué significa ${titles.es}. Describe su función en sintagmas nominales en español, inglés y chino.}}`,
      zh: `{{OVERVIEW_ZH: 解释${titles.zh}的含义。描述其在西班牙语、英语和汉语名词短语中的功能。}}`
    },
    overviewExtra: data.overviewExtra || overviewExtra || {
      en: `{{OVERVIEW_EXTRA_EN: Expand on how noun phrase structure differs across the three languages.}}`,
      es: `{{OVERVIEW_EXTRA_ES: Amplía cómo difiere la estructura del sintagma nominal en los tres idiomas.}}`,
      zh: `{{OVERVIEW_EXTRA_ZH: 扩展三种语言中名词短语结构的差异。}}`
    },
    explanation: data.explanation || {
      spanish: `{{SPANISH_EXPL: Describe Spanish ${titles.en} rules. Include gender, number agreement, articles, and determiners. Use bullet lists.}}`,
      english: `{{ENGLISH_EXPL: Describe English ${titles.en} rules. Note simplifications (e.g., no gender, limited case marking). Use bullet lists.}}`,
      chinese: `{{CHINESE_EXPL: Describe Chinese ${titles.en} system. Note absence of articles/gender/number inflection. Use measure words, 的, context. Use bullet lists.}}`
    },
    examples: data.examples || [
      { spanish: `{{EX1_ES}}`, english: `{{EX1_EN}}`, chinese: `{{EX1_ZH}}` },
      { spanish: `{{EX2_ES}}`, english: `{{EX2_EN}}`, chinese: `{{EX2_ZH}}` },
      { spanish: `{{EX3_ES}}`, english: `{{EX3_EN}}`, chinese: `{{EX3_ZH}}` },
      { spanish: `{{EX4_ES}}`, english: `{{EX4_EN}}`, chinese: `{{EX4_ZH}}` },
      { spanish: `{{EX5_ES}}`, english: `{{EX5_EN}}`, chinese: `{{EX5_ZH}}` },
      { spanish: `{{EX6_ES}}`, english: `{{EX6_EN}}`, chinese: `{{EX6_ZH}}` },
      { spanish: `{{EX7_ES}}`, english: `{{EX7_EN}}`, chinese: `{{EX7_ZH}}` }
    ],
    comparisonTable: data.comparisonTable || [
      {
        concept: { en: 'Morphological marking', es: 'Marcado morfológico', zh: '形态标记' },
        values: {
          spanish: `{{CT1_ES}}`,
          english: `{{CT1_EN}}`,
          chinese: `{{CT1_ZH}}`
        }
      },
      {
        concept: { en: 'Syntactic position', es: 'Posición sintáctica', zh: '句法位置' },
        values: {
          spanish: `{{CT2_ES}}`,
          english: `{{CT2_EN}}`,
          chinese: `{{CT2_ZH}}`
        }
      },
      {
        concept: { en: 'Agreement rules', es: 'Reglas de concordancia', zh: '一致规则' },
        values: {
          spanish: `{{CT3_ES}}`,
          english: `{{CT3_EN}}`,
          chinese: `{{CT3_ZH}}`
        }
      },
      {
        concept: { en: 'Omission/optionality', es: 'Omisión/opcionalidad', zh: '省略/可选性' },
        values: {
          spanish: `{{CT4_ES}}`,
          english: `{{CT4_EN}}`,
          chinese: `{{CT4_ZH}}`
        }
      }
    ],
    commonMistakes: data.commonMistakes || [
      {
        mistake: { en: '{{MISTAKE1_EN}}', es: '{{MISTAKE1_ES}}', zh: '{{MISTAKE1_ZH}}' },
        correction: { en: '{{CORR1_EN}}', es: '{{CORR1_ES}}', zh: '{{CORR1_ZH}}' },
        note: { en: '{{NOTE1_EN}}', es: '{{NOTE1_ES}}', zh: '{{NOTE1_ZH}}' }
      },
      {
        mistake: { en: '{{MISTAKE2_EN}}', es: '{{MISTAKE2_ES}}', zh: '{{MISTAKE2_ZH}}' },
        correction: { en: '{{CORR2_EN}}', es: '{{CORR2_ES}}', zh: '{{CORR2_ZH}}' },
        note: { en: '{{NOTE2_EN}}', es: '{{NOTE2_ES}}', zh: '{{NOTE2_ZH}}' }
      },
      {
        mistake: { en: '{{MISTAKE3_EN}}', es: '{{MISTAKE3_ES}}', zh: '{{MISTAKE3_ZH}}' },
        correction: { en: '{{CORR3_EN}}', es: '{{CORR3_ES}}', zh: '{{CORR3_ZH}}' },
        note: { en: '{{NOTE3_EN}}', es: '{{NOTE3_ES}}', zh: '{{NOTE3_ZH}}' }
      }
    ],
    keyTakeaways: data.keyTakeaways || [
      { en: '{{KT1_EN}}', es: '{{KT1_ES}}', zh: '{{KT1_ZH}}' },
      { en: '{{KT2_EN}}', es: '{{KT2_ES}}', zh: '{{KT2_ZH}}' },
      { en: '{{KT3_EN}}', es: '{{KT3_ES}}', zh: '{{KT3_ZH}}' }
    ],
    relatedTopics: data.relatedTopics || ['articles', 'pronouns'],
    prerequisites: data.prerequisites || [],
    faq: data.faq || [
      {
        question: { en: '{{FAQ1_Q_EN}}', es: '{{FAQ1_Q_ES}}', zh: '{{FAQ1_Q_ZH}}' },
        answer: { en: '{{FAQ1_A_EN}}', es: '{{FAQ1_A_ES}}', zh: '{{FAQ1_A_ZH}}' }
      },
      {
        question: { en: '{{FAQ2_Q_EN}}', es: '{{FAQ2_Q_ES}}', zh: '{{FAQ2_Q_ZH}}' },
        answer: { en: '{{FAQ2_A_EN}}', es: '{{FAQ2_A_ES}}', zh: '{{FAQ2_A_ZH}}' }
      }
    ],
    references: data.references || [
      { title: 'Grammar Atlas', url: 'https://grammarnavigator.com', description: 'Multilingual grammar reference' }
    ]
  };
};
