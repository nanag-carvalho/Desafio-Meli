import * as React from "react";
import { Share2 } from "lucide-react";
import { ActionTile } from "@/components/compositions/action-tile";
import { ShareChannels } from "@/components/compositions/share-channels";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function ShareSheet({
  className,
  open,
  onOpenChange,
  trigger,
  withinContext = false,
  image,
  title,
  metadata,
  description = "Quem recebe confirma a disponibilidade na própria conta.",
}) {
  const portalContainer = withinContext
    ? document.querySelector(".device")
    : undefined;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger !== null ? (
        <SheetTrigger asChild>
          {trigger ?? <ActionTile className={className} icon={Share2} label="Indicar" />}
        </SheetTrigger>
      ) : null}
      <SheetContent
        side="bottom"
        portalContainer={portalContainer}
      >
        <SheetHeader className="pb-2">
          <SheetTitle>Indicar título</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="mx-4 flex items-center gap-3 rounded-lg border border-border bg-card p-2">
          <img
            className="h-16 w-24 rounded-md object-cover"
            src={image}
            alt=""
          />
          <span className="min-w-0">
            <strong className="block truncate text-[length:var(--type-body-emphasis-size)] leading-[var(--type-body-emphasis-line)] [font-weight:var(--type-body-emphasis-weight)]">
              {title}
            </strong>
            <small className="block truncate text-[length:var(--type-label-muted-size)] leading-[var(--type-label-muted-line)] [font-weight:var(--type-label-muted-weight)] text-muted-foreground">
              {metadata}
            </small>
          </span>
        </div>
        <ShareChannels className="px-4 pt-1" />
      </SheetContent>
    </Sheet>
  );
}

export { ShareSheet };
