const fs = require('fs');
const path = require('path');

const TOPICS_DIR = 'src/content/topics';

function extractFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : null;
}

function extractBody(text) {
  const m = text.match(/^---\r?\n[\s\S]*?\r?\n---/);
  return m ? text.slice(m[0].length) : text;
}

function stripRuby(text) {
  return text.replace(/<rt>[\s\S]*?<\/rt>/g, '').replace(/<\/?ruby>/g, '');
}

const files = fs.readdirSync(TOPICS_DIR).filter(f => f.endsWith('.mdx'));

const issues = [];

for (const file of files) {
  const fp = path.join(TOPICS_DIR, file);
  const text = fs.readFileSync(fp, 'utf8');
  const fmText = extractFrontmatter(text);
  const body = extractBody(text);
  const plainBody = stripRuby(body);

  const topicName = file.replace(/\.mdx$/, '');

  // 1. Body length check
  const bodyWords = plainBody.trim().split(/\s+/).length;
  if (bodyWords < 200) {
    issues.push({ file, topic: topicName, issue: 'Body too short', detail: `${bodyWords} words` });
  }

  // 2. Overview paragraphs
  const overviewMatch = plainBody.match(/(?:^|\n)##\s*(?:Overview|Visi[oó]n general|概述)[\s\S]*?(?=(?:\n)##\s|$)/i);
  if (overviewMatch) {
    const normalized = overviewMatch[0].replace(/\r\n/g, '\n');
    const paraCount = (normalized.match(/\n\n/g) || []).length + 1;
    if (paraCount < 2) {
      issues.push({ file, topic: topicName, issue: 'Overview too short', detail: `${paraCount} paragraphs` });
    }
  } else {
    issues.push({ file, topic: topicName, issue: 'Missing Overview', detail: 'No Overview section found' });
  }

  // 3. Explanation sub-sections — language name anywhere in the ## header line
  const hasSpanish = /(?:^|\n)##[^\n]*(?:Spanish|Español|español|西班牙语)/i.test(plainBody);
  const hasEnglish = /(?:^|\n)##[^\n]*(?:English|Inglés|inglés|英语)/i.test(plainBody);
  const hasChinese = /(?:^|\n)##[^\n]*(?:Chinese|Chino|chino|中文)/i.test(plainBody);
  const explSections = [hasSpanish, hasEnglish, hasChinese].filter(Boolean).length;
  if (explSections < 3) {
    issues.push({ file, topic: topicName, issue: 'Missing Explanation sub-sections', detail: `${explSections}/3 language sections` });
  }

  // 4. Examples table rows
  const examplesMatch = plainBody.match(/(?:^|\n)##\s*(?:Examples|Ejemplos|例子|示例|语境中的例子|语境中的例句|语境示例)[\s\S]*?(?=(?:\n)##\s|$)/i);
  if (examplesMatch) {
    const tableRows = (examplesMatch[0].match(/\n\|[^-]/g) || []).length;
    if (tableRows < 3) {
      issues.push({ file, topic: topicName, issue: 'Examples table too short', detail: `${tableRows} data rows (need 3+)` });
    }
  } else {
    issues.push({ file, topic: topicName, issue: 'Missing Examples section', detail: 'No Examples section found' });
  }

  // 5. Frontmatter quality
  if (fmText) {
    const normFm = fmText.replace(/\r\n/g, '\n');

    const ctRows = (normFm.match(/\n  - concept:/g) || []).length;
    if (ctRows < 4) {
      issues.push({ file, topic: topicName, issue: 'comparisonTable too short', detail: `${ctRows} rows (need 4+)` });
    }

    const cmItems = (normFm.match(/\n  - mistake:/g) || []).length;
    if (cmItems < 3) {
      issues.push({ file, topic: topicName, issue: 'commonMistakes too short', detail: `${cmItems} items (need 3+)` });
    }

    const ktMatch = normFm.match(/keyTakeaways:\s*\n((?:  - .*\n)*)/);
    const ktCount = ktMatch ? (ktMatch[1].match(/^  - /gm) || []).length : 0;
    if (ktCount < 2) {
      issues.push({ file, topic: topicName, issue: 'keyTakeaways too short', detail: `${ktCount} items (need 2+)` });
    }

    const faqCount = (normFm.match(/^  - question:/gm) || []).length;
    if (faqCount > 0 && faqCount < 2) {
      issues.push({ file, topic: topicName, issue: 'FAQ too short', detail: `${faqCount} items (need 2+ or remove)` });
    }

    const refItems = (normFm.match(/\n  - title:/g) || []).length;
    if (refItems < 3) {
      issues.push({ file, topic: topicName, issue: 'References too short', detail: `${refItems} items (need 3+)` });
    }
  }
}

// Group by issue type
const byType = {};
for (const i of issues) {
  byType[i.issue] = byType[i.issue] || [];
  byType[i.issue].push(i);
}

console.log(`Total issues: ${issues.length} across ${files.length} files\n`);
for (const [type, items] of Object.entries(byType).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`${type}: ${items.length} files`);
  for (const item of items.slice(0, 3)) {
    console.log(`  - ${item.topic} (${item.detail})`);
  }
  if (items.length > 3) console.log(`  ... and ${items.length - 3} more`);
  console.log();
}
