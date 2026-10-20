// Encodes assets-src/*.jpg into responsive AVIF + WebP files in public/media
// and writes src/media/manifest.json (sizes, aspect, blur placeholder).
// Run: npm run images            (all)
//      npm run images -- <name>  (only names containing <name>; manifest is merged)
import sharp from 'sharp';
import { readdir, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'assets-src';
const OUT = 'public/media';
const MANIFEST = 'src/media/manifest.json';

// Full-bleed scenes get an upscaled 1800w variant (lanczos + light unsharp) so
// desktop browsers don't do a softer bilinear upscale themselves.
const WIDTHS = {
  apt: [640, 1170, 1800],
  office: [560, 900, 1170],
  kitchen: [480, 900, 1170],
};

const groupOf = (name) => name.split('-')[0];

await mkdir(OUT, { recursive: true });
await mkdir(path.dirname(MANIFEST), { recursive: true });

const only = process.argv[2];
const manifest = only ? JSON.parse(await readFile(MANIFEST, 'utf8').catch(() => '{}')) : {};
const files = (await readdir(SRC)).filter((f) => f.endsWith('.jpg') && (!only || f.includes(only))).sort();

for (const file of files) {
  const name = file.replace(/\.jpg$/, '');
  const input = sharp(path.join(SRC, file));
  const { width, height } = await input.metadata();
  const upscale = groupOf(name) === 'apt';
  const widths = [...new Set((WIDTHS[groupOf(name)] ?? [640, 1170]).map((w) => (upscale ? w : Math.min(w, width))))];

  const out = [];
  for (const w of widths) {
    const h = Math.round((height / width) * w);
    let img = sharp(path.join(SRC, file)).resize(w, h, { kernel: 'lanczos3' });
    if (w > width) img = img.sharpen({ sigma: 0.7, m1: 0.6, m2: 1.2 });
    await img.clone().avif({ quality: 52, effort: 6, chromaSubsampling: '4:2:0' }).toFile(`${OUT}/${name}-${w}.avif`);
    await img.clone().webp({ quality: 76, effort: 5 }).toFile(`${OUT}/${name}-${w}.webp`);
    out.push(w);
  }

  const tiny = await sharp(path.join(SRC, file)).resize(20).blur(0.6).webp({ quality: 40 }).toBuffer();
  const { dominant } = await sharp(path.join(SRC, file)).stats();
  manifest[name] = {
    width,
    height,
    widths: out,
    blur: `data:image/webp;base64,${tiny.toString('base64')}`,
    color: `rgb(${dominant.r} ${dominant.g} ${dominant.b})`,
  };
  console.log(name, out.join(','));
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`wrote ${Object.keys(manifest).length} images`);
