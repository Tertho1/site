import { LogRow, Eyebrow } from './LogRow.jsx'
export function About() {
  return (
    <section id="about">
      <LogRow n={1}>
        <Eyebrow>about</Eyebrow>
        <h2 className="mt-3 text-[22px] sm:text-[28px] font-semibold tracking-tight leading-tight">Someone who finishes what they start.</h2>
        <p className="mt-4 text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[68ch]">
          I'm a final-year CSE student who enjoys understanding things end-to-end — why a system behaves the way it does, not just that it works. That curiosity led me to competitive programming, to the founding cohort at ITRRC Cybersecurity Lab, and to shipping a few real projects on my own.
        </p>
        <p className="mt-4 text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[68ch]">
          For example: I built <span className="text-zinc-900 dark:text-white font-medium">PlagioScale</span> and <span className="text-zinc-900 dark:text-white font-medium">CVInsight</span> from idea to deployment, and reproduced <span className="text-zinc-900 dark:text-white font-medium">MentalQLM</span> from its paper to see where it really holds up. I try to leave things documented, tested, and easy for the next person to audit.
        </p>
        <p className="mt-4 text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[68ch]">
          Outside code I've led teams and budgets — a 6-person finance team at TEDxJnU (500+ attendees) and Treasurer at IEEE JnU. I care about clear communication, reliable evidence, and shipping things properly the first time.
        </p>
      </LogRow>
    </section>
  )
}
