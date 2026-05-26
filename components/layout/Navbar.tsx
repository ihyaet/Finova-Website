'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { List, X } from '@phosphor-icons/react'

const NAV_LINKS = [
  { label: 'Products',  suffix: '+',  href: '#' },
  { label: 'Use cases', suffix: '+',  href: '#' },
  { label: 'Resources', suffix: '+',  href: '#' },
  { label: 'FAQ',       suffix: null, href: '#faq' },
  { label: 'Contact',   suffix: null, href: '#' },
]

const WIDTH = '180ms ease-out'
const FADE  = '300ms ease-out'
const SCROLLED_LOGO_SLOT = 110
const SCROLLED_CTA_SLOT  = 114

export function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header className="w-full sticky top-0 z-50">

      {/* ── Mobile / Tablet bar ──────────────────────────────── */}
      <div className="flex lg:hidden items-center justify-between px-5 md:px-10 py-4 bg-[--bg-base]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <Link href="/" className="shrink-0">
          <Image
            src="/assets/finova-logo.svg"
            alt="FINOVA"
            width={98}
            height={24}
            priority
          />
        </Link>

        <button
          onClick={() => setMobileOpen(prev => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-[--text-secondary] hover:bg-white/5 transition-colors"
        >
          {mobileOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
        </button>
      </div>

      {/* ── Mobile dropdown menu ─────────────────────────────── */}
      <div
        className={`flex lg:hidden flex-col bg-[--bg-base]/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden transition-all duration-300 ease-out ${
          mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 md:px-10 pb-6 pt-2 flex flex-col">
          {NAV_LINKS.map(({ label, suffix, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-4 border-b border-white/[0.06] font-sans text-l text-[--text-secondary] hover:text-[--text-primary] transition-colors"
            >
              <span>{label}</span>
              {suffix && <span className="text-white/30 font-medium">{suffix}</span>}
            </Link>
          ))}
          <Link
            href="/sign-in"
            onClick={() => setMobileOpen(false)}
            className="mt-5 inline-flex h-[44px] items-center justify-center rounded-button border border-white/20 font-sans text-l text-[--text-secondary] hover:border-white/30 hover:bg-white/5 transition-colors"
          >
            Sign in / up
          </Link>
        </div>
      </div>

      {/* ── Desktop nav ──────────────────────────────────────── */}
      <nav
        aria-label="Main"
        className="hidden lg:flex mx-auto w-full max-w-[1160px] px-5 md:px-10 lg:px-0 items-center justify-between py-4"
      >
        {/* External logo — fades out toward center on scroll */}
        <Link
          href="/"
          className="flex-shrink-0"
          style={{
            opacity:     scrolled ? 0 : 1,
            filter:      scrolled ? 'blur(8px)' : 'blur(0px)',
            transform:   scrolled ? 'translateX(28px)' : 'translateX(0)',
            transition:  `opacity ${FADE}, filter ${FADE}, transform ${FADE}`,
            pointerEvents: scrolled ? 'none' : 'auto',
          }}
        >
          <Image src="/assets/finova-logo.svg" alt="FINOVA" width={98} height={24} priority />
        </Link>

        {/* Nav pill — expands to absorb logo + CTA on scroll */}
        <div className="flex flex-none min-w-max items-center rounded-button bg-white/10 pl-4 pr-2 py-2 overflow-hidden backdrop-blur-xl">

          {/* Logo inside pill */}
          <div
            style={{
              width:       scrolled ? `${SCROLLED_LOGO_SLOT}px` : '0px',
              marginRight: scrolled ? '32px' : '0px',
              flexShrink:  0,
              overflow:    'hidden',
              opacity:     scrolled ? 1 : 0,
              filter:      scrolled ? 'blur(0px)' : 'blur(8px)',
              transition:  `width ${WIDTH}, margin-right ${WIDTH}, opacity ${FADE}, filter ${FADE}`,
              pointerEvents: scrolled ? 'auto' : 'none',
            }}
          >
            <Link href="/" className="inline-flex w-max whitespace-nowrap pl-2 pr-1">
              <Image src="/assets/finova-logo.svg" alt="FINOVA" width={98} height={24} />
            </Link>
          </div>

          {/* Nav links */}
          <div className="flex flex-none min-w-max items-center gap-[10px] whitespace-nowrap [&:has(a:hover)_a:not(:hover)]:opacity-50">
            {NAV_LINKS.map(({ label, suffix, href }) => (
              <Link
                key={label}
                href={href}
                className="inline-flex h-8 w-fit flex-none items-center gap-[10px] whitespace-nowrap rounded-full px-4 font-sans text-l text-[--text-secondary] transition-opacity"
              >
                {label}
                {suffix && (
                  <span className="shrink-0 text-white/30 font-medium leading-none">{suffix}</span>
                )}
              </Link>
            ))}
          </div>

          {/* CTA inside pill */}
          <div
            style={{
              width:      scrolled ? `${SCROLLED_CTA_SLOT}px` : '0px',
              marginLeft: scrolled ? '32px' : '0px',
              flexShrink: 0,
              overflow:   'hidden',
              opacity:    scrolled ? 1 : 0,
              filter:     scrolled ? 'blur(0px)' : 'blur(8px)',
              transition: `width ${WIDTH}, margin-left ${WIDTH}, opacity ${FADE}, filter ${FADE}`,
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

        {/* External CTA — fades out toward center on scroll */}
        <Link
          href="/sign-in"
          className="inline-flex h-[44px] flex-none items-center whitespace-nowrap rounded-button border border-white/20 bg-transparent px-6 font-sans text-l text-[--text-secondary] transition-colors hover:border-white/30 hover:bg-white/5"
          style={{
            opacity:     scrolled ? 0 : 1,
            filter:      scrolled ? 'blur(8px)' : 'blur(0px)',
            transform:   scrolled ? 'translateX(-28px)' : 'translateX(0)',
            transition:  `opacity ${FADE}, filter ${FADE}, transform ${FADE}`,
            pointerEvents: scrolled ? 'none' : 'auto',
          }}
        >
          Sign in / up
        </Link>
      </nav>

    </header>
  )
}
