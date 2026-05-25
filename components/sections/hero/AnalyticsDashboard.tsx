'use client'

import { useState } from 'react'
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

export function AnalyticsDashboard() {
  const [period, setPeriod] = useState<Period>('6m')
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const d = DATA[period]

  return (
    <div
      className="w-full rounded-[20px] p-5 md:p-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/assets/feature-bg.png)',
      }}
    >
      <div className="rounded-[14px] bg-primary-dark-500 p-6 md:p-8 w-4/5 mx-auto">
        {/* Period switcher */}
        <div className="inline-flex items-center gap-1 rounded-full border border-[--border-default] bg-base p-1 mb-8">
          {(['6m', '1y'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-full font-sans text-s font-medium transition-colors ${
                period === p
                  ? 'bg-white text-base'
                  : 'text-[--text-muted] hover:text-[--text-secondary]'
              }`}
            >
              {p === '6m' ? 'Last 6 Months' : 'Last Year'}
            </button>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total revenue', value: d.revenue, trend: d.revTrend },
            { label: 'Active accounts', value: d.accounts, trend: d.accTrend },
            { label: 'API uptime', value: d.uptime, trend: d.uptimeTrend },
          ].map(({ label, value, trend }) => (
            <div key={label} className="flex flex-col gap-2">
              <span className="font-sans text-s text-[--text-muted]">{label}</span>
              <span className="font-pixel text-h4 text-[--text-primary]">{value}</span>
              <span className="flex items-center gap-1 font-sans text-s text-green">
                <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
                {trend}
              </span>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div
          className="flex items-end gap-2.5 h-36"
          onMouseLeave={() => setHoveredBar(null)}
        >
          {d.bars.map((h, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredBar(i)}
              className="flex-1 transition-all duration-300 ease-out"
              style={{
                height: `${h}%`,
                borderRadius: '8px 8px 0 0',
                backgroundColor:
                  hoveredBar === null || hoveredBar === i
                    ? 'var(--primary-500)'
                    : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
