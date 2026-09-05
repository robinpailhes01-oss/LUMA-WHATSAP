import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * <select> natif stylé : accessible au clavier, fonctionne au pouce sur mobile
 * (le picker système), zéro dépendance. Utilisé pour le statut inline et les filtres.
 */
const SelectNative = React.forwardRef<HTMLSelectElement, React.ComponentProps<"select">>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "h-9 w-full appearance-none rounded-sm border border-line bg-paper pl-3 pr-8 text-sm text-ink transition-colors duration-micro focus-visible:outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/20 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
        />
      </div>
    );
  }
);
SelectNative.displayName = "SelectNative";

export { SelectNative };
