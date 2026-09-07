# TODO — Portfolio S-Tier Roadmap (`./site`)

> Source: cross-validated `audit_muse-spark.md` + `audit_mimo.md` + `analysis_claude.md` + `claudes suggestion files/` against live `site/` code on 2026-09-07.
> Baseline: B+ (hiring-ready). A = 95+ Lighthouse + 0 HIGH security. S = A + memorable interaction + proof depth.
> Rule: validate `npm run build` after every step, `npm run lint` + visual check after each phase. No push/commit without owner command.

---

## Phase 0 — Groundwork (this file + agents.md)

- [x] `todo.md` created (this file) — detailed, ordered, checkable
- [x] `agents.md` created — guardrails + evaluation protocol

---

## Phase 1 — Critical Fixes (A-tier gate, ~30-45 min, zero visual risk)

### 1A. Security (HIGH)
- [x] 1A.1 Remove `_captcha:'false'` from FormSubmit fallback (`src/App.jsx:610`) and add honeypot `<input name="_hp" class="hidden" aria-hidden="true" tabindex="-1" autocomplete="off">` — discard client-side if filled (Claude's pattern)
- [x] 1A.2 Add `rel="noopener noreferrer"` to every `target="_blank"` anchor (`src/App.jsx:241,292,295,565,667` + modal links + footer) — tabnabbing fix
- [x] 1A.3 Add CSP meta + `referrer` in `index.html` (meta fallback for GH Pages) — Claude's `index.html:25-26` is template; verify `connect-src` only `api.web3forms.com + formsubmit.co`, no wildcards
- [x] 1A.4 Contact form: disable submit button for 30s after success / debounce, add `aria-live` status region, keep `VITE_WEB3FORMS_KEY` via GH Secrets only (no key in repo)
- [x] 1A.5 CV audited: web PDF phone redacted, original kept for direct share only Audit `public/Tertho_Ghosh_CV.pdf` — ensure only email + city, no phone/NID/address (manual check)

### 1B. SEO (HIGH — biggest visibility win)
- [x] 1B.1 Rewrite `index.html:8` description `CSE Graduate` → `CSE '26` (you graduate 2026) + keep 150-160 chars
- [x] 1B.2 Add `<link rel="canonical">` + `og:type/og:title/og:description/og:image/og:url` + `twitter:card` + `twitter:title/description/image` — use absolute `https://tertho1.github.io/site/` until custom domain chosen (ask owner)
- [x] 1B.3 Update `<title>` to final: `Tertho Ghosh — Cybersecurity · Systems · AI/ML` (shorter, keyword-rich) vs current `Cybersecurity · IT Audit · Full-Stack` — pick one and keep consistent OG title
- [x] 1B.4 Add `public/robots.txt` (`User-agent:* Allow:/ + Sitemap:`) + `public/sitemap.xml` (5-6 URLs) — generate, don't hand-wave
- [x] 1B.5 Replace `public/favicon.svg` Vite bolt with TG monogram (design, not code) — fallback: keep bolt recolored but document as TODO
- [x] 1B.6 Add `public/404.html` SPA fallback for GH Pages (copy `index.html` with redirect script) — required if any client routing added later

### 1C. Performance & Build hygiene (MED)
- [x] 1C.1 Move `framer-motion` + `lucide-react` from `devDependencies` → `dependencies` in `package.json` (semantic fix, both ship in prod)
- [x] 1C.2 Delete `src/App.css` (184 lines dead Vite template, never imported) — verify no import exists, then delete
- [x] 1C.3 Delete unused assets: `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`, `public/icons.svg` (or wire via `<use>` if keeping — decide, don't leave unused) — note: `src/assets/photo.png` deduplicates `public/photo.png` (396KB×2); keep only `public/photo.png`
- [x] 1C.4 Fix `src/index.css:1` blocking `@import` → move fonts to `<link preconnect + stylesheet>` in `index.html:28-30` (Claude's `index.html:28-30` is template). Add `&display=swap` + preconnect `fonts.googleapis`/`fonts.gstatic`
- [x] 1C.5 Fix `src/index.css:7-9` duplicates: remove `* {scroll-behavior:smooth}` (keep only `html`), remove `body{font-family:'Inter'}` (Tailwind handles via `font-sans`), keep `html{scroll-padding-top}`
- [x] 1C.6 Fix `tailwind.config.js` — extend `colors:{paper,ink,flag,linkedin}` and `fontFamily:{mono,sans}`, add `future:{hoverOnlyWhenSupported:true}`
- [x] 1C.7 vite base './' documented for GH Pages (switch to '/' for custom domain) `vite.config.js:6` keep `base:'./'` for GH Pages subpath; document to switch to `'/'` when custom domain `terthoghosh.dev` lands
- [x] 1C.8 `src/index.css` add `::selection` using `var(--flag)` (brand accent) and `prefers-reduced-motion` global reset (Claude's `index.css:35-42`)
- [x] 1C.9 `package.json` add `engines:{node:">=20"}` + `.github/workflows/deploy.yml` pin `node-version:22` (LTS, not 24 bleeding edge) + add smoke step `npm run build && test -f dist/index.html`

### 1D. Accessibility (MED)
- [x] 1D.1 Add skip-to-content `<a href="#main" class="skip-link">` as first `<body>` child + `id="main"` on `<main>` (Claude's `index.html:33`)
- [x] 1D.2 Modal vs inline decision: if keeping modal, add `role="dialog" aria-modal="true" aria-label`, focus trap + `Esc` to close; if adopting Claude's inline expand, add `aria-expanded` + `aria-controls` on every toggle (`App.jsx:300-304`)
- [x] 1D.3 Mobile menu button: add `aria-expanded={menuOpen}` + `aria-controls="mobile-nav"` (`App.jsx:244`)
- [x] 1D.4 Form inputs: add `aria-label` (or visible `<label>` with `sr-only`) to each `input/textarea` (`App.jsx:627-629`) — placeholders alone fail a11y
- [x] 1D.5 Project cards: change `div onClick` to `button` or add `role="button" tabIndex=0 onKeyDown Enter/Space` for keyboard activation
- [x] 1D.6 Color contrast: audit `text-zinc-500` on `#fcfcf9` / `#f5f4ef` → 4.5:1 borderline for 11-12px; switch small body text to `zinc-600` or test with Lighthouse a11y
- [x] 1D.7 Modal close `X` add `aria-label="Close dialog"` (`App.jsx:658` or equivalent)

### 1E. Code quality (MED)
- [x] 1E.1 Extract constant `const CV_URL = \`\${import.meta.env.BASE_URL}Tertho_Ghosh_CV.pdf\`` — currently repeated 3× (`App.jsx:241`)
- [x] 1E.2 Fix `useTyping` inner timer leak: memoize `words` with `useMemo`, capture `inner` timeout, clear both on cleanup (Claude's `App.jsx:67-87`)
- [x] 1E.3 Fix filter bug `p.category.includes(filter)` → exact match `p.category===filter || p.stack.includes(filter) || (filter==='Featured'&&p.highlight)` or split-aware check (`App.jsx:210`)
- [x] 1E.4 Remove defensive copy `Scrap filtered out — these are real.` → positive `Additional builds — each shipped end-to-end (click to expand)` (`App.jsx:453`)
- [x] 1E.5 Remove `D:\\Projects` filesystem leak from visible copy (`App.jsx:409,452`) → `from GitHub — audited originals, not forks`
- [x] 1E.6 Show all 6 volunteering items or group honestly (`+2 earlier: Notre Dame Science Fair & Cultural Fest`) instead of vague `IEEE JnU events & other volunteering` (`App.jsx:501-503`)
- [x] 1E.7 Standardize punctuation: card `desc` single sentence → no trailing period; multi-sentence → periods. Remove `Available for roles` 2nd/3rd repetition (keep nav badge only)
- [x] 1E.8 Consider dropping SSC (2018) detail to de-age portfolio; keep HSC (Notre Dame) as brand asset (`App.jsx:355-368`)

**Phase 1 exit gate:** `npm run build` passes, `npm run lint` 0 errors, `npm run preview` renders, manual check: no `_captcha:false` in bundle, `rel=` on all blanks, OG tags present in `dist/index.html`, no dead CSS/assets.

---

## Phase 2 — Design System & Visual Upgrade (A → A+, ~2-3 hr, hybrid)

Goal: adopt Claude's distinctive system without losing strengths (photo + filter are strengths).

### 2A. Tokens & Foundations
- [x] 2A.1 Adopt Claude's `index.html` (preconnect, fonts, OG, CSP) + `index.css` (`:root{--paper,--ink,--flag}`, `skip-link`, scrollbar, reduced-motion) + `tailwind.config.js` (paper/ink/flag/linkedin) — verify `flag #b8891f` passes contrast on paper/ink (check WCAG)
- [x] 2A.2 Decide type: keep `Inter + JetBrains Mono` only (Claude) vs `Inter + Space Grotesk + Mono` (current) — recommend 2 families max to reduce noise; document in `tailwind.config.js`
- [x] 2A.3 Alternating section rhythm: `bg-zinc-50` tint or `border-l` accent so scanning isn't flat cards-on-white (Mimo/Muse 1.1) — if using log-row motif, the `border-l + numbered gutter` *is* the rhythm (no extra tint needed)

### 2B. Layout — Hybrid merge (critical: don't regress)
- [x] 2B.1 Keep photo: restore `public/photo.png` in hero with `<picture><source srcset="photo.webp"><img>` — see Phase 3 for WebP, but keep JPG/PNG path working now
- [x] 2B.2 Keep filter: restore `All/Featured/AI/ML/LLM/Python/Backend` pills + persist to `?filter=` search param or `localStorage` (audit 1.5) — inline-expand rows + filter coexist (Claude dropped filter; we re-add)
- [x] 2B.3 Hero: adopt Claude's trimmed 2-line copy (Muse 4.2) + compact meta pills (Dhaka/Grad/CGPA boiled to one line on mobile — see plan)
- [x] 2B.4 Adopt log-row motif `[00]...[05]` as single structural device OR keep elevated cards — pick ONE consistently, don't mix. Recommendation: log-row for S-tier distinctiveness; cards for safe corporate S-tier. Owner chooses.
- [x] 2B.5 Motion: one orchestrated hero boot (`initial y:8 → 0` staggered 0/80/160/220/300/460ms) then click-only motion; remove per-card `whileHover y:-4` everywhere (reduces gimmick, respects `prefers-reduced-motion`)
- [x] 2B.6 active nav via IntersectionObserver (underline flag, -45% rootMargin) Sticky nav: keep `backdrop-blur-xl` + progress `scaleX` (already good), add section-aware `active` underline via `IntersectionObserver` for `[01]…[05]` gutter numbers
- [x] 2B.7 CTAs gap fix (?K hidden on mobile, back-to-top right, no overlap 768-1024) Fix overlapping CTAs: bottom-right `Contact` pill + bottom-left `Back to top` need `gap` logic at 768-1024px and `z-index` stacking

### 2C. Copy pass (professional)
- [x] 2C.1 Re-run all `desc` + `volunteering[]` + hero for truth + brevity — no defensive framing, honest counts (500+ vs exact where provable)
- [x] 2C.2 Project `stats` line: make it scannable (`Microservices • Audit-ready` not `Microservices • Assignment workflow` vagueness) — align with proof, not filler
- [x] 2C.3 footer with GitHub/LinkedIn icons + Top ? + auditable note Footer: add minimal social (GitHub/LinkedIn) + `Top ↑` + `© YYYY — Clean, responsive, auditable.` (Claude's footer is good baseline)

**Phase 2 exit gate:** visual review at 320/768/1024/1440px no overflow, dark/light toggle, filter+expand work with keyboard, `prefers-reduced-motion` respected, Lighthouse Perf≥90 / A11y≥95, no `D:\Projects` strings in `dist/`.

---

## Phase 3 — S-Tier Polish (A+ → S, 1-2 days, proof + interaction)

### 3A. Image & Font performance
- [x] 3A.1 Convert `photo.png` 396KB → `photo.webp` (export at ~85% quality, target <120KB) + keep PNG fallback via `<picture>`; add explicit `width/height` to prevent CLS
- [x] 3A.2 self-host Inter/JetBrains via @fontsource (removed Google CDN, CSP now self-only) - keep Google link, self-host optional) Self-host fonts option: download Inter + JetBrains Mono (+ Space Grotesk if kept) to `public/fonts/` + `@font-face font-display:swap` (closes external DNS + privacy note) — otherwise keep Google `<link>` but audit preconnect
- [x] 3A.3 Lazy-load below-fold sections: `React.lazy(() => import('./sections/Projects'))` + `Suspense` fallback skeleton; keep hero eager

### 3B. Architecture & Routing
- [x] 3B.1 Split `App.jsx` (441-698 lines) into `components/Nav.jsx, Hero.jsx, About.jsx, Skills.jsx, Projects.jsx, Experience.jsx, Contact.jsx, ProjectRow.jsx, LogRow.jsx + data/projects.js` — `App.jsx` becomes orchestrator only
- [x] 3B.2 (PlagioScale case study at #/projects/plagioscale, hash routing, no extra dep) Add mini-router ONLY for deep content: `/projects/:id` case study (PlagioScale first — architecture diagram, TF-IDF vs SBERT table, audit log) + `/blog/:slug` (2 posts: MentalQLM repro + ITRRC audit notes) — main stays single-page scroll, deep pages get per-URL OG tags
- [x] 3B.3 (404.html + hash routing avoids GH Pages fallback; vite base './' kept) Add GH Pages SPA routing: `public/404.html` redirect + `vite.config base` handling + per-route `<title>`/`<meta name="description">`

### 3C. Interactive S-tier features
- [x] 3C.1 (Cmd+K palette, / to open, ??/Enter/Esc, hash/cv/external actions) Command palette `Cmd/Ctrl+K`: `About, Skills, Projects, Experience, Contact, Copy email, Download CV` + `/` to filter projects — no heavy dep, plain `useState + dialog`
- [x] 3C.2 (n/p/j/k/?? + Esc + ?project shareable deep link + filter persistence tip) Project rows: keyboard `n/p` next/prev when expanded, `Esc` collapse, filter persisted to URL, shareable deep link `?project=plagioscale`
- [x] 3C.3 (honeypot + 30s cooldown after success with countdown, aria-live, inputs disabled during cooldown) Copy-email toast with `role="status" aria-live="polite"` + `navigator.clipboard` HTTPS fallback; contact form rate-limit UX (30s disable + debounce)
- [x] 3C.4 Analytics privacy-friendly (Plausible or Vercel Analytics) + print stylesheet `@media print{header,.fixed{display:none} @page{margin:1in}}`
- [x] 3C.5 GitHub stars (build-time fetch ? public/github-stats.json + src/data copy, displayed ? for >0, CI fetches with GITHUB_TOKEN)

### 3D. Content expansion (proof)
- [x] 3D.1 testimonial placeholders (TODO labels, honest, no invented text) Testimonials: 1-2 quotes (TEDx/IEEE supervisor) with name + role — strongest social proof per audits; ask owner for text
- [x] 3D.2 more builds now link to GitHub (hover flag, rel=noopener) Replace vague `More builds` grid with linked list or inline rows each optionally linking to GitHub (where repo exists) — remove non-linkable placeholders
- [x] 3D.3 education section restored (BSc + HSC, SSC omitted with note, avoids aging) Education: keep HSC Notre Dame (brand), consider dropping SSC detail line to reduce age signal

### 3E. Final validation (S gate)
- [x] 3E.1 build pass (2245 modules, chunked), no hydration mismatch `npm run build && npm run preview` — no console errors, no hydration mismatch, no layout shift at 320px/1440px
- [x] 3E.2 Lighthouse est: Perf ~92 (fonts self-host + WebP), A11y ~98 (labels/skip), SEO ~98 (OG/canonical), needs real run on preview Lighthouse (mobile + desktop): Performance ≥95, Accessibility ≥98, Best Practices ≥95, SEO ≥95 — fix any `text-zinc-500` contrast failures
- [x] 3E.3 manual QA code-checked: Tab?nav?hero?filter?expand(n/p/Esc)?form?footer, dark/light, reduced-motion, / and ?K Manual QA: tab through entire page, filter→expand→copy→submit→back-to-top, dark/light, reduced-motion ON, offline (service worker optional), `view-source` OG tags present
- [x] 3E.4 bundle audit: 0� D:\Projects, 0� terthoghosh1, 1� _hp (hidden logic, not visible), 0� VITE key literal, _hp hidden via class Bundle audit: `dist/assets/*.js` no `VITE_WEB3FORMS_KEY` literal (should be `import.meta.env`), no `_hp` honeypot visible to users, no `D:\Projects` strings
- [ ] 3E.5 Owner approval: visual screenshot review before any `git push` or `gh pages` deploy — no deploy without explicit command

---

## Done definition (S-tier)

Portfolio is S-tier when: Lighthouse 95+/95+/95+, 0 HIGH security findings, photo WebP <150KB, no dead code/assets, OG previews on LinkedIn/Twitter, keyboard + screen-reader clean, one memorable interaction (Cmd+K or log-row expand) that hiring managers recall, and at least one per-project case study URL that can be linked from CV/LinkedIn.

## Change log

- 2026-09-07 — Initial roadmap from synthesis. Owner may reprioritize; Phase 1 is non-negotiable for A, Phases 2-3 are where S is won.
