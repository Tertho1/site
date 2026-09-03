# Tertho Ghosh — Portfolio

Clean, minimal, modern portfolio built with React + Vite + Tailwind + Framer Motion.

Location: `D:\Projects\Portfolio\site`

## Run locally
```powershell
cd D:\Projects\Portfolio\site
npm install
npm run dev    # http://localhost:5173
npm run build  # production -> dist/
npm run preview
```

## Features
- Sticky blurred nav + scroll progress + dark/light toggle
- Typing animation, stats, terminal-style hero
- Bento project cards with filter + modal
- Experience timeline, skills hover, audit interests
- Contact form (mailto, works on static hosts) + copy email
- Fully responsive, polished, interactive

## Free Hosting (pick one)

### 1) Vercel (recommended - fastest)
1. Push to GitHub: `git init` inside `site`, create repo `tertho-portfolio` on github.com/Tertho1
2. `git add .; git commit -m "feat: portfolio v1"; git branch -M main; git remote add origin https://github.com/Tertho1/tertho-portfolio.git; git push -u origin main`
3. Go to vercel.com -> Add New Project -> Import repo -> Deploy (auto detects Vite)
4. Done: `https://tertho-portfolio.vercel.app` (free, auto HTTPS)

### 2) GitHub Pages (100% free, no Vercel needed)
1. Same git push as above
2. In GitHub repo Settings -> Pages -> Source: GitHub Actions
3. This repo already includes `.github/workflows/deploy.yml` -> push triggers deploy
4. Your site: `https://tertho1.github.io/tertho-portfolio/`
- If using custom domain: add `public/CNAME` with your domain

### 3) Netlify Drop
Drag `dist/` folder to app.netlify.com/drop

## To personalize
Edit `src/App.jsx`:
- `projects` array (add your other projects)
- `skills`, `experiences`
- Hero typing words
- Replace `public/Tertho_Ghosh_CV.pdf` with latest CV
- Add photo: put `photo.jpg` in `public/` and replace terminal card with <img>

## Next steps
Tell me your full story beyond the CV (other achievements, hidden projects, awards, volunteering, personal narrative, photo) and I'll wire it into this design instantly.
