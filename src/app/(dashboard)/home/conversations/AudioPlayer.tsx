// components/ui/AudioPlayer.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  src: string;
  refreshSource?: () => Promise<string>;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, refreshSource }) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const pending = React.useRef(false);
  const [playbackError, setPlaybackError] = React.useState<string | null>(null);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    const ended = () => setIsPlaying(false);
    audio.addEventListener("ended", ended);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", ended);
    };
  }, []);

 const togglePlayback = async () => {
  const audio = audioRef.current;
  if (!audio || pending.current) return;
  pending.current = true;
  setBusy(true);
  setPlaybackError(null);
  try {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const next = await refreshSource?.();
      if (next && next !== audio.src) {
        const position = audio.currentTime;
        await new Promise<void>((resolve, reject) => {
          const finish = (error?: Error) => {
            clearTimeout(timeout);
            audio.removeEventListener("loadedmetadata", loaded);
            audio.removeEventListener("error", failed);
            if (error) reject(error); else resolve();
          };
          const loaded = () => finish();
          const failed = () => finish(new Error("Audio could not be loaded."));
          const timeout = setTimeout(() => finish(new Error("Audio took too long to load.")), 15000);
          audio.addEventListener("loadedmetadata", loaded);
          audio.addEventListener("error", failed);
          audio.src = next;
          audio.load();
        });
        audio.currentTime = Math.min(position, Number.isFinite(audio.duration) ? audio.duration : position);
      }
      await audio.play();
      setIsPlaying(true);
    }
  } catch (error) {
    setIsPlaying(false);
    setPlaybackError(error instanceof Error ? error.message : "Playback failed. Please try again.");
  } finally { pending.current = false; setBusy(false); }
};

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };


  return (
    <div className="w-1/2 flex items-center justify-center">
      <audio ref={audioRef} src={src} />
      {playbackError && <span role="alert" className="text-xs text-muted-foreground">{playbackError}</span>}

      <div className="flex flex-row items-center justify-between w-full gap-4">
        {/* Play button */}
        <Button
          onClick={togglePlayback}
          disabled={busy}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
          variant="secondary"
          size="icon"
          className="bg-background w-7 h-7 shadow-none cursor-pointer"
        >
          {isPlaying ? <Pause className="fill-current" /> : <Play className="fill-current" />}
        </Button>

            <Slider
              value={[currentTime]}
              onValueChange={([val]) => {
                if (audioRef.current) {
                  audioRef.current.currentTime = val;
                }
                setCurrentTime(val);
              }}
              min={0}
              max={duration}
              step={0.1}
              className="w-full h-2 cursor-pointer"
            />

        {/* Time display */}
        <div className="flex w-25 text-xs text-muted-foreground">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
};
