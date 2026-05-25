import Image from 'next/image'
import { Button } from '@/components/ui/button'

const INTEGRATIONS = [
  { src: '/assets/logos_facebook.svg',  alt: 'Facebook'  },
  { src: '/assets/devicon_slack.svg',   alt: 'Slack'     },
  { src: '/assets/cib_mailchimp.svg',   alt: 'Mailchimp' },
  { src: '/assets/stripe.svg',          alt: 'Stripe'    },
  { src: '/assets/image%2030.svg',      alt: 'Plaid'     },
  { src: '/assets/image%2033.svg',      alt: 'Xero'      },
]

const OUTER_RADIUS = 320   // 640 px ring
const INNER_RADIUS = 160   // 320 px ring

export function Integration() {
  return (
    <section className="w-full py-24">
      <div className="mx-auto w-full max-w-[1160px] px-5 md:px-10 lg:px-0">

        {/* ── Ring visual ─────────────────────────────────────── */}
        <div className="flex justify-center mb-16 overflow-hidden">

          {/* Orbit stage — sized to fit the outer ring */}
          <div className="relative shrink-0" style={{ width: OUTER_RADIUS * 2, height: OUTER_RADIUS * 2 }}>

            {/* Outer rotating dashed ring */}
            <div
              className="animate-orbit absolute inset-0 rounded-full"
              style={{ border: '1.5px dashed rgba(255,255,255,0.12)' }}
            >
              {/* Icons positioned at even angles around the ring */}
              {INTEGRATIONS.map(({ src, alt }, i) => {
                const angle = (i * 360) / INTEGRATIONS.length
                return (
                  <div
                    key={alt}
                    className="absolute"
                    style={{
                      top:       '50%',
                      left:      '50%',
                      transform: `rotate(${angle}deg) translateX(${OUTER_RADIUS}px)`,
                    }}
                  >
                    {/* Center the box on the orbit point */}
                    <div style={{ transform: 'translate(-50%, -50%)' }}>
                      {/* Counter-rotate so icon stays visually upright */}
                      <div className="animate-counter-rotate inline-flex items-center justify-center rounded-full bg-white/10 border border-white/5 p-4 backdrop-blur-[24px]">
                        <Image
                          src={src}
                          alt={alt}
                          width={32}
                          height={32}
                          className="object-contain w-8 h-8"
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Inner static dashed ring */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width:      INNER_RADIUS * 2,
                height:     INNER_RADIUS * 2,
                top:        '50%',
                left:       '50%',
                marginLeft: -INNER_RADIUS,
                marginTop:  -INNER_RADIUS,
                border:     '1.5px dashed rgba(255,255,255,0.07)',
              }}
            />

            {/* Center hub — Finova logo */}
            <div
              className="absolute flex items-center justify-center rounded-full bg-[--bg-surface] border border-[--border-default]"
              style={{
                width:      88,
                height:     88,
                top:        '50%',
                left:       '50%',
                marginLeft: -44,
                marginTop:  -44,
              }}
            >
              <Image
                src="/assets/finova-logo.svg"
                alt="Finova"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>

          </div>
        </div>

        {/* ── Text content ────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-5 max-w-[640px] mx-auto">

          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-2 bg-primary-400/10 px-3 py-1 rounded-full">
            <span className="w-1 h-[14px] rounded-[2px] bg-primary-400 shrink-0" />
            <span className="font-sans text-m font-medium uppercase tracking-widest text-primary-400">
              Integrations
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-pixel text-[--text-primary] leading-tight">
            Plugs Into Your<br />
            <span className="text-primary-500">Existing Stack</span>
          </h2>

          {/* Description */}
          <p className="font-sans text-xl text-[--text-secondary]">
            Connect Finova to the tools you already rely on. Payment processors,
            communication platforms, and accounting software seamless
            integrations out of the box.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 mt-2">
            <Button variant="primary">Explore Integrations</Button>
            <Button variant="secondary">View Docs</Button>
          </div>

        </div>

      </div>
    </section>
  )
}
