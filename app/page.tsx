"use client";

import { AnimatePresence } from "framer-motion";
import { useValentineState } from "@/hooks/useValentineState";
import { DancingVideo } from "@/components/DancingVideo";
import { PhotoScreen } from "@/components/PhotoScreen";
import { TypewriterText } from "@/components/TypewriterText";
import { ChoiceButtons } from "@/components/ChoiceButtons";
import { NoModal } from "@/components/NoModal";
import { LetterAnimation } from "@/components/LetterAnimation";
import { VideoPlayer } from "@/components/VideoPlayer";
import { SuccessScreen } from "@/components/SuccessScreen";

export default function Home() {
  const {
    state,
    noReason,
    goToPhoto,
    goToTyping,
    goToChoice,
    goToNoModal,
    goToLetter,
    goToVideo,
    goToSuccess,
    closeNoModal,
  } = useValentineState();

  return (
    <main className="min-h-[100dvh] overflow-hidden bg-background font-sans">
      <AnimatePresence mode="wait">
        {state === "DANCING" && (
          <DancingVideo key="dancing" onComplete={goToPhoto} />
        )}

        {state === "PHOTO" && (
          <PhotoScreen key="photo" onComplete={goToTyping} />
        )}

        {state === "TYPING" && (
          <TypewriterText key="typing" onComplete={goToChoice} />
        )}

        {(state === "CHOICE" || state === "NO_MODAL") && (
          <ChoiceButtons key="choice" onYes={goToLetter} onNo={goToNoModal} />
        )}

        {state === "LETTER" && (
          <LetterAnimation key="letter" onComplete={goToVideo} />
        )}

        {state === "VIDEO" && (
          <VideoPlayer key="video" onComplete={goToSuccess} />
        )}

        {state === "SUCCESS" && <SuccessScreen key="success" />}
      </AnimatePresence>

      <NoModal
        isOpen={state === "NO_MODAL"}
        reason={noReason}
        onClose={closeNoModal}
      />
    </main>
  );
}
