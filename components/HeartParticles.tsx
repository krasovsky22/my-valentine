"use client";

import { useState } from "react";

const HEART_EMOJIS = ["❤️", "💕", "💖", "💗", "💝", "💘", "💓", "💞"];

interface Heart {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

function generateHearts(): Heart[] {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: 1 + Math.random() * 1.5,
  }));
}

export function HeartParticles() {
  const [hearts] = useState<Heart[]>(generateHearts);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="float-up absolute bottom-0 text-2xl"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}rem`,
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
}
