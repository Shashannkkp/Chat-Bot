import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.join(projectRoot, 'src');
const outDir = path.join(projectRoot, 'src');

const assetExtensions = new Set(['.css', '.json', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.ttf', '.woff', '.woff2']);

function copyAssets(fromDir, toDir) {
  if (!existsSync(fromDir)) return;
  mkdirSync(toDir, { recursive: true });

  for (const entry of readdirSync(fromDir, { withFileTypes: true })) {
    const fromPath = path.join(fromDir, entry.name);
    const toPath = path.join(toDir, entry.name);

    if (entry.isDirectory()) {
      copyAssets(fromPath, toPath);
      continue;
    }

    if (assetExtensions.has(path.extname(entry.name).toLowerCase())) {
      mkdirSync(path.dirname(toPath), { recursive: true });
      cpSync(fromPath, toPath);
    }
  }
}

mkdirSync(outDir, { recursive: true });
copyAssets(srcDir, outDir);
