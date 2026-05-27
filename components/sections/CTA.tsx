'use client'

import { useState } from 'react'
import { EnvelopeSimple } from '@phosphor-icons/react'
import FinovaAscii from '@/components/providers/finova_ascii_tsx'

export function CTA() {
  const [email, setEmail] = useState('')

  return (
    <section className="w-full pt-24 pb-0">
      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-10 xl:px-[140px]">

        {/* ── Content ─────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-6 mb-16 w-full">

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
          <p className="font-sans text-xl text-[--text-secondary] w-full md:max-w-[560px] md:line-clamp-1">
            Unlock the power of Finova's solutions and transform your financial operations today.
          </p>

          {/* Email form */}
          <div className="flex items-center w-full md:max-w-[620px] bg-white/10 rounded-full pl-5 pr-2 py-2 gap-3">
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

      {/* ── Finova ASCII texture ─────────────────────────────── */}
      <div className="w-full flex justify-center overflow-hidden h-[60px] sm:h-[80px] md:h-[110px] lg:h-[140px]" aria-hidden="true">
        <FinovaAscii className="text-[5px] sm:text-[7px] md:text-[9px] lg:text-[11px]" />
      </div>

    </section>
  )
}
