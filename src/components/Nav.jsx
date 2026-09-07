import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Download, Menu, ChevronUp } from 'lucide-react'
import { CV_URL, NAV_SECTIONS } from '../data/site.js'
import { useEffect, useState } from 'react'

export function Nav({ dark, setDark, menuOpen, setMenuOpen }) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const ids = NAV_SECTIONS
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 })
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-paper/90 dark:bg-ink/90 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-[1024px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2 font-mono text-[13px]">
        <a href="#main" className="flex items-center gap-2 min-w-0 font-medium">
          <span className="w-2 h-2 rounded-full bg-flag shrink-0" aria-hidden="true" />
          <span className="truncate">tertho-ghosh</span>
        </a>
        <nav className="hidden md:flex items-center gap-5 shrink-0" aria-label="Sections">
          {NAV_SECTIONS.map((s, i) => (
            <a key={s} href={`#${s}`} className={`transition ${active===s ? 'text-zinc-900 dark:text-white font-medium underline decoration-flag underline-offset-4' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}>
              [{String(i + 1).padStart(2, '0')}] {s}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1.5 shrink-0">
          <button onClick={() => setDark(!dark)} aria-label="Toggle theme" className="w-8 h-8 grid place-items-center rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-1.5 px-3 h-8 rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">
            <Download size={13} /> cv
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen} aria-controls="mobile-nav" className="md:hidden w-8 h-8 grid place-items-center rounded border border-zinc-200 dark:border-zinc-800">
            {menuOpen ? <ChevronUp size={14} className="rotate-180" /> : <Menu size={14} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div id="mobile-nav" initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden overflow-hidden border-t border-zinc-200 dark:border-zinc-800 bg-paper dark:bg-ink font-mono text-sm">
            <div className="px-4 py-3 flex flex-col gap-1">
              {NAV_SECTIONS.map((s, i) => (
                <a key={s} onClick={() => setMenuOpen(false)} href={`#${s}`} className="py-2.5 px-1">[{String(i + 1).padStart(2, '0')}] {s}</a>
              ))}
              <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-2 py-2.5 px-1">↓ download cv</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
