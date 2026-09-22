import * as React from "react";
import { cn } from "cn";

const ActionTile = React.forwardRef(function ActionTile(
  { className, icon: Icon, label, active = false, variant = "quiet", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      data-slot="action-tile"
      data-active={active || undefined}
      data-variant={variant}
      className={cn(
        "inline-flex min-h-16 min-w-16 flex-col items-center justify-center gap-1.5 rounded-lg border border-transparent px-2 text-[length:var(--type-label-small-size)] leading-[var(--type-label-small-line)] [font-weight:var(--type-label-small-weight)] text-muted-foreground transition-[background,color,transform] outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px data-active:bg-muted data-active:text-primary [&_svg]:size-5 [&_svg]:shrink-0",
        variant === "surface" &&
          "border-border bg-card text-foreground hover:bg-muted",
        className,
      )}
      {...props}
    >
      <Icon aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
});

export { ActionTile };
