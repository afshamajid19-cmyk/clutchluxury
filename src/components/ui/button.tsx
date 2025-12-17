import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium tracking-wide ring-offset-background transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-royal-gold via-royal-gold-light to-royal-gold text-royal-midnight hover:shadow-royal hover:scale-[1.02]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-accent/30 bg-transparent text-foreground hover:bg-accent/10 hover:border-accent/60 hover:shadow-royal-soft backdrop-blur-sm",
        secondary: "bg-clutch-elevated text-foreground hover:bg-clutch-elevated/80 border border-accent/20",
        ghost: "hover:bg-clutch-elevated hover:text-accent",
        link: "text-accent underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r from-royal-gold via-royal-gold-light to-royal-gold text-royal-midnight hover:shadow-royal hover:scale-[1.02] font-semibold",
        "premium-outline": "border-2 border-accent/40 bg-transparent text-accent hover:bg-accent hover:text-accent-foreground hover:shadow-royal",
        minimal: "text-accent hover:text-royal-gold-light transition-colors underline-offset-4",
        royal: "bg-gradient-to-r from-royal-gold via-royal-gold-light to-royal-gold text-royal-midnight hover:shadow-royal hover:scale-[1.02] tracking-luxury uppercase font-semibold",
      },
      size: {
        default: "h-11 px-6 py-2.5 rounded-sm",
        sm: "h-9 px-4 rounded-sm text-xs",
        lg: "h-14 px-8 py-3.5 rounded-sm text-sm",
        xl: "h-16 px-10 py-4 rounded-sm text-base tracking-luxury",
        icon: "h-11 w-11 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
