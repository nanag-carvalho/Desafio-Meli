import * as React from "react";
import { cn } from "cn";

function Avatar({ className, src, alt = "", initials, size = "md", ...props }) {
  return (
    <span
      data-slot="avatar"
      data-size={size}
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-accent text-accent-foreground [font-weight:var(--type-body-emphasis-weight)]",
        size === "sm" ? "size-8 text-[length:var(--type-label-small-size)]" : "size-10 text-[length:var(--type-body-size)]",
        className,
      )}
      {...props}
    >
      {src ? <img className="size-full object-cover" src={src} alt={alt} /> : initials}
    </span>
  );
}

export { Avatar };
