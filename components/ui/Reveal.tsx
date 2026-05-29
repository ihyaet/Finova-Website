'use client'
import { useReveal } from '@/hooks/useReveal'

// Motion personality: Calm & Institutional
// 12px micro-slide + fade, 600ms expo ease-out, 80ms stagger unit
const DUR  = 600
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

interface RevealProps {
  children: React.ReactNode
  delay?:    number   // ms — use multiples of 80 for stagger
  className?: string
  style?:     React.CSSProperties
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>
}

export function Reveal({ children, delay = 0, className = '', style, onMouseEnter, onMouseLeave }: RevealProps) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0px)' : 'translateY(12px)',
        transition: `opacity ${DUR}ms ${EASE} ${delay}ms, transform ${DUR}ms ${EASE} ${delay}ms`,
        ...style,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}
