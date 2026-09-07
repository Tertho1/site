# Tertho Ghosh — Portfolio

Minimal, audit-inspired portfolio for a CSE graduate focused on AI/ML, security, and web systems. Built for readability, performance, and hiring-manager scan.

**Live:** https://tertho1.github.io/site/

## Stack

- React 19 + Vite 8 + Tailwind CSS 3
- Framer Motion, lucide-react, @fontsource (Inter, JetBrains Mono)
- Deployed as static site on GitHub Pages

## Local Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # preview production build
```

Requires Node `>=20` (CI uses `22`).

## Environment

- `VITE_WEB3FORMS_KEY` — Web3Forms access key for the contact form (injected at build via GitHub Actions secret). No key is committed to the repository. The form uses a honeypot field and a 30s cooldown; no email address is embedded in the client bundle.

## Deployment

This repository deploys via GitHub Actions (`.github/workflows/deploy.yml`).

1. Push to `main` — workflow installs, fetches GitHub stars (`scripts/fetch-github-stats.mjs`), builds, and publishes `dist/` to GitHub Pages.
2. In GitHub: **Settings → Pages → Source: GitHub Actions** (already configured).
3. Custom domain (optional): add `public/CNAME` with your domain and update `vite.config.js` `base` to `'/'`.

No local filesystem paths are required or documented.

## Project Structure

```
src/
  components/  — Nav, Hero, About, Skills, Projects, Experience, Contact, Footer, CommandPalette
  data/        — site content (projects, skills, experience, education)
  hooks/       — useTyping
  pages/       — PlagioScaleCase (hash-routed case study at #/projects/plagioscale)
public/
  photo.webp / photo.png, Tertho_Ghosh_CV_web.pdf (public, phone-free), robots.txt, sitemap.xml
```

## Content & Assets

- Update content in `src/data/site.js` and `src/data/projects.js`.
- Replace `public/photo.webp` / `public/photo.png` and `public/Tertho_Ghosh_CV_web.pdf` to refresh media.
- Testimonials are currently hidden (`src/App.jsx` — uncomment to enable) — add only with permission.

## License

Content and media are owned by Tertho Ghosh. Code may be reused with attribution.
