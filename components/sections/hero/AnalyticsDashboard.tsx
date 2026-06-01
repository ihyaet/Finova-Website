'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'

type Period = '6m' | '1y'

const DATA: Record<Period, {
  revenue: string; revTrend: string
  accounts: string; accTrend: string
  uptime: string; uptimeTrend: string
  bars: number[]
}> = {
  '6m': {
    revenue: '$2.4M', revTrend: '12.4% this month',
    accounts: '8,310', accTrend: '3.1% this week',
    uptime: '99.97%', uptimeTrend: 'Last 30 days',
    bars: [38, 60, 44, 54, 85, 64],
  },
  '1y': {
    revenue: '$5.1M', revTrend: '28.6% this year',
    accounts: '15,200', accTrend: '82.9% this year',
    uptime: '99.95%', uptimeTrend: 'Last 365 days',
    bars: [30, 48, 56, 62, 72, 85],
  },
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

// Parses a metric string like "$2.4M" or "8,310" or "99.97%"
// Returns prefix, numeric value, suffix, decimals
function parseMetic(raw: string) {
  const m = raw.replace(/,/g, '').match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/)
  if (!m) return { prefix: '', target: 0, suffix: raw, decimals: 0, comma: false }
  const [, prefix, num, suffix] = m
  const decimals = num.includes('.') ? num.split('.')[1].length : 0
  const comma = raw.replace(/[^,]/g, '').length > 0
  return { prefix, target: parseFloat(num), suffix, decimals, comma }
}

function useCountUp(target: number, decimals: number, run: boolean, duration = 800) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!run) return
    setVal(0)
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const v = target * easeOutCubic(t)
      setVal(decimals > 0 ? parseFloat(v.toFixed(decimals)) : Math.round(v))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [run, target, decimals, duration])
  return val
}

function MetricValue({ raw, run }: { raw: string; run: boolean }) {
  const { prefix, target, suffix, decimals, comma } = parseMetic(raw)
  const val = useCountUp(target, decimals, run)
  const formatted = decimals > 0
    ? val.toFixed(decimals)
    : comma
      ? Math.round(val).toLocaleString()
      : Math.round(val).toString()
  return <>{prefix}{formatted}{suffix}</>
}

export function AnalyticsDashboard() {
  const [period, setPeriod]     = useState<Period>('6m')
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const [barHeights, setBarHeights] = useState<number[]>([])
  const [counting, setCounting] = useState(false)
  const mountKey = useRef(0)
  const d = DATA[period]

  // On mount + period change: reset bars to 0, then animate up
  useEffect(() => {
    mountKey.current++
    setBarHeights([])
    setCounting(false)

    const t = setTimeout(() => {
      setCounting(true)
      const start = performance.now()
      const duration = 700
      const targets = d.bars

      const tick = (now: number) => {
        const elapsed = now - start
        const newHeights = targets.map((target, i) => {
          const delay = i * 40
          const t = Math.min(Math.max((elapsed - delay) / duration, 0), 1)
          return target * easeOutCubic(t)
        })
        setBarHeights(newHeights)
        if (elapsed < duration + (targets.length - 1) * 40) requestAnimationFrame(tick)
        else setBarHeights(targets)
      }
      requestAnimationFrame(tick)
    }, 80)

    return () => clearTimeout(t)
  }, [period, d.bars])

  return (
    <div
      className="w-full h-full rounded-[12px] bg-cover bg-center bg-no-repeat p-4 md:py-12 md:px-20 lg:py-12 lg:px-40"
      style={{ backgroundImage: 'url(/assets/feature-bg.webp)' }}
    >
      <div className="rounded-[12px] bg-primary-dark-500 p-4 lg:p-6 w-full h-full flex flex-col">

        {/* Period switcher */}
        <div className="inline-flex items-center gap-2 rounded-full mb-4">
          {(['6m', '1y'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-full font-sans text-s font-medium transition-colors ${
                period === p
                  ? 'bg-white text-base'
                  : 'text-[--text-muted] hover:text-[--text-secondary] border border-white/20'
              }`}
            >
              {p === '6m' ? '6 Months' : '1 Year'}
            </button>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 lg:gap-4 mb-4">
          {[
            { label: 'Revenue',  value: d.revenue,  trend: d.revTrend    },
            { label: 'Accounts', value: d.accounts, trend: d.accTrend    },
            { label: 'Uptime',   value: d.uptime,   trend: d.uptimeTrend },
          ].map(({ label, value, trend }) => (
            <div key={label} className="flex flex-col gap-1 px-2 lg:px-4 border-l border-white/10">
              <span className="font-sans text-s text-[--text-muted] truncate">{label}</span>
              <span className="font-pixel text-h6 md:text-h4 text-[--text-primary]">
                <MetricValue raw={value} run={counting} />
              </span>
              <span className="flex items-center gap-1 font-sans text-s text-green">
                <ArrowUpRight size={11} weight="bold" aria-hidden="true" />
                <span className="truncate text-[11px]">{trend}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div
          className="flex items-end gap-2.5 flex-1 min-h-[80px]"
          onMouseLeave={() => setHoveredBar(null)}
        >
          {d.bars.map((_, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredBar(i)}
              className="flex-1"
              style={{
                height: `${barHeights[i] ?? 0}%`,
                borderRadius: '8px 8px 0 0',
                backgroundColor:
                  hoveredBar === null || hoveredBar === i
                    ? 'var(--primary-500)'
                    : 'rgba(255,255,255,0.1)',
                transition: 'background-color 300ms ease-out',
              }}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
