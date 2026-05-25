const ALERTS = [
  { label: 'API rate limit spike', severity: 'Low', time: '2m ago' },
  { label: 'Unusual login pattern', severity: 'Medium', time: '14m ago' },
  { label: 'Failed auth attempt', severity: 'Low', time: '1h ago' },
]

export function RiskPreview() {
  return (
    <div
      className="w-full h-full rounded-[12px] bg-cover bg-center bg-no-repeat flex items-center justify-center px-40 py-20"
      style={{ backgroundImage: 'url(/assets/feature-bg.png)' }}
    >
      <div className="rounded-[12px] bg-primary-dark-500 p-6 flex flex-col gap-6 w-full h-full">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Risk Score', value: '12', sub: 'Low risk' },
            { label: 'Active Alerts', value: '3', sub: 'All low severity' },
            { label: 'Resolved today', value: '24', sub: 'Last 24h' },
          ].map(({ label, value, sub }) => (
            <div
              key={label}
              className="flex flex-col gap-1.5 rounded-inner border border-[--border-default] bg-base p-4"
            >
              <span className="font-sans text-s text-[--text-muted]">{label}</span>
              <span className="font-pixel text-h4 text-[--text-primary]">{value}</span>
              <span className="font-sans text-s text-[--text-muted]">{sub}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-sans text-s uppercase tracking-widest text-[--text-muted] mb-1">
            Recent Alerts
          </span>
          {ALERTS.map(({ label, severity, time }) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-inner border border-[--border-default] bg-base px-4 py-3"
            >
              <span className="font-sans text-l text-[--text-secondary]">{label}</span>
              <div className="flex items-center gap-3">
                <span className="font-sans text-s text-[--text-muted]">{time}</span>
                <span
                  className={`inline-flex items-center rounded-badge border px-2.5 py-0.5 font-sans text-s ${
                    severity === 'Medium'
                      ? 'border-amber/20 bg-amber/10 text-amber'
                      : 'border-primary-400/20 bg-primary-400/10 text-primary-400'
                  }`}
                >
                  {severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
