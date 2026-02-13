"use client";

import { motion } from "framer-motion";
import { TYPING_LINES } from "@/lib/constants";

interface ChoiceButtonsProps {
  onYes: () => void;
  onNo: () => void;
}

export function ChoiceButtons({ onYes, onNo }: ChoiceButtonsProps) {
  return (
    <motion.div
      className="relative flex min-h-[100dvh] flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/us-dining.png')" }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-2xl space-y-8 px-6 text-center">
        <div className="space-y-6">
          {TYPING_LINES.map((line, index) => (
            <p
              key={index}
              className={`font-romantic text-3xl leading-relaxed sm:text-4xl md:text-5xl ${
                index === TYPING_LINES.length - 1
                  ? "text-rose-400"
                  : "text-white"
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
            onClick={onYes}
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
    </motion.div>
  );
}
