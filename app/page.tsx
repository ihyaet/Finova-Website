export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center min-h-screen bg-base px-5 md:px-10">
      <div className="mx-auto w-full max-w-[1160px] flex flex-col items-center text-center gap-inner-md">

        {/* Eyebrow */}
        <span className="font-sans text-s uppercase tracking-widest text-[--text-muted]">
          AI-Powered Finance
        </span>

        {/* Heading */}
        <h1 className="font-pixel text-h1-mobile md:text-h1 text-[--text-primary] max-w-3xl">
          The future of{" "}
          <span className="text-green">Finance</span>{" "}
          is here
        </h1>

        {/* Subheading */}
        <p className="font-sans text-l text-[--text-secondary] max-w-xl">
          Finova gives your finance team the intelligence to move faster, decide
          smarter, and close stronger — powered by AI.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <a
            href="/sign-up"
            className="inline-flex h-[44px] items-center justify-center rounded-button bg-white px-6 font-sans text-l font-medium text-base transition-opacity hover:opacity-90"
          >
            Get started free
          </a>
          <a
            href="/book-demo"
            className="inline-flex h-[44px] items-center justify-center rounded-button border border-[--border-default] bg-transparent px-6 font-sans text-l text-[--text-secondary] transition-colors hover:border-[--border-hover] hover:bg-white/5"
          >
            Book a demo
          </a>
        </div>

        {/* Metric strip */}
        <div className="mt-inner-lg flex flex-col sm:flex-row gap-inner-md divide-y sm:divide-y-0 sm:divide-x divide-[--border-default] border border-[--border-default] rounded-card bg-surface px-card-pad py-inner-md w-full max-w-2xl">
          {[
            { value: "2×", label: "Faster close cycles" },
            { value: "40%", label: "Reduction in manual work" },
            { value: "99.9%", label: "Uptime SLA" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-inner-sm flex-1 px-inner-md"
            >
              <span className="font-pixel text-h4 text-green">{value}</span>
              <span className="font-sans text-s text-[--text-muted]">{label}</span>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
