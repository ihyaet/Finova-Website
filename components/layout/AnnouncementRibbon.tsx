import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

export function AnnouncementRibbon() {
  return (
    <div className="w-full h-8 flex items-center bg-primary-500">
      <div className="mx-auto w-full max-w-[1160px] px-5 md:px-10 lg:px-0 flex items-center justify-center gap-3">
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
