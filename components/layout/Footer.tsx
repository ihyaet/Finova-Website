'use client'

import Image from 'next/image'
import {
  InstagramLogo,
  XLogo,
  LinkedinLogo,
  GithubLogo,
} from '@phosphor-icons/react'
import { Reveal } from '@/components/ui/Reveal'

/* ── Data ──────────────────────────────────────────────────── */

const NAV_COLS = [
  {
    title: 'Products',
    links: [
      'Analytics dashboard',
      'API gateway',
      'Risk engine',
      'Compliance tools',
      'Payment infrastructure',
    ],
  },
  {
    title: 'Use cases',
    links: [
      'Fintech startups',
      'Investment firms',
      'Financial consultants',
      'Neo-banks',
      'Enterprise finance teams',
    ],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'API reference', 'Developer guides', 'Changelog'],
  },
  {
    title: 'Company',
    links: ['About us', 'Careers', 'Security & trust'],
  },
]

const SOCIAL = [
  { label: 'Instagram', Icon: InstagramLogo, href: '#' },
  { label: 'X / Twitter', Icon: XLogo,       href: '#' },
  { label: 'LinkedIn',   Icon: LinkedinLogo,  href: '#' },
  { label: 'GitHub',     Icon: GithubLogo,    href: '#' },
]

const AI_ICONS = [
  { label: 'OpenAI',     src: '/assets/proicons_openai.svg'              },
  { label: 'Claude',     src: '/assets/hugeicons_claude.svg'             },
  { label: 'Perplexity', src: '/assets/ri_perplexity-fill.svg'           },
  { label: 'Gemini',     src: '/assets/mingcute_google-gemini-line.svg'  },
]

/* ── Sub-components ────────────────────────────────────────── */

function FooterCol({ title, links, delay = 0 }: { title: string; links: string[]; delay?: number }) {
  return (
    <Reveal delay={delay} className="flex flex-col gap-5">
      <h5 className="font-sans text-xl-regular text-[--text-primary]">{title}</h5>
      <div className="flex flex-col gap-3">
        {links.map((link, i) => (
          <Reveal key={link} delay={delay + 80 + i * 40}>
            <a
              href="#"
              className="font-sans text-l font-normal text-[--text-primary] opacity-50 hover:opacity-100 transition-opacity"
            >
              {link}
            </a>
          </Reveal>
        ))}
      </div>
    </Reveal>
  )
}

/* ── Footer ────────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="w-full bg-[--bg-base]">
      <div className="w-full max-w-[1600px] mx-auto px-5 md:px-10 lg:px-10 xl:px-[140px]">

        {/* ── Main grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row lg:justify-between gap-10 py-16">

          {/* Contact column */}
          <Reveal className="flex flex-col gap-6">
            <h5 className="font-sans text-xl-regular text-[--text-primary]">Contact</h5>

            <div className="flex flex-col gap-2">
              <Reveal delay={80}>
                <p className="font-sans text-l font-normal text-[--text-primary] opacity-50">
                  123 Finova Street, City, State, ZIP Code
                </p>
              </Reveal>
              <Reveal delay={120}>
                <p className="font-sans text-l font-normal text-[--text-primary] opacity-50">+1 (123) 456-7890</p>
              </Reveal>
              <Reveal delay={160}>
                <p className="font-sans text-l font-normal text-[--text-primary] opacity-50">support@finova.com</p>
              </Reveal>
            </div>

            {/* AI summary */}
            <Reveal delay={200} className="flex flex-col gap-3">
              <span className="font-sans text-l text-[--text-muted]">
                Get an AI summary of this page
              </span>
              <div className="flex items-center gap-3">
                {AI_ICONS.map(({ label, src }) => (
                  <button
                    key={label}
                    aria-label={label}
                    className="w-8 h-8 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity"
                  >
                    <Image src={src} alt={label} width={24} height={24} />
                  </button>
                ))}
              </div>
            </Reveal>
          </Reveal>

          {/* Nav columns — stagger each column by 80ms */}
          {NAV_COLS.map((col, i) => (
            <FooterCol key={col.title} {...col} delay={i * 80} />
          ))}

          {/* Follow us */}
          <Reveal delay={320} className="flex flex-col gap-5">
            <h5 className="font-sans text-xl-regular text-[--text-primary]">Follow us</h5>
            <div className="flex flex-col gap-3">
              {SOCIAL.map(({ label, Icon, href }, i) => (
                <Reveal key={label} delay={400 + i * 40}>
                  <a
                    href={href}
                    className="inline-flex items-center gap-2 font-sans text-l font-normal text-[--text-primary] opacity-50 hover:opacity-100 transition-opacity"
                  >
                    <Icon size={16} aria-hidden="true" />
                    {label}
                  </a>
                </Reveal>
              ))}
            </div>
          </Reveal>

        </div>

        {/* ── Disclaimer ──────────────────────────────────────────── */}
        <Reveal className="py-10 flex flex-col gap-4">
          <p className="font-sans text-m text-[--text-primary] opacity-50 leading-relaxed">
            The content in this template is purely fictional and intended solely for demonstration
            purposes. All information provided is not based on real events, individuals, companies,
            or situations, and any resemblance to actual entities or circumstances is purely
            coincidental. This content does not provide real-world advice and should not be used
            for any decision-making or factual analysis. This template is created for educational
            and re-editing purposes only.
          </p>
          <Reveal delay={80}>
            <p className="font-sans text-m-regular text-[--text-primary] opacity-50 leading-relaxed">
              The data within should not be considered reliable for real-life application. By using
              or accessing this template, you acknowledge and agree to these terms. Any reliance on
              this content is at your own discretion and risk.
            </p>
          </Reveal>
        </Reveal>

        {/* ── Bottom bar ──────────────────────────────────────────── */}
        <Reveal className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-sans text-m text-[--text-secondary]">
            Copyright © 2026 Finova
          </span>
          <Reveal delay={80} className="flex items-center gap-6">
            <a href="#" className="font-sans text-m text-[--text-secondary] hover:text-[--text-primary] transition-colors">
              Terms &amp; Condition
            </a>
            <a href="#" className="font-sans text-m text-[--text-secondary] hover:text-[--text-primary] transition-colors">
              Cookies Settings
            </a>
          </Reveal>
        </Reveal>

      </div>
    </footer>
  )
}
