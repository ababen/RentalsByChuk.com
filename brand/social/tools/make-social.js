// Render social graphics (feed 1080x1350, story 1080x1920) into ../posts/.
// Needs the sticker bases (python3 make-bases.py in brand/chuk/stickers/tools) and
// archivo.woff2 there + nunito.woff2 here (fontsource variable fonts).
// Usage: node make-social.js [prefix ...]
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const dir = __dirname, st = path.join(dir, '../../chuk/stickers/tools');
const f64 = p => fs.readFileSync(p).toString('base64');
const archivo = f64(path.join(st, 'archivo.woff2')), nunito = f64(path.join(dir, 'nunito.woff2'));
// trim the 1024px sticker bases to their content so every pose can be sized by height
const { execFileSync } = require('child_process');
const trim = path.join(dir, 'trim');
fs.mkdirSync(trim, { recursive: true });
const img = n => {
  const out = path.join(trim, n + '.png');
  if (!fs.existsSync(out)) execFileSync('python3', ['-c',
    'import sys;from PIL import Image;i=Image.open(sys.argv[1]);i.crop(i.getbbox()).save(sys.argv[2])', path.join(st, 'base', n + '.png'), out]);
  return 'data:image/png;base64,' + f64(out);
};

// [file, size, pose, kicker, headline (<em> = highlight), body, chips, cta, theme]
const P = [
  ['01-know-someone', 'feed', 'wave', 'Moving to Palm Beach?',
   'Know someone<br>looking for<br>a <em>rental?</em>', 'Send them to Chuk. Rentals only — West Palm Beach, Palm Beach Gardens &amp; Jupiter.',
   ['West Palm Beach', 'Palm Beach Gardens', 'Jupiter'], 'RentalsByChuk.com', 'cream'],
  ['02-zero-for-renters', 'feed', 'surprised', 'Seriously.',
   '<em>$0</em> for<br>renters.', 'The landlord side pays when a lease signs. The search, showings, negotiating and lease read cost you nothing.',
   ['Search', 'Showings', 'Negotiating', 'Lease read'], 'RentalsByChuk.com', 'green'],
  ['03-only-hustle', 'feed', 'thumbs', 'Why I recommend Chuk',
   'Rentals isn’t his<br>side hustle.<br><em>It’s his only one.</em>', 'He finds the home, checks the HOA, books the tours and negotiates the lease. Goal: keys in about 21 days.',
   ['Find', 'Check HOA', 'Tour', 'Negotiate'], 'RentalsByChuk.com', 'cream'],
  ['04-check-the-hoa', 'feed', 'thoughtful', 'Before you sign',
   'Can you even<br>rent there?<br><em>Check the HOA.</em>', 'Chuk publishes HOA rental rules for free — minimum lease, approval time, caps.',
   ['Min. lease', 'Board approval', 'Rental caps'], 'RentalsByChuk.com/hoa-checker', 'sun'],
  ['05-relocating', 'feed', 'talking', 'Relocating for work?',
   'Land to a<br><em>ready home.</em>', 'Video tours, remote paperwork, start-date planning. Half of Chuk’s practice is relocations.',
   ['Video tours', 'Remote signing', 'Start-date plan'], 'RentalsByChuk.com', 'cream'],
  ['06-landlords', 'feed', 'smile', 'Homeowners &amp; landlords',
   'House won’t sell?<br><em>Rent it right.</em>', 'Free 48-hour rental analysis: real rents from your street, your HOA’s rental rules, season-vs-year math. No listing pitch.',
   ['Street-level rents', 'HOA rules', 'Seasonal vs. annual'], 'RentalsByChuk.com/landlords', 'green'],
  ['07-story-i-know-a-guy', 'story', 'laughing', 'Need a rental in Palm Beach?',
   'I know<br><em>a guy.</em>', 'Chuk only does rentals — WPB, Palm Beach Gardens &amp; Jupiter. $0 for renters.',
   [], 'RentalsByChuk.com', 'green'],
  ['08-story-hoa', 'story', 'thoughtful', 'Free tool',
   'Is that<br>community<br><em>rental&#8209;<br>friendly?</em>', 'Look up any HOA’s rental rules before you fall in love with the house.',
   [], 'RentalsByChuk.com/hoa-checker', 'cream'],
];
const T = {
  cream: { bg: '#FFFBF1', blob: '#F6EDD9', ink: '#122E25', soft: '#40564C', em: '#1E7A55', chip: '#fff', chipLine: '#EEE0C4', cta: '#FF8A3D' },
  green: { bg: '#0E3B2A', blob: '#1E7A55', ink: '#FFFFFF', soft: '#CFE6D9', em: '#FFB27A', chip: 'rgba(255,255,255,.08)', chipLine: 'rgba(255,255,255,.25)', cta: '#FF8A3D' },
  sun:   { bg: '#FFE9D2', blob: '#FFD0A6', ink: '#122E25', soft: '#40564C', em: '#E56F22', chip: '#fff', chipLine: '#F5C9A0', cta: '#1E7A55' },
};
const html = ([, size, pose, kicker, head, body, chips, cta, theme]) => {
  const t = T[theme], story = size === 'story', H = story ? 1920 : 1350;
  const hs = story ? 132 : 100;
  return `<!doctype html><html><head><style>
@font-face{font-family:A;src:url(data:font/woff2;base64,${archivo}) format('woff2');font-weight:100 900}
@font-face{font-family:N;src:url(data:font/woff2;base64,${nunito}) format('woff2');font-weight:200 1000}
html,body{margin:0}
.p{position:relative;width:1080px;height:${H}px;overflow:hidden;background:${t.bg};color:${t.ink};font-family:N,sans-serif}
.blob{position:absolute;right:-180px;bottom:${story ? 240 : 120}px;width:900px;height:900px;border-radius:50%;background:${t.blob}}
.chuk{position:absolute;right:${story ? 90 : 40}px;bottom:${story ? 280 : 140}px;height:${story ? 700 : 600}px}
.txt{position:absolute;left:72px;top:${story ? 170 : 88}px;width:936px}
.k{font-family:A;font-weight:800;font-size:30px;letter-spacing:.14em;text-transform:uppercase;color:${t.em}}
h1{font-family:A;font-weight:900;font-size:${hs}px;line-height:.98;letter-spacing:-.02em;margin:22px 0 30px}
h1 em{font-style:normal;color:${t.em}}
.b{font-size:${story ? 44 : 32}px;line-height:1.35;font-weight:700;color:${t.soft};width:${story ? 900 : 520}px}
.chips{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px;width:520px}
.chips span{font-weight:800;font-size:24px;padding:10px 20px;border-radius:999px;background:${t.chip};border:3px solid ${t.chipLine}}
.bar{position:absolute;left:0;right:0;bottom:0;height:${story ? 250 : 112}px;background:${theme === 'green' ? '#FFFBF1' : '#0E3B2A'};
 display:flex;align-items:center;justify-content:space-between;padding:0 64px;box-sizing:border-box;${story ? 'flex-direction:column;justify-content:center;gap:18px' : ''}}
.cta{background:${t.cta};color:#fff;font-family:A;font-weight:900;font-size:${story ? 44 : cta.length > 20 ? 26 : 30}px;padding:16px 30px;border-radius:999px;letter-spacing:-.01em;white-space:nowrap}
.who{white-space:nowrap;font-weight:800;font-size:${story ? 28 : 20}px;color:${theme === 'green' ? '#40564C' : '#CFE6D9'};${story ? 'text-align:center' : 'text-align:right'};line-height:1.35}
.who b{color:${theme === 'green' ? '#122E25' : '#fff'};font-family:A;font-weight:900}
</style></head><body><div class="p">
<div class="blob"></div><img class="chuk" src="${img(pose)}">
<div class="txt"><div class="k">${kicker}</div><h1>${head}</h1><div class="b">${body}</div>
${chips.length ? `<div class="chips">${chips.map(c => `<span>${c}</span>`).join('')}</div>` : ''}</div>
<div class="bar"><div class="cta">${cta}</div><div class="who"><b>Chuk</b> · Rentals specialist<br>LoKation Real Estate · (561) 220-9399</div></div>
</div></body></html>`;
};
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  const only = process.argv.slice(2);
  for (const post of P) {
    if (only.length && !only.some(o => post[0].startsWith(o))) continue;
    await p.setContent(html(post)); await p.evaluate(() => document.fonts.ready);
    await p.locator('.p').screenshot({ path: path.join(dir, '../posts', post[0] + '.png') });
  }
  await b.close();
})();
