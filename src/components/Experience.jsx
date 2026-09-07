import { LogRow, Eyebrow } from './LogRow.jsx'
import { experiences, volunteering, education } from '../data/site.js'
export function Experience() {
  return (
    <section id="experience">
      <LogRow n={4}>
        <Eyebrow>experience</Eyebrow>
        <h2 className="mt-3 text-[22px] sm:text-[28px] font-semibold tracking-tight leading-tight">Where I've built and led.</h2>
        <div className="mt-6 space-y-8">
          {experiences.map(e => (
            <div key={e.role}>
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <div className="font-medium text-[15px]">{e.role} <span className="text-zinc-500 font-normal">— {e.org}</span></div>
                <div className="font-mono text-xs text-zinc-500 shrink-0">{e.period}{e.current && <span className="text-flag"> · current</span>}</div>
              </div>
              <ul className="mt-1.5 space-y-1">
                {e.bullets.map(b => <li key={b} className="text-[13px] text-zinc-600 dark:text-zinc-400 pl-3 relative before:content-['—'] before:absolute before:left-0 before:text-zinc-300 dark:before:text-zinc-700">{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <div className="text-[13px] font-medium text-zinc-500">Education</div>
          <div className="mt-3 space-y-3">
            {education.map(e => (
              <div key={e.degree} className="flex items-baseline justify-between gap-3 flex-wrap text-[13px]">
                <span className={`font-medium ${e.highlight ? 'text-zinc-900 dark:text-white' : ''}`}>{e.degree}</span>
                <span className="font-mono text-xs text-zinc-500">{e.meta}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <div className="text-[13px] font-medium text-zinc-500">Volunteering</div>
          <div className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-3">
            {volunteering.map(v => (
              <div key={v.title} className="text-[13px]">
                <span className="font-medium">{v.title}</span>
                <div className="text-zinc-600 dark:text-zinc-400">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </LogRow>
    </section>
  )
}
