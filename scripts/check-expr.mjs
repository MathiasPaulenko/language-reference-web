import fs from 'fs';
const c = fs.readFileSync('src/content/vocabulary/expressions.mdx', 'utf8');
const m = c.match(/word: "([^"]+)"/g);
console.log('Total expressions:', m.length);
console.log('Last 5:', m.slice(-5).map(s => s.replace(/word: /, '').replace(/"/g, '')));
