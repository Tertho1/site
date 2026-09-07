#!/usr/bin/env node
// Build-time GitHub stars fetch — writes public/github-stats.json
// No runtime API spam, cached. Uses unauthenticated API (60/hr) with optional GITHUB_TOKEN env.
const repos = [
  'Tertho1/PlagioScale',
  'Tertho1/cvinsight',
  'Tertho1/TrueMedic',
  'Tertho1/pdf-summarizer',
]
const out = 'public/github-stats.json'
const token = process.env.GITHUB_TOKEN
const headers = { 'Accept': 'application/vnd.github+json', 'User-Agent': 'site-build' }
if (token) headers.Authorization = `Bearer ${token}`

async function fetchRepo(repo) {
  const url = `https://api.github.com/repos/${repo}`
  try {
    const r = await fetch(url, { headers })
    if (!r.ok) {
      console.warn(`[github] ${repo} ${r.status} ${r.statusText}`)
      return { repo, stars: null, error: r.status }
    }
    const j = await r.json()
    return { repo, stars: j.stargazers_count ?? null, updated: j.pushed_at ?? null }
  } catch (e) {
    console.warn(`[github] ${repo} fetch failed`, e.message)
    return { repo, stars: null, error: String(e) }
  }
}

const results = await Promise.all(repos.map(fetchRepo))
const map = {}
for (const r of results) map[r.repo] = r.stars

// fallback to 0 if null to avoid UI flicker
const payload = { generatedAt: new Date().toISOString(), repos: results, map }
import { writeFileSync } from 'fs'
writeFileSync(out, JSON.stringify(payload, null, 2))
console.log(`[github] wrote ${out}`, map)
