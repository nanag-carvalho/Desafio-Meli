import * as React from "react";
import {
  Ellipsis,
  Instagram,
  Link2,
  MessageCircle,
  Share2,
} from "lucide-react";
import { ActionTile } from "@/components/compositions/action-tile";
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
  const channels = [
    {
      value: "whatsapp",
      icon: MessageCircle,
      label: "WhatsApp",
    },
    {
      value: "instagram",
      icon: Instagram,
      label: "Instagram",
    },
    {
      value: "copy",
      icon: Link2,
      label: "Copiar link",
    },
    {
      value: "more",
      icon: Ellipsis,
      label: "Mais",
    },
  ];

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
        <div className="grid grid-cols-4 gap-2 px-4 pt-1">
          {channels.map((channel) => (
            <ActionTile
              key={channel.value}
              icon={channel.icon}
              label={channel.label}
              variant="surface"
              className="min-w-0 px-1"
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { ShareSheet };
