const fs = require('fs');
const html = fs.readFileSync('d:/Codigo/language-reference-web/dist/en/search/index.html', 'utf8');
console.log('Has pagefind-ui.js ref:', html.includes('pagefind-ui.js'));
console.log('Has search div:', html.includes('id="search"'));
console.log('Has init function:', html.includes('function init'));
