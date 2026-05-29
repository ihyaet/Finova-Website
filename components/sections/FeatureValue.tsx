'use client'

import { useEffect, useRef, useState } from 'react'
import { Receipt, BellRinging, ListBullets } from '@phosphor-icons/react'
import { Reveal } from '@/components/ui/Reveal'
import { TypingBadge } from '@/components/ui/TypingBadge'

interface CodeLine {
  type: 'punct' | 'entry'
  key?: string
  value: string
  valueType?: 'string' | 'number'
}

interface PreviewRow {
  label: string
  value: string
  accent?: boolean
}

interface Feature {
  title: string
  description: string
  method: 'POST' | 'GET'
  endpoint: string
  code: CodeLine[]
  icon: React.ElementType
  rows: PreviewRow[]
}

const FEATURES: Feature[] = [
  {
    title: 'Initiate A Payment',
    description: 'Single API call to move money — with idempotency, currency support, and instant status response.',
    method: 'POST',
    endpoint: '/v1/payments/initiate',
    code: [
      { type: 'punct', value: '{' },
      { type: 'entry', key: '"amount"',          value: '4500',         valueType: 'number' },
      { type: 'entry', key: '"currency"',         value: '"USD"',        valueType: 'string' },
      { type: 'entry', key: '"recipient_id"',     value: '"usr_9xKm2"',  valueType: 'string' },
      { type: 'entry', key: '"idempotency_key"',  value: '"inv_0029"',   valueType: 'string' },
      { type: 'punct', value: '}' },
    ],
    icon: Receipt,
    rows: [
      { label: 'Status',         value: 'Completed',    accent: true  },
      { label: 'Transaction ID', value: 'txn_88aZ3k'                  },
      { label: 'Settled in',     value: '61ms'                        },
      { label: 'Amount',         value: 'USD 4,500.00'                },
    ],
  },
  {
    title: 'Subscribe to Webhooks',
    description: 'Register endpoints to receive real-time event notifications for payments, settlements, and fraud alerts.',
    method: 'POST',
    endpoint: '/v1/webhooks/subscribe',
    code: [
      { type: 'punct', value: '{' },
      { type: 'entry', key: '"url"',     value: '"https://app.co/hooks"',   valueType: 'string' },
      { type: 'entry', key: '"events"',  value: '"payment.settled"',        valueType: 'string' },
      { type: 'entry', key: '"secret"',  value: '"whsec_••••••"',           valueType: 'string' },
      { type: 'entry', key: '"active"',  value: 'true',                     valueType: 'number' },
      { type: 'punct', value: '}' },
    ],
    icon: BellRinging,
    rows: [
      { label: 'Endpoint',       value: 'app.co/hooks'               },
      { label: 'Event',          value: 'payment.settled'            },
      { label: 'Status',         value: 'Active',      accent: true  },
      { label: 'Last triggered', value: '2s ago'                     },
    ],
  },
  {
    title: 'Fetch Transactions',
    description: 'Query paginated transaction history with filtering by date, status, currency, and account.',
    method: 'GET',
    endpoint: '/v1/transactions/{account_id}',
    code: [
      { type: 'punct', value: '{' },
      { type: 'entry', key: '"account_id"', value: '"acc_Xk29m"',   valueType: 'string' },
      { type: 'entry', key: '"limit"',      value: '50',            valueType: 'number' },
      { type: 'entry', key: '"status"',     value: '"settled"',     valueType: 'string' },
      { type: 'entry', key: '"from"',       value: '"2025-01-01"',  valueType: 'string' },
      { type: 'punct', value: '}' },
    ],
    icon: ListBullets,
    rows: [
      { label: 'Total found', value: '1,284'                        },
      { label: 'Page size',   value: '50'                           },
      { label: 'Status',      value: 'Settled',    accent: true     },
      { label: 'Volume',      value: 'USD 2.1M'                     },
    ],
  },
]

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
function fadeIn(delay: number): React.CSSProperties {
  return { opacity: 0, animation: `tab-reveal 400ms ${EASE} ${delay}ms both` }
}

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3) }

