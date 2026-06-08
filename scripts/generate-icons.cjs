const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createIcon(size, outputPath) {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="100%" height="100%" fill="#b4452a" rx="${size * 0.15}"/>
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle"
        font-family="Georgia, serif" font-weight="bold" font-size="${size * 0.5}"
        fill="#faf6ef">GN</text>
</svg>`;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);

  console.log(`Created ${outputPath}`);
}

(async () => {
  const publicDir = path.join(__dirname, '..', 'public');
  await createIcon(192, path.join(publicDir, 'icon-192.png'));
  await createIcon(512, path.join(publicDir, 'icon-512.png'));
})();
