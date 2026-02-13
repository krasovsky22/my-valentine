"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface DancingVideoProps {
  onComplete: () => void;
}

export function DancingVideo({ onComplete }: DancingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked, user will need to interact
      });
    }
  }, []);

  const handleEnded = () => {
    onComplete();
  };

  const handleClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      }
    }
  };

  return (
    <motion.div
      className="relative flex h-[100dvh] w-full items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src="/video/dancing.mp4"
        className="max-h-full max-w-full object-contain"
        playsInline
        muted
        onEnded={handleEnded}
      />

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
