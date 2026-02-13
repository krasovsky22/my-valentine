"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface VideoPlayerProps {
  onComplete: () => void;
}

export function VideoPlayer({ onComplete }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleEnded = () => {
    onComplete();
  };

  const handleError = () => {
    setHasError(true);
    setTimeout(onComplete, 2000);
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <motion.div
      className="relative flex h-[100dvh] w-full items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {hasError ? (
        <div className="flex flex-col items-center justify-center text-center">
          <p className="mb-4 text-lg text-zinc-400">
            Video not found. Add your video as:
          </p>
          <code className="rounded bg-zinc-800 px-3 py-1 text-sm text-rose-400">
            /public/video/us.mp4
          </code>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            src="/video/us.mp4"
            className="max-h-full max-w-full object-contain"
            playsInline
            onEnded={handleEnded}
            onError={handleError}
          />

          {!isPlaying && (
            <motion.button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors hover:bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/90 shadow-lg">
                <svg
                  className="ml-1 h-10 w-10 text-rose-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </motion.button>
          )}
        </>
      )}

      <motion.button
        onClick={handleSkip}
        className="absolute bottom-8 text-sm text-zinc-500 underline transition-colors hover:text-zinc-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Skip video
      </motion.button>
    </motion.div>
  );
}
