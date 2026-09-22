import * as React from "react";
import { cn } from "cn";

function AppHeader({
  className,
  leading,
  title,
  supporting,
  actions,
  ...props
}) {
  return (
    <div
      data-slot="app-header"
      className={cn(
        "flex min-h-14 w-full items-center gap-3 bg-background/90 px-4 backdrop-blur-xl",
        className,
      )}
      {...props}
    >
      {leading && (
        <div data-slot="app-header-leading" className="shrink-0">
          {leading}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="truncate text-[length:var(--type-h4-size)] leading-[var(--type-h4-line)] [font-weight:var(--type-h4-weight)]">
          {title}
        </div>
        {supporting && (
          <div className="truncate text-[length:var(--type-label-muted-size)] leading-[var(--type-label-muted-line)] [font-weight:var(--type-label-muted-weight)] text-muted-foreground">
            {supporting}
          </div>
        )}
      </div>
      {actions && (
        <div
          data-slot="app-header-actions"
          className="flex shrink-0 items-center gap-2"
        >
          {actions}
        </div>
      )}
    </div>
  );
}

export { AppHeader };
