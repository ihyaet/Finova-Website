'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const NAV_LINKS = [
  { label: 'Products', suffix: '+', href: '#' },
  { label: 'Use cases', suffix: '+', href: '#' },
  { label: 'Resources', suffix: '+', href: '#' },
  { label: 'FAQ', suffix: null, href: '#faq' },
  { label: 'Contact', suffix: null, href: '#' },
]

const WIDTH = '180ms ease-out'  // 60% of 300ms — pill width snaps fast
const FADE  = '300ms ease-out'  // logo + CTA blur/opacity runs full duration

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="w-full sticky top-0 z-50">
      <nav
        aria-label="Main"
        className="mx-auto w-full max-w-[1160px] px-5 md:px-10 lg:px-0 flex items-center justify-between h-100% py-4"
      >
        {/* ── External logo — fades out toward center on scroll ── */}
        <Link
          href="/"
          className="flex-shrink-0"
          style={{
            opacity: scrolled ? 0 : 1,
            filter: scrolled ? 'blur(8px)' : 'blur(0px)',
            transform: scrolled ? 'translateX(28px)' : 'translateX(0)',
            transition: `opacity ${FADE}, filter ${FADE}, transform ${FADE}`,
            pointerEvents: scrolled ? 'none' : 'auto',
          }}
        >
          <Image
            src="/assets/finova-logo.svg"
            alt="FINOVA"
            width={98}
            height={24}
            priority
          />
        </Link>

        {/* ── Nav pill — expands to absorb logo + CTA on scroll ── */}
        <div className="hidden md:flex items-center rounded-button bg-white/10 pl-4 pr-2 py-2 overflow-hidden backdrop-blur-xl">

          {/* Logo inside pill */}
          <div
            style={{
              maxWidth: scrolled ? '120px' : '0px',
              marginRight: scrolled ? '32px' : '0px',
              overflow: 'hidden',
              opacity: scrolled ? 1 : 0,
              filter: scrolled ? 'blur(0px)' : 'blur(8px)',
              transition: `max-width ${WIDTH}, margin-right ${WIDTH}, opacity ${FADE}, filter ${FADE}`,
              pointerEvents: scrolled ? 'auto' : 'none',
            }}
          >
            <Link href="/" className="block pl-2 pr-1">
              <Image
                src="/assets/finova-logo.svg"
                alt="FINOVA"
                width={98}
                height={24}
              />
            </Link>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-[10px] [&:has(a:hover)_a:not(:hover)]:opacity-50">
            {NAV_LINKS.map(({ label, suffix, href }) => (
              <Link
                key={label}
                href={href}
                className="inline-flex h-8 items-center gap-[10px] rounded-full px-4 font-sans text-l text-[--text-secondary] transition-opacity"
              >
                {label}
                {suffix && (
                  <span className="text-white/30 font-medium leading-none">{suffix}</span>
                )}
              </Link>
            ))}
          </div>

          {/* CTA inside pill */}
          <div
            style={{
              maxWidth: scrolled ? '160px' : '0px',
              marginLeft: scrolled ? '32px' : '0px',
              overflow: 'hidden',
              opacity: scrolled ? 1 : 0,
              filter: scrolled ? 'blur(0px)' : 'blur(8px)',
              transition: `max-width ${WIDTH}, margin-left ${WIDTH}, opacity ${FADE}, filter ${FADE}`,
              pointerEvents: scrolled ? 'auto' : 'none',
            }}
          >
            <Link
              href="/sign-in"
              className="inline-flex h-[36px] items-center rounded-button border border-white/20 bg-transparent px-4 font-sans text-l text-[--text-secondary] whitespace-nowrap transition-colors hover:border-white/30 hover:bg-white/5"
            >
              Sign in / up
            </Link>
          </div>
        </div>

        {/* ── External CTA — fades out toward center on scroll ── */}
        <Link
          href="/sign-in"
          className="inline-flex h-[44px] items-center rounded-button border border-white/20 bg-transparent px-6 font-sans text-l text-[--text-secondary] transition-colors hover:border-white/30 hover:bg-white/5"
          style={{
            opacity: scrolled ? 0 : 1,
            filter: scrolled ? 'blur(8px)' : 'blur(0px)',
            transform: scrolled ? 'translateX(-28px)' : 'translateX(0)',
            transition: `opacity ${FADE}, filter ${FADE}, transform ${FADE}`,
            pointerEvents: scrolled ? 'none' : 'auto',
          }}
        >
          Sign in / up
        </Link>
      </nav>
    </header>
  )
}
