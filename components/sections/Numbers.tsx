'use client'

import { useEffect, useRef, useState } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { TypingBadge } from '@/components/ui/TypingBadge'

const STATS = [
  { value: '99.99%', label: 'Platform uptime SLA'             },
  { value: '$10B+',  label: 'Transactions securely processed' },
  { value: '500+',   label: 'Businesses trust our platform'   },
  { value: '<80ms',  label: 'Avg API response time'           },
]

// Exponential-feel cubic bezier — flat for ~70 % then shoots upward
const W = 1000
const H = 380
const CURVE = `M 0,${H} C ${W * 0.70},${H} ${W * 0.86},${H * 0.28} ${W},0`
const AREA  = `${CURVE} L ${W},${H} L 0,${H} Z`
const GRID_X = [0.27, 0.46, 0.64, 0.83]
const GRAD_ID = 'numbers-area-gradient'

// ── Stat parser ────────────────────────────────────────────────────────────
function parseStat(raw: string) {
  const m = raw.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/)
  if (!m) return { prefix: '', target: 0, suffix: raw, decimals: 0 }
  const [, prefix, num, suffix] = m
  const decimals = num.includes('.') ? num.split('.')[1].length : 0
  return { prefix, target: parseFloat(num), suffix, decimals }
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

const PARSED = STATS.map(s => parseStat(s.value))

// ── Count-up stat tile ─────────────────────────────────────────────────────
function StatTile({ index, counting }: { index: number; counting: boolean }) {
  const { prefix, target, suffix, decimals } = PARSED[index]
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    if (!counting) return
    const start    = performance.now()
    const duration = 1500
    const tick = (now: number) => {
      const t      = Math.min((now - start) / duration, 1)
      const eased  = easeOutCubic(t)
      const raw    = target * eased
      setDisplayed(decimals > 0 ? parseFloat(raw.toFixed(decimals)) : Math.round(raw))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [counting, target, decimals])

  const formatted = decimals > 0 ? displayed.toFixed(decimals) : displayed.toString()

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <span className="font-pixel text-h4 text-primary-400 leading-none tabular-nums">
        {prefix}{formatted}{suffix}
      </span>
      <span className="font-sans text-m text-[--text-muted]">
        {STATS[index].label}
      </span>
    </div>
  )
}

const CLIP_ID = 'numbers-chart-clip'

// ── Section ────────────────────────────────────────────────────────────────
export function Numbers() {
  const statsRef   = useRef<HTMLDivElement>(null)
  const clipRef    = useRef<SVGRectElement>(null)
  const [counting, setCounting] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setCounting(true); io.unobserve(el) }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Animate clip rect width from 0 → W over 1500ms matching count-up
  useEffect(() => {
    if (!counting) return
    const rect = clipRef.current
    if (!rect) return
    const duration = 1500
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      rect.setAttribute('width', String(eased * W))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [counting])

  return (
    <section className="w-full py-24">
      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-10 xl:px-[140px]">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-16 mb-16">
          <div className="flex flex-col gap-5 flex-1">
            <TypingBadge text="Zero Trade-offs" />
            <Reveal delay={80}>
              <h2 className="font-pixel text-[--text-primary] leading-tight">
                Built for Performance,<br />
                <span className="text-primary-500">Security, and Scalability</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={160} className="w-full lg:w-[30%] lg:shrink-0">
            <p className="font-sans text-xl text-[--text-secondary]">
              Built for the future, our features provide the flexibility and
              security you need to succeed.
            </p>
          </Reveal>
        </div>

        {/* ── Chart ───────────────────────────────────────────── */}
        <Reveal delay={80} className="w-full px-0 md:px-12 lg:px-24 mb-16">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="w-full"
            style={{ height: 380, display: 'block' }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={GRAD_ID} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#9f94d2" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#9f94d2" stopOpacity="0.02" />
              </linearGradient>
              <clipPath id={CLIP_ID}>
                <rect ref={clipRef} x="0" y="0" width="0" height={H} />
              </clipPath>
            </defs>
            {GRID_X.map((xFrac, i) => (
              <line
                key={i}
                x1={xFrac * W} y1={0} x2={xFrac * W} y2={H}
                stroke="rgba(255,255,255,0.10)" strokeWidth="1" strokeDasharray="6 6"
              />
            ))}
            <g clipPath={`url(#${CLIP_ID})`}>
              <path d={AREA}  fill={`url(#${GRAD_ID})`} />
              <path d={CURVE} fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" />
            </g>
          </svg>
        </Reveal>

        {/* ── Stats bar — triggers count-up on enter ───────────── */}
        <div
          ref={statsRef}
          className="rounded-[16px] border border-white/20 bg-[--bg-surface] p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          {STATS.map((_, i) => (
            <StatTile key={i} index={i} counting={counting} />
          ))}
        </div>

      </div>
    </section>
  )
}
