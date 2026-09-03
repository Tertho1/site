import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import {
  Mail, MapPin, Phone, ExternalLink, ArrowUpRight, X, Sun, Moon,
  Shield, Code2, Database, Network, Cpu, Search, Sparkles, Award, GraduationCap,
  Briefcase, Layers, Copy, Check, Download, Menu, ChevronRight, Terminal, Lock
} from 'lucide-react'

const Github = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.26.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8a9.56 9.56 0 0 1 2.5.34c1.9-1.29 2.74-1.02 2.74-1.02.56 1.38.21 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2z"/></svg>
)
const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
)

// -- Data --
const projects = [
  {
    id: 'plagioscale',
    title: 'PlagioScale',
    subtitle: 'Cloud-native Plagiarism & AI-Content Detection',
    desc: 'Microservices platform with hybrid TF-IDF + SBERT pipeline, transformer-based AI detection, JWT/CSRF/RBAC, Prometheus+Grafana, audit logs.',
    stack: ['Python','FastAPI','React','PostgreSQL','Redis','Docker','Microservices','Prometheus','Grafana'],
    highlight: true,
    image: 'PS',
    links: { github: 'https://github.com/Tertho1', demo: null },
    stats: 'Hybrid lexical + semantic • Autoscaling worker',
  },
  {
    id: 'cvinsight',
    title: 'CVInsight',
    subtitle: 'AI Resume ↔ Job Matching',
    desc: 'XGBoost scoring (0–100) on 6,241 labeled pairs, 384-d embeddings + 12 engineered features, deployed on Streamlit.',
    stack: ['Python','NLP','Scikit-learn','XGBoost','Streamlit'],
    highlight: true,
    image: 'CV',
    links: { github: 'https://github.com/Tertho1', demo: 'https://cvinsight-io.streamlit.app' },
    stats: '6,241 pairs • 384-d embeddings',
  },
  {
    id: 'truemedic',
    title: 'TrueMedic',
    subtitle: 'Doctor Verification System',
    desc: 'Database-driven Android app with API-based verification, auth, RBAC and validation workflows on Supabase.',
    stack: ['Supabase','SQL','API','Auth'],
    highlight: false,
    image: 'TM',
    links: { github: 'https://github.com/Tertho1' },
  },
  {
    id: 'netlab',
    title: 'Network Routing & Security Lab',
    subtitle: 'IPv4/IPv6 Multi-Router Topology',
    desc: 'Designed multi-router topologies, configured RIP/OSPF/BGP, subnetting & troubleshooting in Cisco Packet Tracer.',
    stack: ['Cisco Packet Tracer','IPv4/IPv6','OSPF','BGP'],
    highlight: false,
    image: 'NL',
    links: {},
  },
]

const skills = [
  { group: 'Security & Networking', icon: Shield, items: ['TCP/IP','OSI','Subnetting','OSPF/BGP','Cryptography','OSINT','Recon','Access Control'], color: 'emerald' },
  { group: 'Systems & OS', icon: Terminal, items: ['Ubuntu','Kali Linux','Linux CLI','OS Fundamentals','Troubleshooting','Server Ops'], color: 'zinc' },
  { group: 'Development', icon: Code2, items: ['Python','FastAPI','React','Docker','Microservices','Git','Supabase','Cisco PT'], color: 'blue' },
  { group: 'Data & ML', icon: Database, items: ['PostgreSQL','MySQL','Pandas','NumPy','Scikit-learn','NLP','Torch','XGBoost'], color: 'violet' },
]

