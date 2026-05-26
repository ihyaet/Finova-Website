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

export function CompliancePreview() {
  return (
    <div
      className="w-full h-full rounded-[12px] bg-cover bg-center bg-no-repeat p-4 md:p-8 lg:p-12"
      style={{ backgroundImage: 'url(/assets/feature-bg.png)' }}
    >
      <div className="rounded-[12px] bg-primary-dark-500 p-4 lg:p-6 flex flex-col gap-4 lg:gap-5 w-full h-full overflow-hidden">

        {/* ── Compliance checks ──────────────────────────────── */}
        <div className="flex flex-col gap-3">
          <span className="text-[--text-primary] opacity-40"
            style={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '16px' }}>Compliance checks</span>
          <div className="flex flex-col gap-2">
            {CHECKS.map(({ label, status, color }) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-inner border border-white/20 px-3 py-[10px]"
              >
                <span className="font-sans text-[--text-primary]" style={{ fontSize: '14px' }}>{label}</span>
                <span className={color} style={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '14px' }}>{status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Recent audit log ───────────────────────────────── */}
        <div className="flex flex-col gap-2 flex-1">
          <span className="text-[--text-primary] opacity-40"
            style={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '14px' }}>Recent audit log</span>
          <div className="flex flex-col gap-1.5 flex-1">
            {AUDIT_LOG.map(({ text, time }) => (
              <div
                key={text}
                className="flex items-center gap-2 justify-between rounded-[8px] bg-white/5 px-3 py-[6px]"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="w-1 h-[12px] rounded-[2px] bg-primary-400 shrink-0" />
                  <span className="font-sans text-[--text-secondary] truncate" style={{ fontSize: '12px' }}>{text}</span>
                </div>
                <span className="font-sans shrink-0 text-[--text-primary] opacity-50" style={{ fontSize: '11px' }}>{time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
