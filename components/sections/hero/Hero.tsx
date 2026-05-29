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
import { TypingBadge } from '@/components/ui/TypingBadge'
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
const HERO_EASE    = 'cubic-bezier(0.16, 1, 0.3, 1)'
const HERO_DUR     = 600

export function Hero() {
  const [activeTab,   setActiveTab]   = useState<TabId>('analytics')
  const [heroVisible, setHeroVisible] = useState(false)

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

  // Hero entrance — small delay so opacity:0 is painted before transition fires
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  const handleTabClick = (id: TabId) => setActiveTab(id)

  // Shared entrance style helper
  const enter = (delay: number): React.CSSProperties => ({
    opacity:    heroVisible ? 1 : 0,
    transform:  heroVisible ? 'translateY(0px)' : 'translateY(12px)',
    transition: `opacity ${HERO_DUR}ms ${HERO_EASE} ${delay}ms, transform ${HERO_DUR}ms ${HERO_EASE} ${delay}ms`,
  })

  return (
    <AsciiHero className="w-full" bgColor="#07080f">
      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-10 xl:px-[140px]">

        {/* ── Two-column hero content ─────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-end pt-[240px] pb-24">

          {/* Left: badge + headline */}
          <div className="flex flex-col gap-5">
            <div style={enter(0)}>
              <TypingBadge text="#1 Financial Architecture Platform" />
            </div>

            <h1 style={enter(80)} className="font-pixel text-h1-mobile md:text-h1 text-[--text-primary] leading-tight">
              Powering The<br />
              Future of{' '}
              <span className="text-primary-500">Finance</span>
            </h1>
          </div>

          {/* Right: description + CTAs */}
          <div style={enter(160)} className="flex flex-col gap-7">
            <p className="font-sans text-xl-regular text-[--text-secondary] max-w-full">
              Innovative solutions designed for fintech startups, financial
              consultants, and investment firms seamless, secure, and scalable.
            </p>
            <div className="flex items-center gap-3">
              <Button variant="primary" asChild><a href="/demo">Request Demo</a></Button>
              <Button variant="secondary" asChild><a href="/sign-up">Get Started</a></Button>
            </div>
          </div>
        </div>

        {/* ── Tab navigation ──────────────────────────────────── */}
        <div
          style={enter(240)}
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
                className={`relative ${active ? 'md:flex-1' : 'flex-1'} inline-flex justify-center items-center gap-2 px-4 lg:px-5 pb-3.5 pt-1 font-sans text-m-medium lg:text-l-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 border-b-2 -mb-px ${
                  active
                    ? 'border-white/20 text-white'
                    : 'border-white/30 text-white/70 hover:text-white/90 hover:border-white/50'
                }`}
              >
                <span className={active ? 'text-primary-500' : ''}>
                  <Icon size={20} weight={active ? 'fill' : 'regular'} aria-hidden="true" className="lg:w-6 lg:h-6" />
                </span>
                <span className={active ? '' : 'hidden md:inline'}>{label}</span>
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
        <div style={enter(320)} className="pt-6 pb-16">
          {TABS.map(({ id }) => (
            <div
              key={id}
              id={`tabpanel-${id}`}
              role="tabpanel"
              hidden={activeTab !== id}
              className="h-[440px] md:h-[540px] lg:h-[640px]"
            >
              <div key={activeTab} className="w-full h-full">
                {TAB_CONTENT[id]}
              </div>
            </div>
          ))}
        </div>

      </div>
    </AsciiHero>
  )
}
