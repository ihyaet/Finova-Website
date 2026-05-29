'use client'

import { useState } from 'react'
import Link from 'next/link'
import { EnvelopeSimple, Lock, Lightning, CreditCard, ShieldCheck } from '@phosphor-icons/react'
import { Reveal } from '@/components/ui/Reveal'

const PERKS = [
  { Icon: Lightning,    text: 'Live in under 2 hours, guaranteed'  },
  { Icon: CreditCard,   text: 'No credit card required to start'   },
  { Icon: ShieldCheck,  text: 'SOC 2 certified from day one'       },
]

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.013 17.64 11.705 17.64 9.2z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
      <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
    </svg>
  )
}

export default function SignInPage() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex flex-1 items-start justify-center pt-16 md:pt-20 lg:pt-[120px] pb-16 md:pb-20 lg:pb-[120px] px-5 md:px-10 lg:px-10 xl:px-[140px]">
      <div className="w-full max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">

        {/* ── Left: brand panel ─────────────────────────────────── */}
        <Reveal className="hidden lg:flex flex-col gap-10 lg:pt-[120px]">
          <div className="flex flex-col gap-5">
            <h3 className="font-pixel text-[--text-primary] leading-tight">
              Your Financial<br />
              Infrastructure{' '}
              <span className="text-primary-500">Awaits</span>
            </h3>
            <p className="font-sans text-xl text-[--text-secondary]">
              Pick up right where you left off. Your dashboards, APIs, and alerts are ready.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {PERKS.map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <Icon size={16} weight="regular" className="text-[--text-muted] shrink-0" aria-hidden="true" />
                <span className="font-sans text-l text-[--text-secondary]">{text}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── Right: form ───────────────────────────────────────── */}
        <Reveal delay={120} className="flex flex-col gap-6 w-full pt-16 md:pt-20 lg:pt-[120px]">

          {/* Header row */}
          <div className="flex items-center justify-between gap-4">
            <h4 className="font-pixel text-[--text-primary]">Sign In</h4>
            <p className="font-sans text-m whitespace-nowrap">
              <span className="text-white/50">New here? </span>
              <Link
                href="/sign-up"
                className="text-[--text-primary] font-medium hover:text-primary-400 transition-colors"
              >
                Create a Free Account
              </Link>
            </p>
          </div>

          {/* Google SSO */}
          <button
            type="button"
            className="w-full h-[44px] flex items-center justify-center gap-3 rounded-full border border-white/20 bg-transparent font-sans text-l text-[--text-primary] hover:bg-white/5 hover:border-white/30 transition-colors"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="font-sans text-m text-[--text-muted]">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Email input */}
          <div className="relative">
            <EnvelopeSimple
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full h-[44px] rounded-full bg-white/10 border border-transparent focus:border-primary-500 pl-11 pr-4 font-sans text-l text-white placeholder:text-white/30 outline-none transition-colors"
            />
          </div>

          {/* Password input */}
          <div className="relative">
            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full h-[44px] rounded-full bg-white/10 border border-transparent focus:border-primary-500 pl-11 pr-4 font-sans text-l text-white placeholder:text-white/30 outline-none transition-colors"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-[44px] rounded-full bg-white font-sans text-l-medium text-base hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>

        </Reveal>
      </div>
    </div>
  )
}
