import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "cn";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";

const mediaCardVariants = cva(
  "group/media-card flex shrink-0 flex-col gap-3 border-0 bg-transparent p-0 text-left text-foreground outline-none",
  {
    variants: {
      format: {
        poster: "w-[var(--size-media-card-poster)]",
        ranking: "w-[var(--size-media-card-ranking)]",
        landscape: "w-[var(--size-media-card-landscape)]",
      },
    },
    defaultVariants: { format: "poster" },
  },
);

function MediaCard({
  className,
  format = "poster",
  image,
  imageAlt = "",
  title,
  metadata,
  badge,
  badgeTone = "included",
  rank = 1,
  progress,
  layoutId,
  ...props
}) {
  const badgeVariant = badgeTone === "rent" ? "default" : "secondary";
  const [loaded, setLoaded] = React.useState(false);

  return (
    <button
      type="button"
      data-slot="media-card"
      data-format={format}
      className={cn(mediaCardVariants({ format }), className)}
      {...props}
    >
      <span
        data-slot="media-card-art-shell"
        className={cn(
          "relative block w-full transition-transform duration-200 group-hover/media-card:-translate-y-0.5",
          format === "landscape"
            ? "h-[var(--size-media-card-landscape-art)]"
            : "h-[var(--size-media-card-poster-art)]",
        )}
      >
        {format === "ranking" ? (
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-2 z-20 text-[length:var(--type-rank-size)] leading-[0.72] [font-weight:var(--type-display-weight)] text-foreground drop-shadow-[0_3px_12px_rgba(0,0,0,.9)]"
          >
            {rank}
          </span>
        ) : null}
        <span
          data-slot="media-card-art"
          className={cn(
            "absolute inset-y-0 right-0 block overflow-hidden rounded-lg bg-muted ring-offset-background group-focus-visible/media-card:ring-2 group-focus-visible/media-card:ring-ring/35",
            "left-0",
          )}
        >
          {!loaded ? (
            <Skeleton className="absolute inset-0 z-10 size-full rounded-[inherit]" />
          ) : null}
          <motion.img
            layoutId={layoutId}
            className="h-full w-full object-cover"
            src={image}
            alt={imageAlt}
            onLoad={() => setLoaded(true)}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          />
          {badge ? (
            <Badge
              variant={badgeVariant}
              className={cn(
                "absolute left-2 top-2",
                badgeTone === "rent" && "bg-primary text-primary-foreground",
                badgeTone === "included" && "bg-success text-black",
              )}
            >
              {badge}
            </Badge>
          ) : null}
          {typeof progress === "number" ? (
            <span className="absolute inset-x-0 bottom-0 z-20 h-1 bg-black/45">
              <span
                className="block h-full rounded-r-full bg-primary transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </span>
          ) : null}
        </span>
      </span>
      <span data-slot="media-card-copy" className="grid w-full gap-0.5">
        <span className="truncate text-[length:var(--type-body-emphasis-size)] leading-[var(--type-body-emphasis-line)] [font-weight:var(--type-body-emphasis-weight)]">
          {title}
        </span>
        {metadata ? (
          <span className="truncate text-[length:var(--type-label-muted-size)] leading-[var(--type-label-muted-line)] [font-weight:var(--type-label-muted-weight)] text-muted-foreground">
            {metadata}
          </span>
        ) : null}
      </span>
    </button>
  );
}

export { MediaCard, mediaCardVariants };
