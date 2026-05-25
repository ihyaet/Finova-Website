'use client'

import Image from 'next/image'
import { Lightning, Stack, TrendUp, Shield } from '@phosphor-icons/react'

interface Feature {
  Icon: React.ElementType
  title: string
  description: string
}

const LEFT_FEATURES: Feature[] = [
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
]

const RIGHT_FEATURES: Feature[] = [
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

function FeatureCard({ Icon, title, description }: Feature) {
  return (
    <div className="flex flex-col gap-5 pt-8 border-t border-white/10">
      <Icon size={22} className="text-primary-400" weight="regular" aria-hidden="true" />
      <div className="flex flex-col gap-3">
        <h5 className="font-pixel text-[--text-primary]">{title}</h5>
        <p className="font-sans text-m text-[--text-secondary]">{description}</p>
      </div>
    </div>
  )
}

export function WhyFinova() {
  return (
    <section className="w-full py-24">
      <div className="mx-auto w-full max-w-[1160px] px-5 md:px-10 lg:px-0">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-12 lg:gap-16">

          {/* ── Left features ───────────────────────────────────── */}
          <div className="flex flex-col gap-16">
            {LEFT_FEATURES.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>

          {/* ── Center: badge + heading + illustration ───────────── */}
          <div className="flex flex-col items-center text-center gap-8">

            {/* Badge + heading */}
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

            {/* Illustration */}
            <Image
              src="/assets/value-illustration.svg"
              alt="Finova platform illustration"
              width={560}
              height={380}
              className="w-full object-contain"
            />

          </div>

          {/* ── Right features ──────────────────────────────────── */}
          <div className="flex flex-col gap-16">
            {RIGHT_FEATURES.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
