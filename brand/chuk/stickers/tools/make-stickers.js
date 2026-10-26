// Render sticker PNGs (1024x1024, transparent) from base cutouts + captions.
// Usage: node make-stickers.js [prefix ...]  (e.g. `13 14` renders only those)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const dir = __dirname;
const S = [
  ['01-hi', 'wave', "HI, I'M CHUK!", 'green'],
  ['02-handled', 'thumbs', 'CONSIDER IT HANDLED', 'sun'],
  ['03-rental-guy', 'smile', 'YOUR RENTAL GUY', 'green'],
  ['04-text-me', 'talking', 'TEXT ME!', 'sun'],
  ['05-moving-easy', 'laughing', 'MOVING? EASY.', 'green'],
  ['06-checking-hoa', 'thoughtful', 'CHECKING THE HOA…', 'ink'],
  ['07-zero-fee', 'surprised', '$0 FOR RENTERS?!', 'sun'],
  ['08-know-a-guy', 'wink', 'I KNOW A GUY', 'green'],
  ['09-lease-signed', 'thumbs', 'LEASE SIGNED!', 'green'],
  ['10-welcome-home', 'wave', 'WELCOME HOME!', 'sun'],
  ['11-movers-too', 'surprised', 'THE MOVERS TOO?!', 'ink'],
  ['12-got-you', 'wink', 'I GOT YOU.', 'sun'],
  ['13-hi', 'wave', 'HI!', 'green'],
  ['14-thank-you', 'thumbs', 'THANK YOU!', 'sun'],
  ['15-god-bless-you', 'smile', 'GOD BLESS YOU!', 'green'],
];
const C = { green: '#1E7A55', sun: '#FF8A3D', ink: '#122E25' };
const font = 'data:font/woff2;base64,' + fs.readFileSync(path.join(dir, 'archivo.woff2')).toString('base64');
const html = (img, text, col) => `<!doctype html><html><head><style>
@font-face{font-family:A;src:url(${font}) format('woff2');font-weight:100 900}
html,body{margin:0;background:transparent}
.s{position:relative;width:1024px;height:1024px;font-family:A,sans-serif}
.s img{position:absolute;left:0;top:0;width:1024px;height:1024px}
.cap{position:absolute;left:50%;top:640px;transform:translateX(-50%) rotate(-3deg);white-space:nowrap;
 background:${C[col]};color:#fff;font-weight:900;font-size:${text.length > 15 ? 70 : 84}px;letter-spacing:-1px;
 padding:22px 40px 26px;border-radius:28px;border:10px solid #fff;box-shadow:0 10px 24px rgba(18,46,37,.28)}
.url{position:absolute;left:50%;top:858px;transform:translateX(-50%);white-space:nowrap;
 background:#fff;color:#122E25;font-weight:800;font-size:50px;letter-spacing:-.5px;
 padding:12px 34px 14px;border-radius:999px;border:6px solid #1E7A55;box-shadow:0 6px 16px rgba(18,46,37,.22)}
.url b{color:#1E7A55;font-weight:900}
</style></head><body><div class="s"><img src="data:image/png;base64,${img}">
<div class="cap">${text}</div><div class="url">Rentals<b>By</b>Chuk.com</div></div></body></html>`;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1024, height: 1024 } });
  fs.mkdirSync(path.join(dir, 'out'), { recursive: true });
  const only = process.argv.slice(2);
  for (const [name, base, text, col] of S) {
    if (only.length && !only.some(o => name.startsWith(o))) continue;
    const img = fs.readFileSync(path.join(dir, 'base', base + '.png')).toString('base64');
    await p.setContent(html(img, text, col)); await p.evaluate(() => document.fonts.ready);
    await p.locator('.s').screenshot({ path: path.join(dir, 'out', name + '.png'), omitBackground: true });
  }
  await b.close();
})();
