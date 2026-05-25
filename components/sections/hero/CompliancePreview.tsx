const CERTS = [
  { label: 'SOC 2 Type II', status: 'Certified', date: 'Renewed Mar 2025' },
  { label: 'PCI DSS Level 1', status: 'Certified', date: 'Renewed Jan 2025' },
  { label: 'ISO 27001', status: 'Certified', date: 'Renewed Feb 2025' },
  { label: 'GDPR', status: 'Compliant', date: 'Ongoing' },
  { label: 'SOX Controls', status: 'Active', date: 'Ongoing' },
]

export function CompliancePreview() {
  return (
    <div
      className="w-full rounded-[20px] p-5 md:p-8"
      style={{
        background:
          'radial-gradient(ellipse 110% 90% at 50% 0%, rgba(140, 110, 210, 0.45) 0%, rgba(87, 71, 140, 0.15) 45%, transparent 72%)',
      }}
    >
      <div className="rounded-[14px] border border-[--border-default] bg-surface p-6 md:p-8 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="font-sans text-s uppercase tracking-widest text-[--text-muted]">
            Compliance Status
          </span>
          <div className="flex items-center gap-2">
            <span className="font-sans text-s text-[--text-muted]">Overall score</span>
            <span className="font-pixel text-h5 text-green">98/100</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {CERTS.map(({ label, status, date }) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-inner border border-[--border-default] bg-base px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 flex-shrink-0 rounded-full bg-green" />
                <span className="font-sans text-l text-[--text-primary]">{label}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden sm:block font-sans text-s text-[--text-muted]">{date}</span>
                <span className="inline-flex items-center rounded-badge border border-green/20 bg-green/10 px-2.5 py-0.5 font-sans text-s text-green">
                  {status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
