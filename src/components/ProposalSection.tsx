import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { siteContent } from "@/data";
import FloatingEmojis from "@/components/FloatingEmojis";

const ProposalSection = () => {
  const [answered, setAnswered] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const handleYes = () => {
    // Trigger confetti explosion
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#D4AF37", "#F2D4D7", "#4A0404", "#FDFBF7"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#D4AF37", "#F2D4D7", "#4A0404", "#FDFBF7"],
      });
    }, 50);

    // Hearts explosion from center
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#F2D4D7", "#4A0404"],
      shapes: ["circle"],
      scalar: 1.2,
    });

    setAnswered(true);
  };

  const handleNoTouch = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    
    if (!sectionRef.current || !noButtonRef.current) return;
    
    const section = sectionRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    
    // Calculate button's current center position relative to its original position
    const buttonWidth = button.width;
    const buttonHeight = button.height;
    
    // Define safe boundaries with padding
    const padding = 20;
    const safeTop = padding;
    const safeBottom = section.height - buttonHeight - padding - 100; // Account for safe area
    const safeLeft = padding;
    const safeRight = section.width - buttonWidth - padding;
    
    // Calculate the button's original center (when position is 0,0)
    const originalCenterX = section.width / 2;
    const originalCenterY = section.height / 2;
    
    // Generate random position within safe bounds
    const randomX = safeLeft + Math.random() * (safeRight - safeLeft);
    const randomY = safeTop + Math.random() * (safeBottom - safeTop);
    
    // Calculate offset from original position
    const newX = randomX - originalCenterX + buttonWidth / 2 + 70; // Offset for button group positioning
    const newY = randomY - originalCenterY + buttonHeight / 2;
    
    setNoButtonPosition({ x: newX, y: newY });
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section-full flex flex-col items-center justify-center relative bg-background overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-radial from-blush/40 via-transparent to-transparent" />
      
      {/* Floating Emojis */}
      <FloatingEmojis />
      
      <AnimatePresence mode="wait">
        {!answered ? (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center px-6 relative z-10"
          >
            {/* Question with heartbeat animation */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-romantic-lg text-center mb-12"
              style={{ color: "hsl(var(--velvet))" }}
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
                {siteContent.proposal.question}
              </motion.span>
            </motion.h2>

            {/* Buttons - Side by side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-row gap-4 items-center"
            >
              {/* YES Button */}
              <button
                onClick={handleYes}
                className="btn-gold min-w-[120px] min-h-[56px] touch-manipulation"
              >
                {siteContent.proposal.yesText}
              </button>

              {/* NO Button - Runs away on touch, stays within bounds */}
              <motion.button
                ref={noButtonRef}
                animate={noButtonPosition}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onTouchStart={handleNoTouch}
                onMouseDown={handleNoTouch}
                className="btn-outline-gold min-w-[120px] min-h-[56px] touch-manipulation"
              >
                {siteContent.proposal.noText}
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center px-6"
          >
            {/* Heart */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-8xl mb-8"
            >
              💕
            </motion.div>
            
            {/* Success message */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-romantic-lg text-center text-shadow-romantic"
              style={{ color: "hsl(var(--velvet))" }}
            >
              {siteContent.proposal.successMessage}
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProposalSection;
