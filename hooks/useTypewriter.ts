"use client";

import { useState, useEffect, useRef } from "react";
import { TYPING_SPEED_MS } from "@/lib/constants";

interface UseTypewriterOptions {
  lines: string[];
  speed?: number;
  onComplete?: () => void;
}

interface UseTypewriterReturn {
  displayedLines: string[];
  currentLineIndex: number;
  isComplete: boolean;
  isTyping: boolean;
}

export function useTypewriter({
  lines,
  speed = TYPING_SPEED_MS,
  onComplete,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (isComplete) return;

    const currentLine = lines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLineIndex] =
            (newLines[currentLineIndex] || "") + currentLine[currentCharIndex];
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentLineIndex < lines.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
        setDisplayedLines((prev) => [...prev, ""]);
      }, 500);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setIsComplete(true);
        setIsTyping(false);
        onCompleteRef.current?.();
      }, 0);

      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, currentLineIndex, lines, speed, isComplete]);

  return {
    displayedLines,
    currentLineIndex,
    isComplete,
    isTyping,
  };
}
