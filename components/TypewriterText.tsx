"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { TYPING_LINES } from "@/lib/constants";

interface TypewriterTextProps {
  onComplete: () => void;
}

export function TypewriterText({ onComplete }: TypewriterTextProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { displayedLines, currentLineIndex, isTyping } = useTypewriter({
    lines: TYPING_LINES,
    onComplete: () => {}, // Don't transition on typing complete
  });

  useEffect(() => {
    audioRef.current = new Audio("/sounds/piano.mp3");
    audioRef.current.play().catch(() => {});

    audioRef.current.onended = () => {
      onComplete();
    };

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [onComplete]);

  return (
    <motion.div
      className="relative flex min-h-[100dvh] flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <video
        src="/video/us.mp4"
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        muted
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-2xl space-y-6 px-6 text-center">
        {displayedLines.map((line, index) => (
          <p
            key={index}
            className={`font-romantic text-3xl leading-relaxed sm:text-4xl md:text-5xl ${
              index === TYPING_LINES.length - 1
                ? "text-rose-400"
                : "text-white"
            }`}
          >
            {line}
            {index === currentLineIndex && isTyping && (
              <span className="cursor-blink ml-0.5 inline-block h-8 w-0.5 bg-rose-400" />
            )}
          </p>
        ))}
      </div>
    </motion.div>
  );
}
