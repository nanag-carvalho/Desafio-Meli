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
      >
        <SheetHeader className="pb-1">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="grid gap-1 px-2">
          {options.map(({ value, onSelect, tone, className: optionClassName, ...option }) => (
            <SheetClose asChild key={value}>
              <Item
                {...option}
                className={cn(
                  "min-h-14 border-0 bg-transparent px-2 hover:bg-muted",
                  tone === "destructive" && "text-destructive hover:bg-destructive/10 [&_[data-slot=item-icon]]:text-destructive",
                  optionClassName,
                )}
                onClick={() => onSelect?.(value)}
              />
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { OptionsSheet };
