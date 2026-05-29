'use client'
import { useReveal } from '@/hooks/useReveal'

// Per-character mask reveal — slides up from translateY(100%) + fade
// Same motion personality as Reveal: expo ease, 80ms stagger unit
const DUR      = 600
const EASE     = 'cubic-bezier(0.16, 1, 0.3, 1)'
const STAGGER  = 18   // ms per character
const BASE_DEL = 0    // extra delay before first char

interface MaskRevealProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  delay?: number
  className?: string
  stagger?: number
}

export function MaskReveal({
  children,
  as: Tag = 'span',
  delay = BASE_DEL,
  className = '',
  stagger = STAGGER,
}: MaskRevealProps) {
  const { ref, visible } = useReveal()

  // Split preserving spaces — each word is a flex group, chars stagger inside
  const words = children.split(' ')
  let charIndex = 0

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex overflow-hidden">
          {word.split('').map((char) => {
            const ci = charIndex++
            return (
              <span
                key={ci}
                aria-hidden="true"
                style={{
                  display:   'inline-block',
                  opacity:   visible ? 1 : 0,
                  transform: visible ? 'translateY(0%)' : 'translateY(105%)',
                  transition: `opacity ${DUR}ms ${EASE} ${delay + ci * stagger}ms,
                               transform ${DUR}ms ${EASE} ${delay + ci * stagger}ms`,
                }}
              >
                {char}
              </span>
            )
          })}
          {/* Space between words */}
          {wi < words.length - 1 && (
            <span aria-hidden="true" style={{ display: 'inline-block' }}>&nbsp;</span>
          )}
        </span>
      ))}
      {/* Hidden accessible text */}
      <span className="sr-only">{children}</span>
    </Tag>
  )
}
