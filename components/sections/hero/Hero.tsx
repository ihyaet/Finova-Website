'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChartLineUp,
  Code,
  ShieldCheck,
  Warning,
  Medal,
} from '@phosphor-icons/react'
import { AnalyticsDashboard } from './AnalyticsDashboard'
import { APIPreview } from './APIPreview'
import { CompliancePreview } from './CompliancePreview'
import { RiskPreview } from './RiskPreview'

type TabId = 'analytics' | 'api' | 'compliance' | 'risk'

const TABS: { id: TabId; label: string; Icon: React.ElementType }[] = [
  { id: 'analytics', label: 'Analytics Dashboard', Icon: ChartLineUp },
  { id: 'api', label: 'API Integration', Icon: Code },
  { id: 'compliance', label: 'Compliance Tools', Icon: ShieldCheck },
  { id: 'risk', label: 'Risk Management', Icon: Warning },
]

const TAB_CONTENT: Record<TabId, React.ReactNode> = {
  analytics: <AnalyticsDashboard />,
  api: <APIPreview />,
  compliance: <CompliancePreview />,
  risk: <RiskPreview />,
}

export function Hero() {
  const [activeTab, setActiveTab] = useState<TabId>('analytics')

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1160px] px-5 md:px-10 lg:px-0">

        {/* ── Two-column hero content ─────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-16 pb-14">

          {/* Left: badge + headline */}
          <div className="flex flex-col gap-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-badge border border-primary-400/20 bg-primary-400/10 px-3 py-1.5">
              <Medal size={14} weight="fill" className="text-primary-400" aria-hidden="true" />
              <span className="font-sans text-s font-medium uppercase tracking-widest text-primary-400">
                #1 Financial Architecture Platform
              </span>
            </div>

            <h1 className="font-pixel text-h1-mobile md:text-h1 text-[--text-primary] leading-tight">
              Powering The<br />
              Future of{' '}
              <span className="text-primary-500">Finance</span>
            </h1>
          </div>

          {/* Right: description + CTAs */}
          <div className="flex flex-col gap-7">
            <p className="font-sans text-xl text-[--text-secondary] max-w-md">
              Innovative solutions designed for fintech startups, financial
              consultants, and investment firms — seamless, secure, and scalable.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/book-demo"
                className="inline-flex h-[44px] items-center justify-center rounded-button bg-white px-6 font-sans text-l font-medium text-base transition-opacity hover:opacity-90"
              >
                Request Demo
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex h-[44px] items-center justify-center rounded-button border border-white/20 bg-transparent px-6 font-sans text-l text-[--text-secondary] transition-colors hover:border-white/30 hover:bg-white/5"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* ── Tab navigation ──────────────────────────────────── */}
        <div
          role="tablist"
          aria-label="Product preview"
          className="flex items-center gap-3 py-3"
        >
          {TABS.map(({ id, label, Icon }) => {
            const active = activeTab === id
            return (
              <button
                key={id}
                role="tab"
                aria-selected={active}
                aria-controls={`tabpanel-${id}`}
                onClick={() => setActiveTab(id)}
                className={`flex-1 inline-flex justify-center items-center gap-2 px-5 pb-3.5 pt-1 font-sans text-l transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 border-b-2 -mb-px ${
                  active
                    ? 'border-white text-white'
                    : 'border-white/30 text-white/70 hover:text-white/90 hover:border-white/50'
                }`}
              >
                <span className={active ? 'text-primary-500' : ''}>
                  <Icon size={16} weight={active ? 'fill' : 'regular'} aria-hidden="true" />
                </span>
                {label}
              </button>
            )
          })}
        </div>

        {/* ── Tab content ─────────────────────────────────────── */}
        <div className="pt-6 pb-16">
          {TABS.map(({ id }) => (
            <div
              key={id}
              id={`tabpanel-${id}`}
              role="tabpanel"
              hidden={activeTab !== id}
            >
              {TAB_CONTENT[id]}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
