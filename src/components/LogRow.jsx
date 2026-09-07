export function LogRow({ n, children, className = '' }) {
  return (
    <div className={`flex gap-2 sm:gap-3 -ml-1 sm:-ml-2 ${className}`}>
      <span aria-hidden="true" className="shrink-0 pt-[3px] font-mono text-[11px] sm:text-xs text-zinc-400 dark:text-zinc-600 select-none w-5 sm:w-7 text-right">
        {String(n).padStart(2, '0')}
      </span>
      <div className="min-w-0 flex-1 border-l border-zinc-200 dark:border-zinc-800 pl-3 sm:pl-4 pb-10 sm:pb-12">
        {children}
      </div>
    </div>
  )
}
export function Eyebrow({ children }) {
  return <div className="font-mono text-xs tracking-widest uppercase text-zinc-500">{children}</div>
}
