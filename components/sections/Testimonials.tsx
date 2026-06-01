'use client'

import { useState, useEffect } from 'react'
import { Play } from '@phosphor-icons/react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/Reveal'
import { TypingBadge } from '@/components/ui/TypingBadge'

const EXPO          = 'cubic-bezier(0.16, 1, 0.3, 1)'
const CARD_EXPAND   = `flex-grow 400ms ${EXPO}`
// Same easing applied to border + bg colour shifts inside each card
const INNER_HOVER   = `border-color 250ms ${EXPO}, background-color 250ms ${EXPO}, opacity 250ms ${EXPO}`

const STATS = [
  { value: '12.4M', label: 'Transactions processed'  },
  { value: '0 hrs', label: 'Downtime since launch'   },
  { value: '32.1%', label: 'On transaction saving'   },
]

export function Testimonials() {
  const [hovered,   setHovered]   = useState<number | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  // Only read window after hydration to avoid SSR mismatch
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  function cardStyle(i: number): React.CSSProperties {
    if (!isDesktop) return {}
    return {
      flexGrow:   hovered === i ? 1.2 : 1,
      flexShrink: 1,
      flexBasis:  0,
      transition: CARD_EXPAND,
    }
  }

  return (
    <section className="w-full py-24">
      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-10 xl:px-[140px]">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-5 text-center mb-14">
          <TypingBadge text="Testimonials" />
          <Reveal delay={80}>
            <h2 className="font-pixel text-[--text-primary] leading-tight">
              Real Stories From<br />
              <span className="text-primary-500">Our Customers</span>
            </h2>
          </Reveal>
        </div>

        {/* ── 3-column cards ──────────────────────────────────── */}
        <div className="flex items-stretch gap-4 mb-12 overflow-x-auto lg:overflow-visible -mx-5 px-5 md:-mx-10 md:px-10 lg:mx-0 lg:px-0 pb-4 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

          {/* Card 1 — Stats (purple fill) */}
          <Reveal
            delay={80}
            className="w-[360px] shrink-0 lg:w-auto lg:shrink lg:flex-1"
            style={cardStyle(0)}
            onMouseEnter={() => { if (isDesktop) setHovered(0) }}
            onMouseLeave={() => { if (isDesktop) setHovered(null) }}
          >
          <div className="w-full h-full rounded-[16px] bg-primary-500 p-6 flex flex-col justify-between lg:min-h-[420px]">
            <div className="flex flex-col gap-8">
              {STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="font-pixel text-h3 text-primary-dark-500 leading-none">
                    {value}
                  </span>
                  <span className="font-sans text-m text-primary-dark-400">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Image src="/assets/pallet-logo.svg" alt="Pallet" width={24} height={24} className="h-6 w-auto brightness-0 opacity-40" />
            </div>
          </div>
          </Reveal>

          {/* Card 2 — Quote */}
          <Reveal
            delay={160}
            className="w-[360px] shrink-0 lg:w-auto lg:shrink lg:flex-1"
            style={cardStyle(1)}
            onMouseEnter={() => { if (isDesktop) setHovered(1) }}
            onMouseLeave={() => { if (isDesktop) setHovered(null) }}
          >
          <div
            className="w-full h-full rounded-[16px] p-6 flex flex-col justify-between lg:min-h-[420px]"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: `0.5px solid ${hovered === 1 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'}`,
              transition: INNER_HOVER,
            }}
          >
            <h5 className="leading-relaxed flex-1">
              "After thoroughly evaluating six different platforms, we ultimately decided on Finova.
              One of the standout features was the compliance tooling, which proved to be
              incredibly efficient."
            </h5>
            <div className="flex flex-col gap-5 mt-6">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
                  alt="Sarah T."
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="flex flex-col">
                  <span className="font-sans text-m-medium text-[--text-primary]">Sarah T.</span>
                  <span className="font-sans text-s text-[--text-muted]">CTO · Vaultt Finance</span>
                </div>
              </div>
              <Image src="/assets/palantir-logo.svg" alt="Palantir" width={24} height={24} className="h-6 w-[50%] object-contain object-left brightness-0 invert opacity-50" />
            </div>
          </div>
          </Reveal>

          {/* Card 3 — Photo / video */}
          <Reveal
            delay={240}
            className="w-[360px] shrink-0 lg:w-auto lg:shrink lg:flex-1"
            style={cardStyle(2)}
            onMouseEnter={() => { if (isDesktop) setHovered(2) }}
            onMouseLeave={() => { if (isDesktop) setHovered(null) }}
          >
          <div
            className="w-full h-full rounded-[16px] overflow-hidden relative lg:min-h-[420px]"
            style={{
              backgroundColor: 'var(--bg-surface)',
              transition: INNER_HOVER,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/testi-img.webp"
              alt="Customer story"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-14 h-14 rounded-full bg-white flex items-center justify-center"
                style={{
                  opacity: hovered === 2 ? 1 : 0.85,
                  transform: hovered === 2 ? 'scale(1.08)' : 'scale(1)',
                  transition: `opacity 250ms ${EXPO}, transform 250ms ${EXPO}`,
                }}
              >
                <Play size={20} weight="fill" className="text-base ml-0.5" aria-hidden="true" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6">
              <Image src="/assets/decagon-logo.svg" alt="Decagon" width={24} height={24} className="h-6 w-auto brightness-0 invert opacity-50" />
            </div>
          </div>
          </Reveal>

        </div>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <Reveal delay={80} className="flex justify-center">
          <Button variant="secondary">Read More Story</Button>
        </Reveal>

      </div>
    </section>
  )
}
