import * as React from "react";
import { Send } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { cn } from "cn";

function InviteField({ className, value, onChange, onInvite, ...props }) {
  const canInvite = Boolean(value?.trim());
  return (
    <div className={cn("relative", className)} data-slot="invite-field">
      <Input
        {...props}
        value={value}
        onChange={onChange}
        className="pr-11"
        onKeyDown={(event) => {
          if (event.key === "Enter" && canInvite) onInvite?.();
          props.onKeyDown?.(event);
        }}
      />
      <IconButton
        label="Enviar convite"
        disabled={!canInvite}
        onClick={onInvite}
        className="absolute right-0 top-0 border-transparent bg-transparent"
      >
        <Send aria-hidden="true" />
      </IconButton>
    </div>
  );
}

export { InviteField };
