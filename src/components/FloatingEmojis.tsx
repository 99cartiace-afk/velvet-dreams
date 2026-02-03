import { motion } from "framer-motion";

const emojis = ["❤️", "💕", "✨"];

const FloatingEmojis = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {emojis.map((emoji, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl md:text-3xl"
          style={{
            left: `${20 + index * 25}%`,
            top: `${30 + (index % 2) * 20}%`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0.6, 1, 0.6],
            y: [0, -15, 0],
            x: [0, index % 2 === 0 ? 10 : -10, 0],
            rotate: [0, index % 2 === 0 ? 10 : -10, 0],
          }}
          transition={{
            duration: 3 + index * 0.5,
            repeat: Infinity,
            delay: index * 0.4,
            ease: "easeInOut",
          }}
        >
          {emoji}
        </motion.div>
      ))}
      
      {/* Additional emojis on the other side */}
      {emojis.map((emoji, index) => (
        <motion.div
          key={`right-${index}`}
          className="absolute text-2xl md:text-3xl"
          style={{
            right: `${15 + index * 20}%`,
            top: `${35 + (index % 2) * 25}%`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0.5, 0.9, 0.5],
            y: [0, -20, 0],
            x: [0, index % 2 === 0 ? -8 : 8, 0],
            rotate: [0, index % 2 === 0 ? -8 : 8, 0],
          }}
          transition={{
            duration: 3.5 + index * 0.3,
            repeat: Infinity,
            delay: 0.5 + index * 0.3,
            ease: "easeInOut",
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingEmojis;
