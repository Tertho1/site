import { LogRow, Eyebrow } from './LogRow.jsx'
import { skills } from '../data/site.js'
export function Skills() {
  return (
    <section id="skills">
      <LogRow n={2}>
        <Eyebrow>skills</Eyebrow>
        <h2 className="mt-3 text-[22px] sm:text-[28px] font-semibold tracking-tight leading-tight">What I work with.</h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-6">
          {skills.map(g => (
            <div key={g.group}>
              <div className="text-[13px] font-medium">{g.group}</div>
              <div className="mt-2 text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed leading-7">{g.items.join(', ')}</div>
            </div>
          ))}
        </div>
      </LogRow>
    </section>
  )
}
