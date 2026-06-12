/**
 * Template for syntactic grammar topics (word order, clauses, questions, subordination, etc.)
 */

module.exports = function buildSyntacticSpec(data) {
  const { topic, titles, description, difficulty = 'intermediate', overviewExtra } = data;

  return {
    topic,
    titles,
    description,
    difficulty,
    overview: data.overview || {
      en: `{{OVERVIEW_EN: Explain what ${titles.en} means in syntax. Describe how Spanish, English, and Chinese structure sentences regarding this phenomenon.}}`,
      es: `{{OVERVIEW_ES: Explica qué significa ${titles.es} en sintaxis. Describe cómo español, inglés y chino estructuran oraciones respecto a este fenómeno.}}`,
      zh: `{{OVERVIEW_ZH: 解释${titles.zh}在句法学中的含义。描述西班牙语、英语和汉语如何针对这一现象构建句子。}}`
    },
    overviewExtra: data.overviewExtra || overviewExtra || {
      en: `{{OVERVIEW_EXTRA_EN: Discuss implications for sentence parsing and comprehension across languages.}}`,
      es: `{{OVERVIEW_EXTRA_ES: Discute las implicaciones para el análisis y comprensión de oraciones entre idiomas.}}`,
      zh: `{{OVERVIEW_EXTRA_ZH: 讨论跨语言句子分析和理解的含义。}}`
    },
    explanation: data.explanation || {
      spanish: `### Canonical order

{{SPANISH_CANON: Describe the canonical Spanish word order or constituent arrangement for this phenomenon.}}

- {{CANON_RULE1_ES}}
- {{CANON_RULE2_ES}}

| Constituent | Position | Example |
|---|---|---|
| {{CONS1_ES}} | {{POS1_ES}} | *{{EX1_ES}}* |
| {{CONS2_ES}} | {{POS2_ES}} | *{{EX2_ES}}* |

### Permissible variations

{{SPANISH_VAR: Describe acceptable deviations from canonical order in Spanish.}}

- {{VAR_RULE1_ES}}
- {{VAR_RULE2_ES}}

### Key structural signals

{{SPANISH_SIGNALS: Describe the morphological or syntactic signals that mark this phenomenon in Spanish.}}

- {{SIG_RULE1_ES}}
- {{SIG_RULE2_ES}}

### Processing complexity

{{SPANISH_COMPLEX: Note any parsing or processing difficulties this structure presents for learners.}}`,

      english: `### Canonical order

{{ENGLISH_CANON: Describe the canonical English word order or constituent arrangement for this phenomenon.}}

- {{CANON_RULE1_EN}}
- {{CANON_RULE2_EN}}

| Constituent | Position | Example |
|---|---|---|
| {{CONS1_EN}} | {{POS1_EN}} | *{{EX1_EN}}* |
| {{CONS2_EN}} | {{POS2_EN}} | *{{EX2_EN}}* |

### Permissible variations

{{ENGLISH_VAR: Describe acceptable deviations from canonical order in English.}}

- {{VAR_RULE1_EN}}
- {{VAR_RULE2_EN}}

### Key structural signals

{{ENGLISH_SIGNALS: Describe the morphological or syntactic signals that mark this phenomenon in English.}}

- {{SIG_RULE1_EN}}
- {{SIG_RULE2_EN}}

### Processing complexity

{{ENGLISH_COMPLEX: Note any parsing or processing difficulties this structure presents for learners.}}`,

      chinese: `### Canonical order

{{CHINESE_CANON: Describe the canonical Chinese word order or constituent arrangement for this phenomenon.}}

- {{CANON_RULE1_ZH}}
- {{CANON_RULE2_ZH}}

| Constituent | Position | Example |
|---|---|---|
| {{CONS1_ZH}} | {{POS1_ZH}} | {{EX1_ZH}} |
| {{CONS2_ZH}} | {{POS2_ZH}} | {{EX2_ZH}} |

### Permissible variations

{{CHINESE_VAR: Describe acceptable deviations from canonical order in Chinese, especially topic-comment and fronting.}}

- {{VAR_RULE1_ZH}}
- {{VAR_RULE2_ZH}}

### Key structural signals

{{CHINESE_SIGNALS: Describe the particles, word order shifts, or aspect markers that signal this phenomenon in Chinese.}}

- {{SIG_RULE1_ZH}}
- {{SIG_RULE2_ZH}}

### Processing complexity

{{CHINESE_COMPLEX: Note any parsing or processing difficulties this structure presents for learners.}}`
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
        concept: { en: 'Canonical order', es: 'Orden canónico', zh: '标准语序' },
        values: {
          spanish: `{{CT1_ES}}`,
          english: `{{CT1_EN}}`,
          chinese: `{{CT1_ZH}}`
        }
      },
      {
        concept: { en: 'Permissible variations', es: 'Variaciones permitidas', zh: '允许的变化' },
        values: {
          spanish: `{{CT2_ES}}`,
          english: `{{CT2_EN}}`,
          chinese: `{{CT2_ZH}}`
        }
      },
      {
        concept: { en: 'Key structural signals', es: 'Señales estructurales clave', zh: '关键结构信号' },
        values: {
          spanish: `{{CT3_ES}}`,
          english: `{{CT3_EN}}`,
          chinese: `{{CT3_ZH}}`
        }
      },
      {
        concept: { en: 'Processing complexity', es: 'Complejidad de procesamiento', zh: '处理复杂度' },
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
        slug: 'word-order',
        title: 'Word Order',
        description: {
          en: 'How sentence-level ordering interacts with this syntactic phenomenon',
          es: 'Cómo el orden a nivel de oración interactúa con este fenómeno sintáctico',
          zh: '句子层面的语序如何与此句法现象相互作用'
        }
      },
      {
        slug: 'syntax-constituents',
        title: 'Syntax & Constituents',
        description: {
          en: 'How this syntactic element combines with other sentence constituents',
          es: 'Cómo este elemento sintáctico se combina con otros constituyentes de la oración',
          zh: '此句法元素如何与其他句子成分组合'
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
