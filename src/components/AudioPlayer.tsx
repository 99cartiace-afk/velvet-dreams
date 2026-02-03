import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent } from "@/data";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.addEventListener("canplaythrough", () => setIsLoaded(true));
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed bottom-6 right-4 z-50"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <audio ref={audioRef} src={siteContent.audio.songUrl} loop preload="auto" />
      
      <button
        onClick={togglePlay}
        className="glass-card rounded-2xl p-3 flex items-center gap-3 min-w-[44px] min-h-[44px] touch-manipulation"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {/* Vinyl Record */}
        <div className="relative w-10 h-10">
          <motion.div
            className={`w-10 h-10 rounded-full bg-velvet flex items-center justify-center ${
              isPlaying ? "animate-spin-slow" : ""
            }`}
          >
            {/* Vinyl grooves */}
            <div className="absolute inset-1 rounded-full border border-foreground/30" />
            <div className="absolute inset-2 rounded-full border border-foreground/20" />
            <div className="absolute inset-3 rounded-full border border-foreground/30" />
            {/* Center label */}
            <div className="w-3 h-3 rounded-full bg-gold" />
          </motion.div>
          
          {/* Play/Pause indicator */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-velvet/60 rounded-full"
              >
                <svg
                  className="w-4 h-4 text-gold ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Song info */}
        <div className="pr-2">
          <p className="text-xs font-medium text-foreground/80">Now Playing</p>
          <p className="text-sm font-serif text-foreground">{siteContent.audio.songTitle}</p>
        </div>
      </button>
    </motion.div>
  );
};

export default AudioPlayer;
