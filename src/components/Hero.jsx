import { motion } from 'framer-motion'
import { Mail, MapPin, ArrowUpRight, GraduationCap, Award, BookOpen } from 'lucide-react'
import { PHOTO_URL } from '../data/site.js'
import { Github, Linkedin, Codeforces } from './Icons.jsx'
import { useTyping } from '../hooks/useTyping.js'

export function Hero() {
  const typing = useTyping(['AI / ML & LLMs', 'web dev & QA', 'python & automation', 'cybersecurity & systems'])
  const boot = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } }
  return (
    <section className="pt-10 sm:pt-16 pb-10">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 sm:gap-10 items-start">
        <div className="min-w-0">
          <motion.h1 {...boot} transition={{ delay: 0 }} className="mt-4 text-[34px] sm:text-[46px] font-semibold tracking-tight leading-[1.05]">
            Tertho Ghosh
          </motion.h1>
          <motion.p {...boot} transition={{ delay: 0.16 }} className="mt-3 max-w-[62ch] text-[15px] sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Final-year CSE student at Jagannath University. I like turning messy ideas into things people can actually use — and I don't leave jobs half-done. Fast learner, clear communicator, happiest when I'm figuring out how something works and making it better.
          </motion.p>
          <motion.div {...boot} transition={{ delay: 0.22 }} className="mt-4 font-mono text-sm text-zinc-500 flex flex-wrap items-center gap-x-1.5">
            <span>currently building in</span>
            <span className="text-zinc-900 dark:text-white font-medium">{typing}<span className="animate-pulse">_</span></span>
          </motion.div>
          <motion.div {...boot} transition={{ delay: 0.3 }} className="mt-5 grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 font-mono text-xs text-zinc-500 max-w-[480px]">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap"><MapPin size={13} /> Dhaka, Bangladesh</span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap"><GraduationCap size={13} /> Jagannath University, Dhaka</span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap"><BookOpen size={13} /> BSc in CSE</span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap"><Award size={13} /> CGPA 3.88 / 4.00</span>
          </motion.div>
          <motion.div {...boot} transition={{ delay: 0.38 }} className="mt-7 flex flex-wrap gap-2.5">
            <a href="#projects" className="inline-flex items-center gap-1.5 px-4 h-10 rounded bg-ink dark:bg-white text-white dark:text-ink text-sm font-medium hover:opacity-90 transition">
              View projects <ArrowUpRight size={15} />
            </a>
            <a href="#contact" className="inline-flex items-center gap-1.5 px-4 h-10 rounded border border-zinc-300 dark:border-zinc-700 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">
              <Mail size={15} /> Contact
            </a>
            <a href="https://github.com/Tertho1" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-10 h-10 grid place-items-center rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">
              <Github size={16} />
            </a>
            <a href="https://www.linkedin.com/in/tertho-ghosh" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 grid place-items-center rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">
              <Linkedin size={16} />
            </a>
            <a href="https://codeforces.com/profile/terthojnu16" target="_blank" rel="noopener noreferrer" aria-label="Codeforces" className="w-10 h-10 grid place-items-center rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">
              <Codeforces size={16} />
            </a>
          </motion.div>
          <motion.div {...boot} transition={{ delay: 0.46 }} className="mt-8 grid grid-cols-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden font-mono text-xs shadow-sm">
            {[['650+', 'problems — codeforces'], ['6 Months', 'ITRRC Lab — Founding Cohort'], ['12+', 'projects shipped']].map(([k, v]) => (
              <div key={k} className="px-4 py-4 border-r last:border-r-0 border-zinc-200 dark:border-zinc-800">
                <div className="text-lg sm:text-xl font-semibold font-sans text-zinc-900 dark:text-white">{k}</div>
                <div className="mt-1 text-zinc-500 leading-tight">{v}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div {...boot} transition={{ delay: 0.12 }} className="relative min-w-0 flex justify-center lg:justify-end">
          <div className="w-full max-w-[320px] lg:max-w-[340px] rounded-[24px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.08)] self-start">
            <div className="rounded-[16px] overflow-hidden aspect-[4/5] bg-zinc-50 dark:bg-zinc-800">
              <picture>
                <source srcSet={`${import.meta.env.BASE_URL}photo.webp`} type="image/webp" />
                <img src={PHOTO_URL} alt="Tertho Ghosh" width={640} height={800} loading="eager" fetchPriority="high" className="w-full h-full object-cover object-top" />
              </picture>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
