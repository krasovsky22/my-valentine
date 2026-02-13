'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TYPING_LINES } from '@/lib/constants';
import { HeartParticles } from './HeartParticles';

interface ChoiceButtonsProps {
  onYes: () => void;
  onNo: () => void;
}

export function ChoiceButtons({ onYes, onNo }: ChoiceButtonsProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fireworksRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio('/sounds/heartbeat.mp3');
    audioRef.current.loop = true;
    audioRef.current.play().catch(() => {});

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleYes = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    fireworksRef.current = new Audio('/sounds/fireworks.mp3');
    fireworksRef.current.play().catch(() => {});
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleVideoEnded = () => {
    setShowSuccess(true);
  };

  return (
    <motion.div
      className="relative flex min-h-[100dvh] flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <video
        ref={videoRef}
        src="/video/us.mp4"
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        onEnded={handleVideoEnded}
      />
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${isPlaying && !showSuccess ? 'bg-black/0' : 'bg-black/50'}`}
      />

      {!isPlaying && (
        <div className="relative z-10 max-w-2xl space-y-8 px-6 text-center">
          <div className="space-y-6">
            {TYPING_LINES.map((line, index) => (
              <p
                key={index}
                className={`font-romantic text-3xl leading-relaxed sm:text-4xl md:text-5xl ${
                  index === TYPING_LINES.length - 1
                    ? 'text-rose-400'
                    : 'text-white'
                }`}
              >
                {line}
              </p>
            ))}
          </div>

          <motion.div
            className="flex flex-col gap-4 pt-6 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.button
              onClick={handleYes}
              className="min-h-[52px] min-w-[140px] rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-10 py-4 font-romantic text-2xl text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Yes
            </motion.button>
            <motion.button
              onClick={onNo}
              className="min-h-[52px] min-w-[140px] rounded-full border-2 border-white/50 px-10 py-4 font-romantic text-2xl text-white transition-colors hover:bg-white/10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              No
            </motion.button>
          </motion.div>
        </div>
      )}

      {showSuccess && (
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <HeartParticles />

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 100,
              delay: 0.3,
            }}
          >
            <motion.div
              className="mb-6 text-6xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              💖
            </motion.div>

            <h1 className="mb-6 font-romantic text-4xl text-white sm:text-5xl md:text-6xl">
              You made the right choice!
            </h1>

            <motion.p
              className="font-romantic text-3xl text-rose-300 sm:text-6xl md:text-7xl lg:text-8xl"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                ease: 'easeInOut',
              }}
            >
              I love you forever and always
            </motion.p>

            <motion.div
              className="mt-10 flex justify-center gap-4 text-5xl sm:text-6xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {['❤️', '🧡', '💛', '💚', '💙', '💜'].map((heart, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    delay: i * 0.1,
                  }}
                >
                  {heart}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
