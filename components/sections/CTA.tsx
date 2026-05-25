'use client'

import { useState } from 'react'
import { EnvelopeSimple } from '@phosphor-icons/react'

// Deterministic matrix texture — rows of varying-length "=" strings
const MATRIX: string[][] = Array.from({ length: 9 }, (_, row) =>
  Array.from({ length: 28 }, (_, col) => {
    const seed = row * 37 + col * 13
    const len  = (seed % 10) + 2
    return '='.repeat(len)
  })
)

export function CTA() {
  const [email, setEmail] = useState('')

  return (
    <section className="w-full py-24">
      <div className="mx-auto w-full max-w-[1160px] px-5 md:px-10 lg:px-0">

        {/* ── Content ─────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-6 mb-20">

          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-2 bg-primary-400/10 px-3 py-1 rounded-full">
            <span className="w-1 h-[14px] rounded-[2px] bg-primary-400 shrink-0" />
            <span className="font-sans text-m font-medium uppercase tracking-widest text-primary-400">
              No Setup Fees. No Lock-in.
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-pixel text-[--text-primary] leading-tight">
            Join The Financial Revolution<br />
            <span className="text-primary-500">Your Success Starts Here</span>
          </h2>

          {/* Description */}
          <p className="font-sans text-xl text-[--text-secondary] max-w-[560px]">
            Unlock the power of Finova's solutions and transform your financial operations today.
          </p>

          {/* Email form */}
          <div className="flex items-center w-full max-w-[620px] bg-white/10 rounded-full pl-5 pr-2 py-2 gap-3">
            <EnvelopeSimple size={20} className="text-[--text-muted] shrink-0" aria-hidden="true" />
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 bg-transparent font-sans text-l text-[--text-primary] placeholder:text-[--text-muted] outline-none"
            />
            <button
              type="submit"
              className="font-sans text-l-medium text-base bg-white rounded-full px-6 h-10 shrink-0 hover:opacity-90 transition-opacity"
            >
              Submit
            </button>
          </div>

        </div>

      </div>

      {/* ── Matrix texture ──────────────────────────────────────── */}
      <div className="w-full overflow-hidden px-6" aria-hidden="true">
        <div className="flex flex-col gap-2">
          {MATRIX.map((row, ri) => (
            <div key={ri} className="flex gap-6 justify-between">
              {row.map((cell, ci) => (
                <span
                  key={ci}
                  className="font-pixel text-s text-white/[0.08] whitespace-nowrap"
                >
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
