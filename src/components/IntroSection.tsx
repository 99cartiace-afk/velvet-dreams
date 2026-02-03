import { motion } from "framer-motion";
import { siteContent } from "@/data";
import FloatingEmojis from "@/components/FloatingEmojis";

const IntroSection = () => {
  const scrollToGallery = () => {
    const gallery = document.getElementById("gallery");
    if (gallery) {
      gallery.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="section-full flex flex-col items-center justify-center relative bg-background overflow-hidden">
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-blush/30 via-transparent to-transparent" />
      
      {/* Floating Emojis */}
      <FloatingEmojis />
      
      {/* Main greeting with heartbeat animation */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-romantic-xl text-center px-6 relative z-10 text-wine-red"
      >
        <motion.span
          animate={{ 
            scale: [1, 1.02, 1, 1.03, 1],
          }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity, 
            repeatDelay: 0.5,
            ease: "easeInOut"
          }}
          className="inline-block text-shadow-romantic"
        >
          {siteContent.intro.greeting}
        </motion.span>
      </motion.h1>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
        className="w-24 h-0.5 bg-gold mt-8 origin-center"
      />

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={scrollToGallery}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 touch-manipulation min-w-[44px] min-h-[44px]"
        aria-label="Scroll to gallery"
      >
        <span className="text-sm font-medium tracking-widest uppercase text-foreground/60">
          {siteContent.intro.swipeHint}
        </span>
        <motion.div
          className="animate-bounce-gentle"
        >
          <svg
            className="w-6 h-6 text-gold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.button>
    </section>
  );
};

export default IntroSection;
