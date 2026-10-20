// Assembles a self-contained, relative-path copy of the site for the hosted
// preview. Run after:  PREVIEW=1 NEXT_PUBLIC_ASSET_BASE=.. next build
// Output: preview-dist/ (pages at az/ ru/ en/, entry page preview.html) and
// preview-dist/files.json, the published-path → source map.
import { readdir, readFile, writeFile, stat, rename, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const DIR = 'preview-dist';
const LOCALES = ['az', 'ru', 'en'];

// The preview host reserves top-level names starting with "_", so _next/ moves to
// n/_next/. Next's runtime finds its asset root by looking for "/_next/" in script
// URLs, which this nesting keeps intact.
if (existsSync(path.join(DIR, '_next'))) {
  await mkdir(path.join(DIR, 'n'), { recursive: true });
  await rename(path.join(DIR, '_next'), path.join(DIR, 'n', '_next'));
}
const chunks = path.join(DIR, 'n', '_next', 'static', 'chunks');
for (const name of await readdir(chunks)) {
  if (!name.endsWith('.js')) continue;
  const file = path.join(chunks, name);
  const js = await readFile(file, 'utf8');
  // Literal U+FFFD (a library's URL decoder) is written as its escape; same string.
  const out = js.replaceAll('"../_next/"', '"../n/_next/"').replaceAll('\uFFFD', '\\uFFFD');
  if (out !== js) await writeFile(file, out);
}

// Directory links ("../ru/") need an explicit file on a static file host.
for (const l of LOCALES) {
  const file = path.join(DIR, l, 'index.html');
  let html = await readFile(file, 'utf8');
  html = html.replaceAll('../_next/', '../n/_next/');
  for (const to of LOCALES) html = html.replaceAll(`href="../${to}/"`, `href="../${to}/index.html"`);
  await writeFile(file, html);
}

// Entry page: the artifact skeleton wraps it, so it only forwards to the AZ page.
await writeFile(
  path.join(DIR, 'preview.html'),
  `<title>Buon Design Website</title>
<style>
  :root { --ink: #1c1b16; --cream: #efe8dc; color-scheme: dark }
  body { background: var(--ink); color: var(--cream); font: 15px/1.6 system-ui, sans-serif; display: grid; place-items: center; min-height: 100vh; margin: 0 }
  a { color: var(--cream) }
</style>
<p><a href="az/index.html">Buon Design</a></p>
<script>location.replace('az/index.html' + location.hash);</script>
`,
);

async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const full = path.join(dir, name);
    if ((await stat(full)).isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const keep = (rel) =>
  !rel.endsWith('.txt') &&
  rel !== 'index.html' &&
  rel !== 'preview.html' &&
  rel !== 'files.json' &&
  !rel.startsWith('_not-found') &&
  !rel.startsWith('404') &&
  // AVIF is what every current browser picks; WebP stays only where <img src> names it.
  !(rel.startsWith('media/') && rel.endsWith('.webp') && !/-(1800|1170|1169|700|489)\.webp$/.test(rel));

const files = {};
for (const full of await walk(DIR)) {
  const rel = path.relative(DIR, full).split(path.sep).join('/');
  if (keep(rel)) files[rel] = full;
}
await writeFile(path.join(DIR, 'files.json'), JSON.stringify(files, null, 2));
console.log(`${Object.keys(files).length} files`);
