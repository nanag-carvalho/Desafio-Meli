import * as React from "react";
import { Trash2 } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "cn";

function ParticipantRow({ className, initials, name, owner = false, onRemove }) {
  return (
    <div className={cn("flex min-h-14 items-center gap-3 border-b border-border py-2 last:border-b-0", className)} data-slot="participant-row">
      <Avatar initials={initials} />
      <div className="min-w-0 flex-1">
        <strong className="block truncate text-[length:var(--type-body-emphasis-size)] leading-[var(--type-body-emphasis-line)] [font-weight:var(--type-body-emphasis-weight)]">{name}</strong>
        <span className="block text-[length:var(--type-label-muted-size)] leading-[var(--type-label-muted-line)] text-muted-foreground">{owner ? "Proprietária" : "Participante"}</span>
      </div>
      {onRemove ? (
        <IconButton label={`Remover ${name}`} size="icon-sm" variant="ghost" onClick={onRemove} className="text-muted-foreground hover:text-destructive">
          <Trash2 aria-hidden="true" />
        </IconButton>
      ) : null}
    </div>
  );
}

export { ParticipantRow };
