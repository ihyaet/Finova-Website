'use client'

import { Stack, Play } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

const STATS = [
  { value: '12.4M', label: 'Transactions processed'  },
  { value: '0 hrs', label: 'Downtime since launch'   },
  { value: '32.1%', label: 'On transaction saving'   },
]

export function Testimonials() {
  return (
    <section className="w-full py-24">
      <div className="mx-auto w-full max-w-[1160px] px-5 md:px-10 lg:px-0">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-5 text-center mb-14">
          <div className="inline-flex w-fit items-center gap-2 bg-primary-400/10 px-3 py-1 rounded-full">
            <span className="w-1 h-[14px] rounded-[2px] bg-primary-400 shrink-0" />
            <span className="font-sans text-m font-medium uppercase tracking-widest text-primary-400">
              Testimonials
            </span>
          </div>
          <h2 className="font-pixel text-[--text-primary] leading-tight">
            Real Stories From<br />
            <span className="text-primary-500">Our Customers</span>
          </h2>
        </div>

        {/* ── 3-column cards ──────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">

          {/* Card 1 — Stats (purple fill) */}
          <div className="rounded-[16px] bg-primary-400 p-8 flex flex-col justify-between min-h-[420px]">
            <div className="flex flex-col gap-8">
              {STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="font-pixel text-h3 text-primary-dark-500 leading-none">
                    {value}
                  </span>
                  <span className="font-sans text-m text-primary-dark-400">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Dummy logo */}
            <div className="flex items-center gap-2 mt-6">
              <Stack size={18} weight="fill" className="text-primary-dark-400" aria-hidden="true" />
              <span className="font-sans text-l-medium text-primary-dark-400">Pallet</span>
            </div>
          </div>

          {/* Card 2 — Quote */}
          <div className="rounded-[16px] bg-[--bg-surface] border border-white/20 p-6 flex flex-col justify-between min-h-[440px]">
            <h5 className="leading-relaxed flex-1">
              "After thoroughly evaluating six different platforms, we ultimately decided on Finova.
              One of the standout features was the compliance tooling, which proved to be
              incredibly efficient."
            </h5>

            <div className="flex flex-col gap-5 mt-6">
              {/* Author */}
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
                  alt="Sarah T."
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="flex flex-col">
                  <span className="font-sans text-m-medium text-[--text-primary]">Sarah T.</span>
                  <span className="font-sans text-s text-[--text-muted]">CTO · Vaultt Finance</span>
                </div>
              </div>

              {/* Dummy logo */}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                </div>
                <span className="font-sans text-m text-[--text-muted]">Palantir</span>
              </div>
            </div>
          </div>

          {/* Card 3 — Photo / video */}
          <div className="rounded-[16px] overflow-hidden relative min-h-[420px] bg-[--bg-surface]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Customer story"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                <Play size={20} weight="fill" className="text-base ml-0.5" aria-hidden="true" />
              </div>
            </div>

            {/* Dummy logo */}
            <div className="absolute bottom-6 left-6">
              <span className="font-sans text-m-medium text-white/60 uppercase tracking-widest">
                Decagon
              </span>
            </div>
          </div>

        </div>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <div className="flex justify-center">
          <Button variant="secondary">Read More Story</Button>
        </div>

      </div>
    </section>
  )
}