const experiences = [
  {
    role: 'Research Trainee',
    org: 'ITRRC Cybersecurity Research Lab, Jagannath University',
    period: 'Jan 2025 — Jul 2025',
    bullets: ['Founding cohort of university cybersecurity lab (6-month intensive)','Ubuntu/Kali, user/privilege mgmt, OS & network security','OSINT, reconnaissance, port sweeping, active/passive attacks'],
    current: false,
  },
  {
    role: 'Head — Budget & Finance',
    org: 'TEDxJnU',
    period: '2025',
    bullets: ['Led 6-member finance team for 500+ person event, 50+ organizers','Budget estimation, sponsorship & registration fund allocation','Live ops: registration desk, food distribution, final financial report'],
    current: false,
  },
  {
    role: 'Treasurer',
    org: 'IEEE Student Branch, Jagannath University',
    period: 'Jan 2025 — Feb 2026',
    bullets: ['Treasury & financial coordination for branch activities','Financial record keeping & event finance support'],
    current: true,
  },
]

function useTyping(words, speed=80, pause=1800){
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
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const typing = useTyping(['Cybersecurity Researcher','IT Audit & GITC Enthusiast','Full-Stack Builder','Competitive Programmer'],70,1500)
  const heroRef = useRef(null)

  useEffect(()=>{
    if(dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  },[dark])

  // load saved theme
  useEffect(()=>{
    const m = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDark(m)
  },[])

  const filtered = filter==='All' ? projects : projects.filter(p=> p.stack.includes(filter) || (filter==='Featured' && p.highlight))

  return (
    <div className="min-h-screen relative">
      {/* progress */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-zinc-900 dark:bg-white origin-left z-[60]" />

      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#fcfcf9]/70 dark:bg-[#0a0a0a]/70 border-b border-zinc-200/60 dark:border-zinc-800">
        <div className="max-w-[1120px] mx-auto px-6 h-[64px] flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black grid place-items-center font-mono text-[13px] font-bold">TG</div>
            <span className="font-display font-semibold tracking-tight">Tertho Ghosh</span>
            <span className="hidden sm:inline text-xs px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">Available for IT Audit / Security roles</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {['About','Skills','Projects','Experience','Contact'].map(s=> (
              <a key={s} href={`#${s.toLowerCase()}`} className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">{s}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={()=>setDark(!dark)} className="w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 grid place-items-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">
              {dark ? <Sun size={16}/> : <Moon size={16}/>}
            </button>
            <a href="/Tertho_Ghosh_CV.pdf" target="_blank" className="hidden sm:inline-flex items-center gap-2 px-4 h-9 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 transition">
              <Download size={14}/> CV
            </a>
            <button onClick={()=>setMenuOpen(!menuOpen)} className="md:hidden w-9 h-9 grid place-items-center rounded-full border border-zinc-200 dark:border-zinc-800">
              {menuOpen ? <X size={16}/> : <Menu size={16}/>}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{height:0}} animate={{height:'auto'}} exit={{height:0}} className="md:hidden overflow-hidden border-t border-zinc-200 dark:border-zinc-800">
              <div className="px-6 py-4 flex flex-col gap-3 text-sm">
                {['About','Skills','Projects','Experience','Contact'].map(s=> <a key={s} onClick={()=>setMenuOpen(false)} href={`#${s.toLowerCase()}`} className="py-2">{s}</a>)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="max-w-[1120px] mx-auto px-6 pt-12 md:pt-20 pb-12">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
          <div>
            <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Dhaka, Bangladesh • 3.88 / 4.00 CGPA • JnU CSE ’26
            </motion.div>
            <motion.h1 initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.05}} className="font-display font-semibold tracking-[-0.04em] leading-[0.9] text-[42px] md:text-[64px] mt-6">
              Tertho<br/>Ghosh
              <span className="block text-[16px] md:text-[18px] font-sans font-normal tracking-normal leading-normal mt-4 text-zinc-600 dark:text-zinc-400 max-w-[560px]">
                CSE graduate, cybersecurity research trainee, and builder of cloud-native systems. I bridge <span className="text-zinc-900 dark:text-white font-medium">security, audit & engineering</span> — from threat recon to production microservices.
              </span>
            </motion.h1>

            <div className="mt-6 h-8 flex items-center gap-2 font-mono text-sm">
              <span className="text-zinc-400">I am a</span>
              <span className="px-3 py-1 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-medium">{typing}<span className="animate-pulse">|</span></span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition">
                View projects <ArrowUpRight size={16}/>
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-6 h-11 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-medium">
                Contact me <Mail size={16}/>
              </a>
              <a href="https://github.com/Tertho1" target="_blank" className="w-11 h-11 grid place-items-center rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
                <Github size={18}/>
              </a>
              <a href="https://linkedin.com/in/tertho-ghosh" target="_blank" className="w-11 h-11 grid place-items-center rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
                <Linkedin size={18}/>
              </a>
            </div>

            {/* stats */}
            <div className="mt-10 grid grid-cols-3 divide-x divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900">
              {[
                {k:'500+', v:'Problems solved', sub:'Codeforces Pupil'},
                {k:'6 mo', v:'Cybersecurity Lab', sub:'ITRRC Founding cohort'},
                {k:'3.88', v:'CGPA', sub:'Jagannath Univ • NDC 5.00'},
              ].map(s=>(
                <div key={s.k} className="px-4 md:px-6 py-5">
                  <div className="font-display text-2xl font-semibold">{s.k}</div>
                  <div className="text-xs font-medium text-zinc-900 dark:text-white">{s.v}</div>
                  <div className="text-[11px] text-zinc-500">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <motion.div initial={{opacity:0, y:12}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="relative">
            {/* bento preview */}
            <div className="rounded-[24px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-zinc-500">tertho@portfolio — zsh</span>
                </div>
                <span className="text-[11px] px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 font-mono">plagioscale.sh</span>
              </div>
              <div className="mt-6 font-mono text-[12px] leading-5">
                <div className="text-zinc-500">$ whoami</div>
                <div>Tertho Ghosh — CSE • Security • Full-Stack</div>
                <div className="text-zinc-500 mt-3">$ ls ~/projects</div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {projects.slice(0,4).map(p=>(
                    <div key={p.id} className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 bg-zinc-50 dark:bg-zinc-800/50">
                      <div className="font-semibold text-zinc-900 dark:text-white">{p.title}</div>
                      <div className="text-[11px] text-zinc-500 line-clamp-1">{p.subtitle}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="px-2 py-1 rounded bg-emerald-500 text-white text-[11px]">● live</span>
                  <span className="text-zinc-500">Monitoring: Prometheus + Grafana</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <motion.div initial={{width: '20%'}} animate={{width: '78%'}} transition={{duration:1.2, delay:0.5}} className="h-full bg-zinc-900 dark:bg-white" />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2">
                <a href="mailto:terthoghosh1@gmail.com" className="col-span-2 flex items-center justify-center gap-2 h-10 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-medium">
                  <Mail size={14}/> terthoghosh1@gmail.com
                </a>
                <button onClick={()=>{
                  navigator.clipboard.writeText('terthoghosh1@gmail.com'); setCopied(true); setTimeout(()=>setCopied(false),1500)
                }} className="h-10 grid place-items-center rounded-xl border border-zinc-200 dark:border-zinc-700">
                  {copied ? <Check size={16} className="text-emerald-600"/> : <Copy size={16}/>}
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
                <MapPin size={12}/> Dhaka • <Phone size={12}/> 01610-466644 • Open to IT Audit / GITC / Security roles
              </div>
            </div>

            {/* floating badge */}
            <motion.div animate={{y:[0, -6, 0]}} transition={{duration:4, repeat:Infinity, ease:'easeInOut'}} className="hidden md:flex absolute -bottom-4 -left-4 items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-violet-600 grid place-items-center text-white"><Sparkles size={18}/></div>
              <div>
                <div className="text-xs font-semibold">Beyond the CV</div>
                <div className="text-[11px] text-zinc-500">Tell me your full story — I’ll showcase it here</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-[1120px] mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-zinc-500"><span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white"/> About</div>
            <h2 className="font-display text-[28px] font-semibold tracking-tight mt-3">Clean mind, sharp systems.</h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Computer Science & Engineering graduate from Jagannath University (7th sem 3.88, 8th sem completed — final result Dec 2026). I love going deep into how things work — from OS privileges and TCP/IP to SBERT embeddings and audit controls.
              This CV was tailored for an IT Audit role, but my story is wider: competitive programming (500+ problems, Codeforces Pupil), founding cohort at ITRRC Cybersecurity Research Lab, and shipping end-to-end products like <span className="font-medium text-zinc-900 dark:text-white">PlagioScale</span> and <span className="font-medium text-zinc-900 dark:text-white">CVInsight</span> — designed, built, tested, deployed, and monitored solo.
            </p>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              I’ve also led people and money: 6-member finance team at TEDxJnU (500+ participants) and treasurer at IEEE JnU. I document obsessively, test thoroughly, and care about audit trails, evidence, and controls — whether it’s GITC, change management, or just clean code.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['IT Audit','GITC','Risk & Controls','Network Security','Cloud Native','ML/NLP'].map(t=>(
                <span key={t} className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium border border-zinc-200 dark:border-zinc-700">{t}</span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-white p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-emerald-500/20" />
              <div className="relative">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400"><Lock size={12}/> Availability</div>
                <div className="mt-2 font-display text-xl">Open to entry-level IT Audit / GITC / Security roles</div>
                <div className="mt-2 text-sm text-zinc-300">Based in Dhaka — open to on-site / hybrid. Also building freelance security & web projects.</div>
                <a href="#contact" className="mt-4 inline-flex items-center gap-2 px-4 h-10 rounded-full bg-white text-black text-sm font-medium">Let’s talk <ChevronRight size={14}/></a>
              </div>
            </div>
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500"><GraduationCap size={14}/> Education</div>
              <div className="mt-3 space-y-3 text-sm">
                <div>
                  <div className="font-medium">B.Sc. CSE — Jagannath University</div>
                  <div className="text-zinc-500">2026 • 3.88/4.00 • 8th sem completed</div>
                </div>
                <div>
                  <div className="font-medium">HSC — Notre Dame College, Dhaka</div>
                  <div className="text-zinc-500">2020 • GPA 5.00</div>
                </div>
                <div>
                  <div className="font-medium">SSC — Lalmohan Secondary School, Bhola</div>
                  <div className="text-zinc-500">2018 • GPA 5.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-[1120px] mx-auto px-6 py-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Capabilities</h2>
          <span className="text-xs font-mono text-zinc-500">Hover to explore • Minimal, not junior</span>
        </div>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map(s=>(
            <motion.div key={s.group} whileHover={{y:-4}} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black grid place-items-center">
                <s.icon size={18}/>
              </div>
              <div className="mt-4 font-medium">{s.group}</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.items.map(i=>(
                  <span key={i} className="px-2 py-1 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[11px] font-medium">{i}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 p-4 flex flex-wrap items-center gap-3 text-xs">
          <span className="font-mono text-zinc-500">IT Audit interests:</span>
          {['IT Audit','GITC','Access Controls','Change Management','IT Operations','Audit Evidence','Control Testing'].map(t=>(
            <span key={t} className="px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200">{t}</span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-[1120px] mx-auto px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Selected work</h2>
            <p className="text-sm text-zinc-500 mt-1">Real systems, shipped end-to-end — not tutorials. Click for details.</p>
          </div>
          <div className="flex items-center gap-2 p-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            {['All','Featured','FastAPI','React','Python'].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} className={`px-4 h-8 rounded-full text-xs font-medium transition ${filter===f ? 'bg-zinc-900 dark:bg-white text-white dark:text-black' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-5">
          {filtered.map(p=>(
            <motion.div key={p.id} layout initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} whileHover={{y:-4}} className="group relative rounded-[24px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden cursor-pointer" onClick={()=>setSelected(p)}>
              <div className={`h-1 w-full ${p.highlight ? 'bg-gradient-to-r from-violet-600 to-emerald-500' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black grid place-items-center font-mono font-bold text-sm">{p.image}</div>
                    <div>
                      <div className="font-semibold leading-tight">{p.title}</div>
                      <div className="text-xs text-zinc-500">{p.subtitle}</div>
                      <div className="mt-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">{p.stats}</div>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition" />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map(s=> <span key={s} className="px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[11px] border border-zinc-200 dark:border-zinc-700">{s}</span>)}
                </div>
                <div className="mt-4 flex gap-2">
                  {p.links.github && <span className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black text-xs"><Github size={12}/> GitHub</span>}
                  {p.links.demo && <span className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 text-xs"><ExternalLink size={12}/> Live</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm"><span className="font-medium">Want the full story?</span> <span className="text-zinc-500">Your CV was tailored for one role — this portfolio can tell the rest.</span></div>
          <a href="#contact" className="px-4 h-9 inline-flex items-center gap-2 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-medium">Tell me more <ChevronRight size={14}/></a>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="max-w-[1120px] mx-auto px-6 py-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Experience & Leadership</h2>
        <div className="mt-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="space-y-4">
            {experiences.map(e=>(
              <div key={e.org} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 relative">
                {e.current && <span className="absolute top-4 right-4 text-[10px] tracking-widest font-mono px-2 py-1 rounded-full bg-emerald-500 text-white">CURRENT</span>}
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-500"><Briefcase size={12}/> {e.period}</div>
                <div className="mt-2 font-semibold">{e.role}</div>
                <div className="text-sm text-zinc-500">{e.org}</div>
                <ul className="mt-3 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400 list-disc pl-5">
                  {e.bullets.map(b=> <li key={b}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500"><Award size={14}/> Certifications & Activities</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0"/> Cisco Intro to Cybersecurity — Networking Academy</li>
                <li className="flex gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0"/> ICPC 2024 — DIU • IUPC KUET & AUST 2025</li>
                <li className="flex gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0"/> PTIB Civic Tech, Sustainovate & other tech programs</li>
              </ul>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  {n:'Codeforces', v:'Pupil'},
                  {n:'Problems', v:'500+'},
                  {n:'Stacks', v:'Full-stack'},
                ].map(s=>(
                  <div key={s.n} className="rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 py-3">
                    <div className="text-xs text-zinc-500">{s.n}</div>
                    <div className="text-sm font-semibold">{s.v}</div>
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
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-[1120px] mx-auto px-6 py-10">
        <div className="rounded-[32px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-zinc-500"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"/> Contact</div>
              <h2 className="font-display text-3xl font-semibold tracking-tight mt-3">Let’s build something secure — and auditable.</h2>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">I’m exploring IT Audit / GITC / IT Risk & Security roles, but also open to freelance product builds. Fast replies on email.</p>
              <div className="mt-6 space-y-3 text-sm">
                <a href="mailto:terthoghosh1@gmail.com" className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition">
                  <span className="w-9 h-9 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black grid place-items-center"><Mail size={16}/></span>
                  <span><span className="font-medium">terthoghosh1@gmail.com</span><span className="block text-xs text-zinc-500">Email — best way to reach</span></span>
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <a href="tel:01610466644" className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <Phone size={16}/> 01610-466644
                  </a>
                  <div className="flex items-center gap-2 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800"><MapPin size={16}/> Dhaka, Bangladesh</div>
                </div>
                <div className="flex gap-2">
                  <a href="https://github.com/Tertho1" target="_blank" className="flex-1 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 grid place-items-center gap-2 flex items-center justify-center text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800"><Github size={16}/> GitHub</a>
                  <a href="https://linkedin.com/in/tertho-ghosh" target="_blank" className="flex-1 h-10 rounded-xl bg-[#0A66C2] text-white grid place-items-center flex items-center justify-center gap-2 text-sm font-medium"><Linkedin size={16}/> LinkedIn</a>
                </div>
              </div>
            </div>
            <form onSubmit={e=>{
              e.preventDefault()
              const fd = new FormData(e.currentTarget)
              const subject = encodeURIComponent(`Portfolio inquiry from ${fd.get('name')}`)
              const body = encodeURIComponent(`From: ${fd.get('name')} <${fd.get('email')}>\n\n${fd.get('message')}`)
              window.location.href = `mailto:terthoghosh1@gmail.com?subject=${subject}&body=${body}`
            }} className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-6">
              <div className="text-sm font-medium">Send a message</div>
              <div className="text-xs text-zinc-500">Opens your email client — no backend needed (works on GitHub Pages).</div>
              <div className="mt-4 grid gap-3">
                <input name="name" required placeholder="Your name" className="h-11 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900/10" />
                <input name="email" required type="email" placeholder="Your email" className="h-11 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900/10" />
                <textarea name="message" required rows={4} placeholder="Tell me about the role / project..." className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 outline-none focus:ring-2 focus:ring-zinc-900/10" />
                <button type="submit" className="h-11 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition">Send email →</button>
                <div className="text-[11px] text-zinc-500 text-center">Or copy email <button type="button" onClick={()=>{
                    navigator.clipboard.writeText('terthoghosh1@gmail.com'); setCopied(true); setTimeout(()=>setCopied(false),1500)
                  }} className="underline">{copied ? 'copied!' : 'terthoghosh1@gmail.com'}</button></div>
              </div>
            </form>
          </div>
        </div>
        <footer className="mt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-zinc-500 border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <span>© {new Date().getFullYear()} Tertho Ghosh • Built with React + Tailwind • Clean, minimal, auditable.</span>
          <span className="flex items-center gap-4">
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white">Back to top ↑</a>
            <a href="/Tertho_Ghosh_CV.pdf" className="hover:text-zinc-900 dark:hover:text-white">Download CV</a>
          </span>
        </footer>
      </section>

      {/* Project modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[70] p-4 md:p-6 grid place-items-center">
            <div onClick={()=>setSelected(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{y:12, opacity:0}} animate={{y:0, opacity:1}} exit={{y:12, opacity:0}} className="relative w-full max-w-[720px] rounded-[24px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden max-h-[90vh] overflow-y-auto">
              <div className="h-1 bg-gradient-to-r from-violet-600 to-emerald-500" />
              <button onClick={()=>setSelected(null)} className="absolute top-4 right-4 w-9 h-9 grid place-items-center rounded-full bg-zinc-100 dark:bg-zinc-800"><X size={16}/></button>
              <div className="p-6 md:p-8">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black grid place-items-center font-mono font-bold">{selected.image}</div>
                <h3 className="mt-4 font-display text-2xl font-semibold">{selected.title}</h3>
                <div className="text-sm text-zinc-500">{selected.subtitle}</div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{selected.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">{selected.stack.map(s=> <span key={s} className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs border border-zinc-200 dark:border-zinc-700">{s}</span>)}</div>
                <div className="mt-6 flex gap-2">
                  {selected.links.github && <a href={selected.links.github} target="_blank" className="px-5 h-10 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black inline-flex items-center gap-2 text-sm font-medium"><Github size={16}/> GitHub</a>}
                  {selected.links.demo && <a href={selected.links.demo} target="_blank" className="px-5 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 inline-flex items-center gap-2 text-sm font-medium"><ExternalLink size={16}/> Live demo</a>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating quick actions */}
      <div className="fixed bottom-4 right-4 hidden md:flex items-center gap-2">
        <a href="https://github.com/Tertho1" target="_blank" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 grid place-items-center shadow-lg hover:scale-105 transition"><Github size={16}/></a>
        <a href="mailto:terthoghosh1@gmail.com" className="px-4 h-10 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black inline-flex items-center gap-2 text-sm font-medium shadow-lg"><Mail size={14}/> Hire me</a>
      </div>
    </div>
  )
}
