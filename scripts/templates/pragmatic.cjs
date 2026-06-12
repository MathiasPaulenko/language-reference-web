/**
 * Template for pragmatic grammar topics (honorifics, register, hedges, politeness, speech acts, etc.)
 */

module.exports = function buildPragmaticSpec(data) {
  const { topic, titles, description, difficulty = 'advanced', overviewExtra } = data;

  return {
    topic,
    titles,
    description,
    difficulty,
    overview: data.overview || {
      en: `{{OVERVIEW_EN: Explain what ${titles.en} means in pragmatics. Describe how speakers of Spanish, English, and Chinese adjust language use in social contexts.}}`,
      es: `{{OVERVIEW_ES: Explica qué significa ${titles.es} en pragmática. Describe cómo hablantes de español, inglés y chino ajustan el uso del lenguaje en contextos sociales.}}`,
      zh: `{{OVERVIEW_ZH: 解释${titles.zh}在语用学中的含义。描述西班牙语、英语和汉语使用者如何在社会语境中调整语言使用。}}`
    },
    overviewExtra: data.overviewExtra || overviewExtra || {
      en: `{{OVERVIEW_EXTRA_EN: Discuss cross-cultural misunderstandings that arise from different pragmatic norms.}}`,
      es: `{{OVERVIEW_EXTRA_ES: Discute los malentendidos interculturales que surgen de diferentes normas pragmáticas.}}`,
      zh: `{{OVERVIEW_EXTRA_ZH: 讨论不同语用规范导致的跨文化误解。}}`
    },
    explanation: data.explanation || {
      spanish: `{{SPANISH_EXPL: Describe Spanish ${titles.en} conventions. Include tú/usted, register shifts, and cultural norms. Use bullet lists.}}`,
      english: `{{ENGLISH_EXPL: Describe English ${titles.en} conventions. Note relatively flat hierarchy and indirectness strategies. Use bullet lists.}}`,
      chinese: `{{CHINESE_EXPL: Describe Chinese ${titles.en} conventions. Include 您, particles, face-saving strategies, and hierarchical language. Use bullet lists.}}`
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
        concept: { en: 'Social hierarchy marking', es: 'Marcado de jerarquía social', zh: '社会层级标记' },
        values: {
          spanish: `{{CT1_ES}}`,
          english: `{{CT1_EN}}`,
          chinese: `{{CT1_ZH}}`
        }
      },
      {
        concept: { en: 'Directness vs indirectness', es: 'Directez vs indirectez', zh: '直接性与间接性' },
        values: {
          spanish: `{{CT2_ES}}`,
          english: `{{CT2_EN}}`,
          chinese: `{{CT2_ZH}}`
        }
      },
      {
        concept: { en: 'Contextual cues', es: 'Señales contextuales', zh: '语境线索' },
        values: {
          spanish: `{{CT3_ES}}`,
          english: `{{CT3_EN}}`,
          chinese: `{{CT3_ZH}}`
        }
      },
      {
        concept: { en: 'Learner pitfalls', es: 'Trampas para aprendices', zh: '学习者陷阱' },
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
    relatedTopics: data.relatedTopics || ['honorifics', 'register'],
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
