import { motion } from "framer-motion";
import { useMemo } from "react";

const emojiSet = ["🥹", "🐷", "🫶🏽", "🌹", "✨", "😚", "💕", "❤️", "💖", "💗"];

const FloatingEmojis = () => {
  // Generate 27 random floating emojis with varied properties
  const floatingEmojis = useMemo(() => {
    return Array.from({ length: 27 }, (_, index) => ({
      id: index,
      emoji: emojiSet[Math.floor(Math.random() * emojiSet.length)],
      left: Math.random() * 90 + 5, // 5% to 95%
      top: Math.random() * 70 + 10, // 10% to 80%
      size: Math.random() * 1.2 + 0.8, // 0.8rem to 2rem scale
      duration: 2.5 + Math.random() * 2, // 2.5s to 4.5s
      delay: Math.random() * 2, // 0s to 2s delay
      floatDistance: 10 + Math.random() * 15, // 10px to 25px float
      rotateAmount: 5 + Math.random() * 10, // 5deg to 15deg rotation
      xDrift: (Math.random() - 0.5) * 20, // -10px to 10px horizontal drift
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {floatingEmojis.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            fontSize: `${item.size}rem`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0.4, 0.9, 0.4],
            y: [0, -item.floatDistance, 0],
            x: [0, item.xDrift, 0],
            rotate: [0, item.rotateAmount, -item.rotateAmount, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingEmojis;
