import * as React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

function SectionHeader({ className, title, action, actionLabel, onAction, level = 2 }) {
  const Heading = `h${level}`;

  return (
    <div
      data-slot="section-header"
      className={cn(
        "flex min-h-10 items-center justify-between gap-3",
        className,
      )}
    >
      <Heading className="min-w-0 truncate text-[length:var(--type-h3-size)] leading-[var(--type-h3-line)] [font-weight:var(--type-h3-weight)]">
        {title}
      </Heading>
      {action ? (
        <div data-slot="section-header-action" className="shrink-0">
          {action}
        </div>
      ) : actionLabel ? (
        <Button variant="link" className="shrink-0 px-0" onClick={onAction}>
          {actionLabel}
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
      ) : null}
    </div>
  );
}

export { SectionHeader };
