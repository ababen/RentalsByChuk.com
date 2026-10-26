#!/usr/bin/env node
// Validate the social agents' output and copy what passes into this checkout. Runs in the trusted job.
//
// Usage: node scripts/social-guard.mjs INCOMING_DIR DATE [--report FILE]
//
// Takes only INCOMING_DIR/social/queue/signals-DATE.json and INCOMING_DIR/social/drafts/DATE/*.json.
// - Signals file invalid            -> exit 1, nothing copied.
// - A draft fails a check           -> that draft is dropped and listed in the report; the rest go through.
// Every number in a draft must appear in a quote the draft cites, and every quote must appear verbatim in
// one of the site's sourced data files. Writes a PR-ready report (previews + rejections) to --report.
import fs from "node:fs";
import path from "node:path";

const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const [incoming, DATE] = process.argv.slice(2);
const argv = process.argv.slice(2);
const reportFile = argv.includes("--report") ? argv[argv.indexOf("--report") + 1] : null;
if (!incoming || !/^\d{4}-\d{2}-\d{2}$/.test(DATE || "")) { console.error("usage: social-guard.mjs INCOMING_DIR YYYY-MM-DD [--report FILE]"); process.exit(2); }

const FACT_FILES = ["src/data/hoa.ts", "src/data/compare.ts", "src/data/communities.ts", "src/data/faqs.ts", "src/app/reports/page.tsx", "src/lib/site.ts"];
const corpus = Object.fromEntries(FACT_FILES.map((f) => [f, fs.readFileSync(path.join(REPO, f), "utf8")]));
const DISCLOSURE = 'Alexander "Chuk" Babenchuk · LoKation Real Estate';
const SITE = "rentalsbychuk.com";
const slugs = [...corpus["src/data/communities.ts"].matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
const communityNames = [...corpus["src/data/communities.ts"].matchAll(/slug:\s*"[^"]+",\s*name:\s*"([^"]+)"/g)].map((m) => m[1]);
const PATHS = new Set(["/", "/communities", "/hoa-checker", "/landlords", "/reports", "/about", "/rentals", ...slugs.map((s) => `/communities/${s}`)]);
const sampleStreets = [...fs.readFileSync(path.join(REPO, "src/data/properties.ts"), "utf8").matchAll(/address:\s*"([^",]+)/g)].map((m) => m[1].toLowerCase());

const CHANNELS = {
  instagram: { formats: ["carousel"], max: 1000, tags: [5, 8], slides: [5, 7] },
  facebook: { formats: ["post"], max: 600, tags: [0, 3] },
  gbp: { formats: ["update"], max: 1000, tags: [0, 0] },
  reel: { formats: ["script"], max: 1000, tags: [0, 8] },
  linkedin: { formats: ["post"], max: 1300, min: 600, tags: [0, 3] },
};
const BANNED = [
  /guarantee/i, /\bno risk\b/i, /risk[- ]free/i, /act now/i, /won'?t last/i, /selling fast/i, /\bhurry\b/i,
  /perfect for/i, /ideal for/i, /great for (famil|kid|retir|young|single|couple)/i, /family[- ]friendly/i,
  /\bretirees?\b/i, /young professionals?/i, /\bsingles\b/i, /\badults? only\b/i, /\bno (kids|children)\b/i,
  /\bexclusive\b/i, /safe (neighborhood|area|community)/i, /section 8/i, /\bdream home\b/i, /hidden gem/i,
  /\bROI\b/, /appreciat/i, /approval in \d/i, /approved in \d/i,
];
const MONEY_LEGAL = /\$|\bfee|deposit|statute|§|\b718\b|\b720\b|\b83\b|approv|application|minimum|maximum|\bcap(s|ped)?\b|screening|board/i;

const problems = [], accepted = [], rejected = [];
const readJSON = (p) => { try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch (e) { return { __error: e.message }; } };
const quoteOk = (f) => f && FACT_FILES.includes(f.file) && typeof f.quote === "string" && f.quote.length >= 3 && corpus[f.file].includes(f.quote);

