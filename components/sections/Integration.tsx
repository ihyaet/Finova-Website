import { Button } from '@/components/ui/button'

const OUTER_COUNT = 4
const MID_COUNT   = 3

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
      <div className="mx-auto w-full max-w-[1160px] px-5 md:px-10 lg:px-0">

        {/* ── Ring visual ─────────────────────────────────────── */}
        <div className="flex justify-center mb-16 overflow-hidden">

          <div className="relative shrink-0" style={{ width: W, height: W }}>

            {/* ── SVG circle tracks ───────────────────────────── */}
            <svg
              className="absolute inset-0 pointer-events-none"
              width={W} height={W}
              viewBox={`0 0 ${W} ${W}`}
            >
              <circle cx={CX} cy={CX} r={R_OUT} fill="none" stroke={STROKE} strokeWidth="1" strokeDasharray={DASH} opacity="0.35" />
              <circle cx={CX} cy={CX} r={R_MID} fill="none" stroke={STROKE} strokeWidth="1" strokeDasharray={DASH} opacity="0.35" />
              <circle cx={CX} cy={CX} r={R_IN}  fill="none" stroke={STROKE} strokeWidth="1" strokeDasharray={DASH} opacity="0.35" />
            </svg>

            {/* ── Outer ring — 4 bubbles, clockwise ───────────── */}
            <div className="animate-orbit absolute inset-0">
              {Array.from({ length: OUTER_COUNT }).map((_, i) => {
                const angle = (i * 360) / OUTER_COUNT
                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      top: '50%', left: '50%',
                      width: 0,   height: 0,
                      transform: `rotate(${angle}deg) translateX(${R_OUT}px)`,
                    }}
                  >
                    <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
                      <div className="w-16 h-16 rounded-full bg-white/10 border border-white/10 backdrop-blur-[12px]" />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ── Middle ring — 3 bubbles, counter-clockwise ───── */}
            <div className="animate-orbit-mid absolute inset-0">
              {Array.from({ length: MID_COUNT }).map((_, i) => {
                const angle = (i * 360) / MID_COUNT
                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      top: '50%', left: '50%',
                      width: 0,   height: 0,
                      transform: `rotate(${angle}deg) translateX(${R_MID}px)`,
                    }}
                  >
                    <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
                      <div className="w-16 h-16 rounded-full bg-white/10 border border-white/10 backdrop-blur-[12px]" />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ── Bottom gradient overlay ──────────────────────── */}
            <div
              className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent 0%, #07080f 100%)' }}
            />

          </div>
        </div>

        {/* ── Text content ────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-5 max-w-[640px] mx-auto">

          <div className="inline-flex w-fit items-center gap-2 bg-primary-400/10 px-3 py-1 rounded-full">
            <span className="w-1 h-[14px] rounded-[2px] bg-primary-400 shrink-0" />
            <span className="font-sans text-m font-medium uppercase tracking-widest text-primary-400">
              Integrations
            </span>
          </div>

          <h2 className="font-pixel text-[--text-primary] leading-tight">
            Plugs Into Your<br />
            <span className="text-primary-500">Existing Stack</span>
          </h2>

          <p className="font-sans text-xl text-[--text-secondary]">
            Connect Finova to the tools you already rely on. Payment processors,
            communication platforms, and accounting software — seamless
            integrations out of the box.
          </p>

          <div className="flex items-center gap-3 mt-2">
            <Button variant="primary">Explore Integrations</Button>
            <Button variant="secondary">View Docs</Button>
          </div>

        </div>

      </div>
    </section>
  )
}
