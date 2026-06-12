/**
 * Template for verbal grammar topics (verbs, tenses, mood, participles, infinitives, etc.)
 * Usage: fill in the placeholders marked with {{...}}
 *
 * If you pass pre-filled data (overview, explanation, examples, etc.),
 * those values are preserved. Only missing fields get placeholders.
 */

module.exports = function buildVerbalSpec(data) {
  const { topic, titles, description, difficulty = 'beginner', overviewExtra } = data;

  // Helper: use provided value or return a placeholder
  const _ = (val, placeholder) => {
    if (val && typeof val === 'string' && val.trim().length > 0) return val;
    if (val && typeof val === 'object') return val; // already an object (e.g. {en,es,zh})
    return placeholder;
  };

  // Build examples: use provided or generate placeholders
  const defaultExamples = [
    { spanish: `{{EX1_ES}}`, english: `{{EX1_EN}}`, chinese: `{{EX1_ZH}}` },
    { spanish: `{{EX2_ES}}`, english: `{{EX2_EN}}`, chinese: `{{EX2_ZH}}` },
    { spanish: `{{EX3_ES}}`, english: `{{EX3_EN}}`, chinese: `{{EX3_ZH}}` },
    { spanish: `{{EX4_ES}}`, english: `{{EX4_EN}}`, chinese: `{{EX4_ZH}}` },
    { spanish: `{{EX5_ES}}`, english: `{{EX5_EN}}`, chinese: `{{EX5_ZH}}` },
    { spanish: `{{EX6_ES}}`, english: `{{EX6_EN}}`, chinese: `{{EX6_ZH}}` },
    { spanish: `{{EX7_ES}}`, english: `{{EX7_EN}}`, chinese: `{{EX7_ZH}}` }
  ];

  const examples = data.examples || defaultExamples;

  return {
    topic,
    titles,
    description,
    difficulty,
    overview: data.overview || {
      en: `{{OVERVIEW_EN: Explain what ${titles.en} means in comparative grammar. Describe its role across Spanish, English, and Chinese.}}`,
      es: `{{OVERVIEW_ES: Explica qué significa ${titles.es} en gramática comparativa. Describe su papel en español, inglés y chino.}}`,
      zh: `{{OVERVIEW_ZH: 解释${titles.zh}在比较语法中的含义。描述其在西班牙语、英语和汉语中的作用。}}`
    },
    overviewExtra: overviewExtra || data.overviewExtra || {
      en: `{{OVERVIEW_EXTRA_EN: Add a second paragraph expanding on the significance for multilingual learners.}}`,
      es: `{{OVERVIEW_EXTRA_ES: Añade un segundo párrafo ampliando la importancia para aprendices multilingües.}}`,
      zh: `{{OVERVIEW_EXTRA_ZH: 添加第二段，扩展多语言学习者的重要性。}}`
    },
    explanation: data.explanation || {
      spanish: `### Formation and conjugation

{{SPANISH_FORMATION: Describe how Spanish forms this verbal category. Include conjugation patterns, regular and irregular forms.}}

- *{{EX_RULE1_ES}}* → {{EX_MEANING1_EN}}
- *{{EX_RULE2_ES}}* → {{EX_MEANING2_EN}}

### Key distinctions

{{SPANISH_DISTINCTIONS: Explain the critical distinctions Spanish learners must master: aspect, tense, mood, or person/number agreement.}}

| Context | Form | Example |
|---|---|---|
| {{DIST_CTX1_ES}} | {{DIST_FORM1_ES}} | *{{DIST_EX1_ES}}* |
| {{DIST_CTX2_ES}} | {{DIST_FORM2_ES}} | *{{DIST_EX2_ES}}* |

### Position in the sentence

{{SPANISH_POSITION: Describe where the verb or verbal construction appears in the Spanish sentence.}}

- {{POS_RULE1_ES}}
- {{POS_RULE2_ES}}

### Special cases and exceptions

{{SPANISH_SPECIAL: Note exceptions, irregular verbs, or contexts where the standard rules do not apply.}}`,

      english: `### Formation and structure

{{ENGLISH_FORMATION: Describe how English forms this verbal category. Include auxiliary verbs, periphrastic constructions, or morphological changes.}}

- {{ENG_RULE1}}
- {{ENG_RULE2}}

### Key distinctions

{{ENGLISH_DISTINCTIONS: Explain the critical distinctions English makes (or does not make) compared to Spanish and Chinese.}}

| Context | Form | Example |
|---|---|---|
| {{DIST_CTX1_EN}} | {{DIST_FORM1_EN}} | *{{DIST_EX1_EN}}* |
| {{DIST_CTX2_EN}} | {{DIST_FORM2_EN}} | *{{DIST_EX2_EN}}* |

### Position in the sentence

{{ENGLISH_POSITION: Describe where the verb or verbal construction appears in the English sentence.}}

- {{POS_RULE1_EN}}
- {{POS_RULE2_EN}}

### Special cases and exceptions

{{ENGLISH_SPECIAL: Note exceptions, defective paradigms, or contexts where standard rules do not apply.}}`,

      chinese: `### Formation and expression

{{CHINESE_FORMATION: Describe how Chinese expresses this verbal category without inflection. Include particles, word order, or aspect markers.}}

- {{ZH_RULE1}}
- {{ZH_RULE2}}

### Key distinctions

{{CHINESE_DISTINCTIONS: Explain how Chinese encodes (or omits) the distinctions that Spanish and English mark grammatically.}}

| Context | Strategy | Example |
|---|---|---|
| {{DIST_CTX1_ZH}} | {{DIST_STRAT1_ZH}} | {{DIST_EX1_ZH}} |
| {{DIST_CTX2_ZH}} | {{DIST_STRAT2_ZH}} | {{DIST_EX2_ZH}} |

### Position in the sentence

{{CHINESE_POSITION: Describe where Chinese places aspect particles, adverbs, or complement phrases relative to the verb.}}

- {{POS_RULE1_ZH}}
- {{POS_RULE2_ZH}}

### Special cases and exceptions

{{CHINESE_SPECIAL: Note contexts where Chinese uses a different strategy than the default pattern.}}`
    },
    examples,
    comparisonTable: data.comparisonTable || [
      {
        concept: { en: 'Form/Structure', es: 'Forma/Estructura', zh: '形式/结构' },
        values: {
          spanish: `{{CT1_ES: Describe Spanish form}}`,
          english: `{{CT1_EN: Describe English form}}`,
          chinese: `{{CT1_ZH: Describe Chinese form (no inflection, particles, etc.)}}`
        }
      },
      {
        concept: { en: 'Usage contexts', es: 'Contextos de uso', zh: '使用语境' },
        values: {
          spanish: `{{CT2_ES}}`,
          english: `{{CT2_EN}}`,
          chinese: `{{CT2_ZH}}`
        }
      },
      {
        concept: { en: 'Key markers/particles', es: 'Marcadores/partículas clave', zh: '关键标记/助词' },
        values: {
          spanish: `{{CT3_ES}}`,
          english: `{{CT3_EN}}`,
          chinese: `{{CT3_ZH}}`
        }
      },
      {
        concept: { en: ' learner difficulty', es: 'Dificultad para aprendices', zh: '学习者难度' },
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
    relatedTopics: data.relatedTopics || [
      {
        slug: 'verb-tenses',
        title: 'Verb Tenses',
        description: {
          en: 'How tense and aspect systems interact with this verbal phenomenon',
          es: 'Cómo los sistemas de tiempo y aspecto interactúan con este fenómeno verbal',
          zh: '时态和体系统如何与此动词现象相互作用'
        }
      },
      {
        slug: 'syntax-constituents',
        title: 'Syntax & Constituents',
        description: {
          en: 'How this verbal element fits into larger syntactic structures',
          es: 'Cómo este elemento verbal encaja en estructuras sintácticas mayores',
          zh: '此动词元素如何融入更大的句法结构'
        }
      }
    ],
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
