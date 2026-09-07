import { useState, useEffect, useMemo } from 'react'
export function useTyping(words, speed = 60, pause = 1500) {
  const stableWords = useMemo(() => words, []) // eslint-disable-line react-hooks/exhaustive-deps
  const [idx, setIdx] = useState(0)
  const [txt, setTxt] = useState('')
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const word = stableWords[idx]
    let inner
    const t = setTimeout(() => {
      if (!deleting) {
        if (txt.length < word.length) setTxt(word.slice(0, txt.length + 1))
        else inner = setTimeout(() => setDeleting(true), pause)
      } else {
        if (txt.length > 0) setTxt(word.slice(0, txt.length - 1))
        else { setDeleting(false); setIdx((idx + 1) % stableWords.length) }
      }
    }, deleting ? speed / 2 : speed)
    return () => { clearTimeout(t); clearTimeout(inner) }
  }, [txt, deleting, idx, stableWords, speed, pause])
  return txt
}
