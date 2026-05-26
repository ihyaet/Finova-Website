'use client'

import { useEffect, useRef, useState } from 'react'
import { Receipt, BellRinging, ListBullets } from '@phosphor-icons/react'

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

// ── Shared preview content (desktop sticky + mobile inline) ──────
function PreviewContent({ index }: { index: number }) {
  const feat = FEATURES[index]

  if (index === 0) {
    return (
      <div className="relative w-full rounded-[8px] p-5 lg:p-6 flex flex-col gap-5 z-10" style={{ backgroundColor: '#1A1C29' }}>
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-[10px] bg-primary-dark-400 flex items-center justify-center">
            <feat.icon size={22} className="text-primary-400" aria-hidden="true" />
          </div>
        </div>
        <div className="border-t border-dashed border-[--border-default] opacity-20" />
        <div className="flex flex-col gap-4">
          {feat.rows.map(({ label, value, accent }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="font-sans text-m text-[--text-muted]">{label}</span>
              <span className={`font-pixel text-m ${accent ? 'text-green' : 'text-[--text-primary]'}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (index === 1) {
    return (
      <div className="relative w-full flex flex-col gap-3 z-10 items-center">
        <div className="w-[80%] h-10 rounded-[8px] bg-primary-dark-400 opacity-60" />
        {[
          { event: 'payment.settled', detail: 'txn_88aZ3k', time: '5 m ago',  accent: 'bg-primary-400' },
          { event: 'risk.flag',       detail: 'acct_11bX9',  time: '3 m ago',  accent: 'bg-green'       },
          { event: 'kyc.passed',      detail: 'usr_7cPq1',   time: '10 m ago', accent: 'bg-amber'       },
        ].map(({ event, detail, time, accent }) => (
          <div key={event} className="flex items-center gap-3 rounded-[8px] bg-primary-dark-400 px-4 py-3 w-full">
            <span className={`w-1 h-[18px] rounded-full shrink-0 ${accent}`} />
            <span className="font-sans text-m text-[--text-primary] flex-1 min-w-0 truncate">{event} — {detail}</span>
            <span className="font-sans text-m text-[--text-muted] shrink-0">{time}</span>
          </div>
        ))}
        <div className="w-[80%] h-10 rounded-[8px] bg-primary-dark-400 opacity-60" />
      </div>
    )
  }

  if (index === 2) {
    const R = 80, CX = 100
    const C = 2 * Math.PI * R
    const GAP = 3
    const usable = C - 3 * GAP
    const pLen = usable * 0.50
    const tLen = usable * 0.35
    const oLen = usable * 0.15
    const base = C / 4
    const pOff = base
    const tOff = base - (pLen + GAP)
    const oOff = base - (pLen + GAP + tLen + GAP)
    return (
      <div className="relative w-full flex flex-col gap-4 z-10">
        <span className="text-center text-[--text-muted]" style={{ fontFamily: 'Consolas, monospace', fontSize: '13px' }}>
          Analytic Summary
        </span>
        <div className="flex justify-center">
          <div className="relative w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] lg:w-[240px] lg:h-[240px]">
            <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
              <circle cx={CX} cy={CX} r={R} fill="none" stroke="#b2a9db" strokeWidth="12" strokeLinecap="round"
                strokeDasharray={`${pLen} ${C - pLen}`} strokeDashoffset={pOff} />
              <circle cx={CX} cy={CX} r={R} fill="none" stroke="#EF9F27" strokeWidth="12" strokeLinecap="round"
                strokeDasharray={`${tLen} ${C - tLen}`} strokeDashoffset={tOff} />
              <circle cx={CX} cy={CX} r={R} fill="none" stroke="#5DCAA5" strokeWidth="12" strokeLinecap="round"
                strokeDasharray={`${oLen} ${C - oLen}`} strokeDashoffset={oOff} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-pixel text-h5 text-[--text-primary]">$ 1.4M</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          {[
            { label: 'Payments',  value: '$1.2M', color: 'text-primary-400' },
            { label: 'Transfers', value: '$840K', color: 'text-amber'       },
            { label: 'Payouts',   value: '$360K', color: 'text-green'       },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center justify-between py-3 border-b border-white/[0.06]">
              <span className="font-sans text-m text-[--text-primary]">{label}</span>
              <span className={`font-pixel text-m ${color}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    )
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
      <div className="mx-auto w-full max-w-[1160px] px-5 md:px-10 lg:px-0">

        {/* ── Section header ───────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-16 lg:mb-32">
          <div className="flex flex-col gap-5">
            <div className="inline-flex w-fit items-center gap-2 bg-primary-400/10 px-3 py-1 rounded-full">
              <span className="w-1 h-[14px] rounded-[2px] bg-primary-400 shrink-0" />
              <span className="font-sans text-m font-medium uppercase tracking-widest text-primary-400">
                Developer Experience
              </span>
            </div>
            <h2 className="font-pixel text-h2 text-[--text-primary] leading-tight">
              Built For<br />
              <span className="text-primary-500">Developers First</span>
            </h2>
          </div>
          <p className="font-sans text-xl text-[--text-secondary]">
            Clean REST APIs, typed SDKs, and real-time event hooks so your team spends time building product, not decoding documentation.
          </p>
        </div>

        {/* ── Sticky scroll layout ─────────────────────────────── */}
        <div className="flex gap-8 pt-16 lg:pt-32">

          {/* Scroll indicator — sticky, desktop only */}
          <div className="hidden lg:flex sticky top-24 flex-col gap-3 h-fit shrink-0">
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
          <div className="flex flex-col lg:flex-row flex-1 gap-8 lg:gap-12">

            {/* Scrolling text + code column */}
            <div className="flex flex-col flex-1 gap-16 lg:gap-60">
              {FEATURES.map((feat, i) => (
                <div
                  key={feat.title}
                  ref={el => { sectionRefs.current[i] = el }}
                  className="w-full flex flex-col gap-8 lg:aspect-square lg:justify-between"
                >
                  {/* Title + description */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-pixel text-h5 text-[--text-primary]">{feat.title}</h3>
                    <p className="font-sans text-m text-[--text-muted] leading-relaxed">{feat.description}</p>
                  </div>

                  {/* Code block */}
                  <div
                    className="rounded-[12px] border border-white/20 p-4 lg:p-6 text-[13px] lg:text-[18px]"
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
                    className="block lg:hidden rounded-[12px] bg-cover bg-center bg-no-repeat p-5"
                    style={{ backgroundImage: 'url(/assets/feature-bg.png)' }}
                  >
                    <div className="w-full rounded-[12px] bg-primary-dark-500 p-5 flex flex-col items-center justify-center overflow-visible">
                      <div className={`relative ${i === 0 ? 'w-[80%] pb-8' : 'w-full'}`}>
                        {i === 0 && (
                          <div
                            className="absolute -bottom-[20px] inset-x-[4%] h-full rounded-[8px] z-0 opacity-50"
                            style={{ backgroundColor: '#1A1C29' }}
                          />
                        )}
                        <PreviewContent index={i} />
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Sticky preview card column — desktop only */}
            <div className="hidden lg:block flex-1">
              <div className="sticky top-24">
                <div
                  className="w-full aspect-square rounded-[12px] bg-cover bg-center bg-no-repeat p-10"
                  style={{ backgroundImage: 'url(/assets/feature-bg.png)' }}
                >
                  <div className="w-full h-full rounded-[12px] bg-primary-dark-500 p-8 m-0 flex flex-col items-center justify-center overflow-hidden">

                    {/* Stack wrapper */}
                    <div className={`relative ${active === 0 ? 'w-[80%]' : 'w-full'}`}>

                      {/* Back stack card — only for feature 0 */}
                      {active === 0 && (
                        <div
                          className="absolute -bottom-[24px] left-[14%] right-[14%] h-full rounded-[8px] z-0 opacity-50"
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
