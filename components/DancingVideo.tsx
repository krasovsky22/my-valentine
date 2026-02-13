'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface DancingVideoProps {
  onComplete: () => void;
}

export function DancingVideo({ onComplete }: DancingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleEnded = () => {
    onComplete();
  };

  return (
    <motion.div
      className="relative flex h-[100dvh] w-full items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative flex items-center justify-center">
        <video
          ref={videoRef}
          src="/video/dancing.mp4"
          className="max-h-[100dvh] max-w-full object-contain"
          playsInline
          onEnded={handleEnded}
        />

        {!isPlaying && (
          <motion.button
            onClick={handlePlay}
            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
          >
            <motion.div
              className="flex h-32 w-32 items-center justify-center rounded-full bg-white/90 shadow-2xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="h-16 w-16 translate-x-1 text-rose-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </motion.button>
        )}
      </div>

      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          onComplete();
        }}
        className="absolute bottom-8 text-sm text-zinc-500 underline transition-colors hover:text-zinc-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Skip
      </motion.button>
    </motion.div>
  );
}
