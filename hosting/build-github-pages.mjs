import { cp, mkdir, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

// The deployed source stays intact. Adapt only a disposable copy for static hosting.
const root = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
function option(name, fallback = '') {
  const index = args.indexOf(name);
  if (index < 0) return fallback;
  if (!args[index + 1] || args[index + 1].startsWith('--')) throw new Error(`Missing ${name}`);
  return args[index + 1];
}
const rawBase = option('--base-path', process.env.PAGES_BASE_PATH || '');
const basePath = rawBase === '/' ? '' : rawBase.replace(/\/$/, '');
if (basePath && (!/^\/(?:[A-Za-z0-9._-]+\/)*[A-Za-z0-9._-]+$/.test(basePath) ||
    basePath.split('/').some(part => part === '.' || part === '..'))) {
  throw new Error('Use an empty base path or a path such as /vyuk-website.');
}
const siteUrl = new URL(option('--site-url', process.env.SITE_URL || 'https://example.com'));
if (!['http:', 'https:'].includes(siteUrl.protocol) || siteUrl.username || siteUrl.password) {
  throw new Error('The site URL must be an HTTP(S) URL without credentials.');
}
const apiUrl = option('--api-url', process.env.NEXT_PUBLIC_DISCOVERY_API_URL || '');
if (apiUrl) {
  const parsed = new URL(apiUrl);
  if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) {
    throw new Error('The API URL must be an absolute HTTP(S) URL without credentials.');
  }
}
const temporary = path.join(root, 'out', '.pages-source');
const output = path.join(root, 'out', 'github-pages');
await rm(temporary, { recursive: true, force: true });
await mkdir(temporary, { recursive: true });
for (const name of ['app', 'components', 'hooks', 'lib', 'public', 'vendor',
  'package.json', 'postcss.config.mjs']) {
  await cp(path.join(root, name), path.join(temporary, name), { recursive: true });
}
await rm(path.join(temporary, 'app', 'api'), { recursive: true, force: true });
// This unused Sites helper reads request headers, so it is not part of the static build.
await rm(path.join(temporary, 'app', 'chatgpt-auth.ts'), { force: true });
await symlink(path.join(root, 'node_modules'), path.join(temporary, 'node_modules'),
  process.platform === 'win32' ? 'junction' : 'dir');

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
async function adapt(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) { await adapt(filename); continue; }
    if (!/\.tsx?$/.test(entry.name)) continue;
    let text = await readFile(filename, 'utf8');
    if (filename.endsWith(`${path.sep}layout.tsx`)) {
      text = text.replace('https://vyuk-v32-recreated.sujilssologinalllogi.chatgpt.site', siteUrl.origin);
    }
    if (/\bfetch\("\/api\/discovery",/.test(text)) {
      text = text.replace('    try {', '    try {\n      if (!process.env.NEXT_PUBLIC_DISCOVERY_API_URL) throw new Error("The enquiry service is not configured. Please email hello@vyukai.in.");');
      text = text.replace('fetch("/api/discovery",', 'fetch(process.env.NEXT_PUBLIC_DISCOVERY_API_URL!,');
    }
    if (basePath) {
      const source = ts.createSourceFile(filename, text, ts.ScriptTarget.Latest, true,
        filename.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
      const result = ts.transform(source, [context => {
        const visit = node => {
          if (ts.isStringLiteralLike(node) && /^\/(?!\/)/.test(node.text)) {
            return ts.factory.createStringLiteral(`${basePath}${node.text}`);
          }
          return ts.visitEachChild(node, visit, context);
        };
        return node => ts.visitNode(node, visit);
      }]);
      text = printer.printFile(result.transformed[0]);
      result.dispose();
    }
    await writeFile(filename, text);
  }
}
await adapt(path.join(temporary, 'app'));

const redirects = {
  '/review/conversational-analytics': '/work/conversational-analytics/',
  '/review/field-sales-intelligence': '/work/field-sales-throughput/',
};
for (const [from, to] of Object.entries(redirects)) {
  const target = `${basePath}${to}`;
  await writeFile(path.join(temporary, 'app', from, 'page.tsx'), `"use client";
import { useEffect } from "react";
export default function RedirectPage() {
  useEffect(() => { window.location.replace(${JSON.stringify(target)} + window.location.search + window.location.hash); }, []);
  return <main><p>Continue to <a href={${JSON.stringify(target)}}>the current Vyuk page</a>.</p></main>;
}
`);
}
const tsconfig = JSON.parse(await readFile(path.join(root, 'tsconfig.json'), 'utf8'));
tsconfig.compilerOptions.types = ['node'];
tsconfig.compilerOptions.incremental = false;
tsconfig.include = ['next-env.d.ts', 'app/**/*.ts', 'app/**/*.tsx', '.next/types/**/*.ts'];
tsconfig.exclude = ['node_modules'];
await writeFile(path.join(temporary, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));
await writeFile(path.join(temporary, 'next.config.mjs'), `export default ${JSON.stringify({
  output: 'export', trailingSlash: true, basePath, images: { unoptimized: true },
  experimental: { cpus: 2 },
}, null, 2)};\n`);

if (!apiUrl) console.warn('Enquiry forms need --api-url before production deployment; direct email links remain available.');
console.log(`Building static pages for ${siteUrl.origin}${basePath}/`);
const built = spawnSync(process.execPath,
  [path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next'), 'build', '--webpack'], {
    cwd: temporary, stdio: 'inherit',
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1', NEXT_PUBLIC_DISCOVERY_API_URL: apiUrl },
  });
if (built.error) throw built.error;
if (built.status !== 0) process.exit(built.status || 1);
await rm(output, { recursive: true, force: true });
await cp(path.join(temporary, 'out'), output, { recursive: true });
await writeFile(path.join(output, '.nojekyll'), '');
for (const [from, to] of Object.entries(redirects)) {
  const filename = path.join(output, from, 'index.html');
  const html = await readFile(filename, 'utf8');
  await writeFile(filename, html.replace('</head>', `<meta http-equiv="refresh" content="0;url=${basePath}${to}"></head>`));
}
await writeFile(path.join(root, 'out', 'github-pages-build.json'), JSON.stringify({
  basePath, siteOrigin: siteUrl.origin, enquiryApiConfigured: Boolean(apiUrl),
  outputDirectory: 'out/github-pages', originalSourceVersion: 65,
}, null, 2) + '\n');
console.log(`Static export ready: ${output}`);
