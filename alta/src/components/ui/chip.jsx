import * as React from "react";
import { cn } from "cn";

const Chip = React.forwardRef(function Chip(
  { className, selected = false, active, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      data-slot="chip"
      data-selected={(selected || active) || undefined}
      className={cn(
        "inline-flex h-[34px] shrink-0 items-center justify-center rounded-full border border-border bg-card px-3 text-[length:var(--type-label-small-size)] leading-[var(--type-label-small-line)] [font-weight:var(--type-label-small-weight)] whitespace-nowrap text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/35 data-selected:border-primary data-selected:bg-primary data-selected:text-primary-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export { Chip };
