import { LogRow, Eyebrow } from './LogRow.jsx'
export function Testimonials() {
  return (
    <section id="testimonials">
      <LogRow n={5}>
        <Eyebrow>testimonials</Eyebrow>
        <h2 className="mt-2 text-[22px] sm:text-[28px] font-semibold tracking-tight leading-tight">What collaborators say.</h2>
        <div className="mt-4 grid gap-4">
          <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-5">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">“TODO — owner must provide text (e.g., TEDxJnU supervisor or IEEE faculty quote with permission to publish). Placeholder keeps proof depth honest.”</p>
            <div className="mt-3 font-mono text-xs text-zinc-500">— TODO · Role · Organization</div>
          </div>
          <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-5">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">“TODO — second quote placeholder (optional). Replace with 1–2 real testimonials for strongest social proof.”</p>
            <div className="mt-3 font-mono text-xs text-zinc-500">— TODO · Role · Organization</div>
          </div>
          <p className="text-[11px] text-zinc-500">No testimonials invented — add real quotes with name/role and publish permission to reach S-tier proof.</p>
        </div>
      </LogRow>
    </section>
  )
}
