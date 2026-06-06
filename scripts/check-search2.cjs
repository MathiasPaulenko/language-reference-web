const fs = require('fs');
const html = fs.readFileSync('d:/Codigo/language-reference-web/dist/en/search/index.html', 'utf8');
const scriptMatch = html.match(/<script[^>]*>([\s\S]*?)<\/script>/g);
if (scriptMatch) {
  scriptMatch.forEach((script, i) => {
    if (script.includes('pagefind') || script.includes('init')) {
      console.log('Script', i, 'found');
    }
  });
}
console.log('Total scripts:', scriptMatch ? scriptMatch.length : 0);
