'use client'

import { useEffect, useRef, useState } from 'react'
import { useLenisContext } from './LenisContext'

export function LenisToggle() {
  const { enabled, toggle } = useLenisContext()

  // Start bottom-left, resolved after mount to get real viewport height
  const [pos, setPos] = useState({ x: 24, y: 0 })
  const [mounted, setMounted] = useState(false)

  const dragging = useRef(false)
  const didDrag = useRef(false)
  const offset = useRef({ x: 0, y: 0 })
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setPos({ x: 24, y: window.innerHeight - 72 })
    setMounted(true)
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    didDrag.current = false
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    }
    elRef.current?.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    didDrag.current = true
    const el = elRef.current
    const w = el?.offsetWidth ?? 120
    const h = el?.offsetHeight ?? 40

    setPos({
      x: Math.max(0, Math.min(window.innerWidth - w, e.clientX - offset.current.x)),
      y: Math.max(0, Math.min(window.innerHeight - h, e.clientY - offset.current.y)),
    })
  }

  const onPointerUp = () => {
    dragging.current = false
    // Only toggle if this was a click, not a drag
    if (!didDrag.current) toggle()
  }

  if (!mounted) return null

  return (
    <div
      ref={elRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ left: pos.x, top: pos.y }}
      className="fixed z-[9999] select-none touch-none cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0e1017] px-3.5 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
        {/* Grip dots */}
        <svg
          width="10" height="14" viewBox="0 0 10 14" fill="none"
          className="text-white/20 flex-shrink-0"
        >
          {[0, 4, 8].map(y =>
            [0, 4].map(x => (
              <circle key={`${x}-${y}`} cx={x + 1} cy={y + 1} r="1" fill="currentColor" />
            ))
          )}
        </svg>

        {/* Label */}
        <span className="font-sans text-[12px] leading-none text-white/50 whitespace-nowrap">
          Smooth scroll
        </span>

        {/* Toggle pill */}
        <div
          className="relative flex h-4 w-7 flex-shrink-0 items-center rounded-full transition-colors duration-300"
          style={{ backgroundColor: enabled ? '#5DCAA5' : 'rgba(255,255,255,0.12)' }}
        >
          <div
            className="absolute h-3 w-3 rounded-full bg-white shadow-sm transition-transform duration-300"
            style={{ transform: enabled ? 'translateX(14px)' : 'translateX(2px)' }}
          />
        </div>
      </div>
    </div>
  )
}
