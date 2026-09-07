import { useState } from 'react'
import { LogRow, Eyebrow } from './LogRow.jsx'

export function Contact() {
  const [formStatus, setFormStatus] = useState({ state: 'idle', msg: '' })
  const [cooldown, setCooldown] = useState(0)

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const fd = new FormData(form)
    if (fd.get('_hp')) { setFormStatus({ state: 'success', msg: 'Message sent ✓ — I will reply soon.' }); form.reset(); return }
    const name = (fd.get('name')||'').toString().trim(), email = (fd.get('email')||'').toString().trim(), topic = (fd.get('topic')||'').toString().trim(), message = (fd.get('message')||'').toString().trim()
    if (!name || !email || !topic || !message) { setFormStatus({ state: 'error', msg: 'Please fill in all fields — name, email, topic, and message are required.' }); return }
    if (message.length < 10) { setFormStatus({ state: 'error', msg: 'Please provide a bit more detail in your message (at least 10 characters).' }); return }
    const fullMessage = `[Topic: ${topic}]\n\n${message}`
    setFormStatus({ state: 'sending', msg: '' })
    const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
    const hasWeb3Key = WEB3FORMS_KEY && !WEB3FORMS_KEY.includes('YOUR_')
    if (!hasWeb3Key) {
      setFormStatus({ state: 'error', msg: 'Form is not configured yet (missing key). Please reach me via LinkedIn or GitHub in the meantime.' })
      return
    }
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, name, email, message: fullMessage, subject: `Portfolio inquiry from ${name}${topic ? ` — ${topic}` : ''}`, from_name: 'Tertho Portfolio' }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || 'web3 failed')
      setFormStatus({ state: 'success', msg: 'Message sent ✓ — I will reply within 24 hours.' })
      form.reset()
      setCooldown(30)
      const id = setInterval(() => setCooldown(c => { if (c <= 1) { clearInterval(id); setFormStatus({ state: 'idle', msg: '' }); return 0 } return c - 1 }), 1000)
    } catch {
      setFormStatus({ state: 'error', msg: 'Could not send right now. Please try again or reach me via LinkedIn/GitHub.' })
    }
  }

  return (
    <section id="contact">
      <LogRow n={6} className="pb-12 sm:pb-16">
        <Eyebrow>contact</Eyebrow>
        <div className="mt-3 grid lg:grid-cols-[0.82fr_1.18fr] gap-8 lg:gap-10 items-start">
          <div className="min-w-0">
            <h2 className="text-[22px] sm:text-[28px] font-semibold tracking-tight leading-tight">Let's talk.</h2>
            <p className="mt-3 text-[14px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              I enjoy connecting over <span className="text-zinc-900 dark:text-white font-medium">new roles, joint builds, or casual conversations</span> around tech, fresh ideas, and community-driven initiatives — whether you have a concrete plan in <span className="text-zinc-900 dark:text-white font-medium">AI/ML, security, or web systems</span> or just an early spark to talk through. All stages are welcome.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {['AI/ML','LLMs','Security','Web','Python','QA'].map(t=>(
                <span key={t} className="px-2.5 py-1 rounded-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[11px] font-medium text-zinc-600 dark:text-zinc-300">{t}</span>
              ))}
            </div>
            <p className="mt-4 text-[12px] text-zinc-500">Your message goes directly to me. I typically respond within 24 hours.</p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-sm grid gap-4">
          <input type="text" name="_hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <label htmlFor="contact-name" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Name <span className="text-red-500">*</span></label>
              <input id="contact-name" name="name" required placeholder="Your full name" autoComplete="name" disabled={formStatus.state === 'sending' || cooldown>0} className="h-11 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 outline-none focus:ring-2 focus:ring-flag/30 focus:border-flag focus:bg-white dark:focus:bg-zinc-900 text-sm disabled:opacity-60" />
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="contact-email" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Email <span className="text-red-500">*</span></label>
              <input id="contact-email" name="email" required type="email" placeholder="you@company.com" autoComplete="email" disabled={formStatus.state === 'sending' || cooldown>0} className="h-11 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 outline-none focus:ring-2 focus:ring-flag/30 focus:border-flag focus:bg-white dark:focus:bg-zinc-900 text-sm disabled:opacity-60" />
            </div>
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="contact-topic" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Topic <span className="text-red-500">*</span></label>
            <input id="contact-topic" name="topic" required placeholder="What do you want to discuss?" autoComplete="off" disabled={formStatus.state === 'sending' || cooldown>0} className="h-11 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 outline-none focus:ring-2 focus:ring-flag/30 focus:border-flag focus:bg-white dark:focus:bg-zinc-900 text-sm disabled:opacity-60" />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="contact-message" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Message <span className="text-red-500">*</span></label>
              <textarea id="contact-message" name="message" required rows={4} placeholder="Tell me about the role, project, timeline, or question…" disabled={formStatus.state === 'sending' || cooldown>0} className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 outline-none focus:ring-2 focus:ring-flag/30 focus:border-flag focus:bg-white dark:focus:bg-zinc-900 text-sm resize-y min-h-[120px] disabled:opacity-60" />
          </div>
          <button type="submit" disabled={formStatus.state === 'sending' || cooldown>0} className="h-11 rounded-xl bg-ink dark:bg-white text-white dark:text-ink text-sm font-medium hover:opacity-90 transition disabled:opacity-60 shadow-sm">
            {formStatus.state === 'sending' ? 'Sending…' : cooldown>0 ? `Sent ✓ — retry in ${cooldown}s` : formStatus.state === 'success' ? 'Sent ✓' : 'Send message →'}
          </button>
          {formStatus.msg && (
            <div role="status" aria-live="polite" className={`text-xs px-3 py-2.5 rounded-xl border ${formStatus.state === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300' : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'}`}>
              {formStatus.msg}
            </div>
          )}
          </form>
        </div>
      </LogRow>
    </section>
  )
}
