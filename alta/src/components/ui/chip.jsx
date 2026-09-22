import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "cn";

const Chip = React.forwardRef(function Chip(
  { className, selected = false, active, count, children, ...props },
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
      <span>{children}</span>
      {count !== undefined ? (
        <Badge
          data-slot="chip-count"
          variant="secondary"
          className="ml-1 h-5 min-w-5 rounded-full border-0 bg-muted px-1.5 text-[length:var(--type-label-caption-size)] text-foreground group-data-selected/chip:bg-primary-foreground/14 group-data-selected/chip:text-primary-foreground"
        >
          {count}
        </Badge>
      ) : null}
    </button>
  );
});

export { Chip };
