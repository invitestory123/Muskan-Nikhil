import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Music, Volume2, VolumeX, Disc3 } from "lucide-react";
import { invitation } from "@/config/invitation";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Autoplay or arm on first user interaction with the window
  useEffect(() => {
    const handleFirstClick = () => {
      // Don't auto-start if already playing
      setIsPlaying(true);
      window.removeEventListener("click", handleFirstClick);
    };
    window.addEventListener("click", handleFirstClick, { once: true });
    return () => {
      window.removeEventListener("click", handleFirstClick);
    };
  }, []);

  return (
    <>
      {/* Hidden YouTube Audio Stream Iframe */}
      <div className="hidden">
        {isPlaying && (
          <iframe
            ref={iframeRef}
            width="200"
            height="200"
            src={`https://www.youtube-nocookie.com/embed/${invitation.music.youtubeId}?autoplay=1&enablejsapi=1&loop=1&playlist=${invitation.music.youtubeId}`}
            title="Wedding Background Music"
            allow="autoplay; encrypted-media"
          />
        )}
      </div>

      {/* Floating Audio Control Button */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="flex items-center gap-3 rounded-full border border-amber-300/40 bg-[#4a0d0a]/95 px-4 py-2.5 shadow-2xl backdrop-blur-md text-[#faf6ef]"
            >
              <div className="flex flex-col text-left">
                <span className="text-[0.62rem] tracking-wider text-amber-300 uppercase">
                  Wedding Melody
                </span>
                <span className="font-display text-sm font-semibold text-amber-100">
                  {invitation.music.title}
                </span>
                <span className="text-[0.6rem] text-amber-200/70">
                  {invitation.music.artist}
                </span>
              </div>

              <button
                type="button"
                onClick={togglePlay}
                className="flex size-9 items-center justify-center rounded-full bg-amber-400 text-[#4a0d0a] shadow-md transition-transform hover:scale-105 active:scale-95"
                aria-label={isPlaying ? "Pause music" : "Play music"}
              >
                {isPlaying ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          {/* Sound waves when playing */}
          {isPlaying && (
            <div className="flex items-end gap-0.5 rounded-full bg-black/40 px-2 py-1.5 backdrop-blur-sm">
              <span className="h-3 w-0.5 animate-pulse rounded-full bg-amber-300" style={{ animationDuration: "0.6s" }} />
              <span className="h-5 w-0.5 animate-pulse rounded-full bg-amber-300" style={{ animationDuration: "0.9s" }} />
              <span className="h-2 w-0.5 animate-pulse rounded-full bg-amber-300" style={{ animationDuration: "0.4s" }} />
              <span className="h-4 w-0.5 animate-pulse rounded-full bg-amber-300" style={{ animationDuration: "0.7s" }} />
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              setIsExpanded((prev) => !prev);
              if (!isPlaying) setIsPlaying(true);
            }}
            className="group relative flex size-12 items-center justify-center rounded-full border border-amber-300/60 bg-gradient-to-tr from-[#63120f] to-[#992218] p-2 text-amber-200 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-transform hover:scale-105 active:scale-95"
            aria-label="Toggle Wedding Music"
          >
            <Disc3
              className={`size-6 text-amber-300 ${isPlaying ? "animate-[spin_4s_linear_infinite]" : ""}`}
            />
            {!isPlaying && (
              <span className="absolute -top-1 -right-1 flex size-3">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex size-3 rounded-full bg-amber-500" />
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
