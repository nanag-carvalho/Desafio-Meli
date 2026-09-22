import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

const IconButton = React.forwardRef(function IconButton(
  {
    className,
    label,
    active = false,
    variant = "secondary",
    children,
    ...props
  },
  ref,
) {
  return (
    <Button
      ref={ref}
      size="icon"
      variant={active ? "default" : variant}
      className={cn("rounded-full", className)}
      aria-label={label}
      data-active={active || undefined}
      {...props}
    >
      {children}
    </Button>
  );
});

export { IconButton };
