import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-badge font-sans text-s font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary-400/10 text-primary-400 border border-primary-400/20",
        amber: "bg-amber/10 text-amber border border-amber/20",
        green: "bg-green/10 text-green border border-green/20",
        outline: "border border-[--border-default] text-[--text-secondary]",
      },
      size: {
        default: "px-2.5 py-0.5",
        sm: "px-2 py-px",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
