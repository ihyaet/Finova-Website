'use client'
import { useEffect, useRef, useState } from 'react'

interface TypingBadgeProps {
  text:   string
  speed?: number  // ms per character (default 38)
  delay?: number  // extra ms before typing starts (default 0)
}

export function TypingBadge({ text, speed = 38, delay = 0 }: TypingBadgeProps) {
  const ref              = useRef<HTMLDivElement>(null)
  const [vis,  setVis]  = useState(false)
  const [disp, setDisp] = useState('')
  const [done, setDone] = useState(false)

  // ── Intersection observer — trigger when badge enters view ──
  useEffect(() => {
    // Respect reduced-motion: show full text immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVis(true); setDisp(text); setDone(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); io.unobserve(el) } },
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [text])

  // ── Typing effect — starts after fade-in (150ms) + optional delay ──
  useEffect(() => {
    if (!vis) return
    let i   = 0
    let iv: ReturnType<typeof setInterval>

    const t = setTimeout(() => {
      iv = setInterval(() => {
        i++
        setDisp(text.slice(0, i))
        if (i >= text.length) { clearInterval(iv); setDone(true) }
      }, speed)
    }, 150 + delay)

    return () => { clearTimeout(t); clearInterval(iv) }
  }, [vis, text, speed, delay])

  return (
    <div
      ref={ref}
      style={{ opacity: vis ? 1 : 0, transition: 'opacity 150ms ease-out' }}
      className="inline-flex w-fit items-center gap-2 bg-primary-400/10 px-3 py-1 rounded-full"
    >
      <span className="w-1 h-[14px] rounded-[2px] bg-primary-400 shrink-0" />
      <span className="font-sans text-m font-medium uppercase tracking-widest text-primary-400">
        {disp}
        {!done && <span className="animate-blink-cursor" aria-hidden="true">|</span>}
      </span>
    </div>
  )
}
