import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Boutons Luma — DESIGN.md : or = action primaire (une seule par page),
 * navy = secondaire, aucune ombre, radius 4px, hauteur 36px desktop / 44px tactile.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[background-color,color,transform] duration-micro ease-luma active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-gold text-ink hover:bg-gold-deep hover:text-paper",
        secondary: "bg-navy text-cream hover:bg-navy-deep",
        outline: "border border-line bg-paper text-navy hover:bg-cream",
        ghost: "text-navy hover:bg-navy-tint",
        danger: "border border-line bg-paper text-danger hover:bg-status-red-bg",
        link: "text-navy underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4",
        sm: "h-8 px-3 text-xs",
        touch: "h-row px-4",
        icon: "h-9 w-9",
        "icon-touch": "h-row w-row",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
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
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
