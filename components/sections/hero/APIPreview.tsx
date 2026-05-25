export function APIPreview() {
  return (
    <div
      className="w-full h-full rounded-[12px] bg-cover bg-center bg-no-repeat flex items-center justify-center px-40 py-20"
      style={{ backgroundImage: 'url(/assets/feature-bg.png)' }}
    >
      <div className="rounded-[12px] bg-primary-dark-500 p-6 flex flex-col gap-5 w-full h-full">
        <div className="flex items-center justify-between">
          <span className="font-sans text-s uppercase tracking-widest text-[--text-muted]">
            API Reference
          </span>
          <span className="inline-flex items-center rounded-badge border border-green/20 bg-green/10 px-2.5 py-0.5 font-sans text-s text-green">
            REST + GraphQL
          </span>
        </div>

        <div className="rounded-inner border border-[--border-default] bg-base p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-pixel text-s text-[--text-muted]">POST</span>
            <span className="font-pixel text-s text-primary-400">/api/v1/transactions</span>
          </div>
          <div className="font-pixel text-s space-y-1">
            <div>
              <span className="text-primary-300">Authorization: </span>
              <span className="text-[--text-secondary]">Bearer ••••••••••</span>
            </div>
            <div>
              <span className="text-primary-300">Content-Type: </span>
              <span className="text-[--text-secondary]">application/json</span>
            </div>
          </div>
        </div>

        <div className="rounded-inner border border-[--border-default] bg-base p-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-pixel text-s text-green">200 OK</span>
            <span className="font-pixel text-s text-[--text-muted]">18ms</span>
          </div>
          <div className="font-pixel text-s space-y-1">
            <div><span className="text-primary-300">"id": </span><span className="text-green">"txn_01JFABCDEF"</span></div>
            <div><span className="text-primary-300">"amount": </span><span className="text-[--text-secondary]">24800</span></div>
            <div><span className="text-primary-300">"status": </span><span className="text-green">"completed"</span></div>
            <div><span className="text-primary-300">"currency": </span><span className="text-[--text-secondary]">"USD"</span></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Endpoints', value: '47' },
            { label: 'Avg response', value: '18ms' },
            { label: 'SDKs', value: '12+' },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 rounded-inner border border-[--border-default] bg-base py-4"
            >
              <span className="font-pixel text-h5 text-primary-400">{value}</span>
              <span className="font-sans text-s text-[--text-muted]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
