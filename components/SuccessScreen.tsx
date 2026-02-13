'use client';

import { motion } from 'framer-motion';
import { HeartParticles } from './HeartParticles';

export function SuccessScreen() {
  return (
    <motion.div
      className="flex min-h-[100dvh] flex-col items-center justify-center bg-gradient-to-b from-rose-100 to-pink-200 px-6 dark:from-zinc-900 dark:to-rose-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <HeartParticles />

      <motion.div
        className="relative z-10 text-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 100,
          delay: 0.2,
        }}
      >
        <motion.div
          className="mb-6 text-6xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          💖
        </motion.div>

        <h1 className="mb-4 text-3xl font-bold text-rose-600 dark:text-rose-400 sm:text-4xl">
          You made the right choice!
        </h1>

        <p className="text-md text-rose-500/80 dark:text-rose-300/80">
          I love you forever and always
        </p>

        <motion.div
          className="mt-8 flex justify-center gap-2 text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {['❤️', '🧡', '💛', '💚', '💙', '💜'].map((heart, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -10, 0] }}
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
  );
}
