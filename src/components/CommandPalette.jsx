import { useEffect, useRef, useState } from 'react'
import { Search, ArrowRight } from 'lucide-react'

const ITEMS = [
  { id: 'about', label: 'Go to About', hint: '[01]', action: 'hash' },
  { id: 'skills', label: 'Go to Skills', hint: '[02]', action: 'hash' },
  { id: 'projects', label: 'Go to Projects', hint: '[03]', action: 'hash' },
  { id: 'experience', label: 'Go to Experience', hint: '[04]', action: 'hash' },
  { id: 'contact', label: 'Go to Contact', hint: '[05]', action: 'hash' },
  { id: 'cv', label: 'Download CV', hint: 'pdf', action: 'cv' },
  { id: 'github', label: 'Open GitHub', hint: 'Tertho1', action: 'external', url: 'https://github.com/Tertho1' },
  { id: 'linkedin', label: 'Open LinkedIn', hint: 'tertho-ghosh', action: 'external', url: 'https://www.linkedin.com/in/tertho-ghosh' },
]

export function CommandPalette({ open, setOpen }) {
  const [q, setQ] = useState('')
  const inputRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (open) {
      setQ('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === '/' && !open && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  const filtered = ITEMS.filter(i => q.trim() === '' || i.label.toLowerCase().includes(q.toLowerCase()) || i.id.includes(q.toLowerCase()))
  const cur = filtered[Math.max(0, Math.min(active, filtered.length - 1))]

  function run(item) {
    if (!item) return
    setOpen(false)
    if (item.action === 'hash') {
      document.querySelector(`#${item.id}`)?.scrollIntoView({ behavior: 'smooth' })
      history.replaceState(null, '', `#${item.id}`)
    } else if (item.action === 'cv') {
      window.open(`${import.meta.env.BASE_URL}Tertho_Ghosh_CV_web.pdf`, '_blank', 'noopener,noreferrer')
    } else if (item.action === 'external') {
      window.open(item.url, '_blank', 'noopener,noreferrer')
    }
  }

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[80] grid place-items-start pt-[20vh] px-4">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div role="dialog" aria-modal="true" aria-label="Command palette" className="relative w-full max-w-[560px] mx-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 h-12 border-b border-zinc-200 dark:border-zinc-800">
          <Search size={16} className="text-zinc-400" />
          <input ref={inputRef} value={q} onChange={e => { setQ(e.target.value); setActive(0) }} onKeyDown={e => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, filtered.length - 1)) }
            else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)) }
            else if (e.key === 'Enter') { e.preventDefault(); run(cur) }
            else if (e.key === 'Escape') setOpen(false)
          }} placeholder="Type a command or search… (try 'projects', 'cv')" className="flex-1 bg-transparent outline-none text-sm placeholder:text-zinc-400" />
          <span className="hidden sm:inline font-mono text-[11px] px-1.5 py-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-500">ESC</span>
        </div>
        <div className="max-h-[280px] overflow-auto py-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-sm text-zinc-500">No results for "{q}"</div>
          ) : filtered.map((it, idx) => (
            <button key={it.id} onClick={() => run(it)} className={`w-full text-left px-4 py-2.5 flex items-center justify-between gap-3 text-sm ${idx === active ? 'bg-zinc-50 dark:bg-zinc-800' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}>
              <span className="flex items-center gap-3">
                <span className={`w-1.5 h-1.5 rounded-full ${idx === active ? 'bg-flag' : 'bg-zinc-300 dark:bg-zinc-600'}`} />
                {it.label}
              </span>
              <span className="flex items-center gap-2 font-mono text-xs text-zinc-400">{it.hint} <ArrowRight size={12} className={idx === active ? 'text-flag' : 'text-zinc-300'} /></span>
            </button>
          ))}
        </div>
        <div className="px-4 py-2.5 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>↑↓ navigate · Enter select · Esc close</span>
          <span className="hidden sm:inline">Ctrl+K / / to open</span>
        </div>
      </div>
    </div>
  )
}