// ---- signals ----
const sigPath = path.join(incoming, "social/queue", `signals-${DATE}.json`);
const sig = readJSON(sigPath);
const signals = new Map();
if (sig.__error) problems.push(`signals-${DATE}.json: ${sig.__error}`);
else {
  if (!Array.isArray(sig.signals)) problems.push("signals: missing array");
  for (const s of sig.signals || []) {
    const where = `signal ${s.id}`;
    if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/.test(s.id || "")) problems.push(`${where}: bad id`);
    if (s.community != null && !slugs.includes(s.community)) problems.push(`${where}: unknown community ${s.community}`);
    if (!["renter", "landlord", "both"].includes(s.audience)) problems.push(`${where}: bad audience`);
    if (!Array.isArray(s.facts)) problems.push(`${where}: facts must be an array`);
    for (const f of s.facts || []) if (!quoteOk(f)) problems.push(`${where}: quote not found verbatim in ${f.file}: ${String(f.quote).slice(0, 80)}`);
    signals.set(s.id, s);
  }
  if ((sig.signals || []).length > 5) problems.push("signals: more than 5");
}

// ---- drafts ----
function numbersIn(text) {
  const clean = text
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/#[\w]+/g, " ")
    .replace(/\(561\)\s?220-9399/g, " ")
    .split(DISCLOSURE).join(" ");
  const out = [];
  for (const m of clean.matchAll(/\$\s?\d[\d,]*(?:\.\d+)?\s?(?:k|K|M)?\+?|\d[\d,]*(?:\.\d+)?\s?%|\d[\d,]*(?:\.\d+)?/g)) {
    const t = m[0].replace(/\s/g, "").replace(/[,.]+$/, "");
    const bare = /^\d+$/.test(t) ? Number(t) : null;
    if (bare !== null && (bare <= 12 || (bare >= 2020 && bare <= 2030))) continue; // small counts and years
    out.push(t);
  }
  return out;
}
function draftProblems(d, file) {
  const p = [];
  const ch = CHANNELS[d.channel];
  if (!ch) return [`unknown channel ${d.channel}`];
  if (!ch.formats.includes(d.format)) p.push(`format ${d.format} not allowed for ${d.channel}`);
  const s = signals.get(d.signal_id);
  if (!s) p.push(`signal_id ${d.signal_id} not in today's signals`);
  if (d.id !== path.basename(file, ".json")) p.push("id must match file name");
  const text = String(d.text || "");
  if (!text.trimEnd().endsWith(DISCLOSURE)) p.push("text must end with the disclosure line");
  if (text.length > ch.max) p.push(`text ${text.length} chars > ${ch.max}`);
  if (ch.min && text.length < ch.min) p.push(`text ${text.length} chars < ${ch.min}`);
  const tags = Array.isArray(d.hashtags) ? d.hashtags : [];
  if (tags.length < ch.tags[0] || tags.length > ch.tags[1]) p.push(`${tags.length} hashtags (allowed ${ch.tags.join("–")})`);
  if (ch.slides) {
    const n = (d.slides || []).length;
    if (n < ch.slides[0] || n > ch.slides[1]) p.push(`${n} slides (allowed ${ch.slides.join("–")})`);
    for (const [i, sl] of (d.slides || []).entries()) {
      const w = `${sl.headline || ""} ${sl.body || ""}`.trim().split(/\s+/).length;
      if (w > 25) p.push(`slide ${i + 1}: ${w} words > 25`);
    }
  }
  if (d.channel === "reel") {
    const sh = d.shots || [];
    if (sh.length < 4 || sh.length > 6) p.push(`${sh.length} shots (allowed 4–6)`);
    if (!String(sh.at(-1)?.on_screen || "").includes(DISCLOSURE)) p.push("last reel shot must show the disclosure");
  }
  // link
  try {
    const u = new URL(d.link);
    if (u.hostname !== SITE) p.push(`link host ${u.hostname}`);
    if (!PATHS.has(u.pathname.replace(/\/$/, "") || "/")) p.push(`link path ${u.pathname} is not a page on the site`);
    if (u.searchParams.get("utm_source") !== d.channel || u.searchParams.get("utm_medium") !== "social" || u.searchParams.get("utm_campaign") !== d.signal_id) p.push("link UTMs must be utm_source=<channel>&utm_medium=social&utm_campaign=<signal_id>");
  } catch { p.push("link is not a valid URL"); }
  // all wording
  const all = [d.hook, text, ...(d.slides || []).flatMap((x) => [x.headline, x.body]), ...(d.shots || []).flatMap((x) => [x.on_screen, x.voiceover])].filter(Boolean).join("\n");
  for (const re of BANNED) { const m = all.match(re); if (m) p.push(`banned phrase "${m[0]}"`); }
  for (const st of sampleStreets) if (st && all.toLowerCase().includes(st)) p.push(`mentions a sample-home address (${st})`);
  if ((all.match(/\p{Extended_Pictographic}/gu) || []).length > 1) p.push("more than one emoji");
  if (/\p{Extended_Pictographic}/u.test(String(d.hook || ""))) p.push("emoji in hook");
  // facts
  const facts = Array.isArray(d.facts_used) ? d.facts_used : [];
  for (const f of facts) if (!quoteOk(f)) p.push(`facts_used quote not found verbatim in ${f.file}: ${String(f.quote).slice(0, 80)}`);
  const quotes = facts.map((f) => String(f.quote).replace(/\s/g, ""));
  for (const n of numbersIn(all)) if (!quotes.some((q) => q.includes(n))) p.push(`number "${n}" isn't in any cited quote`);
  // tier
  const reasons = [];
  if (s && Array.isArray(s.risk) && s.risk.length) reasons.push(`signal risk: ${s.risk.join(", ")}`);
  if (MONEY_LEGAL.test(all)) reasons.push("mentions money, fees, approvals or lease rules");
  if (communityNames.filter((n) => all.includes(n)).length >= 2) reasons.push("compares communities");
  d.tier = reasons.length ? 2 : 1;
  d.tier_reasons = reasons;
  return p;
}

