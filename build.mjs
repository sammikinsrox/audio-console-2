import { cp, mkdir, writeFile, readFile, copyFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src  = join(__dirname, 'src');
const dist = join(__dirname, 'dist');

const { version } = JSON.parse(await readFile(join(__dirname, 'package.json'), 'utf8'));

function merge(base, overlay) {
  const out = structuredClone(base);
  for (const [k, v] of Object.entries(overlay)) {
    if (v && typeof v === 'object' && !Array.isArray(v)
        && out[k] && typeof out[k] === 'object' && !Array.isArray(out[k])) {
      out[k] = merge(out[k], v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

async function buildBrowser(browser) {
  const out = join(dist, browser);
  await mkdir(join(out, 'sidebar'),  { recursive: true });
  await mkdir(join(out, 'worklets'), { recursive: true });
  await mkdir(join(out, 'icons'),    { recursive: true });
  await mkdir(join(out, 'logo'),     { recursive: true });

  // Manifest — version injected from package.json
  const base    = JSON.parse(await readFile(join(src, 'manifests', 'base.json'),           'utf8'));
  const overlay = JSON.parse(await readFile(join(src, 'manifests', `${browser}.json`),     'utf8'));
  const manifest = merge(base, overlay);
  manifest.version = version;
  await writeFile(join(out, 'manifest.json'), JSON.stringify(manifest, null, 2));

  // Background — Chrome service worker needs the polyfill via importScripts
  let bg = await readFile(join(src, 'background.js'), 'utf8');
  if (browser === 'chrome') {
    bg = `importScripts('browser-polyfill.js');\n` + bg;
    await copyFile(
      join(__dirname, 'node_modules', 'webextension-polyfill', 'dist', 'browser-polyfill.js'),
      join(out, 'browser-polyfill.js')
    );
  }
  await writeFile(join(out, 'background.js'), bg);

  // Content script
  await copyFile(join(src, 'content.js'), join(out, 'content.js'));
  if (browser === 'chrome') {
    await copyFile(join(src, 'injector.js'), join(out, 'injector.js'));
  }

  // Sidebar — Chrome build injects the polyfill script tag
  await copyFile(join(src, 'sidebar', 'sidebar.css'), join(out, 'sidebar', 'sidebar.css'));
  await copyFile(join(src, 'sidebar', 'sidebar.js'),  join(out, 'sidebar', 'sidebar.js'));
  let html = await readFile(join(src, 'sidebar', 'sidebar.html'), 'utf8');
  if (browser === 'chrome') {
    html = html.replace(
      '<script src="sidebar.js"></script>',
      '<script src="../browser-polyfill.js"></script>\n  <script src="sidebar.js"></script>'
    );
  }
  await writeFile(join(out, 'sidebar', 'sidebar.html'), html);

  // Static assets
  await cp(join(src, 'worklets'), join(out, 'worklets'), { recursive: true });
  await cp(join(src, 'icons'),    join(out, 'icons'),    { recursive: true });
  await cp(join(src, 'logo'),     join(out, 'logo'),     { recursive: true });

  console.log(`  ✓ dist/${browser}`);
}

const target   = process.argv[2] ?? 'all';
const browsers = target === 'all' ? ['firefox', 'chrome'] : [target];
for (const b of browsers) await buildBrowser(b);
console.log('Build complete.');
