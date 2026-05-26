'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Lightning, Stack, TrendUp, Shield } from '@phosphor-icons/react'

interface Feature {
  Icon: React.ElementType
  title: string
  description: string
}

const ALL_FEATURES: Feature[] = [
  {
    Icon: Lightning,
    title: 'Up And Running In Hours',
    description: 'No months-long onboarding. Connect your stack, configure your rules, go live — most teams ship their first integration the same day.',
  },
  {
    Icon: Stack,
    title: 'One Platform, Full Coverage',
    description: 'Analytics, payments, compliance, and risk in a single unified layer — not four separate tools billing you separately and failing to talk to each other.',
  },
  {
    Icon: TrendUp,
    title: 'Scales As Fast As You Do',
    description: 'From your first 100 transactions to millions per day — no re-architecture, no surprise throttling, no emergency calls to your infra team.',
  },
  {
    Icon: Shield,
    title: "Security You Don't Have To Configure",
    description: "Bank-grade encryption, SOC 2 Type II certified, and GDPR-ready out of the box so your security posture is strong before your first transaction.",
  },
]

const LEFT_FEATURES  = ALL_FEATURES.slice(0, 2)
const RIGHT_FEATURES = ALL_FEATURES.slice(2, 4)

const DURATION = 10000

interface FeatureCardProps extends Feature {
  active: boolean
  onClick: () => void
}

function FeatureCard({ Icon, title, description, active, onClick }: FeatureCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-5 pt-8 border-t border-white/10 text-left w-full"
    >
      {/* Progress bar — only visible when active */}
      <div className="h-[2px] w-full rounded-full bg-white/10 -mt-8 mb-0 overflow-hidden">
        {active && (
          <div
            key={title}
            className="h-full rounded-full bg-white animate-why-progress"
          />
        )}
      </div>

      {/* Icon */}
      <Icon
        size={22}
        weight="regular"
        aria-hidden="true"
        className={`transition-colors duration-300 ${active ? 'text-primary-400' : 'text-white/50'}`}
      />

      {/* Text */}
      <div className="flex flex-col gap-3">
        <h5 className="font-pixel text-[--text-primary]">{title}</h5>
        <p className={`font-sans text-m transition-opacity duration-300 ${active ? 'text-[--text-secondary]' : 'text-[--text-secondary] opacity-50 hidden lg:block'}`}>
          {description}
        </p>
      </div>
    </button>
  )
}

export function WhyFinova() {
  const [active, setActive] = useState(0)

  // Auto-advance every 10s, resets on manual click
  useEffect(() => {
    const t = setInterval(() => {
      setActive(prev => (prev + 1) % ALL_FEATURES.length)
    }, DURATION)
    return () => clearInterval(t)
  }, [active])

  return (
    <section className="w-full py-24">
      <div className="mx-auto w-full max-w-[1160px] px-5 md:px-10 lg:px-0">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-12 lg:gap-16">

          {/* ── Left features ───────────────────────────────────── */}
          <div className="flex flex-col gap-16">
            {LEFT_FEATURES.map((f, i) => (
              <FeatureCard
                key={f.title}
                {...f}
                active={active === i}
                onClick={() => setActive(i)}
              />
            ))}
          </div>

          {/* ── Center: badge + heading + illustration ───────────── */}
          <div className="flex flex-col items-center text-center gap-8 order-first lg:order-none">
            <div className="flex flex-col items-center gap-5">
              <div className="inline-flex w-fit items-center gap-2 bg-primary-400/10 px-3 py-1 rounded-full">
                <span className="w-1 h-[14px] rounded-[2px] bg-primary-400 shrink-0" />
                <span className="font-sans text-m font-medium uppercase tracking-widest text-primary-400">
                  Why Finova
                </span>
              </div>
              <h2 className="font-pixel text-[--text-primary] leading-tight">
                The Platform Teams<br />
                Actually{' '}
                <span className="text-primary-500">Stick With</span>
              </h2>
            </div>
            {/* Illustration with dynamic icon overlay */}
            <div className="relative w-full">
              <Image
                src="/assets/value-illustration.svg"
                alt="Finova platform illustration"
                width={560}
                height={380}
                className="w-full object-contain"
              />
              {/* Icon overlay — centered on the diamond (318/640 × 167/360 of the SVG) */}
              <div
                className="absolute pointer-events-none"
                style={{ left: '49.7%', top: '46.4%', transform: 'translate(-50%, -50%)' }}
              >
                {ALL_FEATURES.map((f, i) => (
                  <div
                    key={f.title}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transition: 'opacity 500ms ease, filter 500ms ease',
                      opacity:    active === i ? 1 : 0,
                      filter:     active === i ? 'blur(0px)' : 'blur(8px)',
                      transform:  'matrix(0.866025, -0.5, 0.866025, 0.5, 0, 0)',
                    }}
                  >
                    <f.Icon size={60} weight="fill" className="text-primary-400" aria-hidden="true" />
                  </div>
                ))}
                {/* Placeholder to give the wrapper a size */}
                <div className="w-[60px] h-[60px] opacity-0" />
              </div>
            </div>
          </div>

          {/* ── Right features ──────────────────────────────────── */}
          <div className="flex flex-col gap-16">
            {RIGHT_FEATURES.map((f, i) => (
              <FeatureCard
                key={f.title}
                {...f}
                active={active === i + 2}
                onClick={() => setActive(i + 2)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
