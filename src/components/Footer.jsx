import { CV_URL } from '../data/site.js'
import { Github, Linkedin } from './Icons.jsx'
export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-[1024px] mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-zinc-500">
        <span className="text-center sm:text-left">© {new Date().getFullYear()} Tertho Ghosh · CSE, Jagannath University · Dhaka, Bangladesh</span>
        <span className="flex items-center gap-4">
          <a href="https://github.com/Tertho1" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-7 h-7 grid place-items-center rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"><Github size={12} /></a>
          <a href="https://www.linkedin.com/in/tertho-ghosh" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-7 h-7 grid place-items-center rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"><Linkedin size={12} /></a>
          <a href="#" className="hover:text-zinc-900 dark:hover:text-white">Top ↑</a>
          <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white">cv ↓</a>
        </span>
      </div>
    </footer>
  )
}
