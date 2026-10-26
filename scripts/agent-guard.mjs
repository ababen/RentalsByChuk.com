#!/usr/bin/env node
// Validate the site agent's output and apply it to this checkout. Runs in the trusted, write-capable job.
//
// Usage: node scripts/agent-guard.mjs INCOMING_DIR [--report FILE]
//
// INCOMING_DIR is the artifact uploaded by the read-only agent job. Only ALLOWED files are taken from it;
// everything else in the artifact is ignored. Exits 1 (and copies nothing) if any check fails.
// Checks: file allowlist, site.ts may only change `contentUpdated`, agent log is append-only, no new
// imports / scripts / env access / network calls / raw HTML, size limits. New URLs are fetched and any
// that don't load are listed as warnings in the report (the PR reviewer decides).
import fs from "node:fs";
import path from "node:path";

const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const args = process.argv.slice(2);
const incoming = args[0];
const reportFile = args.includes("--report") ? args[args.indexOf("--report") + 1] : null;
if (!incoming) { console.error("usage: agent-guard.mjs INCOMING_DIR [--report FILE]"); process.exit(2); }

const ALLOWED = [
  "src/data/hoa.ts",
  "src/data/compare.ts",
  "src/data/communities.ts",
  "src/data/faqs.ts",
  "src/app/reports/page.tsx",
  "src/lib/site.ts",
  "docs/agent-log.md",
];
const FORBIDDEN_ADDED = [
  [/^\s*import\s/, "new import"],
  [/\brequire\s*\(/, "require()"],
  [/\beval\s*\(|new Function\s*\(/, "dynamic code"],
  [/dangerouslySetInnerHTML/, "dangerouslySetInnerHTML"],
  [/<\s*script/i, "<script>"],
  [/process\.env/, "environment access"],
  [/\bfetch\s*\(/, "network call"],
  [/<\s*iframe/i, "<iframe>"],
];
const MAX_GROWTH = 40_000; // bytes per file per run

const problems = [], warnings = [], changed = [];
const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null);
const lines = (s) => s.split(/\r?\n/);

function addedLines(oldText, newText) {
  const pool = new Map();
  for (const l of lines(oldText)) pool.set(l, (pool.get(l) || 0) + 1);
  const out = [];
  for (const l of lines(newText)) {
    const n = pool.get(l) || 0;
    if (n > 0) pool.set(l, n - 1); else out.push(l);
  }
  return out;
}
const urlsIn = (s) => new Set((s.match(/https?:\/\/[^\s"'`)<>\]]+/g) || []).map((u) => u.replace(/[.,;]+$/, "")));

for (const rel of ALLOWED) {
  const next = read(path.join(incoming, rel));
  if (next === null) continue;
  const cur = read(path.join(REPO, rel)) ?? "";
  if (next === cur) continue;
  changed.push(rel);

  if (Buffer.byteLength(next) - Buffer.byteLength(cur) > MAX_GROWTH) problems.push(`${rel}: grew by more than ${MAX_GROWTH} bytes`);

  if (rel === "docs/agent-log.md") {
    if (!next.startsWith(cur.trimEnd())) problems.push(`${rel}: must be append-only`);
    continue;
  }
  if (rel === "src/lib/site.ts") {
    const a = lines(cur), b = lines(next);
    if (a.length !== b.length) { problems.push(`${rel}: only the contentUpdated date may change`); continue; }
    a.forEach((l, i) => {
      if (l !== b[i] && !/^\s*contentUpdated:\s*"\d{4}-\d{2}-\d{2}",\s*$/.test(b[i])) problems.push(`${rel}:${i + 1}: only contentUpdated may change`);
    });
    continue;
  }
  const added = addedLines(cur, next);
  for (const l of added) for (const [re, why] of FORBIDDEN_ADDED) if (re.test(l)) problems.push(`${rel}: ${why}: ${l.trim().slice(0, 120)}`);

  const before = urlsIn(cur);
  for (const u of urlsIn(added.join("\n"))) if (!before.has(u)) {
    if (!u.startsWith("https://")) problems.push(`${rel}: non-https URL ${u}`);
    else warnings.push({ rel, url: u });
  }
}

// Ignore anything else the agent touched, but say so.
const ignored = [];
(function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name), rel = path.relative(incoming, p);
    if (rel.startsWith(".agent-output")) continue;
    if (e.isDirectory()) walk(p); else if (!ALLOWED.includes(rel)) ignored.push(rel);
  }
})(incoming);

// Check new source URLs load (warnings only; some publishers block bots).
const urlResults = [];
for (const { rel, url } of warnings) {
  let status = "error";
  try {
    const r = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(15000), headers: { "User-Agent": "Mozilla/5.0 (RentalsByChuk source check)" } });
    status = String(r.status);
  } catch (e) { status = e.name === "TimeoutError" ? "timeout" : "error"; }
  urlResults.push({ rel, url, status, ok: /^[23]\d\d$/.test(status) });
}

const report = [
  `### Guard`,
  changed.length ? `Changed: ${changed.map((c) => "`" + c + "`").join(", ")}` : "No changes.",
  ignored.length ? `Ignored (not allowed): ${ignored.slice(0, 20).map((c) => "`" + c + "`").join(", ")}` : "",
  problems.length ? `**Blocked:**\n${problems.map((p) => "- " + p).join("\n")}` : "All checks passed.",
  urlResults.length ? `New source links:\n${urlResults.map((u) => `- ${u.ok ? "✅" : "⚠️ " + u.status} ${u.url} (${u.rel})`).join("\n")}` : "",
].filter(Boolean).join("\n\n");
if (reportFile) fs.writeFileSync(reportFile, report + "\n");
console.log(report);

if (problems.length) process.exit(1);
for (const rel of changed) {
  fs.mkdirSync(path.dirname(path.join(REPO, rel)), { recursive: true });
  fs.copyFileSync(path.join(incoming, rel), path.join(REPO, rel));
}
console.log(`applied ${changed.length} file(s)`);
