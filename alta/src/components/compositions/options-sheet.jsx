import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Item } from "@/components/ui/item";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "cn";

function OptionsSheet({
  className,
  title = "Criar",
  description = "Escolha o que deseja iniciar.",
  options = [],
  trigger,
  withinContext = false,
}) {
  const portalContainer = withinContext
    ? document.querySelector(".device")
    : undefined;

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger ?? (
          <Button
            size="icon"
            variant="secondary"
            className={cn("rounded-full", className)}
            aria-label={title}
          >
            <Plus aria-hidden="true" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent
        side="bottom"
        portalContainer={portalContainer}
        className="mx-auto max-w-[420px] rounded-t-2xl border border-b-0 border-border bg-popover pb-[max(var(--space-4),env(safe-area-inset-bottom))]"
      >
        <span
          className="mx-auto mt-2 h-1 w-10 rounded-full bg-muted-foreground/45"
          aria-hidden="true"
        />
        <SheetHeader className="pb-1">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="grid gap-1 px-2">
          {options.map(({ value, ...option }) => (
            <SheetClose asChild key={value}>
              <Item
                {...option}
                className="min-h-14 border-0 bg-transparent px-2 hover:bg-muted"
                onClick={() => option.onSelect?.(value)}
              />
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { OptionsSheet };
