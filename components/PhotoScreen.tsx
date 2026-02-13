'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PHOTO_DISPLAY_DURATION_MS } from '@/lib/constants';

interface PhotoScreenProps {
  onComplete: () => void;
}

export function PhotoScreen({ onComplete }: PhotoScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, PHOTO_DISPLAY_DURATION_MS);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="ken-burns absolute inset-0">
        <Image
          src="/photo.jpg"
          alt="Our special moment"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </motion.div>
  );
}
