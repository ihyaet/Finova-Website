'use client'

import { useState, useEffect } from 'react'
import {
  ChartLineUp,
  Code,
  ShieldCheck,
  Warning,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import AsciiHero from '@/components/providers/ascii_hero'
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

const TAB_DURATION = 12000

export function Hero() {
  const [activeTab, setActiveTab] = useState<TabId>('analytics')

  // Restart the 12s timer fresh on every tab change — manual or auto
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab(prev => {
        const idx = TABS.findIndex(t => t.id === prev)
        return TABS[(idx + 1) % TABS.length].id
      })
    }, TAB_DURATION)
    return () => clearInterval(timer)
  }, [activeTab])

  const handleTabClick = (id: TabId) => setActiveTab(id)

  return (
    <AsciiHero className="w-full" bgColor="#07080f">
      <div className="mx-auto w-full max-w-[1160px] px-5 md:px-10 lg:px-0">

        {/* ── Two-column hero content ─────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-end pt-[160px] pb-24">

          {/* Left: badge + headline */}
          <div className="flex flex-col gap-5">
            <div className="inline-flex w-fit items-center gap-2 bg-primary-400/10 px-3 py-1 rounded-full">
              <span className="w-1 h-[14px] rounded-[2px] bg-primary-400 shrink-0" />
              <span className="font-sans text-m font-medium uppercase tracking-widest text-primary-400">
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
            <p className="font-sans text-xl-regular text-[--text-secondary] max-w-full">
              Innovative solutions designed for fintech startups, financial
              consultants, and investment firms seamless, secure, and scalable.
            </p>
            <div className="flex items-center gap-3">
              <Button variant="primary">Request Demo</Button>
              <Button variant="secondary">Get Started</Button>
            </div>
          </div>
        </div>

        {/* ── Tab navigation ──────────────────────────────────── */}
        <div
          role="tablist"
          aria-label="Product preview"
          className="flex items-center gap-3 py-3 w-full"
        >
          {TABS.map(({ id, label, Icon }) => {
            const active = activeTab === id
            return (
              <button
                key={id}
                role="tab"
                aria-selected={active}
                aria-controls={`tabpanel-${id}`}
                onClick={() => handleTabClick(id)}
                className={`relative ${active ? '' : 'flex-1'} inline-flex justify-center items-center gap-2 px-4 lg:px-5 pb-3.5 pt-1 font-sans text-l-medium lg:text-l transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 border-b-2 -mb-px ${
                  active
                    ? 'border-white/20 text-white'
                    : 'border-white/30 text-white/70 hover:text-white/90 hover:border-white/50'
                }`}
              >
                <span className={active ? 'text-primary-500' : ''}>
                  <Icon size={20} weight={active ? 'fill' : 'regular'} aria-hidden="true" />
                </span>
                <span className={active ? '' : 'hidden lg:inline'}>{label}</span>
                {active && (
                  <span
                    key={activeTab}
                    className="animate-tab-progress absolute bottom-[-2px] left-0 h-[2px] rounded-full bg-white"
                  />
                )}
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
              className="h-[440px] md:h-[540px] lg:h-[640px]"
            >
              {TAB_CONTENT[id]}
            </div>
          ))}
        </div>

      </div>
    </AsciiHero>
  )
}
