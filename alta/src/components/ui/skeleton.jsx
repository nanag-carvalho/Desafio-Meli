import { cn } from "cn";

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "skeleton relative overflow-hidden rounded-md bg-muted",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
