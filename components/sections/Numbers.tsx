const STATS = [
  { value: '99.99%', label: 'Platform uptime SLA'               },
  { value: '$10B+',  label: 'Transactions securely processed'   },
  { value: '500+',   label: 'Businesses trust our platform'     },
  { value: '<80ms',  label: 'Avg API response time'             },
]

// SVG canvas dimensions
const W = 1000
const H = 380

// Exponential-feel cubic bezier — flat for ~70 % then shoots upward
const CURVE = `M 0,${H} C ${W * 0.70},${H} ${W * 0.86},${H * 0.28} ${W},0`
const AREA  = `${CURVE} L ${W},${H} L 0,${H} Z`

// Four dashed vertical grid lines
const GRID_X = [0.27, 0.46, 0.64, 0.83]

const GRAD_ID = 'numbers-area-gradient'

export function Numbers() {
  return (
    <section className="w-full py-24">
      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-10 xl:px-[140px]">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-16 mb-16">

          {/* Left: badge + headline */}
          <div className="flex flex-col gap-5 flex-1">
            <div className="inline-flex w-fit items-center gap-2 bg-primary-400/10 px-3 py-1 rounded-full">
              <span className="w-1 h-[14px] rounded-[2px] bg-primary-400 shrink-0" />
              <span className="font-sans text-m font-medium uppercase tracking-widest text-primary-400">
                Zero Trade-offs
              </span>
            </div>
            <h2 className="font-pixel text-[--text-primary] leading-tight">
              Built for Performance,<br />
              <span className="text-primary-500">Security, and Scalability</span>
            </h2>
          </div>

          {/* Right: description */}
    
          <p className="font-sans text-xl text-[--text-secondary] w-full lg:w-[30%] lg:shrink-0">
            Built for the future, our features provide the flexibility and
            security you need to succeed.
          </p>

        </div>

        {/* ── Chart ───────────────────────────────────────────── */}
        <div className="w-full px-0 md:px-12 lg:px-24 mb-16">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="w-full"
            style={{ height: 380, display: 'block' }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={GRAD_ID} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#9f94d2" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#9f94d2" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Vertical dashed grid lines */}
            {GRID_X.map((xFrac, i) => (
              <line
                key={i}
                x1={xFrac * W} y1={0}
                x2={xFrac * W} y2={H}
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
                strokeDasharray="6 6"
              />
            ))}

            {/* Gradient fill under the curve */}
            <path d={AREA} fill={`url(#${GRAD_ID})`} />

            {/* Curve line */}
            <path
              d={CURVE}
              fill="none"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        {/* ── Stats bar ───────────────────────────────────────── */}
        <div className="rounded-[16px] border border-white/20 bg-[--bg-surface] p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center justify-center gap-2">
              <span className="font-pixel text-h4 text-primary-400 leading-none">
                {value}
              </span>
              <span className="font-sans text-m text-[--text-muted]">
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
