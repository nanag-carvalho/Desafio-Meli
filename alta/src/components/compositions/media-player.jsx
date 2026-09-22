import * as React from "react";
import { Cast, Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

function MediaPlayer({
  className,
  poster,
  title,
  progress = 28,
  variant = "embedded",
  playing: controlledPlaying,
  muted: controlledMuted,
  onPlayingChange,
  onMutedChange,
}) {
  const [internalPlaying, setInternalPlaying] = React.useState(false);
  const [internalMuted, setInternalMuted] = React.useState(false);
  const playing = controlledPlaying ?? internalPlaying;
  const muted = controlledMuted ?? internalMuted;
  const setPlaying = (next) => {
    const value = typeof next === "function" ? next(playing) : next;
    setInternalPlaying(value);
    onPlayingChange?.(value);
  };
  const setMuted = (next) => {
    const value = typeof next === "function" ? next(muted) : next;
    setInternalMuted(value);
    onMutedChange?.(value);
  };

  return (
    <div
      data-slot="media-player"
      data-variant={variant}
      data-playing={playing || undefined}
      className={cn(
        "group relative overflow-hidden bg-black",
        variant === "immersive"
          ? "aspect-[9/16] border-0"
          : "aspect-video min-h-52 rounded-xl border border-border",
        className,
      )}
    >
      <img className="size-full object-cover" src={poster} alt="" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/85" />
      <Button
        size="icon"
        variant="secondary"
        className={cn(
          "absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--glass-background)] backdrop-blur-[var(--glass-blur)]",
          variant === "immersive" &&
            playing &&
            "opacity-0 group-hover:opacity-100",
        )}
        onClick={() => setPlaying((value) => !value)}
        aria-label={playing ? "Pausar" : "Reproduzir"}
      >
        {playing ? <Pause /> : <Play fill="currentColor" />}
      </Button>
      {variant === "embedded" ? (
        <div className="absolute inset-x-3 bottom-3 rounded-lg border border-[var(--glass-border)] bg-[var(--glass-background)] p-2.5 backdrop-blur-[var(--glass-blur)]">
          <div className="mb-2 flex items-center gap-2">
            <strong className="min-w-0 flex-1 truncate text-[length:var(--type-label-small-size)] leading-[var(--type-label-small-line)] [font-weight:var(--type-label-small-weight)]">
              {title}
            </strong>
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={() => setMuted((value) => !value)}
              aria-label={muted ? "Ativar som" : "Silenciar"}
            >
              {muted ? <VolumeX /> : <Volume2 />}
            </Button>
            <Button size="icon-sm" variant="ghost" aria-label="Transmitir">
              <Cast />
            </Button>
            <Button size="icon-sm" variant="ghost" aria-label="Tela cheia">
              <Maximize2 />
            </Button>
          </div>
          <div
            className="h-1 overflow-hidden rounded-full bg-white/20"
            aria-label={`${progress}% reproduzido`}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <>
          <strong className="sr-only">{title}</strong>
          <Button
            size="icon"
            variant="secondary"
            className="absolute right-3 top-3 rounded-full bg-[var(--glass-background)] backdrop-blur-[var(--glass-blur)]"
            onClick={() => setMuted((value) => !value)}
            aria-label={muted ? "Ativar som" : "Silenciar"}
          >
            {muted ? <VolumeX /> : <Volume2 />}
          </Button>
          <div
            className="absolute inset-x-3 bottom-3 h-1 overflow-hidden rounded-full bg-white/25"
            aria-label={`${progress}% reproduzido`}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export { MediaPlayer };
