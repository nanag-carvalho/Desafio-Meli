"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";
import { cn } from "cn";

function Switch({ className, ...props }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn("inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border border-border bg-muted p-0.5 transition-colors outline-none data-[state=checked]:border-primary data-[state=checked]:bg-primary focus-visible:ring-2 focus-visible:ring-ring/35 disabled:cursor-not-allowed disabled:opacity-50", className)}
      {...props}
    >
      <SwitchPrimitive.Thumb className="block size-5 rounded-full bg-foreground shadow-sm transition-transform data-[state=checked]:translate-x-4 data-[state=checked]:bg-primary-foreground" />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
