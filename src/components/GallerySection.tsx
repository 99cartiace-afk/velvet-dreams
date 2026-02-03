import { useRef } from "react";
import { motion } from "framer-motion";
import { siteContent } from "@/data";

const GallerySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="gallery" className="section-full relative bg-background">
      {/* Horizontal snap carousel */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-x-auto snap-carousel flex"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`
          .snap-carousel::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {siteContent.gallery.images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-w-full h-full flex-shrink-0 relative"
          >
            {/* Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${image.url})`,
                backgroundColor: `hsl(${351 + index * 5} 30% ${85 - index * 5}%)`,
              }}
            >
              {/* Placeholder gradient while loading */}
              <div className="absolute inset-0 bg-gradient-to-br from-blush/50 to-rose-mist/50" />
            </div>

            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 caption-gradient pt-32 pb-16 px-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-serif text-2xl md:text-3xl text-white text-center text-shadow-romantic"
              >
                {image.caption}
              </motion.p>
            </div>

            {/* Slide indicator */}
            <div className="absolute top-8 left-0 right-0 flex justify-center gap-2">
              {siteContent.gallery.images.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === index ? "bg-white w-6" : "bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Swipe hint on first slide */}
            {index === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute top-1/2 right-4 -translate-y-1/2"
              >
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center gap-2 text-white/70"
                >
                  <span className="text-sm">Swipe</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
