const fs = require('fs');
const html = fs.readFileSync('d:/Codigo/language-reference-web/dist/en/search/index.html', 'utf8');
const matches = html.match(/<script[^>]*>([\s\S]*?)<\/script>/g);
if (matches) {
  matches.forEach((match, i) => {
    if (match.includes('pagefind') || match.includes('PagefindUI')) {
      console.log(`=== Script ${i} ===`);
      const content = match.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
      console.log(content.substring(0, 500));
      console.log('...');
    }
  });
}
