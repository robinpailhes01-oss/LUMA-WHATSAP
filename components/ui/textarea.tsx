import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[72px] w-full rounded-sm border border-line bg-paper px-3 py-2 text-base text-ink transition-colors duration-micro placeholder:text-ink-muted/70 focus-visible:outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/20 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
