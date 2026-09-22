import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "cn";

function SearchField({ className, inputClassName, ...props }) {
  return (
    <label className={cn("relative block", className)} data-slot="search-field">
      <Search className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <Input type="search" className={cn("pl-9", inputClassName)} {...props} />
    </label>
  );
}

export { SearchField };
