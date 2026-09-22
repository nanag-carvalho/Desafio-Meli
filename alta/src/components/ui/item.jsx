import * as React from "react";
import { CheckCircle2Icon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { cn } from "cn";

function Item({
  className,
  thumbnail,
  icon: Icon,
  title,
  supporting,
  trailing,
  selectable = false,
  selected = false,
  onClick,
  ...props
}) {
  const Comp = onClick || selectable ? "button" : "div";
  return (
    <Comp
      data-slot="item"
      data-selected={selected || undefined}
      role={selectable ? "option" : undefined}
      aria-selected={selectable ? selected : undefined}
      className={cn(
        "flex min-h-16 w-full items-center gap-3 rounded-lg border border-border bg-popover px-3 py-2 text-left text-foreground transition-colors outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-selected:bg-primary/10",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {thumbnail && (
        <img
          className="h-12 w-10 shrink-0 rounded-md object-cover"
          src={thumbnail}
          alt=""
        />
      )}
      {!thumbnail && Icon && (
        <span data-slot="item-icon" className="grid size-10 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground">
          <Icon className="size-4" aria-hidden="true" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[length:var(--type-body-emphasis-size)] leading-[var(--type-body-emphasis-line)] [font-weight:var(--type-body-emphasis-weight)]">
          {title}
        </span>
        {supporting && (
          <span className="block truncate text-[length:var(--type-label-muted-size)] leading-[var(--type-label-muted-line)] [font-weight:var(--type-label-muted-weight)] text-muted-foreground">
            {supporting}
          </span>
        )}
      </span>
      <span className="grid min-h-8 min-w-8 shrink-0 place-items-center justify-self-end text-muted-foreground [&>svg]:size-4 [&>svg]:stroke-[1.75]">
        {trailing ??
          (selectable ? (
            selected ? (
              <CheckCircle2Icon className="size-4 shrink-0 text-primary" />
            ) : (
              <CircleIcon className="size-4 shrink-0 text-muted-foreground" />
            )
          ) : (
            <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
          ))}
      </span>
    </Comp>
  );
}

export { Item };
