const fs = require('fs');
const path = require('path');

function findFiles(dir, exts) {
  const results = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory() && !f.startsWith('.') && f !== 'node_modules') {
      results.push(...findFiles(full, exts));
    } else if (stat.isFile() && exts.some(e => f.endsWith(e))) {
      results.push(full);
    }
  }
  return results;
}

const files = findFiles('src', ['.astro']);
const issues = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Skip imports, comments, frontmatter, JSON keys
    if (trimmed.startsWith('import ')) continue;
    if (trimmed.startsWith('//')) continue;
    if (trimmed.startsWith('---')) continue;
    if (trimmed.startsWith('export ')) continue;
    if (trimmed.startsWith('const ')) continue;
    
    // Look for hardcoded English text between > and <
    // But only if it looks like a sentence/phrase (has spaces, starts with capital)
    const textMatches = line.match(/>([A-Z][a-zA-Z\s]{8,})</g);
    if (textMatches) {
      for (const m of textMatches) {
        const text = m.slice(1, -1).trim();
        // Skip if it contains template expressions
        if (text.includes('{') || text.includes('}')) continue;
        // Skip CSS class names and HTML tags
        if (/^[a-z-]+$/.test(text)) continue;
        // Skip common code tokens
        const skipWords = ['div','span','p','section','article','nav','header','footer','main','aside','figure','figcaption','time','mark','details','summary','dialog','template','slot','style','script','astro','import','export','const','let','var','function','return','if','else','for','while','switch','case','break','continue','default','try','catch','finally','throw','new','this','typeof','instanceof','void','delete','in','of','with','yield','await','async','class','extends','super','static','get','set','true','false','null','undefined','NaN','Infinity','console','log','warn','error','info','debug','dir','trace','assert','clear','count','countReset','group','groupEnd','groupCollapsed','time','timeEnd','timeLog','profile','profileEnd','table','trace','warn','satisfies','readonly','interface'];
        if (skipWords.includes(text.toLowerCase())) continue;
        issues.push({file: file.replace(/\\/g, '/'), line: i+1, text: text.substring(0, 100)});
      }
    }
    
    // Look for hardcoded aria-label, placeholder, alt, title attributes
    const attrMatches = line.match(/(aria-label|placeholder|alt|title)="([^"]{5,})"/g);
    if (attrMatches) {
      for (const m of attrMatches) {
        const text = m.match(/"([^"]+)"/)[1];
        if (text.includes('{') || text.includes('ui.')) continue;
        if (/^[a-z-]+$/.test(text)) continue;
        issues.push({file: file.replace(/\\/g, '/'), line: i+1, text: `${m.match(/(aria-label|placeholder|alt|title)/)[1]}="${text.substring(0, 80)}"`});
      }
    }
  }
}

// Sort and dedupe
const seen = new Set();
for (const issue of issues) {
  const key = issue.file + ':' + issue.text;
  if (!seen.has(key)) {
    seen.add(key);
    console.log(issue.file + ':' + issue.line + ' | ' + issue.text);
  }
}
console.log('\nTotal unique issues: ' + seen.size);
