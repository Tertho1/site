import { useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { Nav } from './components/Nav.jsx'
import { Hero } from './components/Hero.jsx'
import { About } from './components/About.jsx'
import { Skills } from './components/Skills.jsx'
import { Footer } from './components/Footer.jsx'
import { CommandPalette } from './components/CommandPalette.jsx'
import { PlagioScaleCase } from './pages/PlagioScaleCase.jsx'

// lazy below-fold for perf
const Projects = lazy(() => import('./components/Projects.jsx').then(m => ({ default: m.Projects })))
const Experience = lazy(() => import('./components/Experience.jsx').then(m => ({ default: m.Experience })))
// Testimonials hidden until real quote available — keep file, enable by uncommenting next 2 lines
// const Testimonials = lazy(() => import('./components/Testimonials.jsx').then(m => ({ default: m.Testimonials })))
const Contact = lazy(() => import('./components/Contact.jsx').then(m => ({ default: m.Contact })))

function Fallback() {
  return <div className="py-8 text-xs font-mono text-zinc-400">Loading…</div>
}

export default function App() {
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [caseStudy, setCaseStudy] = useState(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [dark])
  useEffect(() => {
    setDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
  }, [])
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    const h = window.location.hash
    const isCaseStudy = h.startsWith('#/projects/')
    const hasSectionHash = h && h.length > 1 && !isCaseStudy
    if (!hasSectionHash) window.scrollTo(0, 0)
    else {
      const id = h.replace(/^#\/?/, '').split('?')[0].split('/')[0]
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto' })
    }
  }, [])
  useEffect(() => {
    const parse = () => {
      const h = window.location.hash
      const m = h.match(/#\/projects\/([\w-]+)/) || h.match(/#case-([\w-]+)/) || window.location.search.match(/case=([\w-]+)/)
      setCaseStudy(m ? m[1] : null)
      if (m) { document.title = `${m[1]} — Tertho Ghosh`; window.scrollTo(0,0) }
      else document.title = 'Tertho Ghosh — Cybersecurity · Systems · AI/ML'
    }
    parse()
    window.addEventListener('hashchange', parse)
    return () => window.removeEventListener('hashchange', parse)
  }, [])

  if (caseStudy === 'plagioscale') {
    return (
      <div className="min-h-screen relative font-sans bg-paper dark:bg-ink">
        <Nav dark={dark} setDark={setDark} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <PlagioScaleCase onBack={() => { history.replaceState(null,'', window.location.pathname + window.location.search.replace(/case=[\w-]+&?/,'').replace(/#.*/,'')); setCaseStudy(null); window.scrollTo(0,0) }} />
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen relative font-sans">
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-flag origin-left z-[60]" />
      <Nav dark={dark} setDark={setDark} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main id="main" className="max-w-[1024px] mx-auto px-4 sm:px-6">
        <Hero />
        <About />
        <Skills />
        <Suspense fallback={<Fallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<Fallback />}>
          <Experience />
        </Suspense>
        {/* Testimonials hidden — enable when you have a real quote
        <Suspense fallback={<Fallback />}>
          <Testimonials />
        </Suspense>
        */}
        <Suspense fallback={<Fallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <button onClick={() => setPaletteOpen(true)} aria-label="Open command palette" className="hidden md:inline-flex fixed bottom-5 left-5 z-40 items-center gap-2 px-3 h-9 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg font-mono text-xs text-zinc-600 dark:text-zinc-300 hover:scale-[1.02] transition">
        <span className="w-1.5 h-1.5 rounded-full bg-flag" /> ⌘K
      </button>
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
      <AnimatePresence>
        {showTop && (
          <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" className="fixed bottom-5 right-5 w-10 h-10 rounded-full bg-ink dark:bg-white text-white dark:text-ink grid place-items-center shadow-lg z-40 hover:scale-105 transition">
            <ChevronUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
