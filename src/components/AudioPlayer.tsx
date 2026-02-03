import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent } from "@/data";
import { Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

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

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
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
      
      {/* Glass-morphism Container */}
      <div className="glass-player rounded-2xl p-4 flex flex-col gap-3 min-w-[180px]">
        {/* Top Row: Vinyl + Song Info */}
        <button
          onClick={togglePlay}
          className="flex items-center gap-3 touch-manipulation"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {/* Vinyl Record */}
          <div className="relative w-12 h-12 flex-shrink-0">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ 
                duration: 3, 
                repeat: isPlaying ? Infinity : 0, 
                ease: "linear" 
              }}
              className="w-12 h-12 rounded-full bg-velvet flex items-center justify-center"
            >
              {/* Vinyl grooves */}
              <div className="absolute inset-1.5 rounded-full border border-white/20" />
              <div className="absolute inset-3 rounded-full border border-white/15" />
              <div className="absolute inset-[14px] rounded-full border border-white/20" />
              {/* Center label */}
              <div className="w-3 h-3 rounded-full bg-gold" />
            </motion.div>
            
            {/* Play indicator overlay */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-velvet/50 rounded-full"
                >
                  <svg
                    className="w-5 h-5 text-gold ml-0.5"
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
          <div className="text-left">
            <p className="text-xs font-medium text-foreground/60">Now Playing</p>
            <p className="text-sm font-serif text-foreground">{siteContent.audio.songTitle}</p>
          </div>
        </button>

        {/* Volume Control Row */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="touch-manipulation min-w-[32px] min-h-[32px] flex items-center justify-center text-foreground/70"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          
          <Slider
            value={[isMuted ? 0 : volume]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="flex-1"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AudioPlayer;
