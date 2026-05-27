'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'

export function AnnouncementRibbon() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 0)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 w-full h-8 flex items-center bg-primary-500 z-[60] transition-transform duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="w-full px-5 flex items-center justify-center gap-3">
        <span className="inline-flex items-center rounded-badge bg-white px-2.5 py-0.5 font-sans text-s font-semibold uppercase tracking-wider text-black">
          Limited
        </span>
        <p className="font-sans text-m font-medium text-white/90">
          Get 3 Months Free On The Growth Plan For Teams Onboarding Before June 30.
        </p>
        <Link
          href="/sign-up"
          className="hidden sm:inline-flex items-center gap-1 font-sans text-m font-medium text-white transition-opacity hover:opacity-75"
        >
          Claim Offer <ArrowRight size={12} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
