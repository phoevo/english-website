// components/ui/AudioPlayer.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  src: string;
  refreshSource?: () => Promise<string>;
}

// The audio bucket is encrypted, and Appwrite ignores Range requests for
// encrypted files: it always sends the whole file with no length. Browsers
// can't seek in a stream like that, so the slider wouldn't work. Instead, the
// file (a few MB) is downloaded once and played from memory, where seeking works.
async function downloadAudio(url: string, signal: AbortSignal) {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Audio request failed (${response.status}).`);
  return URL.createObjectURL(await response.blob());
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, refreshSource }) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [blobUrl, setBlobUrl] = React.useState<string | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [playbackError, setPlaybackError] = React.useState<string | null>(null);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const knownDuration = React.useRef(0);
  const probing = React.useRef(false);
  const refreshRef = React.useRef(refreshSource);
  refreshRef.current = refreshSource;

  React.useEffect(() => {
    const controller = new AbortController();
    let created: string | null = null;
    setBlobUrl(null);
    setPlaybackError(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    knownDuration.current = 0;

    (async () => {
      try {
        try {
          created = await downloadAudio(src, controller.signal);
        } catch (error) {
          // The signed link may have expired; get a fresh one and try once more.
          if (controller.signal.aborted || !refreshRef.current) throw error;
          created = await downloadAudio(await refreshRef.current(), controller.signal);
        }
        if (controller.signal.aborted) URL.revokeObjectURL(created);
        else setBlobUrl(created);
      } catch {
        if (!controller.signal.aborted) setPlaybackError("Audio could not be loaded.");
      }
    })();

    return () => {
      controller.abort();
      if (created) URL.revokeObjectURL(created);
    };
  }, [src]);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    // Some MP3s (e.g. exported with ffmpeg) report an Infinity duration.
    // Seeking past the end makes the browser work out the real length;
    // then go back to the start.
    const updateDuration = () => {
      const value = audio.duration;
      if (Number.isFinite(value) && value > 0) {
        knownDuration.current = value;
        setDuration(value);
        if (probing.current) {
          probing.current = false;
          if (audio.paused) audio.currentTime = 0;
        }
      } else if (value === Infinity && !knownDuration.current && !probing.current) {
        probing.current = true;
        audio.currentTime = 1e101;
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);
    const ended = () => setIsPlaying(false);
    audio.addEventListener("ended", ended);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("ended", ended);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !blobUrl) return;
    setPlaybackError(null);
    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      setIsPlaying(false);
      setPlaybackError(error instanceof Error ? error.message : "Playback failed. Please try again.");
    }
  };

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };


  return (
    <div className="w-1/2 flex items-center justify-center">
      <audio ref={audioRef} src={blobUrl ?? undefined} preload="metadata" />
      {playbackError && <span role="alert" className="text-xs text-muted-foreground">{playbackError}</span>}

      <div className="flex flex-row items-center justify-between w-full gap-4">
        {/* Play button */}
        <Button
          onClick={togglePlayback}
          disabled={!blobUrl}
          aria-label={!blobUrl ? "Loading audio" : isPlaying ? "Pause audio" : "Play audio"}
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
              disabled={!duration}
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
