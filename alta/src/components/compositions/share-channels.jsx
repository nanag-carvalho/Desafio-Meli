import * as React from "react";
import { Check, Ellipsis, Instagram, Link2, MessageCircle } from "lucide-react";
import { ActionTile } from "@/components/compositions/action-tile";
import { cn } from "cn";

function ShareChannels({ className, copied = false, onSelect }) {
  const channels = [
    { value: "whatsapp", icon: MessageCircle, label: "WhatsApp" },
    { value: "instagram", icon: Instagram, label: "Instagram" },
    { value: "copy", icon: copied ? Check : Link2, label: copied ? "Copiado" : "Copiar link" },
    { value: "more", icon: Ellipsis, label: "Mais" },
  ];
  return (
    <div className={cn("grid grid-cols-4 gap-2", className)} data-slot="share-channels">
      {channels.map((channel) => (
        <ActionTile key={channel.value} icon={channel.icon} label={channel.label} variant="surface" className="min-w-0 px-1" onClick={() => onSelect?.(channel.value)} />
      ))}
    </div>
  );
}

export { ShareChannels };
