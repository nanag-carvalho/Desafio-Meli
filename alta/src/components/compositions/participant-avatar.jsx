import * as React from "react";
import { X } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { IconButton } from "@/components/ui/icon-button";

function ParticipantAvatar({ initials, label, owner = false, onRemove }) {
  return (
    <div className="grid w-16 justify-items-center gap-1 text-center" data-slot="participant-avatar">
      <div className="relative">
        <Avatar initials={initials} />
        {onRemove ? (
          <IconButton label={`Remover ${label}`} size="icon-sm" onClick={onRemove} className="absolute -right-2 -top-2 size-6 min-h-6 min-w-6 border-background bg-muted shadow-sm [&_svg]:size-3">
            <X aria-hidden="true" />
          </IconButton>
        ) : null}
      </div>
      <strong className="max-w-full truncate text-[length:var(--type-label-small-size)] leading-[var(--type-label-small-line)] [font-weight:var(--type-body-emphasis-weight)]">{label}</strong>
      {owner ? <small className="text-[length:var(--type-label-muted-size)] leading-[var(--type-label-muted-line)] text-muted-foreground">Proprietária</small> : null}
    </div>
  );
}

export { ParticipantAvatar };
