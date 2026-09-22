import * as React from "react";
import { Play } from "lucide-react";
import { Item } from "@/components/ui/item";

function EpisodeRow({ thumbnail, number, title, duration, progress, onClick }) {
  const supporting = `Episódio ${number} · ${duration}${progress ? ` · ${progress}% assistido` : ""}`;
  return (
    <Item
      thumbnail={thumbnail}
      title={title}
      supporting={supporting}
      trailing={
        <Play className="size-4 text-muted-foreground" fill="currentColor" />
      }
      onClick={onClick}
    />
  );
}

export { EpisodeRow };
