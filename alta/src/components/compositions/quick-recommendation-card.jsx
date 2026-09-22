import * as React from "react";
import { Heart, Send, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "cn";

const sourceLabels = {
  rated: "Avaliado",
  favorite: "Favorito",
  history: "Assistido",
};

const ratingIcons = {
  "Não é para mim": ThumbsDown,
  Gostei: ThumbsUp,
  Amei: Heart,
};

function QuickRecommendationCard({
  className,
  image,
  imageAlt = "",
  title,
  source = "rated",
  rating,
  density = "default",
  onOpen,
  onRecommend,
}) {
  const RatingIcon = ratingIcons[rating];
  return (
    <article
      data-slot="quick-recommendation-card"
      data-source={source}
      data-density={density}
      className={cn(
        "shrink-0 overflow-hidden rounded-lg border border-border bg-card",
        density === "compact" ? "w-36" : "w-[var(--size-media-card-poster)]",
        className,
      )}
    >
      <button
        type="button"
        className={cn(
          "relative block w-full overflow-hidden rounded-t-[calc(var(--radius-lg)-1px)] bg-muted outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/35",
          density === "compact" ? "h-48" : "h-[var(--size-media-card-poster-art)]",
        )}
        onClick={onOpen}
        aria-label={`Abrir ${title}`}
      >
        <img className="size-full object-cover" src={image} alt={imageAlt} />
        <Badge
          variant="secondary"
          className="absolute left-2 top-2 bg-[var(--glass-background)] backdrop-blur-[var(--glass-blur)]"
        >
          {sourceLabels[source] ?? source}
        </Badge>
        {rating ? (
          <Badge tone="brand" className="absolute right-2 top-2">
            {RatingIcon ? <RatingIcon aria-hidden="true" /> : null}
            {rating}
          </Badge>
        ) : null}
      </button>
      <Button
        variant="ghost"
        className="w-full justify-start rounded-b-[calc(var(--radius-lg)-1px)] rounded-t-none border-0 border-t border-border px-3"
        onClick={onRecommend}
        aria-label={`Indicar ${title}`}
      >
        <Send data-icon="inline-start" aria-hidden="true" />
        Indicar
      </Button>
    </article>
  );
}

export { QuickRecommendationCard };
