#!/usr/bin/env node
/**
 * Checks every internal href/src in the static export (./out) resolves to a
 * built file, the way GitHub Pages would serve it. Run after `npm run build`.
 * Fails (exit 1) on broken links or links missing the deploy base path.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'out';
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (repo ? `/${repo}` : '/website');

if (!existsSync(OUT)) {
  console.error(`No ./${OUT} directory. Run "npm run build" first.`);
  process.exit(1);
}

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (name.endsWith('.html')) yield p;
  }
}

function resolves(url) {
  const clean = url.split('#')[0].split('?')[0];
  if (!clean.startsWith(`${basePath}/`) && clean !== basePath) return false;
  const rel = clean.slice(basePath.length).replace(/^\//, '');
  const f = join(OUT, rel);
  return [f, `${f}.html`, join(f, 'index.html')].some((c) => existsSync(c) && statSync(c).isFile());
}

const broken = new Map();
let total = 0;
for (const file of htmlFiles(OUT)) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/\b(?:href|src)="(\/[^"/][^"]*)"/g)) {
    total++;
    if (!resolves(m[1])) {
      const list = broken.get(m[1]) ?? [];
      list.push(file);
      broken.set(m[1], list);
    }
  }
}

if (broken.size) {
  console.error(`✗ ${broken.size} broken internal link(s) (base path "${basePath}"):`);
  for (const [url, files] of broken) console.error(`  ${url}  ← ${files.slice(0, 3).join(', ')}`);
  process.exit(1);
}
console.log(`✓ ${total} internal links checked, none broken (base path "${basePath}").`);
