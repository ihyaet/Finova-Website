'use client'

import { ReactLenis } from 'lenis/react'
import { useLenisContext } from './LenisContext'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { enabled } = useLenisContext()

  if (!enabled) return <>{children}</>

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  )
}
