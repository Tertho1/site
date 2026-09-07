import { ArrowLeft, Shield, Database, Layers, ExternalLink } from 'lucide-react'
import { Github } from '../components/Icons.jsx'

export function PlagioScaleCase({ onBack }) {
  return (
    <div className="max-w-[1024px] mx-auto px-4 sm:px-6 py-10">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
        <ArrowLeft size={14} /> Back to portfolio
      </button>
      <div className="mt-6">
        <div className="font-mono text-xs text-flag">case study — flagged project</div>
        <h1 className="mt-2 text-[28px] sm:text-[36px] font-semibold tracking-tight">PlagioScale</h1>
        <p className="text-sm text-zinc-500">Microservices plagiarism & AI-detection platform — from idea to audit-ready deployment.</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {['Python','FastAPI','React','PostgreSQL','Redis','Docker','Microservices'].map(s=> <span key={s} className="px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs">{s}</span>)}
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <a href="https://github.com/Tertho1/PlagioScale" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-flag"><Github size={14}/> GitHub</a>
        </div>
      </div>

      <div className="mt-8 grid gap-8">
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6">
          <h2 className="font-medium flex items-center gap-2"><Layers size={16} className="text-flag"/> Architecture</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Cloud-native microservices: <span className="font-medium text-zinc-900 dark:text-white">API → Worker → Autoscaling → Monitoring → Frontend</span>. PostgreSQL for assignment workflow, Redis for queues, Prometheus+Grafana for observability. JWT + CSRF + RBAC + rate-limit + file validation + audit logging at the edge.
          </p>
          <div className="mt-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-dashed border-zinc-300 dark:border-zinc-700 p-4 font-mono text-xs text-zinc-500">
            API (FastAPI) → Redis Queue → Worker (autoscaled) → PostgreSQL/Redis → Frontend (React) → Prometheus/Grafana
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6">
          <h2 className="font-medium flex items-center gap-2"><Database size={16} className="text-flag"/> Detection — TF-IDF vs SBERT vs Hybrid</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="font-mono text-xs text-zinc-500"><tr><th className="text-left py-2">Method</th><th className="text-left">Strength</th><th className="text-left">Limitation</th></tr></thead>
              <tbody className="text-zinc-600 dark:text-zinc-400">
                <tr className="border-t border-zinc-200 dark:border-zinc-800"><td className="py-2 font-medium text-zinc-900 dark:text-white">TF-IDF</td><td>Lexical exactness, fast</td><td>Paraphrase blind</td></tr>
                <tr className="border-t border-zinc-200 dark:border-zinc-800"><td className="py-2 font-medium text-zinc-900 dark:text-white">SBERT</td><td>Semantic paraphrase</td><td>Needs embedding infra</td></tr>
                <tr className="border-t border-zinc-200 dark:border-zinc-800"><td className="py-2 font-medium text-flag">Hybrid (shipped)</td><td>Best of both + calibrated thresholds</td><td>Tuned per assignment type</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-zinc-500">AI-content detection: transformer-based classifier + stylometric features, with audit-ready reports per submission.</p>
        </section>

        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6">
          <h2 className="font-medium flex items-center gap-2"><Shield size={16} className="text-flag"/> Security & Audit trail</h2>
          <ul className="mt-2 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400 list-disc pl-5">
            <li>JWT auth, CSRF protection, RBAC (student/teacher/admin)</li>
            <li>Rate limiting + file validation + session invalidation</li>
            <li>Immutable audit logs + admin view — who checked what, when</li>
            <li>Automated tests across backend & frontend; monitoring via Prometheus/Grafana</li>
          </ul>
        </section>

        <div className="flex flex-wrap gap-3">
          <button onClick={onBack} className="px-5 h-10 rounded-full bg-ink dark:bg-white text-white dark:text-ink text-sm font-medium">← Back to work</button>
          <a href="https://github.com/Tertho1/PlagioScale" target="_blank" rel="noopener noreferrer" className="px-5 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 inline-flex items-center gap-2 text-sm"><ExternalLink size={14}/> GitHub</a>
        </div>
      </div>
    </div>
  )
}
