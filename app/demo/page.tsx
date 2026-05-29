'use client'

import { useState } from 'react'
import Image from 'next/image'
import { User, EnvelopeSimple, Buildings, CaretDown } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/Reveal'
import { LogoBar } from '@/components/sections/LogoBar'

const TIME_SLOTS = [
  { day: 'Thu 22 May', time: '10:00 AM (GMT +7)', status: 'Available',    statusColor: 'text-green'        },
  { day: 'Thu 22 May', time: '2:00 PM (GMT +7)',  status: '2 spots left', statusColor: 'text-amber'        },
  { day: 'Fri 23 May', time: '11:00 AM (GMT +7)', status: 'Available',    statusColor: 'text-green'        },
]

const TEAM_SIZES = ['1–10', '11–50', '51–200', '201–500', '500+']

export default function DemoPage() {
  const [name,       setName]       = useState('')
  const [email,      setEmail]      = useState('')
  const [company,    setCompany]    = useState('')
  const [teamSize,   setTeamSize]   = useState('')
  const [slot,       setSlot]       = useState<number | null>(null)

  return (
    <>
    <div className="flex flex-1 items-start justify-center pt-16 md:pt-20 lg:pt-[120px] pb-16 md:pb-20 lg:pb-[120px] px-5 md:px-10 lg:px-10 xl:px-[140px]">
      <div className="w-full max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start pt-[120px]">

        {/* ── Left: Testimonial ─────────────────────────────────── */}
        <Reveal className="flex flex-col gap-6">

          {/* Quote card */}
          <div className="rounded-[16px] bg-[--bg-surface] border border-white/10 p-6 md:p-8 flex flex-col gap-6">
            <p className="font-sans text-xl text-[--text-primary] leading-relaxed">
              "After thoroughly evaluating six different platforms, we ultimately decided on Finova.
              One of the standout features was the compliance tooling, which proved to be incredibly efficient."
            </p>

            <div className="flex items-center justify-between">
              {/* Author */}
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
                  alt="Sarah T."
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="flex flex-col">
                  <span className="font-sans text-m-medium text-[--text-primary]">Sarah T.,</span>
                  <span className="font-sans text-s text-[--text-muted]">CTO · Vaultt Finance</span>
                </div>
              </div>

              {/* Logo */}
              <Image
                src="/assets/palantir-logo.svg"
                alt="Palantir"
                width={80}
                height={20}
                className="h-4 w-auto brightness-0 invert opacity-50"
              />
            </div>
          </div>

          {/* CTA */}
          <div>
            <Button variant="secondary">Read More Story</Button>
          </div>
        </Reveal>

        {/* ── Right: Booking form ───────────────────────────────── */}
        <Reveal delay={120} className="flex flex-col gap-6 w-full">

          {/* Header */}
          <div className="flex flex-col gap-1">
            <h4 className="font-pixel text-[--text-primary]">Book Your Demo</h4>
            <p className="font-sans text-m text-[--text-muted]">Usually responds within 1 business day</p>
          </div>

          {/* Full Name */}
          <div className="relative">
            <User
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full h-[44px] rounded-full bg-white/10 border border-transparent focus:border-primary-500 pl-11 pr-4 font-sans text-l text-white placeholder:text-white/30 outline-none transition-colors"
            />
          </div>

          {/* Work Email */}
          <div className="relative">
            <EnvelopeSimple
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="email"
              placeholder="Work Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full h-[44px] rounded-full bg-white/10 border border-transparent focus:border-primary-500 pl-11 pr-4 font-sans text-l text-white placeholder:text-white/30 outline-none transition-colors"
            />
          </div>

          {/* Company & Role */}
          <div className="relative">
            <Buildings
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Company & Role"
              value={company}
              onChange={e => setCompany(e.target.value)}
              className="w-full h-[44px] rounded-full bg-white/10 border border-transparent focus:border-primary-500 pl-11 pr-4 font-sans text-l text-white placeholder:text-white/30 outline-none transition-colors"
            />
          </div>

          {/* Team Size */}
          <div className="relative">
            <select
              value={teamSize}
              onChange={e => setTeamSize(e.target.value)}
              className="w-full h-[44px] rounded-full bg-white/10 border border-transparent focus:border-primary-500 pl-5 pr-10 font-sans text-l text-white appearance-none outline-none transition-colors"
              style={{ color: teamSize ? 'var(--text-primary)' : 'rgba(255,255,255,0.2)' }}
            >
              <option value="" disabled hidden>Team Size</option>
              {TEAM_SIZES.map(s => (
                <option key={s} value={s} className="bg-[#1a1c27] text-white">{s}</option>
              ))}
            </select>
            <CaretDown
              size={16}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {/* Time slots */}
          <div className="flex flex-col gap-3">
            <span className="font-sans text-m text-[--text-muted]">Preferred time slot</span>
            <div className="grid grid-cols-3 gap-3">
              {TIME_SLOTS.map(({ day, time, status, statusColor }, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSlot(i)}
                  className={`rounded-[12px] border p-3 text-left flex flex-col gap-1 transition-colors ${
                    slot === i
                      ? 'border-primary-400 bg-primary-400/10'
                      : 'border-white/10 bg-[--bg-surface] hover:border-white/20'
                  }`}
                >
                  <span className="font-sans text-m-medium text-[--text-primary]">{day}</span>
                  <span className="font-sans text-s text-[--text-muted]">{time}</span>
                  <span className={`font-sans text-s ${statusColor}`}>{status}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-[44px] rounded-full bg-white font-sans text-l-medium text-base hover:opacity-90 transition-opacity"
          >
            Confirm Booking
          </button>

        </Reveal>
      </div>

    </div>
    <LogoBar />
    </>
  )
}
