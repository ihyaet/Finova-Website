import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/Reveal'
import { TypingBadge } from '@/components/ui/TypingBadge'

const OUTER_COUNT = 4
const MID_COUNT   = 3

const OUTER_LOGOS = [
  { src: '/assets/anlaytics.svg',       alt: 'Analytics' },
  { src: '/assets/data.svg',            alt: 'Data'      },
  { src: '/assets/striper purple.svg',  alt: 'Stripe'    },
  { src: '/assets/uilogo.svg',          alt: 'UI'        },
]

const MID_LOGOS = [
  { src: '/assets/mailchimp.svg',     alt: 'Mailchimp' },
  { src: '/assets/devicon_slack.svg', alt: 'Slack'     },
  { src: '/assets/paypal.svg',        alt: 'PayPal'    },
]

const W      = 640
const CX     = W / 2
const R_OUT  = 290
const R_MID  = 182
const R_IN   = 72
const DASH   = '8 5'
const STROKE = '#b2a9db'

export function Integration() {
  return (
    <section className="w-full py-24">
      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-10 xl:px-[140px]">

        {/* ── Ring visual ─────────────────────────────────────── */}
        <div className="overflow-hidden mb-16" style={{ height: 378 }}>
        <Reveal className="relative flex justify-center items-start p-4 md:p-6">
          <div className="relative shrink-0" style={{ width: W, height: W }}>
            <svg className="absolute inset-0 pointer-events-none" width={W} height={W} viewBox={`0 0 ${W} ${W}`}>
              <circle cx={CX} cy={CX} r={R_OUT} fill="none" stroke={STROKE} strokeWidth="1" strokeDasharray={DASH} opacity="0.35" />
              <circle cx={CX} cy={CX} r={R_MID} fill="none" stroke={STROKE} strokeWidth="1" strokeDasharray={DASH} opacity="0.35" />
              <circle cx={CX} cy={CX} r={R_IN}  fill="none" stroke={STROKE} strokeWidth="1" strokeDasharray={DASH} opacity="0.35" />
            </svg>
            <div className="animate-orbit absolute inset-0">
              {OUTER_LOGOS.map(({ src, alt }, i) => (
                <div key={i} className="absolute" style={{ top: '50%', left: '50%', width: 0, height: 0, transform: `rotate(${(i * 360) / OUTER_COUNT}deg) translateX(${R_OUT}px)` }}>
                  <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
                    <div className="animate-counter-rotate-mid w-16 h-16 rounded-full bg-white/10 border border-white/10 backdrop-blur-[12px] flex items-center justify-center">
                      <Image src={src} alt={alt} width={32} height={32} className="object-contain" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="animate-orbit-mid absolute inset-0">
              {MID_LOGOS.map(({ src, alt }, i) => (
                <div key={i} className="absolute" style={{ top: '50%', left: '50%', width: 0, height: 0, transform: `rotate(${(i * 360) / MID_COUNT}deg) translateX(${R_MID}px)` }}>
                  <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
                    <div className="animate-counter-rotate w-16 h-16 rounded-full bg-white/10 border border-white/10 backdrop-blur-[12px] flex items-center justify-center">
                      <Image src={src} alt={alt} width={32} height={32} className="object-contain" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute left-0 right-0 h-40 pointer-events-none z-10"
            style={{ top: W * 0.4, background: 'linear-gradient(to bottom, transparent 0%, #07080f 100%)' }} />
        </Reveal>
        </div>

        {/* ── Text content ────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-5 w-full md:max-w-[640px] mx-auto">
          <TypingBadge text="Integrations" />
          <Reveal delay={80}>
            <h2 className="font-pixel text-[--text-primary] leading-tight">
              Plugs Into Your<br /><span className="text-primary-500">Existing Stack</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="font-sans text-xl text-[--text-secondary] md:line-clamp-2">
              Connect Finova to the tools you already rely on. Payment processors,
              communication platforms, and accounting software — seamless integrations out of the box.
            </p>
          </Reveal>
          <Reveal delay={240} className="flex items-center gap-3 mt-2">
            <Button variant="primary">Explore Integrations</Button>
            <Button variant="secondary">View Docs</Button>
          </Reveal>
        </div>

      </div>
    </section>
  )
}
