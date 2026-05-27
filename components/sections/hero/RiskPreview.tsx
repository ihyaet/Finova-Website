'use client'

const SCORE = 46.36
const R = 100
const CIRC = 2 * Math.PI * R

const SIGNALS = [
  { label: 'Fraud',    value: 0.22, color: '#5DCAA5' },
  { label: 'AML',      value: 0.11, color: '#5DCAA5' },
  { label: 'Velocity', value: 0.54, color: '#EF9F27' },
]

const FLAGGED = [
  { label: 'Velocity breach',               severity: 'High'     },
  { label: 'Unusual geography',             severity: 'Medium'   },
  { label: 'Large round amount',            severity: 'Medium'   },
  { label: 'Device mismatch',               severity: 'Low'      },
  { label: 'Small square amount',           severity: 'Low'      },
  { label: 'Medium oval amount',            severity: 'High'     },
  { label: 'Extra-large triangular amount', severity: 'Medium'   },
  { label: 'Compact rectangular amount',    severity: 'Very Low' },
]

const SEVERITY_COLOR: Record<string, string> = {
  'High':     'text-[#EF4444]',
  'Medium':   'text-amber',
  'Low':      'text-primary-400',
  'Very Low': 'text-green',
}

export function RiskPreview() {
  const progress = CIRC * (SCORE / 100)

  return (
    <div
      className="w-full h-full rounded-[12px] bg-cover bg-center bg-no-repeat p-4 md:py-12 md:px-20 lg:py-12 lg:px-40"
      style={{ backgroundImage: 'url(/assets/feature-bg.png)' }}
    >
      <div className="rounded-[12px] bg-primary-dark-500 p-4 md:p-6 w-full h-full flex flex-col items-center justify-center md:flex-row md:items-stretch gap-1 md:gap-8">

        {/* ── Left: gauge + signals ────────────────────────── */}
        <div className="flex flex-col w-full md:w-[42%] md:shrink-0 md:justify-between">

          {/* Circular gauge */}
          <div className="flex items-center justify-center md:flex-1 md:mb-6">
            <div
              className="relative w-[180px] h-[180px] md:w-[210px] md:h-[210px] lg:w-[240px] lg:h-[240px]"
              style={{ overflow: 'visible' }}
            >
              <svg width="100%" height="100%" viewBox="0 0 226 226" style={{ overflow: 'visible' }}>
                {/* Track */}
                <circle cx="113" cy="113" r={R} fill="none" stroke="#343541" strokeWidth="13" />
                {/* Progress arc */}
                <circle
                  cx="113" cy="113" r={R}
                  fill="none"
                  stroke="#b2a9db"
                  strokeWidth="13"
                  strokeLinecap="round"
                  strokeDasharray={`${progress} ${CIRC - progress}`}
                  transform="rotate(-90 113 113)"
                />
              </svg>
              {/* Center label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 md:gap-1">
                <span
                  className="text-center leading-tight text-[--text-primary] opacity-40 text-[11px] md:text-[13px]"
                  style={{ fontFamily: 'Consolas, "Courier New", monospace' }}
                >
                  Overall risk score
                </span>
                <div className="flex items-baseline gap-0.5 md:gap-1">
                  <span className="font-pixel text-h6 md:text-h4 text-[--text-primary]">{SCORE}</span>
                  <span className="font-sans text-s text-[--text-muted]">/100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk signals */}
          <div className="flex flex-col gap-2 md:gap-3 w-full">
            <span
              className="text-[--text-primary] opacity-40 text-[12px] md:text-[14px]"
              style={{ fontFamily: 'Consolas, "Courier New", monospace' }}
            >
              Risk signals
            </span>
            {SIGNALS.map(({ label, value, color }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="font-sans text-s md:text-m font-medium text-[--text-primary] w-14 md:w-16">{label}</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${value * 100}%`, backgroundColor: color }}
                  />
                </div>
                <span className="font-pixel text-s text-[--text-secondary] w-8 text-right">
                  {value.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: flagged transactions ───── */}
        <div className="hidden md:flex flex-col gap-3 flex-1 min-h-0">
          <span
            className="text-[--text-primary] opacity-40 shrink-0"
            style={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '14px' }}
          >
            Flagged transaction
          </span>
          <div className="flex flex-col gap-2 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FLAGGED.map(({ label, severity }) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-[8px] border border-white/10 px-4 py-3 shrink-0"
              >
                <span className="font-sans text-m text-[--text-primary]">{label}</span>
                <span
                  className={`font-medium shrink-0 ml-4 ${SEVERITY_COLOR[severity]}`}
                  style={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '14px' }}
                >
                  {severity}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
