import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { LogRow, Eyebrow } from './LogRow.jsx'
import { Github } from './Icons.jsx'
import { projects } from '../data/projects.js'
import { FILTERS, moreBuilds } from '../data/site.js'
import stats from '../data/github-stats.json'

export function Projects() {
  const [openProject, setOpenProject] = useState(null)
  const [showMoreBuilds, setShowMoreBuilds] = useState(false)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlFilter = params.get('filter')
    const stored = localStorage.getItem('portfolio-filter')
    const initial = urlFilter && FILTERS.includes(urlFilter) ? urlFilter : (stored && FILTERS.includes(stored) ? stored : 'All')
    if (initial !== 'All') setFilter(initial)
  }, [])
  useEffect(() => {
    if (filter === 'All') localStorage.removeItem('portfolio-filter')
    else localStorage.setItem('portfolio-filter', filter)
    const url = new URL(window.location.href)
    if (filter === 'All') url.searchParams.delete('filter')
    else url.searchParams.set('filter', filter)
    window.history.replaceState({}, '', url)
  }, [filter])
  const filtered = useMemo(() => {
    if (filter === 'All') return projects
    if (filter === 'Featured') return projects.filter(p => p.highlight)
    return projects.filter(p => p.category === filter || p.stack.includes(filter))
  }, [filter])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const initialProject = params.get('project')
    if (initialProject && projects.some(p => p.id === initialProject)) setOpenProject(initialProject)
  }, [])
  useEffect(() => {
    const url = new URL(window.location.href)
    if (openProject) url.searchParams.set('project', openProject)
    else url.searchParams.delete('project')
    window.history.replaceState({}, '', url)
  }, [openProject])
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenProject(null)
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.ctrlKey || e.metaKey) return
      if (!openProject) return
      if (e.key === 'n' || e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault()
        const idx = filtered.findIndex(p => p.id === openProject)
        const next = filtered[(idx + 1) % filtered.length]
        if (next) { setOpenProject(next.id); document.getElementById(`proj-${next.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }
      }
      if (e.key === 'p' || e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault()
        const idx = filtered.findIndex(p => p.id === openProject)
        const prev = filtered[(idx - 1 + filtered.length) % filtered.length]
        if (prev) { setOpenProject(prev.id); document.getElementById(`proj-${prev.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openProject, filtered])

  return (
    <section id="projects">
      <LogRow n={3}>
        <Eyebrow>projects</Eyebrow>
        <h2 className="mt-3 text-[22px] sm:text-[28px] font-semibold tracking-tight leading-tight">Selected work.</h2>
        <div className="mt-6 flex items-center gap-1 p-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-x-auto max-w-full">
          {FILTERS.map(f=>(
            <button key={f} onClick={()=>setFilter(f)} aria-pressed={filter===f} className={`px-3 sm:px-4 h-8 rounded-full text-xs font-medium transition whitespace-nowrap shrink-0 ${filter===f ? 'bg-ink dark:bg-white text-white dark:text-ink shadow' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}>{f}</button>
          ))}
        </div>
        <div className="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800 border-y border-zinc-200 dark:border-zinc-800">
          {filtered.length === 0 ? (
            <div className="py-8 text-sm text-zinc-500">No projects match "{filter}" — try "All".</div>
          ) : filtered.map(p => {
            const open = openProject === p.id
            return (
              <div key={p.id}>
                 <button onClick={() => setOpenProject(open ? null : p.id)} aria-expanded={open} aria-controls={`proj-${p.id}`} className="w-full text-left py-5 flex items-start justify-between gap-3 group">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-[15px]">{p.title}</span>
                      {p.highlight && <span className="font-mono text-[10px] text-flag border border-flag/40 rounded px-1.5 py-0.5">flagged</span>}
                      {(() => {
                        const repoMap = { plagioscale: 'Tertho1/PlagioScale', cvinsight: 'Tertho1/cvinsight', truemedic: 'Tertho1/TrueMedic', pdfsummarizer: 'Tertho1/pdf-summarizer' }
                        const stars = stats?.map?.[repoMap[p.id]]
                        return stars > 0 ? <span className="font-mono text-[11px] text-zinc-500 flex items-center gap-1">★ {stars}</span> : null
                      })()}
                    </div>
                    <div className="text-[13px] text-zinc-500 mt-0.5">{p.subtitle}</div>
                  </div>
                  <span className="font-mono text-xs text-zinc-400 shrink-0 pt-1 group-hover:text-zinc-900 dark:group-hover:text-white transition">{open ? '−' : '+'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div id={`proj-${p.id}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="pb-6 pr-6">
                        <p className="text-[14px] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[64ch]">{p.desc}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {p.stack.map(s => <span key={s} className="font-mono text-[11px] px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400">{s}</span>)}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-3 text-sm font-medium">
                          {p.links.github && <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-flag transition"><Github size={14} /> code</a>}
                          {p.links.demo && <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-flag transition"><ArrowUpRight size={14} /> live demo</a>}
                          {p.id === 'plagioscale' && <a href="#/projects/plagioscale" className="inline-flex items-center gap-1.5 text-flag hover:underline">Read case study →</a>}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
        <button onClick={() => setShowMoreBuilds(v => !v)} aria-expanded={showMoreBuilds} aria-controls="more-builds" className="mt-4 font-mono text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition">
          {showMoreBuilds ? '− hide' : '+ show'} {moreBuilds.length} more builds — each shipped end-to-end
        </button>
        <AnimatePresence initial={false}>
          {showMoreBuilds && (
            <motion.div id="more-builds" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {moreBuilds.map(b => (
                  <a key={b.name} href={b.github} target="_blank" rel="noopener noreferrer" className="text-[13px] group">
                    <span className="font-medium group-hover:text-flag transition">{b.name}</span>
                    <span className="text-zinc-500"> — {b.tech} · {b.note}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </LogRow>
    </section>
  )
}