const draftDir = path.join(incoming, "social/drafts", DATE);
const files = fs.existsSync(draftDir) ? fs.readdirSync(draftDir).filter((f) => f.endsWith(".json")) : [];
for (const f of files) {
  const d = readJSON(path.join(draftDir, f));
  const p = d.__error ? [`invalid JSON: ${d.__error}`] : draftProblems(d, f);
  (p.length ? rejected : accepted).push({ f, d, p });
}
if (!problems.length && !accepted.length && files.length) problems.push("every draft failed the guard");

// ---- report ----
const preview = ({ d }) => {
  const body = [
    `#### ${d.channel} · ${d.signal_id} · tier ${d.tier}${d.tier_reasons.length ? ` (${d.tier_reasons.join("; ")})` : ""}`,
    `**Hook:** ${d.hook}`,
    d.slides?.length ? d.slides.map((s, i) => `${i + 1}. **${s.headline}** ${s.body || ""} _[${s.visual?.type || "?"}${s.visual?.note ? ": " + s.visual.note : ""}]_`).join("\n") : "",
    d.shots?.length ? d.shots.map((s, i) => `${i + 1}. _${s.shot}_ · on screen: "${s.on_screen}" · VO: "${s.voiceover}"`).join("\n") : "",
    "```text\n" + String(d.text) + (d.hashtags?.length ? "\n\n" + d.hashtags.join(" ") : "") + "\n```",
    `Link: ${d.link}${d.dm_keyword ? ` · DM keyword: **${d.dm_keyword}**` : ""} · Suggested: ${d.suggested_time || "—"}`,
    d.notes_for_chuk ? `> ${d.notes_for_chuk}` : "",
  ];
  return body.filter(Boolean).join("\n\n");
};
const report = [
  `## Social drafts ${DATE}`,
  `${accepted.length} draft(s) passed the guard, ${rejected.length} dropped. Merge to approve the ones you keep; delete any file you don't want first.`,
  problems.length ? `**Blocked:**\n${problems.map((p) => "- " + p).join("\n")}` : "",
  ...[...signals.values()].map((s) => [
    `### ${s.headline}`,
    `_${s.type} · ${s.audience} · score ${s.score} · ${s.why_now || ""}_`,
    ...accepted.filter((a) => a.d.signal_id === s.id).map(preview),
  ].join("\n\n")),
  rejected.length ? `### Dropped by the guard\n${rejected.map((r) => `- \`${r.f}\`: ${r.p.join("; ")}`).join("\n")}` : "",
].filter(Boolean).join("\n\n");
if (reportFile) fs.writeFileSync(reportFile, report + "\n");
console.log(report.slice(0, 4000));

if (problems.length) process.exit(1);
fs.mkdirSync(path.join(REPO, "social/queue"), { recursive: true });
fs.copyFileSync(sigPath, path.join(REPO, "social/queue", `signals-${DATE}.json`));
const outDir = path.join(REPO, "social/drafts", DATE);
fs.mkdirSync(outDir, { recursive: true });
for (const a of accepted) fs.writeFileSync(path.join(outDir, a.f), JSON.stringify(a.d, null, 2) + "\n");
const tiers = accepted.map((a) => a.d.tier);
fs.writeFileSync(path.join(REPO, ".social-tier.json"), JSON.stringify({ accepted: accepted.length, maxTier: tiers.length ? Math.max(...tiers) : 0 }));
console.log(`applied ${accepted.length} draft(s)`);
