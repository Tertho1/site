# AGENTS.md — Rules for AI agents working on `./site` portfolio

> Goal: improve this portfolio into **S-tier** (A = 95+ Lighthouse + 0 HIGH security; S = A + memorable interaction + proof depth). Agents are builders, not cheerleaders.

---

## 1. Core principles

1. **Accuracy over speed.** Double-check every edit against real files before writing. Cite `file:line` when claiming a bug/fix. Never hallucinate APIs, line numbers, or asset paths.
2. **Realistic & practical, not yes-sir.** If a request is unsafe, vague, or would regress Lighthouse/a11y, say so plainly with an alternative. Don't write code to please — write code that passes validation.
3. **Syntax & logic check every edit.** Before marking a todo done: `npm run build` must pass, `npm run lint` (oxlint) 0 errors, no dead imports, no missing `rel`/`aria`/`key` props. If `framer-motion`/`lucide-react` import changed, verify `package.json` deps.
4. **No hallucination.** Don't invent URLs, font names, env vars, or GH Secrets. Only use: `VITE_WEB3FORMS_KEY`, `import.meta.env.BASE_URL`, `https://api.web3forms.com/submit`, `https://tertho1.github.io/site/` (until owner provides custom domain). Contact email is no longer embedded in client bundle by design (via Web3Forms).

## 2. Safety rails

- **Never push or commit without explicit owner command.** You may run `git status`, `git diff`, `npm run build`, `npm run preview`, `oxlint`, but you **must not** run `git commit`, `git push`, `gh pr create`, `git amend`, `npm publish`, or `gh pages deploy` unless owner says `commit`/`push`/`deploy` in chat.
- **Never expose secrets.** `VITE_WEB3FORMS_KEY` is injected at build via GH Secrets — never hardcode, never log, never echo into files. Verify `dist/assets/*.js` doesn't literally contain a key after build (should be env-inlined, not committed).
- **Never delete owner data without backup.** Before deleting `App.css`, `public/icons.svg`, `src/assets/*`, list them in `todo.md` and confirm in build that nothing imports them.
- **Preserve data truth.** Project/experience/skills copy is real. Don't inflate counts (500+, 3.88 CGPA, 12+ projects) or invent testimonials. If you need a testimonial placeholder, label it `TODO — owner must provide text`.

## 3. Working protocol

### Before editing
- Read `todo.md` and pick the next unchecked item in Phase order (Phase 1 before Phase 2 before Phase 3). Don't skip ahead if Phase 1 HIGH items remain.
- `Read` the target file(s) and one neighboring file (e.g., `index.html` + `src/index.css`, or `src/App.jsx` + `package.json`) to catch cross-file regressions.
- State the planned change in one sentence: *what file, what line, why*.

### While editing
- Prefer `Edit` over `Write` for existing files; `Write` only for new files (`robots.txt`, `sitemap.xml`, `404.html`, split components).
- Keep diffs small — one logical change per edit, not 15 unrelated fixes in one write.
- Preserve existing formatting/style; don't reformat unrelated lines.

### After each todo item (per-step evaluation, MANDATORY)
Run and report (in chat or comment) — do not skip:
```
[STEP EVAL] todo: 1A.1 honeypot
- build: npm run build → pass/fail + error excerpt
- lint:  npm run lint  → pass/fail
- logic check: file:line verified, no duplicate imports, aria/rel correct
- visual/logic hallucination check: no invented prop/url, no D:\Projects leak in dist
- decision: ✅ done / ⚠️ needs fix (with reason)
```
If fail, fix before moving to next todo. Update `todo.md` checkbox only after eval passes.

### After each phase (phase gate, MANDATORY)
Run full gate checklist from `todo.md` Phase exit gate and summarize:
```
[PHASE GATE] Phase 1 — Critical Fixes
- build + preview: pass/fail
- Lighthouse (manual or estimate): Perf/A11y/BP/SEO scores or "needs run"
- SEO: OG tags present in dist/index.html? canonical?
- Security: no _captcha:false in bundle? rel= on all blanks? honeypot hidden?
- A11y: skip-link, aria-expanded, aria-label, focus trap / inline expand
- Assets: no dead CSS, no duplicate photo.png, no unused svg
- decision: ✅ phase done / ⚠️ blocked (list blockers)
- next: Phase 2 item X
```
Do not start Phase 2 if Phase 1 gate is red. Escalate to owner rather than pushing a broken phase.

## 4. Validation checklist (every phase)

- [ ] `npm run build` passes (no TS/JSX syntax error, no missing import)
- [ ] `npm run lint` (oxlint) passes with no new warnings
- [ ] `npm run preview` renders at 320/768/1024/1440px with no horizontal scroll or overlap
- [ ] Keyboard: Tab through nav → hero → filter → project expand → form → footer; Enter/Space activates cards; Esc closes modal/collapses row; skip-link works
- [ ] A11y: axe/Lighthouse a11y, `aria-*` on toggles, `role="dialog"` if modal, `prefers-reduced-motion` respected
- [ ] SEO: `view-source` shows `og:image` absolute URL, `canonical`, `theme-color`, `robots.txt` reachable
- [ ] Security: `dist/assets/*.js` contains no `_captcha:false` literal, no hard-coded email key, no `D:\Projects` string
- [ ] Performance: no duplicate `@import`, no dead `App.css`, WebP <150KB when added, no unused 400KB duplicate photo
- [ ] No hallucination: all URLs/paths exist (`Test-Path`), all env vars documented, no invented component props

## 5. Communication

- Be **concise, direct, objective** (CLI tone). No emojis unless owner asks.
- Report real status: `pass/fail`, `blocked`, `needs owner input`. Don't mask failures.
- When you need owner input, ask explicitly — don't guess:
  - Canonical domain: `https://tertho1.github.io/site/` vs custom `terthoghosh.dev`?
  - Favicon: TG monogram design or keep Vite bolt recolored?
  - Design motif: log-row terminal (distinctive, audit identity) vs elevated cards (safe corporate)?
  - Testimonial text + permission to publish?
  - Photo WebP: okay to re-encode `public/photo.png` (396KB) to WebP <120KB?

## 6. Done definition (S-tier)

See `todo.md` Done definition. Don't claim S-tier until Phase 3E gate passes and owner approves screenshots. No deploy without explicit `deploy` command.

---

*Agents: you are accountable to these rules on every edit. Re-read this file at the start of each session.*
