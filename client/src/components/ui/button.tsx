import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-primary-border shadow-md hover:shadow-lg hover:scale-[1.03] hover:brightness-110 active:scale-[0.97] active:shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground border border-destructive-border hover:scale-[1.03] active:scale-[0.97]",
        outline:
          "border-2 [border-color:var(--button-outline)] shadow-xs hover:bg-muted/50 hover:scale-[1.03] active:scale-[0.97] active:shadow-none",
        secondary: "border-2 bg-secondary text-secondary-foreground border-secondary-border hover:bg-secondary/80 hover:scale-[1.03] active:scale-[0.97]",
        ghost: "border border-transparent hover:bg-muted/50 hover:scale-[1.03] active:scale-[0.97]",
      },
      size: {
        default: "min-h-9 px-5 py-2",
        sm: "min-h-8 px-4 text-xs",
        lg: "min-h-11 px-8 text-[15px]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
