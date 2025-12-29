import { motion } from 'motion/react';

export function GraffitiBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated graffiti elements */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.08, rotate: 12 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-20 right-10 text-9xl text-gray-600"
        style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
      >
        ★
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.08, rotate: -12 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute bottom-40 left-20 text-9xl text-gray-600"
      >
        ♪
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-1/2 left-1/3 text-9xl text-gray-600"
      >
        ✦
      </motion.div>

      {/* Spray paint dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-1/4 right-1/4"
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              top: Math.random() * 100 + 'px',
              right: Math.random() * 100 + 'px',
            }}
          />
        ))}
      </motion.div>

      {/* Diagonal lines - graffiti style */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-1/3 right-0 w-96 h-1 bg-gradient-to-l from-gray-700 to-transparent origin-right"
        style={{ transform: 'rotate(-15deg)' }}
      />

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute bottom-1/3 left-0 w-96 h-1 bg-gradient-to-r from-gray-700 to-transparent origin-left"
        style={{ transform: 'rotate(-15deg)' }}
      />

      {/* Large text watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] whitespace-nowrap text-white pointer-events-none select-none"
        style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
      >
        DANCE
      </motion.div>
    </div>
  );
}
