// Render a 1080x1920 vertical video showing how easy it is to reach Chuk on the mobile site.
// Usage: node make-contact-video.js [siteUrl]   (default http://localhost:3100 — run `npm run build && npx next start -p 3100`)
// Needs: ffmpeg, trim/*.png (created by make-social.js), the fonts make-social.js uses.
// Output: ../video/contact-chuk.mp4 (silent; add music in the app you post from).
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path');
const SITE = process.argv[2] || 'http://localhost:3100';
const dir = __dirname, st = path.join(dir, '../../chuk/stickers/tools');
const outDir = path.join(dir, '../video'), frames = path.join(dir, 'frames');
const f64 = p => fs.readFileSync(p).toString('base64');
const FPS = 30, W = 390, H = 844, DPR = 2;
const SCALE = 0.82, SW = Math.round(W * DPR * SCALE), SH = Math.round(H * DPR * SCALE); // phone screen on stage
const ease = t => (t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const clamp = t => Math.max(0, Math.min(1, t));

const stageHtml = `<!doctype html><html><head><style>
@font-face{font-family:A;src:url(data:font/woff2;base64,${f64(path.join(st, 'archivo.woff2'))}) format('woff2');font-weight:100 900}
@font-face{font-family:N;src:url(data:font/woff2;base64,${f64(path.join(dir, 'nunito.woff2'))}) format('woff2');font-weight:200 1000}
html,body{margin:0}
#s{position:relative;width:1080px;height:1920px;overflow:hidden;background:radial-gradient(900px 600px at 90% 0%,#FFE9D2,transparent 60%),radial-gradient(800px 600px at 0% 100%,#E2F1E7,transparent 60%),#FFFBF1;font-family:N,sans-serif;color:#122E25}
#cap{position:absolute;left:70px;right:70px;top:90px;height:300px;display:flex;flex-direction:column;justify-content:center;text-align:center}
#cap .k{font-family:A;font-weight:800;font-size:30px;letter-spacing:.14em;text-transform:uppercase;color:#1E7A55;margin-bottom:14px}
#cap .t{font-family:A;font-weight:900;font-size:72px;line-height:1.02;letter-spacing:-.02em}
#cap .t em{font-style:normal;color:#E56F22}
#phone{position:absolute;left:${(1080 - SW) / 2 - 18}px;top:430px;width:${SW + 36}px;height:${SH + 36}px;border-radius:84px;background:#0B1512;box-shadow:0 40px 80px rgba(18,46,37,.28)}
#phone img{position:absolute;left:18px;top:18px;width:${SW}px;height:${SH}px;border-radius:66px}
.card{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 80px}
.card img{height:820px;margin:40px 0}
.card .k{font-family:A;font-weight:800;font-size:34px;letter-spacing:.14em;text-transform:uppercase;color:#1E7A55}
.card .t{font-family:A;font-weight:900;font-size:100px;line-height:1;letter-spacing:-.02em;margin-top:18px}
.card .t em{font-style:normal;color:#E56F22}
.card .sub{font-weight:800;font-size:44px;color:#40564C;margin-top:10px}
.pill{display:inline-block;background:#FF8A3D;color:#fff;font-family:A;font-weight:900;font-size:58px;padding:22px 48px;border-radius:999px;margin-top:30px}
.row{display:flex;gap:18px;justify-content:center;margin-top:34px}
.row span{font-weight:900;font-size:40px;background:#fff;border:4px solid #EEE0C4;border-radius:999px;padding:14px 30px}
.fine{font-weight:800;font-size:30px;color:#75816F;margin-top:36px}
</style></head><body><div id="s"></div></body></html>`;

// overlays injected into the site page: tap ripple, highlight ring, Messages and call sheets (iOS-style mockups)
const MSG = "Hi Chuk — I'm interested in a rental in WPB / PBG / Jupiter.";
const overlayJs = (msg) => {
  document.documentElement.style.scrollBehavior = 'auto';
  const css = document.createElement('style');
  css.textContent = `
  #v-tap{position:fixed;width:56px;height:56px;margin:-28px 0 0 -28px;border-radius:50%;background:rgba(255,138,61,.35);border:3px solid #FF8A3D;z-index:99999;pointer-events:none;opacity:0}
  #v-ring{position:fixed;border:4px solid #FF8A3D;border-radius:14px;z-index:99998;pointer-events:none;opacity:0;box-shadow:0 0 0 6px rgba(255,138,61,.25)}
  .v-dim{position:fixed;inset:0;background:rgba(0,0,0,.35);z-index:99990;opacity:0}
  .v-sheet{position:fixed;left:0;right:0;bottom:0;z-index:99995;font-family:-apple-system,system-ui,sans-serif;transform:translateY(110%)}
  #v-sms{background:#fff;border-radius:16px 16px 0 0;height:560px;box-shadow:0 -8px 30px rgba(0,0,0,.2)}
  #v-sms .top{display:flex;justify-content:space-between;padding:14px 16px;font-size:16px;color:#0A84FF;border-bottom:1px solid #eee}
  #v-sms .top b{color:#000;font-weight:600}
  #v-sms .to{padding:12px 16px;font-size:16px;color:#888;border-bottom:1px solid #eee}
  #v-sms .to span{color:#0A84FF}
  #v-sms .compose{position:absolute;left:12px;right:12px;bottom:28px;display:flex;align-items:flex-end;gap:8px}
  #v-sms .field{flex:1;border:1px solid #ccc;border-radius:20px;padding:9px 14px;font-size:16px;line-height:1.3;color:#000}
  #v-sms .send{width:34px;height:34px;border-radius:50%;background:#0A84FF;color:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700}
  #v-call{padding:0 10px 30px}
  #v-call .box{background:rgba(250,250,250,.97);border-radius:14px;text-align:center;overflow:hidden}
  #v-call .num{padding:18px;font-size:15px;color:#888;border-bottom:1px solid #ddd}
  #v-call .go{padding:16px;font-size:20px;color:#0A84FF;font-weight:500}
  #v-call .cancel{margin-top:8px;background:#fff;border-radius:14px;padding:16px;text-align:center;font-size:20px;color:#0A84FF;font-weight:600}`;
  document.head.appendChild(css);
  document.body.insertAdjacentHTML('beforeend', `<div id="v-tap"></div><div id="v-ring"></div><div class="v-dim" id="v-dim"></div>
  <div class="v-sheet" id="v-sms"><div class="top"><span>Cancel</span><b>New Message</b><span></span></div>
   <div class="to">To: <span>Chuk (561) 220-9399</span></div>
   <div class="compose"><div class="field">${msg}</div><div class="send">↑</div></div></div>
  <div class="v-sheet" id="v-call"><div class="box"><div class="num">(561) 220-9399</div><div class="go">📞 Call (561) 220-9399</div></div><div class="cancel">Cancel</div></div>`);
};
// per-frame overlay state: {tap:{x,y,t}, ring:{x,y,w,h,o}, sms:0..1, call:0..1}
const applyJs = (s) => {
  const tap = document.getElementById('v-tap'), ring = document.getElementById('v-ring');
  if (s.tap) { tap.style.left = s.tap.x + 'px'; tap.style.top = s.tap.y + 'px'; tap.style.opacity = String(1 - s.tap.t); tap.style.transform = `scale(${0.6 + s.tap.t * 0.9})`; } else tap.style.opacity = '0';
  if (s.ring) { Object.assign(ring.style, { left: s.ring.x - 6 + 'px', top: s.ring.y - 6 + 'px', width: s.ring.w + 12 + 'px', height: s.ring.h + 12 + 'px', opacity: String(s.ring.o) }); } else ring.style.opacity = '0';
  const sheet = Math.max(s.sms || 0, s.call || 0);
  document.getElementById('v-dim').style.opacity = String(sheet);
  document.getElementById('v-sms').style.transform = `translateY(${(1 - (s.sms || 0)) * 110}%)`;
  document.getElementById('v-call').style.transform = `translateY(${(1 - (s.call || 0)) * 110}%)`;
  scrollTo(0, s.y);
};

(async () => {
  fs.rmSync(frames, { recursive: true, force: true }); fs.mkdirSync(frames, { recursive: true }); fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch();
  const site = await (await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: DPR, isMobile: true, hasTouch: true })).newPage();
  await site.goto(SITE, { waitUntil: 'networkidle' });
  await site.evaluate(overlayJs, MSG);
  const stage = await (await b.newContext({ viewport: { width: 1080, height: 1920 } })).newPage();
  await stage.setContent(stageHtml); await stage.evaluate(() => document.fonts.ready);

  // targets (page coordinates)
  const box = async (sel) => site.evaluate((sel) => { const e = document.querySelector(sel); const r = e.getBoundingClientRect(); return { x: r.left, y: r.top + scrollY, w: r.width, h: r.height, fixed: !!e.closest('.fixed') }; }, sel);
  const barText = await box('.fixed a[href^="sms:"]');
  const bar = await site.evaluate(() => { const r = document.querySelector('.fixed.bottom-0').getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
  const gmTop = await site.evaluate(() => document.getElementById('get-matched').getBoundingClientRect().top + scrollY);
  const callBtn = await box('#get-matched a[href^="tel:"]');
  const wa = await box('footer a[href*="wa.me"]').catch(() => null) || await box('a[href*="wa.me"]');
  const maxY = await site.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const callY = callBtn.y - 380; // scroll so the call button sits mid-screen

  const wave = 'data:image/png;base64,' + f64(path.join(dir, 'trim/wave.png'));
  const thumbs = 'data:image/png;base64,' + f64(path.join(dir, 'trim/thumbs.png'));
  const title = `<div class="card"><div class="k">Need a rental in Palm Beach?</div><div class="t">Reaching Chuk<br>takes <em>one tap.</em></div><img src="${wave}"><div class="sub">Here’s how it works on your phone 👇</div></div>`;
  const outro = `<div class="card"><img src="${thumbs}" style="height:700px;margin:0 0 30px"><div class="t" style="font-size:88px">Call. Text.<br><em>WhatsApp.</em></div>
    <div class="pill">(561) 220-9399</div><div class="row"><span>RentalsByChuk.com</span></div>
    <div class="sub" style="margin-top:28px">Rentals only · WPB · Palm Beach Gardens · Jupiter<br>$0 for renters</div><div class="fine">Chuk · LoKation Real Estate</div></div>`;
  const cap = (k, t) => `<div id="cap"><div class="k">${k}</div><div class="t">${t}</div></div>`;

  // timeline: [seconds, kind, caption|card, fn(t 0..1) -> site state]
  const T = [
    [3.0, 'card', title],
    [2.0, 'phone', cap('Step 1', 'Open <em>RentalsByChuk.com</em>'), () => ({ y: 0 })],
    [5.5, 'phone', cap('Anywhere on the page', 'Call or text is<br><em>always one tap away</em>'), t => ({ y: ease(clamp(t / 0.85)) * 2600, ring: { ...bar, o: 0.5 + 0.5 * Math.sin(t * Math.PI * 6) } })],
    [1.0, 'phone', cap('Tap “Text Chuk”', 'Your message is<br><em>already written</em>'), t => ({ y: 2600, tap: { x: barText.x + barText.w / 2, y: bar.y + bar.h / 2, t } })], // the bar is fixed to the viewport
    [3.5, 'phone', cap('Tap “Text Chuk”', 'Your message is<br><em>already written</em>'), t => ({ y: 2600, sms: ease(clamp(t / 0.15)) * (1 - ease(clamp((t - 0.88) / 0.12))) })],
    [2.2, 'phone', cap('Rather talk?', 'Call him<br><em>in one tap</em>'), t => ({ y: 2600 + ease(t) * (callY - 2600) })],
    [1.0, 'phone', cap('Rather talk?', 'Call him<br><em>in one tap</em>'), t => ({ y: callY, tap: { x: callBtn.x + callBtn.w / 2, y: callBtn.y - callY + callBtn.h / 2, t } })],
    [2.5, 'phone', cap('Rather talk?', 'Call him<br><em>in one tap</em>'), t => ({ y: callY, call: ease(clamp(t / 0.15)) * (1 - ease(clamp((t - 0.85) / 0.15))) })],
    [1.6, 'phone', cap('Prefer WhatsApp?', 'That works <em>too</em>'), t => ({ y: callY + ease(t) * (maxY - callY) })],
    [2.2, 'phone', cap('Prefer WhatsApp?', 'That works <em>too</em>'), t => ({ y: maxY, ring: { x: wa.x, y: wa.y - maxY, w: wa.w, h: wa.h, o: 0.5 + 0.5 * Math.sin(t * Math.PI * 4) } })],
    [4.0, 'card', outro],
  ];

  let n = 0, lastHtml = '';
  for (const [sec, kind, html, fn] of T) {
    const count = Math.round(sec * FPS);
    for (let i = 0; i < count; i++) {
      const t = i / Math.max(1, count - 1);
      let body = html;
      if (kind === 'phone') {
        await site.evaluate(applyJs, fn(t));
        const shot = (await site.screenshot({ type: 'jpeg', quality: 90 })).toString('base64');
        body = html + `<div id="phone"><img src="data:image/jpeg;base64,${shot}"></div>`;
      }
      if (kind === 'phone' || body !== lastHtml) {
        await stage.evaluate((h) => { document.getElementById('s').innerHTML = h; }, body);
        await stage.evaluate(() => Promise.all([...document.images].map(i => i.decode())));
        lastHtml = body;
      }
      await stage.locator('#s').screenshot({ path: path.join(frames, String(n++).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 92 });
    }
  }
  await b.close();
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(frames, '%05d.jpg'),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-preset', 'slow', '-movflags', '+faststart', path.join(outDir, 'contact-chuk.mp4')]);
  fs.rmSync(frames, { recursive: true, force: true });
  console.log('frames', n);
})();
