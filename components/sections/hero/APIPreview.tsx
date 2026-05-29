'use client'

import { useState } from 'react'

const G = '#5DCAA5'
const W = 'rgba(255,255,255,0.90)'
const D = 'rgba(255,255,255,0.35)'

type Span = { t: string; c: string }
type Line = Span[]

const ENDPOINTS: { method: 'GET' | 'POST'; path: string; lines: Line[] }[] = [
  {
    method: 'POST',
    path: '/payments/initiate',
    lines: [
      [{ t: 'curl', c: G }, { t: ' -X ', c: G }, { t: 'POST', c: W }],
      [{ t: 'https://api.finova.io/v1/payments/initiate', c: W }],
      [{ t: '-H ', c: G }, { t: '"Authorization: Bearer $FINOVA_API_KEY"', c: G }],
      [{ t: '-H ', c: G }, { t: '"Content-Type: application/json"', c: G }],
      [{ t: "-d '", c: W }, { t: '{', c: D }],
      [{ t: '  "amount"', c: W }, { t: ': ', c: D }, { t: '4500', c: W }, { t: ',', c: D }],
      [{ t: '  "currency"', c: W }, { t: ': ', c: D }, { t: '"USD"', c: G }, { t: ',', c: D }],
      [{ t: '  "recipient_id"', c: W }, { t: ': ', c: D }, { t: '"usr_9xKm2"', c: G }, { t: ',', c: D }],
      [{ t: '  "idempotency_key"', c: W }, { t: ': ', c: D }, { t: '"inv_0029"', c: G }],
      [{ t: "}'​", c: D }],
    ],
  },
  {
    method: 'POST',
    path: '/risk/score',
    lines: [
      [{ t: 'curl', c: G }, { t: ' -X ', c: G }, { t: 'POST', c: W }],
      [{ t: 'https://api.finova.io/v1/risk/score', c: W }],
      [{ t: '-H ', c: G }, { t: '"Authorization: Bearer $FINOVA_API_KEY"', c: G }],
      [{ t: '-H ', c: G }, { t: '"Content-Type: application/json"', c: G }],
      [{ t: "-d '", c: W }, { t: '{', c: D }],
      [{ t: '  "user_id"', c: W }, { t: ': ', c: D }, { t: '"usr_9xKm2"', c: G }, { t: ',', c: D }],
      [{ t: '  "transaction_amount"', c: W }, { t: ': ', c: D }, { t: '4500', c: W }, { t: ',', c: D }],
      [{ t: '  "country"', c: W }, { t: ': ', c: D }, { t: '"US"', c: G }],
      [{ t: "}'​", c: D }],
    ],
  },
  {
    method: 'GET',
    path: '/analytics/summary',
    lines: [
      [{ t: 'curl', c: G }, { t: ' -X ', c: G }, { t: 'GET', c: W }],
      [{ t: 'https://api.finova.io/v1/analytics/summary', c: W }],
      [{ t: '-H ', c: G }, { t: '"Authorization: Bearer $FINOVA_API_KEY"', c: G }],
      [{ t: '-G ', c: G }, { t: '--data-urlencode ', c: W }],
      [{ t: '  "period=', c: W }, { t: 'last_30_days', c: G }, { t: '"', c: W }],
      [{ t: '--data-urlencode ', c: W }],
      [{ t: '  "currency=', c: W }, { t: 'USD', c: G }, { t: '"', c: W }],
    ],
  },
  {
    method: 'GET',
    path: '/accounts/:id',
    lines: [
      [{ t: 'curl', c: G }, { t: ' -X ', c: G }, { t: 'GET', c: W }],
      [{ t: 'https://api.finova.io/v1/accounts/acc_7Xp2', c: W }],
      [{ t: '-H ', c: G }, { t: '"Authorization: Bearer $FINOVA_API_KEY"', c: G }],
      [{ t: '-H ', c: G }, { t: '"Accept: application/json"', c: G }],
    ],
  },
]

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

function fadeIn(delay: number) {
  return {
    opacity: 0,
    animation: `tab-reveal 400ms ${EASE} ${delay}ms both`,
  }
}

export function APIPreview() {
  const [active, setActive] = useState(0)
  const ep = ENDPOINTS[active]

  return (
    <div
      className="w-full h-full rounded-[12px] bg-cover bg-center bg-no-repeat p-4 md:py-12 md:px-20 lg:py-12 lg:px-40"
      style={{ backgroundImage: 'url(/assets/feature-bg.png)' }}
    >
      <div className="rounded-[12px] bg-primary-dark-500 p-4 lg:p-6 flex flex-col gap-4 w-full h-full">

        {/* ── Endpoint pills ─────────────────────────────────── */}
        <div className="flex items-center gap-2 flex-wrap">
          {ENDPOINTS.map((e, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 font-sans text-s bg-transparent text-white"
              style={fadeIn(i * 50)}
            >
              <span className="font-medium">{e.method}</span>
              <span>{e.path}</span>
            </div>
          ))}
        </div>

        {/* ── Code block ─────────────────────────────────────── */}
        <div className="flex-1 rounded-inner bg-white/5 p-5 overflow-auto flex items-center justify-start">
          <div
            key={active}
            className="flex flex-col gap-0 text-[13px] lg:text-[18px]"
            style={{ fontFamily: 'Consolas, "Courier New", monospace', lineHeight: '1.75', letterSpacing: '-0.04em' }}
          >
            {ep.lines.map((line, i) => (
              <div key={i} style={fadeIn(i * 40)}>
                {line.map((span, j) => (
                  <span key={j} style={{ color: span.c }}>{span.t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
