'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Receipt, BellRinging, ListBullets } from '@phosphor-icons/react'

type FeatureId = 'payment' | 'webhook' | 'transactions'

const FEATURE_DURATION = 7000

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
  id: FeatureId
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
    id: 'payment',
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
    id: 'webhook',
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
    id: 'transactions',
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

export function FeatureValue() {
  const [activeId, setActiveId]       = useState<FeatureId>('payment')
  const [progressKey, setProgressKey] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setProgressKey(k => k + 1)
    timerRef.current = setInterval(() => {
      setActiveId(prev => {
        const idx = FEATURES.findIndex(f => f.id === prev)
        return FEATURES[(idx + 1) % FEATURES.length].id
      })
      setProgressKey(k => k + 1)
    }, FEATURE_DURATION)
  }, [])

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [startTimer])

  const handleSelect = (id: FeatureId) => {
    setActiveId(id)
    startTimer()
  }

  const active = FEATURES.find(f => f.id === activeId)!

  return (
    <section className="w-full py-24">
      <div className="mx-auto w-full max-w-[1160px] px-5 md:px-10 lg:px-0">

        {/* ── Top header ──────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-end mb-20">

          {/* Left: badge + headline */}
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

          {/* Right: description */}
          <p className="font-sans text-xl text-[--text-secondary]">
            Clean REST APIs, typed SDKs, and real-time event hooks so your team spends time building product, not decoding documentation.
          </p>

        </div>

        {/* ── Bottom content ───────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left: feature list + code block */}
          <div className="flex flex-col gap-8">

            {/* Feature list */}
            <div className="flex flex-col">
              {FEATURES.map((f) => {
                const isActive = f.id === activeId
                return (
                  <button
                    key={f.id}
                    onClick={() => handleSelect(f.id)}
                    className="relative text-left pl-5 py-4 border-l-2 border-white/10 hover:border-white/30 transition-colors"
                  >
                    {/* Static active border */}
                    {isActive && (
                      <span className="absolute left-[-2px] top-0 w-[2px] h-full rounded-full bg-white/20" />
                    )}
                    {/* Animated progress border */}
                    {isActive && (
                      <span
                        key={progressKey}
                        className="animate-feature-progress absolute left-[-2px] top-0 w-[2px] rounded-full bg-primary-500"
                      />
                    )}
                    <span className={`block font-pixel text-h5 mb-1 transition-colors ${
                      isActive ? 'text-[--text-primary]' : 'text-[--text-muted]'
                    }`}>
                      {f.title}
                    </span>
                    {isActive && (
                      <span className="block font-sans text-m text-[--text-muted] leading-relaxed">
                        {f.description}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Code block */}
            <div className="rounded-[8px] border border-[--border-default] bg-[--bg-input] p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className={`font-pixel text-s font-medium ${
                  active.method === 'GET' ? 'text-green' : 'text-amber'
                }`}>
                  {active.method}
                </span>
                <span className="font-pixel text-s text-primary-400">{active.endpoint}</span>
              </div>
              <div className="font-pixel text-s space-y-1">
                {active.code.map((line, i) => (
                  <div key={i}>
                    {line.type === 'punct' ? (
                      <span className="text-[--text-muted]">{line.value}</span>
                    ) : (
                      <span className="ml-4">
                        <span className="text-primary-300">{line.key}: </span>
                        <span className={line.valueType === 'number' ? 'text-amber' : 'text-green'}>
                          {line.value}
                        </span>
                        {i < active.code.length - 2 && (
                          <span className="text-[--text-muted]">,</span>
                        )}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: visual preview card */}
          <div
            className="w-full h-full rounded-[12px] bg-cover bg-center bg-no-repeat flex items-center justify-center px-20 py-10"
            style={{ backgroundImage: 'url(/assets/feature-bg.png)' }}
          >
            <div className="w-full rounded-[12px] bg-primary-dark-500 p-6 flex flex-col gap-5">

              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-[10px] bg-primary-dark-400 flex items-center justify-center">
                  <active.icon size={22} className="text-primary-400" aria-hidden="true" />
                </div>
              </div>

              {/* Dashed divider */}
              <div className="border-t border-dashed border-[--border-default]" />

              {/* Data rows */}
              <div className="flex flex-col gap-4">
                {active.rows.map(({ label, value, accent }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="font-sans text-m text-[--text-muted]">{label}</span>
                    <span className={`font-pixel text-m ${accent ? 'text-green' : 'text-[--text-primary]'}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
