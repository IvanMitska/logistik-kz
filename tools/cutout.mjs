// Remove the (opaque) near-white background from the hero PNGs and re-save them
// with a real alpha channel. Border-connected flood fill so white areas INSIDE
// the object (metal hardware, highlights) are preserved; light edge feather to
// kill the white halo.
//
//   node tools/cutout.mjs container.png stack.png
//
import { readFile, writeFile, copyFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import puppeteer from 'puppeteer-core';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUB = resolve(__dirname, '../public');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const files = process.argv.slice(2);

function processInPage(dataUrl, opts) {
  return new Promise((res) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const W = c.width, H = c.height;
      const id = ctx.getImageData(0, 0, W, H);
      const d = id.data;
      const { tol, feather } = opts;

      const isBgLike = (i) => {
        const r = d[i], g = d[i + 1], b = d[i + 2];
        // distance from pure white
        const dist = Math.sqrt((255 - r) ** 2 + (255 - g) ** 2 + (255 - b) ** 2);
        return dist < tol;
      };

      const bg = new Uint8Array(W * H); // 1 = background
      const stack = [];
      const pushIf = (x, y) => {
        if (x < 0 || y < 0 || x >= W || y >= H) return;
        const p = y * W + x;
        if (bg[p]) return;
        if (isBgLike(p * 4)) { bg[p] = 1; stack.push(p); }
      };
      // seed from all border pixels
      for (let x = 0; x < W; x++) { pushIf(x, 0); pushIf(x, H - 1); }
      for (let y = 0; y < H; y++) { pushIf(0, y); pushIf(W - 1, y); }
      // flood
      while (stack.length) {
        const p = stack.pop();
        const x = p % W, y = (p / W) | 0;
        pushIf(x + 1, y); pushIf(x - 1, y); pushIf(x, y + 1); pushIf(x, y - 1);
      }
      // apply: bg -> transparent
      for (let p = 0; p < W * H; p++) if (bg[p]) d[p * 4 + 3] = 0;
      // feather: kept pixels touching bg get alpha scaled by how light they are
      if (feather) {
        for (let y = 0; y < H; y++) {
          for (let x = 0; x < W; x++) {
            const p = y * W + x;
            if (bg[p]) continue;
            let edge = false;
            if (x > 0 && bg[p - 1]) edge = true;
            else if (x < W - 1 && bg[p + 1]) edge = true;
            else if (y > 0 && bg[p - W]) edge = true;
            else if (y < H - 1 && bg[p + W]) edge = true;
            if (!edge) continue;
            const i = p * 4;
            const dist = Math.sqrt((255 - d[i]) ** 2 + (255 - d[i + 1]) ** 2 + (255 - d[i + 2]) ** 2);
            // very light fringe -> partially transparent
            if (dist < tol + 40) d[i + 3] = Math.round(255 * Math.min(1, dist / (tol + 40)));
          }
        }
      }
      ctx.putImageData(id, 0, 0);
      res(c.toDataURL('image/png'));
    };
    img.src = dataUrl;
  });
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();

for (const f of files) {
  const path = resolve(PUB, f);
  try { await access(path); } catch { console.log('skip (missing):', f); continue; }
  const orig = resolve(PUB, f.replace(/\.png$/, '_orig.png'));
  await copyFile(path, orig); // backup
  const buf = await readFile(path);
  const dataUrl = 'data:image/png;base64,' + buf.toString('base64');
  const out = await page.evaluate(processInPage, dataUrl, { tol: 60, feather: true });
  await writeFile(path, Buffer.from(out.split(',')[1], 'base64'));
  console.log('cut:', f, '(backup', f.replace(/\.png$/, '_orig.png') + ')');
}

await browser.close();
console.log('done');
