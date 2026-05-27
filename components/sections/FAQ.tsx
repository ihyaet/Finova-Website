'use client'

import { useState } from 'react'
import { Plus, Minus } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

const FAQS = [
  {
    question: 'How secure is Finova?',
    answer: 'We use bank-grade encryption and advanced security protocols to ensure your data is always protected.',
  },
  {
    question: 'Can I integrate Finova with my existing tools?',
    answer: 'Yes. Finova supports seamless integration with hundreds of popular tools through our REST API, webhooks, and pre-built connectors.',
  },
  {
    question: 'What is the pricing structure for Finova?',
    answer: 'Finova offers flexible pricing tiers based on transaction volume and feature access. Contact our team for a custom quote.',
  },
  {
    question: 'Is Finova available globally?',
    answer: 'Yes — Finova operates in 50+ countries with support for multiple currencies and local compliance requirements.',
  },
  {
    question: 'How do I get support?',
    answer: 'Our support team is available 24/7 via live chat, email, and phone. Enterprise customers also receive a dedicated account manager.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="w-full py-24">
      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-10 xl:px-[140px]">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Left: badge + heading + CTA ─────────────────────── */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <div className="inline-flex w-fit items-center gap-2 bg-primary-400/10 px-3 py-1 rounded-full">
                <span className="w-1 h-[14px] rounded-[2px] bg-primary-400 shrink-0" />
                <span className="font-sans text-m font-medium uppercase tracking-widest text-primary-400">
                  FAQ
                </span>
              </div>
              <h2 className="font-pixel text-[--text-primary] leading-tight">
                Frequently Asked<br />
                <span className="text-primary-500">Questions</span>
              </h2>
            </div>
            <Button variant="secondary" className="w-fit">More Questions</Button>
          </div>

          {/* ── Right: accordion ────────────────────────────────── */}
          <div className="flex flex-col gap-3">
            {FAQS.map(({ question, answer }, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={i}
                  className="bg-white/10 overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ borderRadius: isOpen ? '12px' : '100px' }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="shrink-0 text-primary-400 transition-transform duration-1000">
                      {isOpen
                        ? <Minus size={16} weight="bold" aria-hidden="true" />
                        : <Plus  size={16} weight="bold" aria-hidden="true" />
                      }
                    </span>
                    <span className="font-sans text-l-medium text-[--text-primary]">
                      {question}
                    </span>
                  </button>

                  {/* Grid trick: 0fr → 1fr animates height without knowing the target height */}
                  <div
                    className="grid transition-all duration-300 ease-in-out"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="font-sans text-m text-[--text-secondary] px-6 pb-5"
                        style={{ paddingLeft: 56 }}
                      >
                        {answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
