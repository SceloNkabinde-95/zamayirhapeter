import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { renderPage, validateContent } from '../src/render.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFile(resolve(root, path), 'utf8');
const site = validateContent(JSON.parse(await read('content/site.json')));
const config = JSON.parse(await read('config/site.json'));
const { html } = renderPage(site, config);
const checks = [];
function check(condition, message) { if (!condition) throw new Error(message); checks.push(message); }

check((html.match(/<h1\b/g) || []).length === 1, 'Exactly one primary heading');
check(!html.includes('undefined') && !html.includes('TODO'), 'No missing content or placeholders');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
check(new Set(ids).size === ids.length, 'Unique HTML IDs');
for (const match of html.matchAll(/href="#([^"]+)"/g)) check(ids.includes(match[1]), `Anchor target exists: ${match[1]}`);
for (const match of html.matchAll(/<img\b([^>]+)>/g)) {
  check(/alt="[^"]+"/.test(match[1]) && /width="\d+"/.test(match[1]) && /height="\d+"/.test(match[1]), 'Images have descriptions and intrinsic dimensions');
}
const assets = [...new Set([...html.matchAll(/(?:src|href|srcset)="(\/assets\/[^" ]+)"/g)].map(match => match[1]))];
for (const asset of assets) await stat(resolve(root, 'public', asset.slice(1)));
check(true, 'All referenced images and favicon exist locally');
const heroBytes = (await stat(resolve(root, 'public', site.hero.image.slice(1)))).size;
const mobileBytes = (await stat(resolve(root, 'public', site.hero.mobileImage.slice(1)))).size;
check(heroBytes < 100_000 && mobileBytes < 60_000, 'Desktop hero <100 KB; mobile hero <60 KB');
const cssBytes = (await stat(resolve(root, 'src/styles.css'))).size;
const jsBytes = (await stat(resolve(root, 'src/app.js'))).size;
check(cssBytes < 35_000 && jsBytes < 5_000 && Buffer.byteLength(html) < 40_000, 'CSS, JavaScript and HTML within documented budgets');
check(!/<(?:script|iframe)[^>]*src="https?:\/\//.test(html), 'No third-party executable embeds');
check((await read('src/styles.css')).includes('prefers-reduced-motion'), 'Reduced-motion preference supported');
check(config.production || html.includes('noindex, nofollow'), 'Private preview is noindexed');
for (const file of ['src/render.mjs', 'src/app.js', 'scripts/build.mjs', 'scripts/check.mjs', 'tests/site.test.mjs']) execFileSync(process.execPath, ['--check', resolve(root, file)]);
check(true, 'JavaScript syntax checks passed');

async function walk(path) {
  const files = [];
  for (const entry of await readdir(resolve(root, path), { withFileTypes: true })) {
    const next = `${path}/${entry.name}`;
    if (entry.isDirectory()) files.push(...await walk(next)); else files.push(next);
  }
  return files;
}
const docs = ['README.md', 'CHANGELOG.md', ...await walk('docs')].filter(path => extname(path) === '.md');
for (const path of docs) {
  const text = await read(path);
  for (const match of text.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (!target || /^[a-z]+:/i.test(target)) continue;
    await stat(resolve(root, dirname(path), target));
  }
}
check(true, 'All local documentation links resolve');
console.log(`${checks.length} content, accessibility, asset, privacy and documentation checks passed.`);
console.log(JSON.stringify({ heroBytes, mobileBytes, cssBytes, jsBytes, htmlBytes: Buffer.byteLength(html) }));
