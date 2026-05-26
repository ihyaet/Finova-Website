'use client'

import { useState } from 'react'
import { EnvelopeSimple } from '@phosphor-icons/react'
import AsciiShader from '@/components/providers/ascii-shader'

const ASCII_CONFIG = {
  cellSize: 9,
  speed: 0.6,
  waveFreq: 3,
  waveIntensity: 0.5,
  mouseRadius: 155,
  flickerRate: 1,
  noiseAmount: 0.5,
  scanlines: 0,
  charSet: "minimal" as const,
}

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

      {/* ── ASCII Shader texture ─────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 280 }}
        aria-hidden="true"
      >
        <AsciiShader
          config={ASCII_CONFIG}
          svgScale={0.85}
          className="absolute inset-0 w-full h-full mix-blend-exclusion"
        />
      </div>

    </section>
  )
}
