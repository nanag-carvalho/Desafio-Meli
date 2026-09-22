import * as React from "react";
import { cn } from "cn";
import { cva } from "class-variance-authority";

const cardVariants = cva(
  "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl border border-border bg-card py-(--card-spacing) text-[length:var(--type-body-size)] leading-[var(--type-body-line)] [font-weight:var(--type-body-weight)] text-card-foreground [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
  {
    variants: {
      variant: {
        default: "",
        interactive:
          "transition-[background,transform] hover:bg-muted active:translate-y-px",
        elevated: "shadow-[var(--shadow-raised)]",
        glass:
          "border-[var(--glass-border)] bg-[var(--glass-background)] shadow-[var(--shadow-raised)] backdrop-blur-[var(--glass-blur)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Card({ className, size = "default", variant = "default", ...props }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-variant={variant}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-[length:var(--type-h4-size)] leading-[var(--type-h4-line)] [font-weight:var(--type-h4-weight)]",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-[length:var(--type-body-size)] leading-[var(--type-body-line)] [font-weight:var(--type-body-weight)] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
};
