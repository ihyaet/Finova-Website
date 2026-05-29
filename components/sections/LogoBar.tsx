import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'

const LOGOS = [
  { src: '/assets/delloitte.svg', alt: 'Deloitte' },
  { src: '/assets/vanguard.svg',  alt: 'Vanguard' },
  { src: '/assets/carta.svg',     alt: 'Carta'    },
  { src: '/assets/bill.svg',      alt: 'Bill'     },
  { src: '/assets/ramp.svg',      alt: 'Ramp'     },
  { src: '/assets/brex.svg',      alt: 'Brex'     },
  { src: '/assets/stripe.svg',    alt: 'Stripe'   },
  { src: '/assets/square.svg',    alt: 'Square'   },
]

export function LogoBar() {
  return (
    <section className="w-full py-16">
      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-10 xl:px-[140px]">
        <Reveal>
          <p className="text-center font-sans text-m text-[--text-muted] mb-10">
            Trusted by Leading Financial Innovators
          </p>
        </Reveal>
      </div>

      <Reveal delay={80} className="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-10 xl:px-[140px]">
        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32"
            style={{ background: 'linear-gradient(to right, var(--bg-base), transparent)' }} />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32"
            style={{ background: 'linear-gradient(to left, var(--bg-base), transparent)' }} />
          <div className="animate-marquee flex w-max items-center" style={{ willChange: 'transform' }}>
            {[...LOGOS, ...LOGOS].map(({ src, alt }, i) => (
              <div key={`${alt}-${i}`} className="flex shrink-0 items-center justify-center pr-16 opacity-40 hover:opacity-70 transition-opacity duration-300">
                <Image src={src} alt={alt} width={120} height={32} className="h-8 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
