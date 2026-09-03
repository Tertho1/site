import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import {
  Mail, MapPin, ExternalLink, ArrowUpRight, X, Sun, Moon,
  Shield, Code2, Database, Sparkles, Award, GraduationCap,
  Briefcase, Layers, Copy, Check, Download, Menu, ChevronRight, Terminal, Lock, Cpu, Search, HeartHandshake
} from 'lucide-react'

const Github = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.26.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8a9.56 9.56 0 0 1 2.5.34c1.9-1.29 2.74-1.02 2.74-1.02.56 1.38.21 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2z"/></svg>
)
const Linkedin = ({ size = 18, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
)

// Data - prioritized real projects (non-forked, non-scrap)
const projects = [
  {
    id: 'plagioscale',
    title: 'PlagioScale',
    subtitle: 'Cloud-native Plagiarism & AI-Content Detection',
    desc: 'Designed end-to-end: microservices (API + worker + autoscaler + frontend), hybrid TF-IDF + SBERT, transformer AI-detector, JWT/CSRF/RBAC, rate limiting, audit logs, Prometheus/Grafana.',
    stack: ['Python','FastAPI','React','PostgreSQL','Redis','Docker','Microservices'],
    highlight: true,
    image: 'PS',
    links: { github: 'https://github.com/Tertho1/PlagioScale', demo: null },
    stats: 'Microservices • Prometheus + Grafana',
    category: 'AI/ML',
  },
  {
    id: 'cvinsight',
    title: 'CVInsight',
    subtitle: 'AI Resume ↔ Job Matching (0–100)',
    desc: 'XGBoost scorer on 6,241 labeled pairs, 384-d embeddings + 12 engineered features. Deployed as public Streamlit app. Feature engineering + structured NLP pipeline.',
    stack: ['Python','NLP','XGBoost','Streamlit'],
    highlight: true,
    image: 'CV',
    links: { github: 'https://github.com/Tertho1/cvinsight', demo: 'https://cvinsight-io.streamlit.app' },
    stats: '6,241 pairs • 384-d embeddings',
    category: 'AI/ML',
  },
  {
    id: 'truemedic',
    title: 'TrueMedic',
    subtitle: 'Doctor Verification System',
    desc: 'Android + Supabase: API-based doctor verification, auth, RBAC, validated workflows, structured SQL records. With companion tm_api (FastAPI + BS4 scraper).',
    stack: ['Supabase','Dart','Python','FastAPI','PostgreSQL'],
    highlight: false,
    image: 'TM',
    links: { github: 'https://github.com/Tertho1/TrueMedic', demo: null },
    stats: 'Supabase • RBAC • BS4 scraper',
    category: 'Web/App',
  },
  {
    id: 'tube',
    title: 'TubeGrabber',
    subtitle: 'YouTube Downloader (Tkinter + yt-dlp)',
    desc: 'Desktop app: search, video/audio/playlist download, threading, subprocess/FFmpeg management, progress tracking, config persistence. Educational, ToS-aware.',
    stack: ['Python','Tkinter','yt-dlp','FFmpeg','Threading'],
    highlight: false,
    image: 'TG',
    links: { github: 'https://github.com/Tertho1', demo: null },
    stats: 'Tkinter • yt-dlp • FFmpeg',
    category: 'Python',
  },
  {
    id: 'mentalqlm',
    title: 'MentalQLM',
    subtitle: 'Lightweight LLM for Mental Health (Dual LoRA)',
    desc: 'Reproduction of JBHI 2025 paper: 0.5B LLM, Stage-1 LLaMA-Factory LoRA #1 + Stage-2 LoRA #2 + classification head. Best 61.7 F1 on SAD, 74.9 on DEP-SEV, beating 13B baselines.',
    stack: ['Python','LLM','LoRA','LLaMA-Factory','Torch'],
    highlight: true,
    image: 'MQ',
    links: { github: 'https://github.com/Tertho1', demo: null },
    stats: 'Dual LoRA • 0.5B params',
    category: 'LLM',
  },
  {
    id: 'pdfsummarizer',
    title: 'PDF Summarizer',
    subtitle: 'OCR + BART summarization',
    desc: 'Extracts from native + scanned PDFs (PyMuPDF + Tesseract/EasyOCR + pdf2image), preprocesses, chunks & summarizes with facebook/bart-large-cnn. Handles large docs.',
    stack: ['Python','PyMuPDF','Tesseract','Transformers','BART'],
    highlight: true,
    image: 'PDF',
    links: { github: 'https://github.com/Tertho1/pdf-summarizer', demo: null },
    stats: 'OCR + BART-large-cnn',
    category: 'AI/Python',
  },
  {
    id: 'iotsmarthome',
    title: 'IoT Smart Home — ESP32 v1.3-OTA',
    subtitle: 'Firmware + Dashboard + Wiring',
    desc: 'ESP32 firmware (WiFiManager + ElegantOTA, 6 pins), dashboard, wiring/circuit SVGs, BOM. Spec-law v1.2 compliant. PlatformIO + OTA updates.',
    stack: ['ESP32','Arduino','PlatformIO','OTA','IoT'],
    highlight: false,
    image: 'IoT',
    links: { github: 'https://github.com/Tertho1', demo: null },
    stats: 'OTA • 6-pin • Dashboard',
    category: 'IoT',
  },
  {
    id: 'convertkit',
    title: 'ConvertKit',
    subtitle: 'PPTX → PDF API (LibreOffice)',
    desc: 'High-perf FastAPI + LibreOffice headless: single -> PDF download, multi -> ZIP. Async wrapper, env-config, Dockerfile for Railway, integrated tests.',
    stack: ['Python','FastAPI','LibreOffice','Docker'],
    highlight: false,
    image: 'CK',
    links: { github: 'https://github.com/Tertho1', demo: null },
    stats: 'FastAPI • LibreOffice headless',
    category: 'Backend',
  },
]

const moreBuilds = [
  { name: 'Chest Disease Detection', tech: 'Image Processing + ML', note: '402 py files — DIP ensemble' },
  { name: 'CodeAlpha Credit Scoring', tech: 'Python • Scikit-learn', note: 'Good/Standard/Poor classifier' },
  { name: 'ExpenseMate / Expensemate', tech: 'Laravel (Blade)', note: 'Personal finance manager' },
  { name: 'Scrapper & Scrapper_API', tech: 'FastAPI + BS4', note: 'Scraping API (Vercel)' },
  { name: 'File & Folder Finder', tech: 'Python CLI', note: 'Wildcard + ext filtering' },
  { name: 'Text Searcher From Files', tech: 'PDF/DOCX/XLSX/PPTX', note: 'Multi-format content search' },
  { name: 'PawPalace', tech: 'PHP', note: 'Pet adoption site' },
  { name: 'Cryptography Lab', tech: 'HTML', note: 'Crypto experiments' },
]

const skills = [
  { group: 'AI / ML & LLMs', icon: Sparkles, items: ['Python','Pandas','NumPy','Scikit-learn','NLP','Torch','XGBoost','BART','SBERT','LoRA','LLaMA-Factory'], accent: 'violet' },
  { group: 'Web & Backend', icon: Code2, items: ['FastAPI','React','Docker','Microservices','Laravel','Supabase','PostgreSQL','MySQL','Git'], accent: 'zinc' },
  { group: 'Systems & Security', icon: Shield, items: ['Ubuntu','Kali','Linux CLI','TCP/IP','OSI','Subnetting','OSPF/BGP','Cryptography','OSINT','Recon'], accent: 'emerald' },
  { group: 'Testing & QA', icon: Search, items: ['Manual Testing','Automation','Validation','Audit Logs','Control Testing','Evidence'], accent: 'amber' },
]

const experiences = [
  {
    role: 'Research Trainee',
    org: 'ITRRC Cybersecurity Research Lab, Jagannath University',
    period: 'Jan 2025 — Jul 2025',
    bullets: ['Founding cohort — 6-month hands-on training','Ubuntu/Kali, privilege & access control, OS/network security','OSINT, reconnaissance, port sweeping, active/passive attacks'],
    current: false,
  },
  {
    role: 'Head — Budget & Finance',
    org: 'TEDxJnU',
    period: '2025',
    bullets: ['Led 6-member finance team for 500+ person event (50+ organizers)','Owned budget estimation, sponsorship & registration allocation','Live ops + final financial report'],
    current: false,
  },
  {
    role: 'Treasurer',
    org: 'IEEE Student Branch, Jagannath University',
    period: 'Jan 2025 — Feb 2026',
    bullets: ['Treasury & financial coordination','Financial record keeping & event finance support'],
    current: true,
  },
]

const volunteering = [
  { title: 'Organizer — CSE Day Celebration 2024', desc: 'Project showcases, tech quizzes, guest speaker sessions; member engagement & vibrant atmosphere.' },
  { title: 'Volunteer — Unlocking the Future: Blockchain Workshop', desc: 'Curated content, invited industry expert, supported hands-on blockchain sessions.' },
  { title: 'Volunteer — Mastering SQA (Manual & Automation)', desc: 'Organized workshop & online competition; coordinated judging & participant experience.' },
  { title: 'Volunteer — JnU AI & IT Fest', desc: 'Supported AI & IT festival operations.' },
  { title: 'Volunteer — Cultural Fest, Notre Dame College', desc: 'Stage scheduling & audience coordination for annual cultural festival.' },
  { title: 'Volunteer — Science Fair, Notre Dame College', desc: 'Exhibit scheduling, participant & judge coordination.' },
]

function useTyping(words, speed=70, pause=1600){
  const [idx,setIdx]=useState(0)
  const [txt,setTxt]=useState('')
  const [deleting,setDeleting]=useState(false)
  useEffect(()=>{
    const word = words[idx]
    const t = setTimeout(()=>{
      if(!deleting){
        if(txt.length < word.length){ setTxt(word.slice(0,txt.length+1)) }
        else { setTimeout(()=>setDeleting(true), pause) }
      } else {
        if(txt.length>0) setTxt(word.slice(0,txt.length-1))
        else { setDeleting(false); setIdx((idx+1)%words.length) }
      }
    }, deleting? speed/2 : speed)
    return ()=>clearTimeout(t)
  },[txt,deleting,idx,words,speed,pause])
  return txt
}

export default function App(){
  const [dark,setDark]=useState(false)
  const [menuOpen,setMenuOpen]=useState(false)
  const [copied,setCopied]=useState(false)
  const [filter,setFilter]=useState('All')
  const [selected,setSelected]=useState(null)
  const [showMore,setShowMore]=useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const typing = useTyping(['AI / ML & LLMs','Web Dev & QA','Python & Automation','Cybersecurity & Systems'],70,1500)
  const heroRef = useRef(null)

  useEffect(()=>{
    if(dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  },[dark])
  useEffect(()=>{
    const m = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDark(m)
  },[])

  const filtered = filter==='All' ? projects : projects.filter(p=> p.stack.includes(filter) || p.category.includes(filter) || (filter==='Featured' && p.highlight))

  const [showTop, setShowTop] = useState(false)
  useEffect(()=>{
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  },[])

  return (
    <div className="min-h-screen relative">
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-zinc-900 dark:bg-white origin-left z-[60]" />

      {/* Nav - fixed like friend's portfolio but with blur, always sticky */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#fcfcf9]/85 dark:bg-[#0a0a0a]/85 border-b border-zinc-200/60 dark:border-zinc-800 supports-[backdrop-filter]:bg-[#fcfcf9]/70">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 h-[60px] sm:h-[64px] flex items-center justify-between gap-2">
          <a href="#" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black grid place-items-center font-mono text-[13px] font-bold shrink-0">TG</div>
            <span className="font-display font-semibold tracking-tight text-[15px] sm:text-base truncate">Tertho Ghosh</span>
            <span className="hidden lg:inline text-xs px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap">Available for roles</span>
          </a>
          <nav className="hidden md:flex items-center gap-5 text-sm shrink-0">
            {['About','Skills','Projects','Experience','Contact'].map(s=> (
              <a key={s} href={`#${s.toLowerCase()}`} className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition whitespace-nowrap">{s}</a>
            ))}
          </nav>
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button onClick={()=>setDark(!dark)} aria-label="Toggle theme" className="w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 grid place-items-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">
              {dark ? <Sun size={16}/> : <Moon size={16}/>}
            </button>
            <a href="/Tertho_Ghosh_CV.pdf" target="_blank" className="hidden sm:inline-flex items-center gap-2 px-4 h-9 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 transition whitespace-nowrap">
              <Download size={14}/> CV
            </a>
            <button onClick={()=>setMenuOpen(!menuOpen)} aria-label="Menu" className="md:hidden w-9 h-9 grid place-items-center rounded-full border border-zinc-200 dark:border-zinc-800">
              {menuOpen ? <X size={16}/> : <Menu size={16}/>}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{height:0}} animate={{height:'auto'}} exit={{height:0}} className="md:hidden overflow-hidden border-t border-zinc-200 dark:border-zinc-800 bg-[#fcfcf9] dark:bg-[#0a0a0a]">
              <div className="px-4 py-3 flex flex-col gap-1 text-sm">
                {['About','Skills','Projects','Experience','Contact'].map(s=> <a key={s} onClick={()=>setMenuOpen(false)} href={`#${s.toLowerCase()}`} className="py-2.5 px-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900">{s}</a>)}
                <a href="/Tertho_Ghosh_CV.pdf" target="_blank" className="mt-2 inline-flex justify-center items-center gap-2 h-10 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-medium">Download CV</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="max-w-[1120px] mx-auto px-4 sm:px-6 pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 sm:gap-10 items-start">
          <div className="min-w-0">
            <motion.h1 initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.05}} className="font-display font-semibold tracking-[-0.04em] leading-[0.9] text-[38px] sm:text-[48px] md:text-[60px] mt-2 sm:mt-3">
              <span className="whitespace-nowrap">Tertho Ghosh</span>
              <span className="block text-[15px] sm:text-[17px] md:text-[18px] font-sans font-normal tracking-normal leading-relaxed mt-4 text-zinc-600 dark:text-zinc-400 max-w-[560px] whitespace-normal">
                CSE graduate from Jagannath University — <span className="text-zinc-900 dark:text-white font-medium">AI/ML & LLM enthusiast, web & Python builder</span>. Fast learner, analytical perfectionist who <em className="not-italic font-medium text-zinc-900 dark:text-white">never leaves a job half-done</em> — I love to lead, experiment and explore new tech.
              </span>
            </motion.h1>

            {/* Detailed intro meta - minimal with icons, under intro */}
            <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:0.12}} className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium"><MapPin size={14} className="text-zinc-500"/> Dhaka, Bangladesh</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium"><GraduationCap size={14} className="text-zinc-500"/> Jagannath University — CSE ’26</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium"><Award size={14} className="text-zinc-500"/> CGPA 3.88 / 4.00</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/> Available for roles</span>
            </motion.div>

            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm">
              <span className="text-zinc-400">I build in</span>
              <span className="px-3 py-1.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-medium max-w-[70vw] truncate">{typing}<span className="animate-pulse">|</span></span>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-wrap gap-2.5 sm:gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 px-5 sm:px-6 h-11 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 transition">
                View projects <ArrowUpRight size={16}/>
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-5 sm:px-6 h-11 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-medium">
                Contact <Mail size={16}/>
              </a>
              <a href="https://github.com/Tertho1" target="_blank" aria-label="GitHub" className="w-11 h-11 grid place-items-center rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shrink-0">
                <Github size={18}/>
              </a>
              <a href="https://linkedin.com/in/tertho-ghosh" target="_blank" aria-label="LinkedIn" className="w-11 h-11 grid place-items-center rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shrink-0">
                <Linkedin size={18}/>
              </a>
            </div>

            <div className="mt-8 sm:mt-10 grid grid-cols-3 divide-x divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900">
              {[
                {k:'500+', v:'Problems', sub:'Codeforces Pupil'},
                {k:'6 mo', v:'Cybersecurity', sub:'ITRRC Founding'},
                {k:'3.88', v:'CGPA', sub:'JnU • NDC 5.00'},
              ].map(s=>(
                <div key={s.k} className="px-3 sm:px-6 py-4 sm:py-5 min-w-0">
                  <div className="font-display text-xl sm:text-2xl font-semibold">{s.k}</div>
                  <div className="text-[11px] sm:text-xs font-medium text-zinc-900 dark:text-white truncate">{s.v}</div>
                  <div className="text-[10px] sm:text-[11px] text-zinc-500 truncate">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div initial={{opacity:0, y:12}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="relative min-w-0 flex justify-center lg:justify-end">
            {/* Photo — reduced width, height matched to left text column, no captions */}
            <div className="w-full max-w-[320px] lg:max-w-[340px] rounded-[24px] border border-zinc-200 dark:border-zinc-800 bg-white p-2 shadow-[0_20px_60px_rgba(0,0,0,0.08)] self-start">
              <div className="rounded-[16px] bg-white overflow-hidden aspect-[4/5] grid place-items-center">
                <img src="/photo.png" alt="Tertho Ghosh" className="w-full h-full object-cover object-top bg-white scale-[1.10] origin-top" loading="eager" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-[1120px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-zinc-500"><span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white"/> About</div>
            <h2 className="font-display text-[24px] sm:text-[28px] font-semibold tracking-tight mt-3">Perfectionist builder who ships.</h2>
            <p className="mt-3 text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              I focus on building complete systems — from OS privileges and TCP/IP to SBERT embeddings and dual-LoRA tuning. That has meant being in the founding cohort at ITRRC Cybersecurity Lab, solo-shipping <span className="font-medium text-zinc-900 dark:text-white">PlagioScale</span> & <span className="font-medium text-zinc-900 dark:text-white">CVInsight</span> end-to-end, and reproducing <span className="font-medium text-zinc-900 dark:text-white">MentalQLM</span>. I document, test and keep audit trails by habit.
            </p>
            <p className="mt-3 text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Outside code I’ve led people and budgets — 6-member finance team at TEDxJnU (500+ attendees) and Treasurer at IEEE JnU — so I care about clarity, evidence and shipping things properly.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['AI/ML','LLMs & LoRA','Python','Web Dev','QA & Testing','Leadership','Experimentation'].map(t=>(
                <span key={t} className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium border border-zinc-200 dark:border-zinc-700">{t}</span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-white p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-emerald-500/20" />
              <div className="relative">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400"><Lock size={12}/> Availability</div>
                <div className="mt-2 font-display text-xl leading-tight">Open to AI/ML, Python, Web & Security roles</div>
                <div className="mt-2 text-sm text-zinc-300 leading-relaxed">Dhaka-based, open to on-site/hybrid. Let’s build something you’re proud to ship and audit.</div>
                <a href="#contact" className="mt-4 inline-flex items-center gap-2 px-4 h-10 rounded-full bg-white text-black text-sm font-medium">Let’s talk <ChevronRight size={14}/></a>
              </div>
            </div>
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500"><GraduationCap size={14}/> Education</div>
              <div className="mt-3 space-y-3 text-sm">
                <div>
                  <div className="font-medium">B.Sc. CSE — Jagannath University</div>
                  <div className="text-zinc-500 text-xs">2026 • 3.88/4.00 • 8th sem completed</div>
                </div>
                <div>
                  <div className="font-medium">HSC — Notre Dame College, Dhaka</div>
                  <div className="text-zinc-500 text-xs">2020 • GPA 5.00</div>
                </div>
                <div>
                  <div className="font-medium">SSC — Lalmohan Secondary School, Bhola</div>
                  <div className="text-zinc-500 text-xs">2018 • GPA 5.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-[1120px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">Capabilities</h2>
          <span className="text-xs font-mono text-zinc-500">Hover to explore • Professional palette</span>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map(s=>(
            <motion.div key={s.group} whileHover={{y:-3}} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black grid place-items-center">
                <s.icon size={18}/>
              </div>
              <div className="mt-4 font-medium text-sm">{s.group}</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.items.map(i=>(
                  <span key={i} className="px-2 py-1 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[11px] font-medium">{i}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 p-3 sm:p-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono text-zinc-500 shrink-0">Interests:</span>
          {['AI','LLMs','Web Dev','Python','Testing','Cloud Native','Security','Automation'].map(t=>(
            <span key={t} className="px-2.5 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700">{t}</span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-[1120px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">Selected work</h2>
            <p className="text-sm text-zinc-500 mt-1">Real systems from GitHub + D:\Projects — audited, not forked. Filter & click for details.</p>
          </div>
          <div className="flex items-center gap-1 p-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-x-auto max-w-full">
            {['All','Featured','AI/ML','LLM','Python','Backend'].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} className={`px-3 sm:px-4 h-8 rounded-full text-xs font-medium transition whitespace-nowrap shrink-0 ${filter===f ? 'bg-zinc-900 dark:bg-white text-white dark:text-black shadow' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4 sm:gap-5">
          {filtered.map(p=>(
            <motion.div key={p.id} layout initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} whileHover={{y:-4}} className="group relative rounded-[20px] sm:rounded-[24px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden cursor-pointer flex flex-col" onClick={()=>setSelected(p)}>
              <div className={`h-1 w-full ${p.highlight ? 'bg-gradient-to-r from-violet-600 to-emerald-500' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3 sm:gap-4 min-w-0 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black grid place-items-center font-mono font-bold text-xs sm:text-sm shrink-0">{p.image}</div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold leading-tight text-sm sm:text-base truncate pr-2">{p.title}</div>
                      <div className="text-xs text-zinc-500 line-clamp-1">{p.subtitle}</div>
                      <div className="mt-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 truncate">{p.stats}</div>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition shrink-0 mt-1" />
                </div>
                <p className="mt-3 sm:mt-4 text-[13px] sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3 flex-1">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.slice(0,5).map(s=> <span key={s} className="px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[11px] border border-zinc-200 dark:border-zinc-700">{s}</span>)}
                  {p.stack.length>5 && <span className="px-2 py-1 text-[11px] text-zinc-500">+{p.stack.length-5}</span>}
                </div>
                <div className="mt-4 flex gap-2">
                  {p.links.github && <span className="inline-flex items-center gap-1.5 px-3 h-7 sm:h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black text-xs"><Github size={12}/> GitHub</span>}
                  {p.links.demo && <span className="inline-flex items-center gap-1.5 px-3 h-7 sm:h-8 rounded-full border border-zinc-200 dark:border-zinc-700 text-xs"><ExternalLink size={12}/> Live</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More builds */}
        <div className="mt-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
          <button onClick={()=>setShowMore(!showMore)} className="w-full flex items-center justify-between gap-3 p-4 text-left">
            <div>
              <div className="text-sm font-medium">More builds from D:\Projects & GitHub ({moreBuilds.length})</div>
              <div className="text-xs text-zinc-500">Scrap filtered out — these are real. Click to expand.</div>
            </div>
            <span className={`w-8 h-8 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 grid place-items-center transition ${showMore ? 'rotate-180':''}`}><ChevronRight size={16}/></span>
          </button>
          <AnimatePresence>
            {showMore && (
              <motion.div initial={{height:0}} animate={{height:'auto'}} exit={{height:0}} className="overflow-hidden border-t border-zinc-200 dark:border-zinc-800">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4">
                  {moreBuilds.map(b=>(
                    <div key={b.name} className="rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-3">
                      <div className="text-xs font-semibold truncate">{b.name}</div>
                      <div className="text-[11px] text-violet-600 dark:text-violet-400">{b.tech}</div>
                      <div className="text-[11px] text-zinc-500 line-clamp-1">{b.note}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Experience + Volunteering */}
      <section id="experience" className="max-w-[1120px] mx-auto px-4 sm:px-6 py-6">
        <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">Experience & Volunteering</h2>
        <div className="mt-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-5 sm:gap-6">
          <div className="space-y-4">
            {experiences.map(e=>(
              <div key={e.org} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 relative">
                {e.current && <span className="absolute top-4 right-4 text-[10px] tracking-widest font-mono px-2 py-1 rounded-full bg-emerald-500 text-white">CURRENT</span>}
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500"><Briefcase size={12}/> {e.period}</div>
                <div className="mt-2 font-semibold text-sm sm:text-base pr-16">{e.role}</div>
                <div className="text-sm text-zinc-500">{e.org}</div>
                <ul className="mt-3 space-y-1.5 text-[13px] sm:text-sm text-zinc-600 dark:text-zinc-400 list-disc pl-5">
                  {e.bullets.map(b=> <li key={b}>{b}</li>)}
                </ul>
              </div>
            ))}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500"><HeartHandshake size={14}/> Volunteering & Leadership</div>
              <div className="mt-3 space-y-3">
                {volunteering.slice(0,4).map(v=>(
                  <div key={v.title} className="flex gap-2 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white shrink-0"/>
                    <span><span className="font-medium">{v.title}</span><span className="text-zinc-500"> — {v.desc}</span></span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-zinc-300 mt-1.5 shrink-0"/> JnU AI & IT Fest — Volunteer</div>
                <div className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-zinc-300 mt-1.5 shrink-0"/> IEEE JnU events & other volunteering</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500"><Award size={14}/> Competitive & Events</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0"/> Cisco Intro to Cybersecurity — Networking Academy</li>
                <li className="flex gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0"/> ICPC 2024 — DIU • IUPC KUET & AUST 2025</li>
                <li className="flex gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0"/> PTIB Civic Tech, Sustainovate & hackathons</li>
                <li className="flex gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0"/> 500+ problems — Codeforces Pupil</li>
              </ul>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  {n:'Codeforces', v:'Pupil'},
                  {n:'Problems', v:'500+'},
                  {n:'Focus', v:'AI/Web/QA'},
                ].map(s=>(
                  <div key={s.n} className="rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 py-3 px-1">
                    <div className="text-[11px] text-zinc-500">{s.n}</div>
                    <div className="text-sm font-semibold truncate">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-800 text-white p-6">
              <div className="text-xs font-mono text-zinc-400 flex items-center gap-2"><Layers size={12}/> Relevant Coursework</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {['DBMS','Operating Systems','Computer Networks','Network Security','Cryptography','Software Eng.','Data Mining','Cloud Computing','IoT','Comp. Arch','Switching & Routing'].map(c=>(
                  <span key={c} className="px-2 py-1 rounded-full bg-white/10 border border-white/10 text-xs">{c}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
              <div className="text-xs font-mono text-zinc-500 flex items-center gap-2"><Cpu size={14}/> About the palette — “Accent”</div>
              <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                <span className="font-medium text-zinc-900 dark:text-white">Accent</span> = the one highlight color used for CTAs, gradients and active states. Here it’s a restrained <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-violet-600"/> violet → emerald</span> on a zinc/white base — professional, not flashy. It keeps the site minimal and lets your work be judged, not the colors. Fully responsive: tested from 320px to 1440px, no overflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact - professional, no phone */}
      <section id="contact" className="max-w-[1120px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="rounded-[24px] sm:rounded-[32px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 md:p-10">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-zinc-500"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"/> Contact</div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mt-3 leading-tight">Let’s build something<br/>you’re proud to ship.</h2>
              <p className="mt-3 text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">Reach me via email or the form — I reply fast. No phone exposed, just professional contact.</p>
              <div className="mt-6 space-y-3 text-sm">
                <a href="mailto:terthoghosh1@gmail.com" className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition">
                  <span className="w-9 h-9 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black grid place-items-center shrink-0"><Mail size={16}/></span>
                  <span className="min-w-0"><span className="font-medium truncate block">terthoghosh1@gmail.com</span><span className="block text-xs text-zinc-500">Professional inbox — preferred</span></span>
                </a>
                <div className="flex items-center gap-2 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm bg-zinc-50 dark:bg-zinc-800/50">
                  <MapPin size={16} className="shrink-0 text-zinc-500"/> <span>Dhaka, Bangladesh</span> <span className="text-zinc-300">•</span> <span className="text-zinc-500 text-xs">Open to remote / hybrid</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a href="https://github.com/Tertho1" target="_blank" className="h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center gap-2 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800"><Github size={16}/> GitHub</a>
                  <a href="https://linkedin.com/in/tertho-ghosh" target="_blank" className="h-10 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center gap-2 text-sm font-medium hover:opacity-90"><Linkedin size={16}/> LinkedIn</a>
                </div>
              </div>
            </div>
            <form onSubmit={e=>{
              e.preventDefault()
              const fd = new FormData(e.currentTarget)
              const subject = encodeURIComponent(`Portfolio inquiry from ${fd.get('name')}`)
              const body = encodeURIComponent(`From: ${fd.get('name')} <${fd.get('email')}>\n\n${fd.get('message')}\n\n— via tertho portfolio`)
              window.location.href = `mailto:terthoghosh1@gmail.com?subject=${subject}&body=${body}`
            }} className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-5 sm:p-6">
              <div className="text-sm font-medium">Send a message</div>
              <div className="text-xs text-zinc-500">Professional contact — opens your email client. Works on GitHub Pages, no backend.</div>
              <div className="mt-4 grid gap-3">
                <input name="name" required placeholder="Your name" autoComplete="name" className="h-11 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-sm" />
                <input name="email" required type="email" placeholder="Your email" autoComplete="email" className="h-11 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-sm" />
                <textarea name="message" required rows={4} placeholder="Tell me about the role / project — goals, timeline, what you need..." className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-sm resize-y min-h-[110px]" />
                <button type="submit" className="h-11 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition text-sm">Send via email →</button>
                <div className="text-[11px] text-zinc-500 text-center leading-relaxed">Or copy: <button type="button" onClick={()=>{
                    navigator.clipboard.writeText('terthoghosh1@gmail.com'); setCopied(true); setTimeout(()=>setCopied(false),1500)
                  }} className="underline decoration-dotted underline-offset-4 font-mono">{copied ? 'copied ✓' : 'terthoghosh1@gmail.com'}</button></div>
              </div>
            </form>
          </div>
        </div>
        <footer className="mt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-zinc-500 border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <span className="text-center md:text-left">© {new Date().getFullYear()} Tertho Ghosh • CSE JnU • AI/ML • Python • Web • QA — Clean, responsive, auditable.</span>
          <span className="flex items-center gap-4">
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white">Top ↑</a>
            <a href="/Tertho_Ghosh_CV.pdf" className="hover:text-zinc-900 dark:hover:text-white">CV</a>
          </span>
        </footer>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[70] p-4 grid place-items-center">
            <div onClick={()=>setSelected(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{y:12, opacity:0}} animate={{y:0, opacity:1}} exit={{y:12, opacity:0}} className="relative w-full max-w-[720px] rounded-[24px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="h-1 bg-gradient-to-r from-violet-600 to-emerald-500" />
              <button onClick={()=>setSelected(null)} className="absolute top-4 right-4 w-9 h-9 grid place-items-center rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"><X size={16}/></button>
              <div className="p-6 sm:p-8">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black grid place-items-center font-mono font-bold">{selected.image}</div>
                <h3 className="mt-4 font-display text-xl sm:text-2xl font-semibold">{selected.title}</h3>
                <div className="text-sm text-zinc-500">{selected.subtitle}</div>
                <div className="mt-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">{selected.stats}</div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{selected.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">{selected.stack.map(s=> <span key={s} className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs border border-zinc-200 dark:border-zinc-700">{s}</span>)}</div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {selected.links.github && <a href={selected.links.github} target="_blank" className="px-5 h-10 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black inline-flex items-center gap-2 text-sm font-medium"><Github size={16}/> GitHub</a>}
                  {selected.links.demo && <a href={selected.links.demo} target="_blank" className="px-5 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 inline-flex items-center gap-2 text-sm font-medium"><ExternalLink size={16}/> Live demo</a>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 hidden md:flex items-center gap-2 z-40">
        <a href="https://github.com/Tertho1" target="_blank" aria-label="GitHub" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 grid place-items-center shadow-lg hover:scale-105 transition"><Github size={16}/></a>
        <a href="#contact" className="px-4 h-10 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black inline-flex items-center gap-2 text-sm font-medium shadow-lg"><Mail size={14}/> Contact</a>
      </div>

      {/* Back to top - adopted from friend's portfolio but minimal zinc style */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="fixed bottom-4 left-4 md:bottom-6 md:left-6 w-11 h-11 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black grid place-items-center shadow-lg border border-zinc-200 dark:border-zinc-800 z-40 hover:scale-105 transition"
          >
            <ChevronRight size={18} className="-rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
