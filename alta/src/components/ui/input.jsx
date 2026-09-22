import * as React from "react";
import { cn } from "cn";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-md border border-border bg-secondary/60 px-3 py-1 text-[length:var(--type-body-size)] leading-[var(--type-body-line)] [font-weight:var(--type-body-weight)] text-foreground transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-[length:var(--type-body-size)] file:leading-[var(--type-body-line)] file:[font-weight:var(--type-body-weight)] file:text-foreground placeholder:text-[length:var(--type-body-size)] placeholder:leading-[var(--type-body-line)] placeholder:[font-weight:var(--type-body-weight)] placeholder:text-muted-foreground/70 hover:bg-secondary/80 focus-visible:border-ring focus-visible:bg-secondary focus-visible:ring-2 focus-visible:ring-ring/35 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/40 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
