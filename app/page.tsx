'use client';

import { AnimatePresence } from 'framer-motion';
import { useValentineState } from '@/hooks/useValentineState';
import { DancingVideo } from '@/components/DancingVideo';
import { TypewriterText } from '@/components/TypewriterText';
import { ChoiceButtons } from '@/components/ChoiceButtons';
import { NoModal } from '@/components/NoModal';
import { SuccessScreen } from '@/components/SuccessScreen';

export default function Home() {
  const {
    state,
    noReason,
    goToTyping,
    goToChoice,
    goToNoModal,
    goToSuccess,
    closeNoModal,
  } = useValentineState();

  return (
    <main className="min-h-[100dvh] overflow-hidden bg-background font-sans">
      <AnimatePresence mode="wait">
        {state === 'DANCING' && (
          <DancingVideo key="dancing" onComplete={goToTyping} />
        )}

        {state === 'TYPING' && (
          <TypewriterText key="typing" onComplete={goToChoice} />
        )}

        {(state === 'CHOICE' || state === 'NO_MODAL') && (
          <ChoiceButtons key="choice" onYes={goToSuccess} onNo={goToNoModal} />
        )}

        {state === 'SUCCESS' && <SuccessScreen key="success" />}
      </AnimatePresence>

      <NoModal
        isOpen={state === 'NO_MODAL'}
        reason={noReason}
        onClose={closeNoModal}
      />
    </main>
  );
}
