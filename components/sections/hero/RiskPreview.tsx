'use client'

const SCORE = 46.36
const R = 100
const CIRC = 2 * Math.PI * R

const SIGNALS = [
  { label: 'Fraud',    value: 0.22, color: '#5DCAA5' },
  { label: 'AML',      value: 0.11, color: '#5DCAA5' },
  { label: 'Velocity', value: 0.54, color: '#EF9F27' },
]


export function RiskPreview() {
  const progress = CIRC * (SCORE / 100)

  return (
    <div
      className="w-full h-full rounded-[12px] bg-cover bg-center bg-no-repeat p-4 md:p-8 lg:p-12"
      style={{ backgroundImage: 'url(/assets/feature-bg.png)' }}
    >
      <div className="rounded-[12px] bg-primary-dark-500 p-4 lg:p-6 w-full h-full flex flex-col items-center justify-center gap-1">

        {/* Circular gauge */}
        <div className="flex items-center justify-center">
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
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
              <span
                className="text-center leading-tight text-[--text-primary] opacity-40"
                style={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '11px' }}
              >
                Overall risk score
              </span>
              <div className="flex items-baseline gap-0.5">
                <span className="font-pixel text-h6 lg:text-h5 text-[--text-primary]">{SCORE}</span>
                <span className="font-sans text-s text-[--text-muted]">/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Risk signals */}
        <div className="flex flex-col gap-2 w-full">
          <span
            className="text-[--text-primary] opacity-40"
            style={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '12px' }}
          >
            Risk signals
          </span>
          {SIGNALS.map(({ label, value, color }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="font-sans text-s lg:text-m font-medium text-[--text-primary] w-14 lg:w-16">{label}</span>
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
    </div>
  )
}
