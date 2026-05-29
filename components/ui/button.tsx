'use client'
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-l-medium transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-base disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "rounded-button bg-white text-base hover:opacity-90",
        secondary:
          "rounded-button border border-white/20 bg-transparent text-[--text-secondary] transition-colors hover:border-white/30 hover:bg-white/5",
        ghost:
          "rounded-button border border-[--border-default] bg-transparent text-[--text-secondary] hover:border-[--border-hover] hover:bg-white/5",
      },
      size: {
        default: "h-[44px] px-6",
        sm: "h-[36px] px-4 text-m",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

const EASE    = 'cubic-bezier(0.16, 1, 0.3, 1)'
const DUR     = 480
const STAGGER = 22

function extractLabel(children: React.ReactNode, asChild: boolean): string | null {
  if (typeof children === 'string') return children
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ children?: React.ReactNode }>
    if (typeof child.props.children === 'string') return child.props.children
  }
  return null
}

function MaskText({ label, hovered }: { label: string; hovered: boolean }) {
  const chars = label.split('')

  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>

      {/* Layer A — original text: exits up on hover (L→R), returns from top on leave (R→L) */}
      <span style={{ display: 'inline-flex', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        {chars.map((char, i) => {
          const delay = hovered ? i * STAGGER : (chars.length - 1 - i) * STAGGER
          return (
            <span key={i} style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 'inherit' }}>
              <span style={{
                display:    'inline-block',
                opacity:    hovered ? 0 : 1,
                transform:  hovered ? 'translateY(-110%)' : 'translateY(0%)',
                transition: `transform ${DUR}ms ${EASE} ${delay}ms, opacity ${DUR * 0.5}ms ${EASE} ${delay}ms`,
              }}>
                {char === ' ' ? ' ' : char}
              </span>
            </span>
          )
        })}
      </span>

      {/* Layer B — incoming text: enters from bottom on hover (L→R), exits down on leave (R→L) */}
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        {chars.map((char, i) => {
          const delay = hovered ? i * STAGGER : (chars.length - 1 - i) * STAGGER
          return (
            <span key={i} style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 'inherit' }}>
              <span style={{
                display:    'inline-block',
                opacity:    hovered ? 1 : 0,
                transform:  hovered ? 'translateY(0%)' : 'translateY(110%)',
                transition: `transform ${DUR}ms ${EASE} ${delay}ms, opacity ${DUR * 0.5}ms ${EASE} ${delay}ms`,
              }}>
                {char === ' ' ? ' ' : char}
              </span>
            </span>
          )
        })}
      </span>

      {/* Spacer to hold width */}
      <span aria-hidden="true" style={{ visibility: 'hidden', position: 'absolute' }}>{label}</span>
    </span>
  )
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const [hovered, setHovered] = React.useState(false)
    const label = extractLabel(children, asChild ?? false)

    const handleEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      setHovered(true)
      onMouseEnter?.(e)
    }
    const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setHovered(false)
      onMouseLeave?.(e)
    }

    const maskContent = label ? <MaskText label={label} hovered={hovered} /> : null

    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<React.HTMLAttributes<HTMLElement> & { href?: string }>
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          onMouseEnter={handleEnter as unknown as React.MouseEventHandler<HTMLElement>}
          onMouseLeave={handleLeave as unknown as React.MouseEventHandler<HTMLElement>}
          {...props}
        >
          {React.cloneElement(child, {}, maskContent ?? child.props.children)}
        </Slot>
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        {...props}
      >
        {maskContent ?? children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
