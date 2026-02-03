import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent } from "@/data";
import { X } from "lucide-react";

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<typeof siteContent.gallery.images[0] | null>(null);

  return (
    <section id="gallery" className="section-full relative bg-background flex flex-col justify-center overflow-hidden">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-serif text-2xl md:text-3xl text-center text-foreground mb-8 px-6"
      >
        Our Moments Together
      </motion.h2>

      {/* Film Strip Container */}
      <div
        className="w-full overflow-x-auto py-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`
          .film-strip::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        <div className="film-strip flex gap-6 px-6 min-w-max">
          {siteContent.gallery.images.map((image, index) => (
            <motion.button
              key={image.id}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: (index % 2 === 0 ? -3 : 3) }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(image)}
              className="polaroid-card flex-shrink-0 touch-manipulation"
              style={{ transform: `rotate(${index % 2 === 0 ? -3 : 3}deg)` }}
            >
              {/* Polaroid Frame */}
              <div className="bg-white p-3 pb-12 shadow-xl rounded-sm">
                <div
                  className="w-48 h-48 md:w-56 md:h-56 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${image.url})`,
                    backgroundColor: `hsl(${351 + index * 5} 30% ${85 - index * 5}%)`,
                  }}
                />
                {/* Caption */}
                <p className="absolute bottom-3 left-0 right-0 text-center font-serif text-sm text-foreground/80 px-2">
                  {image.caption}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Swipe hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex justify-center gap-2 text-foreground/50 text-sm"
      >
        <span>← Swipe to explore →</span>
      </motion.div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-foreground/60 backdrop-blur-md" />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative z-10 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Polaroid in Modal */}
              <div className="bg-white p-4 pb-16 shadow-2xl rounded-sm">
                <div
                  className="w-full aspect-square bg-cover bg-center rounded-sm"
                  style={{
                    backgroundImage: `url(${selectedImage.url})`,
                  }}
                />
                <p className="absolute bottom-4 left-0 right-0 text-center font-serif text-lg text-foreground px-4">
                  {selectedImage.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
