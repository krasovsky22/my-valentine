"use client";

import { motion, AnimatePresence } from "framer-motion";

interface NoModalProps {
  isOpen: boolean;
  reason: string;
  onClose: () => void;
}

export function NoModal({ isOpen, reason, onClose }: NoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl dark:bg-zinc-900"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="mb-4 text-4xl">💔</div>
            <p className="mb-6 text-lg text-zinc-700 dark:text-zinc-300">
              {reason}
            </p>
            <motion.button
              onClick={onClose}
              className="min-h-[44px] rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-2 font-semibold text-white shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try again
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
