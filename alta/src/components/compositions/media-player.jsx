import * as React from "react";
import { Maximize2, Minimize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
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
  onProgressChange,
  durationSeconds = 32,
}) {
  const playerRef = React.useRef(null);
  const [internalPlaying, setInternalPlaying] = React.useState(false);
  const [internalMuted, setInternalMuted] = React.useState(false);
  const [internalProgress, setInternalProgress] = React.useState(progress);
  const [fullscreen, setFullscreen] = React.useState(false);
  const playing = controlledPlaying ?? internalPlaying;
  const muted = controlledMuted ?? internalMuted;
  const currentProgress = onProgressChange ? progress : internalProgress;
  const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  const elapsed = Math.round((currentProgress / 100) * durationSeconds);

  React.useEffect(() => setInternalProgress(progress), [progress]);
  React.useEffect(() => {
    const handleFullscreen = () => setFullscreen(document.fullscreenElement === playerRef.current);
    document.addEventListener("fullscreenchange", handleFullscreen);
    return () => document.removeEventListener("fullscreenchange", handleFullscreen);
  }, []);
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
  const setProgress = (value) => {
    const next = Math.max(0, Math.min(100, value));
    setInternalProgress(next);
    onProgressChange?.(next);
  };
  const seek = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setProgress(((event.clientX - bounds.left) / bounds.width) * 100);
  };
  const seekWithKeyboard = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setProgress(currentProgress - 5);
    }
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setProgress(currentProgress + 5);
    }
  };
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) await playerRef.current?.requestFullscreen?.();
    else await document.exitFullscreen?.();
  };

  const progressControl = (
    <div
      data-slot="media-progress"
      className="relative h-4 min-w-0 flex-1 cursor-pointer outline-none before:absolute before:inset-x-0 before:top-1/2 before:h-0.5 before:-translate-y-1/2 before:rounded-full before:bg-white/25 focus-visible:before:ring-2 focus-visible:before:ring-ring"
      aria-label="Progresso da reprodução"
      aria-valuetext={`${Math.round(currentProgress)}% reproduzido`}
      role="slider"
      tabIndex={0}
      aria-valuenow={Math.round(currentProgress)}
      aria-valuemin="0"
      aria-valuemax="100"
      onClick={seek}
      onKeyDown={seekWithKeyboard}
    >
      <span
        className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-primary"
        style={{ width: `${currentProgress}%` }}
      />
      <span
        className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
        style={{ left: `${currentProgress}%` }}
      />
    </div>
  );

  return (
    <div
      ref={playerRef}
      data-slot="media-player"
      data-variant={variant}
      data-playing={playing || undefined}
      className={cn(
        "group relative overflow-hidden bg-black",
        variant === "immersive"
          ? "aspect-[9/16] border-0"
          : "aspect-video min-h-0 w-full rounded-xl border border-border",
        className,
      )}
    >
      <img className="size-full object-cover" src={poster} alt="" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/85" />
      {variant === "embedded" ? (
        <>
          <strong className="sr-only">{title}</strong>
          <div data-slot="media-controls" className="absolute inset-x-3 bottom-3 flex h-9 items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-background)] px-1.5 backdrop-blur-[var(--glass-blur)]">
            <Button size="icon-xs" variant="ghost" className="rounded-full" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pausar" : "Reproduzir"}>
              {playing ? <Pause /> : <Play fill="currentColor" />}
            </Button>
            {progressControl}
            <Button size="icon-xs" variant="ghost" className="rounded-full" onClick={() => setMuted((value) => !value)} aria-label={muted ? "Ativar som" : "Silenciar"}>
              {muted ? <VolumeX /> : <Volume2 />}
            </Button>
            <Button size="icon-xs" variant="ghost" className="rounded-full" onClick={toggleFullscreen} aria-label={fullscreen ? "Sair da tela cheia" : "Tela cheia"}>
              {fullscreen ? <Minimize2 /> : <Maximize2 />}
            </Button>
          </div>
        </>
      ) : (
        <>
          <strong className="sr-only">{title}</strong>
          <Button
            size="icon"
            variant="secondary"
            className={cn(
              "absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--glass-background)] backdrop-blur-[var(--glass-blur)] transition-opacity",
              playing && "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
            )}
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? "Pausar" : "Reproduzir"}
          >
            {playing ? <Pause /> : <Play fill="currentColor" />}
          </Button>
          <Button
            size="icon-sm"
            variant="secondary"
            className="absolute right-3 top-3 size-8 rounded-full bg-[var(--glass-background)] backdrop-blur-[var(--glass-blur)]"
            onClick={() => setMuted((value) => !value)}
            aria-label={muted ? "Ativar som" : "Silenciar"}
          >
            {muted ? <VolumeX /> : <Volume2 />}
          </Button>
          <div data-slot="media-controls" className="absolute inset-x-4 bottom-[84px] z-10 flex h-9 items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-background)] px-2 backdrop-blur-[var(--glass-blur)]">
            <Button size="icon-xs" variant="ghost" className="shrink-0 rounded-full" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pausar prévia" : "Reproduzir prévia"}>
              {playing ? <Pause /> : <Play fill="currentColor" />}
            </Button>
            {progressControl}
            <span className="shrink-0 text-[11px] tabular-nums text-white" aria-label={`${formatTime(elapsed)} de ${formatTime(durationSeconds)}`}>
              {formatTime(elapsed)} / {formatTime(durationSeconds)}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export { MediaPlayer };
