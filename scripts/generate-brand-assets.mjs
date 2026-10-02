// Builds the favicon, app icons, and Open Graph image from the brand files in public/brand.
//   node scripts/generate-brand-assets.mjs
// Icon mark: "CB" (public/brand/crale-cb-mark.svg). The green letter shapes are the C from CRALE and the
// B from BUILDERS in the original wordmark vector, rotated upright and sized to match. The white ring and
// black outline are redrawn at one thickness for both letters (scaling the originals would not match).
// Full color on a Seawall Stone tile so the mark reads on light and dark browser tabs alike.
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const SEAWALL = '#ECEEE9';
const mark = await readFile('public/brand/crale-cb-mark.svg', 'utf8');
const markInner = mark
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .replace(/<title>[\s\S]*?<\/title>/, '');
const markViewBox = mark.match(/viewBox="([^"]+)"/)[1];

/** A square icon: Seawall tile (optionally rounded) with the CB mark centered, `pad` as a fraction of the size. */
function iconSvg(size, { radius = 0, pad = 0.1 } = {}) {
  const inner = size * (1 - pad * 2);
  const offset = size * pad;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="${SEAWALL}"/>
  <svg x="${offset}" y="${offset}" width="${inner}" height="${inner}" viewBox="${markViewBox}">${markInner}</svg>
</svg>`;
}

/** Renders at high density, then scales to the exact size. Opaque icons drop the alpha channel entirely. */
function render(svg, size, { opaque = false } = {}) {
  const image = sharp(Buffer.from(svg), { density: 600 }).resize(size, size);
  return (opaque ? image.flatten({ background: SEAWALL }).removeAlpha() : image).png();
}

async function png(svg, size, file) {
  await render(svg, size, { opaque: true }).toFile(file);
}

// Apple and Android mask their own corners, so these are full-bleed squares with no transparency.
await png(iconSvg(180, { pad: 0.12 }), 180, 'public/apple-touch-icon.png');
await png(iconSvg(192, { pad: 0.12 }), 192, 'public/android-chrome-192x192.png');
await png(iconSvg(512, { pad: 0.12 }), 512, 'public/android-chrome-512x512.png');

// Favicon frames: rounded tile, minimal padding so the letters stay legible at 16px.
const frames = await Promise.all(
  [16, 32, 48].map((size) =>
    render(iconSvg(size, { radius: size * 0.2, pad: 0.03 }), size).toBuffer(),
  ),
);
await writeFile('public/favicon.ico', toIco(frames, [16, 32, 48]));

/** Packs PNG frames into an .ico container (PNG-in-ICO, supported by every current browser). */
function toIco(buffers, sizes) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(buffers.length, 4);
  const entries = [];
  let offset = 6 + 16 * buffers.length;
  buffers.forEach((buffer, index) => {
    const entry = Buffer.alloc(16);
    const size = sizes[index];
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += buffer.length;
    entries.push(entry);
  });
  return Buffer.concat([header, ...entries, ...buffers]);
}

console.log('Icons written.');
