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
      spanish: `### Gender and number marking

{{SPANISH_GENDER: Describe Spanish gender and number rules for this nominal category.}}

- {{GENDER_RULE1_ES}}
- {{GENDER_RULE2_ES}}

| Category | Masculine | Feminine |
|---|---|---|
| {{GEND_CAT1_ES}} | {{GEND_M1_ES}} | {{GEND_F1_ES}} |
| {{GEND_CAT2_ES}} | {{GEND_M2_ES}} | {{GEND_F2_ES}} |

### Articles and determiners

{{SPANISH_ARTICLES: Describe articles, determiners, or other nominal modifiers in Spanish.}}

- {{ART_RULE1_ES}}
- {{ART_RULE2_ES}}

### Position in the noun phrase

{{SPANISH_POSITION: Describe where this element appears within the Spanish noun phrase.}}

- {{POS_RULE1_ES}}
- {{POS_RULE2_ES}}

### Agreement rules

{{SPANISH_AGREEMENT: Describe concordance rules between this element and other noun phrase elements.}}`,

      english: `### Number and countability

{{ENGLISH_NUMBER: Describe English number rules for this nominal category. Note lack of gender and limited case.}}

- {{NUM_RULE1_EN}}
- {{NUM_RULE2_EN}}

### Articles and determiners

{{ENGLISH_ARTICLES: Describe articles, determiners, or other nominal modifiers in English.}}

| Type | Use | Example |
|---|---|---|
| {{ART_TYPE1_EN}} | {{ART_USE1_EN}} | *{{ART_EX1_EN}}* |
| {{ART_TYPE2_EN}} | {{ART_USE2_EN}} | *{{ART_EX2_EN}}* |

### Position in the noun phrase

{{ENGLISH_POSITION: Describe where this element appears within the English noun phrase.}}

- {{POS_RULE1_EN}}
- {{POS_RULE2_EN}}

### Special cases

{{ENGLISH_SPECIAL: Note exceptions, irregular plurals, or uncountable nouns.}}`,

      chinese: `### Classifiers and measure words

{{CHINESE_MEASURE: Describe Chinese measure words or classifiers relevant to this nominal category.}}

- {{MEAS_RULE1_ZH}}
- {{MEAS_RULE2_ZH}}

| Noun type | Measure word | Example |
|---|---|---|
| {{MEAS_TYPE1_ZH}} | {{MEAS_WORD1_ZH}} | {{MEAS_EX1_ZH}} |
| {{MEAS_TYPE2_ZH}} | {{MEAS_WORD2_ZH}} | {{MEAS_EX2_ZH}} |

### 的 constructions

{{CHINESE_DE: Describe how 的 links modifiers to nouns in this context.}}

- {{DE_RULE1_ZH}}
- {{DE_RULE2_ZH}}

### Position in the noun phrase

{{CHINESE_POSITION: Describe where this element appears within the Chinese noun phrase.}}

- {{POS_RULE1_ZH}}
- {{POS_RULE2_ZH}}

### Special cases

{{CHINESE_SPECIAL: Note contexts where Chinese uses a different strategy than the default pattern.}}`
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
    relatedTopics: data.relatedTopics || [
      {
        slug: 'articles',
        title: 'Articles',
        description: {
          en: 'How articles and determiners interact with this nominal category',
          es: 'Cómo los artículos y determinantes interactúan con esta categoría nominal',
          zh: '冠词和限定词如何与此名词类别相互作用'
        }
      },
      {
        slug: 'pronouns',
        title: 'Pronouns',
        description: {
          en: 'How pronouns replace or refer back to this nominal element',
          es: 'Cómo los pronombres reemplazan o remiten a este elemento nominal',
          zh: '代词如何替换或回指此名词元素'
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
