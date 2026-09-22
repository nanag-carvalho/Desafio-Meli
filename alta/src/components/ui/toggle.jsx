import * as React from "react";
import { Toggle as TogglePrimitive } from "radix-ui";
import { cn } from "cn";

function Toggle({ className, ...props }) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-3 text-[length:var(--type-body-emphasis-size)] leading-[var(--type-body-emphasis-line)] [font-weight:var(--type-body-emphasis-weight)] text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=on]:border-primary/30 data-[state=on]:bg-primary/15 data-[state=on]:text-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
        className,
      )}
      {...props}
    />
  );
}

export { Toggle };
