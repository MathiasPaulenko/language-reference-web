const fs = require('fs');
const path = require('path');

function walk(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      walk(full, files);
    } else if (item.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const htmlFiles = walk(path.join(__dirname, '..', 'dist'));
const results = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf-8');
  
  // Skip redirect pages with noindex
  if (html.includes('<meta name="robots" content="noindex">')) continue;
  
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;
  
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const description = descMatch ? descMatch[1].trim() : null;
  
  const canonMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const canonical = canonMatch ? canonMatch[1].trim() : null;
  
  const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i);
  const ogTitle = ogTitleMatch ? ogTitleMatch[1].trim() : null;
  
  const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i);
  const ogDescription = ogDescMatch ? ogDescMatch[1].trim() : null;
  
  const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i);
  const ogImage = ogImageMatch ? ogImageMatch[1].trim() : null;
  
  const ogUrlMatch = html.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']*)["']/i);
  const ogUrl = ogUrlMatch ? ogUrlMatch[1].trim() : null;
  
  results.push({
    file: file.replace(path.join(__dirname, '..', 'dist'), ''),
    title,
    titleLen: title ? title.length : 0,
    description,
    descLen: description ? description.length : 0,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl
  });
}

const titleCounts = {};
const descCounts = {};
for (const r of results) {
  titleCounts[r.title] = (titleCounts[r.title] || 0) + 1;
  descCounts[r.description] = (descCounts[r.description] || 0) + 1;
}

const issues = [];
for (const r of results) {
  const relPath = r.file;
  if (!r.title) issues.push({file: relPath, issue: 'Missing <title>'});
  else if (r.titleLen > 60) issues.push({file: relPath, issue: `Title too long (${r.titleLen} chars): ${r.title.substring(0, 50)}...`});
  
  if (!r.description) issues.push({file: relPath, issue: 'Missing meta description'});
  else if (r.descLen > 160) issues.push({file: relPath, issue: `Description too long (${r.descLen} chars): ${r.description.substring(0, 50)}...`});
  
  if (!r.canonical) issues.push({file: relPath, issue: 'Missing canonical'});
  
  if (!r.ogTitle) issues.push({file: relPath, issue: 'Missing og:title'});
  if (!r.ogDescription) issues.push({file: relPath, issue: 'Missing og:description'});
  if (!r.ogImage) issues.push({file: relPath, issue: 'Missing og:image'});
  if (!r.ogUrl) issues.push({file: relPath, issue: 'Missing og:url'});
}

for (const [title, count] of Object.entries(titleCounts)) {
  if (count > 1 && title) issues.push({file: `${count} pages`, issue: `Duplicate title: ${title.substring(0, 50)}...`});
}
for (const [desc, count] of Object.entries(descCounts)) {
  if (count > 1 && desc) issues.push({file: `${count} pages`, issue: `Duplicate description: ${desc.substring(0, 50)}...`});
}

console.log('=== SEO AUDIT RESULTS ===');
console.log(`Total pages: ${results.length}`);
console.log(`Issues found: ${issues.length}`);
console.log('');

if (issues.length === 0) {
  console.log('All checks passed!');
} else {
  const byType = {};
  for (const i of issues) {
    byType[i.issue] = byType[i.issue] || [];
    byType[i.issue].push(i.file);
  }
  
  for (const [issue, files] of Object.entries(byType)) {
    console.log(`[${issue}]`);
    for (const f of files.slice(0, 5)) {
      console.log(`  - ${f}`);
    }
    if (files.length > 5) console.log(`  ... and ${files.length - 5} more`);
    console.log('');
  }
}

console.log('=== SAMPLE TITLES (first 5) ===');
for (const r of results.slice(0, 5)) {
  console.log(`${r.file}: "${r.title}" (${r.titleLen} chars)`);
}
console.log('');
console.log('=== SAMPLE DESCRIPTIONS (first 5) ===');
for (const r of results.slice(0, 5)) {
  console.log(`${r.file}: "${r.description?.substring(0, 60)}..." (${r.descLen} chars)`);
}