function DonutPreview() {
  const R = 80, CX = 100
  const C = 2 * Math.PI * R
  const GAP = 3
  const usable = C - 3 * GAP
  const targets = [usable * 0.50, usable * 0.35, usable * 0.15]
  const base = C / 4
  const offsets = [base, base - (targets[0] + GAP), base - (targets[0] + GAP + targets[1] + GAP)]
  const colors  = ['#b2a9db', '#EF9F27', '#5DCAA5']

  const arcRefs = [
    useRef<SVGCircleElement>(null),
    useRef<SVGCircleElement>(null),
    useRef<SVGCircleElement>(null),
  ]
  const [centerVal, setCenterVal] = useState(0)

  useEffect(() => {
    const duration = 900
    const stagger  = 120
    const start    = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start

      // Animate each arc with stagger
      arcRefs.forEach((ref, i) => {
        if (!ref.current) return
        const delay = i * stagger
        const t = Math.min(Math.max((elapsed - delay) / duration, 0), 1)
        const eased = easeOutCubic(t)
        const len = targets[i] * eased
        ref.current.setAttribute('stroke-dasharray', `${len} ${C - len}`)
      })

      // Count up center label: 0 → 1.4
      const t = Math.min(elapsed / (duration + stagger * 2), 1)
      setCenterVal(parseFloat((1.4 * easeOutCubic(t)).toFixed(1)))

      if (elapsed < duration + stagger * (targets.length - 1)) requestAnimationFrame(tick)
      else {
        arcRefs.forEach((ref, i) => {
          ref.current?.setAttribute('stroke-dasharray', `${targets[i]} ${C - targets[i]}`)
        })
        setCenterVal(1.4)
      }
    }

    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="relative w-full flex flex-col gap-2 md:gap-3 lg:gap-4 z-10">
      <span className="text-center text-[--text-muted]" style={{ fontFamily: 'Consolas, monospace', fontSize: '13px', ...fadeIn(0) }}>
        Analytic Summary
      </span>
      <div className="flex justify-center" style={fadeIn(60)}>
        <div className="relative w-[42%] max-w-[240px] md:w-[50%] md:max-w-[280px] aspect-square">
          <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
            {arcRefs.map((ref, i) => (
              <circle
                key={i}
                ref={ref}
                cx={CX} cy={CX} r={R}
                fill="none"
                stroke={colors[i]}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`0 ${C}`}
                strokeDashoffset={offsets[i]}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-pixel text-h6 md:text-h5 lg:text-h4 text-[--text-primary] leading-none">
              $ {centerVal.toFixed(1)}M
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {[
          { label: 'Payments',  value: '$1.2M', color: 'text-primary-400' },
          { label: 'Transfers', value: '$840K', color: 'text-amber'       },
          { label: 'Payouts',   value: '$360K', color: 'text-green'       },
        ].map(({ label, value, color }, i) => (
          <div key={label} className="flex items-center justify-between py-1 md:py-2 lg:py-3 border-b border-white/[0.06]" style={fadeIn(120 + i * 70)}>
            <span className="font-sans text-m-medium md:text-m lg:text-l text-[--text-primary]">{label}</span>
            <span className={`font-pixel text-[18px] leading-none ${color}`}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Shared preview content (desktop sticky + mobile inline) ──────
function PreviewContent({ index }: { index: number }) {
  const feat = FEATURES[index]

  if (index === 0) {
    return (
      <div className="relative w-full rounded-[8px] p-4 md:p-5 flex flex-col gap-3 md:gap-4 lg:gap-5 z-10" style={{ backgroundColor: '#1A1C29' }}>
        <div className="flex justify-center" style={fadeIn(0)}>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-[10px] border border-white/20 flex items-center justify-center">
            <feat.icon size={20} className="text-primary-400 md:w-[22px] md:h-[22px]" aria-hidden="true" />
          </div>
        </div>
        <div className="border-t-[2px] border-dashed border-white/20" style={fadeIn(60)} />
        <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
          {feat.rows.map(({ label, value, accent }, i) => (
            <div key={label} className="flex items-center justify-between" style={fadeIn(100 + i * 60)}>
              <span className="font-sans text-m-medium md:text-m lg:text-l text-[--text-muted]">{label}</span>
              <span className={`font-pixel text-[18px] leading-none ${accent ? 'text-green' : 'text-[--text-primary]'}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (index === 1) {
    return (
      <div className="relative w-full flex flex-col gap-2 lg:gap-3 z-10 items-center">
        <div className="w-[80%] h-8 lg:h-10 rounded-[8px] bg-[#0E101E]" style={fadeIn(0)} />
        {[
          { event: 'payment.settled', detail: 'txn_88aZ3k', time: '5 m ago',  accent: 'bg-primary-400' },
          { event: 'risk.flag',       detail: 'acct_11bX9',  time: '3 m ago',  accent: 'bg-green'       },
          { event: 'kyc.passed',      detail: 'usr_7cPq1',   time: '10 m ago', accent: 'bg-amber'       },
        ].map(({ event, detail, time, accent }, i) => (
          <div key={event} className="flex items-center gap-2 lg:gap-3 rounded-[8px] bg-white/10 px-3 py-2 lg:px-4 lg:py-3 w-full" style={fadeIn(60 + i * 70)}>
            <span className={`w-1 h-[14px] lg:h-[18px] rounded-full shrink-0 ${accent}`} />
            <span className="font-sans text-m-medium md:text-m lg:text-l text-[--text-primary] flex-1 min-w-0 truncate">{event} — {detail}</span>
            <span className="font-sans text-m-medium md:text-m lg:text-l text-[--text-muted] shrink-0">{time}</span>
          </div>
        ))}
        <div className="w-[80%] h-8 lg:h-10 rounded-[8px] bg-[#0E101E]" style={fadeIn(290)} />
      </div>
    )
  }

  if (index === 2) {
    return <DonutPreview />
  }

  return null
}

export function FeatureValue() {
  const [active, setActive] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight / 2
      let closest = 0
      let closestDist = Infinity
      sectionRefs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const elMid = window.scrollY + rect.top + rect.height / 2
        const dist = Math.abs(mid - elMid)
        if (dist < closestDist) { closestDist = dist; closest = i }
      })
      setActive(closest)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="w-full py-16 lg:py-24">
      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-10 xl:px-[140px]">

        {/* ── Section header ───────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end mb-16 md:mb-32">
          <div className="flex flex-col gap-5">
            <TypingBadge text="Developer Experience" />
            <Reveal delay={80}>
              <h2 className="font-pixel text-h2 text-[--text-primary] leading-tight">
                Built For<br />
                <span className="text-primary-500">Developers First</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="font-sans text-xl text-[--text-secondary]">
              Clean REST APIs, typed SDKs, and real-time event hooks so your team spends time building product, not decoding documentation.
            </p>
          </Reveal>
        </div>

        {/* ── Sticky scroll layout ─────────────────────────────── */}
        <div className="flex gap-8">

          {/* Scroll indicator — sticky, desktop only */}
          <div className="hidden lg:flex sticky top-56 flex-col gap-3 h-fit shrink-0">
            {FEATURES.map((_, i) => (
              <div
                key={i}
                className={`w-1 rounded-[2px] transition-all duration-300 ${
                  active === i ? 'h-8 bg-white' : 'h-6 bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* Content columns */}
          <div className="flex flex-col md:flex-row flex-1 gap-8 md:gap-12">

            {/* Scrolling text + code column */}
            <div className="flex flex-col flex-1 gap-16 md:gap-60">
              {FEATURES.map((feat, i) => (
                <div
                  key={feat.title}
                  ref={el => { sectionRefs.current[i] = el }}
                  className="w-full flex flex-col gap-8 md:aspect-square md:justify-between"
                >
                  {/* Title + description */}
                  <div className="flex flex-col gap-2">
                    <h4 className="font-pixel text-h5 md:text-h4 lg:text-h3 text-[--text-primary]">{feat.title}</h4>
                    <p className="font-sans text-l-regular text-white/50 leading-relaxed">{feat.description}</p>
                  </div>

                  {/* Code block */}
                  <div
                    className="rounded-[12px] border border-white/20 p-4 md:p-6 text-[13px] lg:text-[18px]"
                    style={{ fontFamily: 'Consolas, monospace' }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`font-medium ${feat.method === 'GET' ? 'text-green' : 'text-amber'}`}>
                        {feat.method}
                      </span>
                      <span className="text-primary-400 truncate">{feat.endpoint}</span>
                    </div>
                    <div className="space-y-1">
                      {feat.code.map((line, j) => (
                        <div key={j}>
                          {line.type === 'punct' ? (
                            <span className="text-[--text-muted]">{line.value}</span>
                          ) : (
                            <span className="ml-4">
                              <span className="text-primary-300">{line.key}: </span>
                              <span className={line.valueType === 'number' ? 'text-amber' : 'text-green'}>
                                {line.value}
                              </span>
                              {j < feat.code.length - 2 && (
                                <span className="text-[--text-muted]">,</span>
                              )}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile / tablet inline preview — hidden on desktop */}
                  <div
                    className="block md:hidden rounded-[12px] bg-cover bg-center bg-no-repeat p-5"
                    style={{ backgroundImage: 'url(/assets/value-bg.png)' }}
                  >
                    <div className="w-full aspect-square rounded-[12px] bg-primary-dark-500 p-5 flex flex-col items-center justify-center overflow-hidden">
                      <div className="relative w-full">
                        <PreviewContent index={i} />
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Sticky preview card column — desktop only */}
            <div className="hidden md:block flex-1">
              <div className="sticky top-56">
                <div
                  className="w-full aspect-square rounded-[12px] bg-cover bg-center bg-no-repeat p-4 md:p-6 lg:p-10"
                  style={{ backgroundImage: 'url(/assets/value-bg.png)' }}
                >
                  <div className="w-full h-full rounded-[12px] bg-primary-dark-500 p-4 md:p-6 lg:p-8 m-0 flex flex-col items-center justify-center overflow-hidden">

                    {/* Stack wrapper — key remounts on scroll change */}
                    <div key={active} className="relative w-full">

                      {/* Back stack card — only for feature 0 on desktop */}
                      {active === 0 && (
                        <div
                          className="hidden lg:block absolute -bottom-[24px] left-[14%] right-[14%] h-full rounded-[8px] z-0 opacity-50"
                          style={{ backgroundColor: '#1A1C29' }}
                        />
                      )}

                      <PreviewContent index={active} />

                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>{/* end content columns */}

        </div>

      </div>
    </section>
  )
}
