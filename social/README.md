# RentalsByChuk agents

Three agents, all on GitHub Actions. Claude works in a **read-only** job; a separate job checks its files
with a guard script and opens a PR. **Nothing goes live or gets posted until Alexander merges.**

| agent | when | does | playbook |
|---|---|---|---|
| Site agent | Thu ~7:40 am ET | adds sourced HOA rules, promotes one thin community page, monthly market refresh, one FAQ | `.github/agent/site-agent.md` |
| Signal agent | Mon/Wed/Fri ~7:20 am ET | picks ≤ 5 things worth posting from data changes + the season calendar; files "verify this" issues for web news | `.github/agent/signal-agent.md` |
| Content agent | right after signal | drafts IG carousel, FB, Google Business Profile, Reel script, LinkedIn (landlord topics) | `.github/agent/content-agent.md` |

```
web ─► signal agent ─► "Verify:" issue ─► site agent (Thu) ─► src/data/*.ts (sourced) ─► website pages
                │                                                    │
                └──────── reads data changes + calendar ◄────────────┘
                ▼
        content agent (no web: facts only from src/data/*.ts) ─► social-guard.mjs ─► PR "Social drafts <date>"
```

## Guards
- `scripts/agent-guard.mjs` (site agent): only 7 data files can change; `site.ts` only its `contentUpdated` date;
  no new imports, scripts, env access or network calls; agent log append-only; new source links are test-loaded
  and listed in the PR. Then lint + build must pass.
- `scripts/social-guard.mjs` (social): every number in a draft must appear in a quote it cites, and every quote
  must appear verbatim in a sourced data file. Also: disclosure line, Fair Housing / promise / urgency phrases,
  sample-home addresses, link must be a real page with UTMs, per-channel limits. Bad drafts are dropped and listed;
  tier 2 (money, fees, HOA rules, comparisons) is flagged in the PR.

## Setup (once)
1. **Secret:** repo Settings → Secrets and variables → Actions → New repository secret `ANTHROPIC_API_KEY`.
   The Anthropic org behind it needs credits.
2. **Actions permissions:** Settings → Actions → General → Workflow permissions → allow GitHub Actions to
   **create pull requests**.
3. **First runs by hand:** Actions → *Site agent* → Run workflow; then Actions → *Social drafts* → Run workflow.
   Read every draft. Fix `social/voice.md` and the playbooks, not the drafts.
4. After a couple of clean weeks, leave the schedules on.

## Approving posts
Open the *Social drafts* PR. Each draft shows the hook, slides / shots, caption and link. Delete the files for
drafts you don't want, merge the rest, then post them (copy-paste for now, Postiz or GHL Social Planner later)
and add a line to `social/posted-log.md` so the agents don't repeat themselves.
