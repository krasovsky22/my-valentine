"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface LetterAnimationProps {
  onComplete: () => void;
}

export function LetterAnimation({ onComplete }: LetterAnimationProps) {
  const [stage, setStage] = useState<"envelope" | "opening" | "letter">(
    "envelope"
  );

  return (
    <motion.div
      className="flex min-h-[100dvh] flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-pink-100 px-6 dark:from-zinc-900 dark:to-zinc-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="perspective-1000 relative h-64 w-72 sm:h-72 sm:w-80">
        {/* Envelope body */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 shadow-xl"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onAnimationComplete={() => {
            setTimeout(() => setStage("opening"), 500);
          }}
        >
          {/* Envelope flap */}
          <motion.div
            className="absolute -top-0.5 left-0 right-0 h-24 origin-top"
            initial={{ rotateX: 0 }}
            animate={stage !== "envelope" ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            onAnimationComplete={() => {
              if (stage === "opening") {
                setTimeout(() => setStage("letter"), 300);
              }
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute inset-0 rounded-t-lg bg-gradient-to-br from-rose-300 to-pink-400"
              style={{
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                backfaceVisibility: "hidden",
              }}
            />
            <div
              className="absolute inset-0 rounded-t-lg bg-gradient-to-br from-rose-200 to-pink-300"
              style={{
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                transform: "rotateX(180deg)",
                backfaceVisibility: "hidden",
              }}
            />
          </motion.div>

          {/* Heart seal */}
          <motion.div
            className="absolute left-1/2 top-16 -translate-x-1/2 text-3xl"
            initial={{ scale: 1 }}
            animate={stage !== "envelope" ? { scale: 0, opacity: 0 } : {}}
            transition={{ duration: 0.3 }}
          >
            <span role="img" aria-label="heart">
              💕
            </span>
          </motion.div>
        </motion.div>

        {/* Letter */}
        <motion.div
          className="absolute inset-x-4 top-8 rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-100"
          initial={{ y: 0 }}
          animate={stage === "letter" ? { y: -180 } : { y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onAnimationComplete={() => {
            if (stage === "letter") {
              setTimeout(onComplete, 1000);
            }
          }}
        >
          <div className="space-y-2 text-center text-zinc-800">
            <p className="font-serif text-lg italic">My Dearest Valentine,</p>
            <p className="text-sm leading-relaxed">
              Every moment with you is a gift. You make my heart complete.
            </p>
            <p className="pt-2 text-2xl">❤️</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
