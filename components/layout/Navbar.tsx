import Link from 'next/link'
import Image from 'next/image'

const NAV_LINKS = [
  { label: 'Products', suffix: '+', href: '#' },
  { label: 'Use cases', suffix: '+', href: '#' },
  { label: 'Resources', suffix: '+', href: '#' },
  { label: 'FAQ', suffix: null, href: '#faq' },
  { label: 'Contact', suffix: null, href: '#' },
]

export function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 bg-base/95 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto w-full max-w-[1160px] px-5 md:px-10 lg:px-0 flex items-center justify-between h-16"
      >
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/assets/finova-logo.svg"
            alt="FINOVA"
            width={98}
            height={24}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-[10px] rounded-button bg-white/10 px-2 py-2 [&:has(a:hover)_a:not(:hover)]:opacity-50">
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

        <Link
          href="/sign-in"
          className="inline-flex h-[44px] items-center rounded-button border border-white/20 bg-transparent px-6 font-sans text-l text-[--text-secondary] transition-colors hover:border-white/30 hover:bg-white/5"
        >
          Sign in / up
        </Link>
      </nav>
    </header>
  )
}
