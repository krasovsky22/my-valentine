'use client';

import { useState, useCallback } from 'react';
import { NO_BUTTON_REASONS } from '@/lib/constants';

export type ValentineState =
  | 'DANCING'
  | 'PHOTO'
  | 'TYPING'
  | 'CHOICE'
  | 'NO_MODAL'
  | 'LETTER'
  | 'VIDEO'
  | 'SUCCESS';

function getRandomReason(): string {
  const index = Math.floor(Math.random() * NO_BUTTON_REASONS.length);
  return NO_BUTTON_REASONS[index];
}

interface UseValentineStateReturn {
  state: ValentineState;
  noReason: string;
  goToPhoto: () => void;
  goToTyping: () => void;
  goToChoice: () => void;
  goToNoModal: () => void;
  goToVideo: () => void;
  goToSuccess: () => void;
  closeNoModal: () => void;
}

export function useValentineState(): UseValentineStateReturn {
  const [state, setState] = useState<ValentineState>('DANCING');
  const [noReason, setNoReason] = useState('');

  const goToPhoto = useCallback(() => setState('PHOTO'), []);
  const goToTyping = useCallback(() => setState('TYPING'), []);
  const goToChoice = useCallback(() => setState('CHOICE'), []);
  const goToNoModal = useCallback(() => {
    setNoReason(getRandomReason());
    setState('NO_MODAL');
  }, []);
  const goToVideo = useCallback(() => setState('VIDEO'), []);
  const goToSuccess = useCallback(() => setState('SUCCESS'), []);
  const closeNoModal = useCallback(() => setState('CHOICE'), []);

  return {
    state,
    noReason,
    goToPhoto,
    goToTyping,
    goToChoice,
    goToNoModal,
    goToVideo,
    goToSuccess,
    closeNoModal,
  };
}
