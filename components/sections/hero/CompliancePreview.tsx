'use client'

const CHECKS = [
  { label: 'KYC verification', status: 'Passed',       color: 'text-green' },
  { label: 'AML screening',    status: 'Clear',         color: 'text-green' },
  { label: 'GDPR consent',     status: 'Under Review',  color: 'text-amber' },
]

const AUDIT_LOG = [
  { text: 'KYC passed for usr_7cPq1 — identity verified via document scan', time: '5 m ago' },
  { text: 'GDPR consent flag raised — acct_11bX9 missing opt-in record',    time: '3 m ago' },
  { text: 'AML screening cleared — txn_88aZ3k matched no watchlist entries', time: '10 m ago' },
  { text: 'SOC 2 Type II — txn_4kF6J9 requires further investigation',       time: '2 m ago' },
]

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

function fadeIn(delay: number) {
  return {
    opacity: 0,
    animation: `tab-reveal 400ms ${EASE} ${delay}ms both`,
  }
}

export function CompliancePreview() {
  return (
    <div
      className="w-full h-full rounded-[12px] bg-cover bg-center bg-no-repeat p-4 md:py-12 md:px-20 lg:py-12 lg:px-40"
      style={{ backgroundImage: 'url(/assets/feature-bg.webp)' }}
    >
      <div className="rounded-[12px] bg-primary-dark-500 p-4 lg:p-6 flex flex-col gap-4 lg:gap-5 w-full h-full overflow-hidden">

        {/* ── Compliance checks ──────────────────────────────── */}
        <div className="flex flex-col gap-3">
          <span
            className="text-[--text-primary] opacity-40"
            style={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '16px', ...fadeIn(0) }}
          >
            Compliance checks
          </span>
          <div className="flex flex-col gap-2">
            {CHECKS.map(({ label, status, color }, i) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-inner border border-white/20 px-3 py-[10px]"
                style={fadeIn(60 + i * 60)}
              >
                <span className="font-sans text-[--text-primary]" style={{ fontSize: '14px' }}>{label}</span>
                <span className={color} style={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '14px' }}>{status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Recent audit log ───────────────────────────────── */}
        <div className="flex flex-col gap-2 lg:gap-3 flex-1">
          <span
            className="text-[--text-primary] opacity-40 text-[14px] lg:text-[16px]"
            style={{ fontFamily: 'Consolas, "Courier New", monospace', ...fadeIn(260) }}
          >
            Recent audit log
          </span>
          <div className="flex flex-col gap-1.5 lg:gap-2 flex-1">
            {AUDIT_LOG.map(({ text, time }, i) => (
              <div
                key={text}
                className="flex items-center gap-2 lg:gap-3 justify-between rounded-[8px] bg-white/5 px-3 py-[6px] lg:py-[10px]"
                style={fadeIn(320 + i * 60)}
              >
                <div className="flex items-center gap-2 lg:gap-3 flex-1 min-w-0">
                  <span className="w-1 h-[12px] lg:h-[14px] rounded-[2px] bg-primary-400 shrink-0" />
                  <span className="font-sans text-[--text-secondary] truncate text-[12px] lg:text-m">{text}</span>
                </div>
                <span className="font-sans shrink-0 text-[--text-primary] opacity-50 text-[11px] lg:text-[14px]">{time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
