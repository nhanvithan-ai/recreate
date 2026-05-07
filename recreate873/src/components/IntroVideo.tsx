import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface IntroVideoProps {
  onComplete: () => void;
}

export default function IntroVideo({ onComplete }: IntroVideoProps) {
  const [showLogo, setShowLogo] = useState(false);
  const [isWiping, setIsWiping] = useState(false);

  useEffect(() => {
    const logoTimeout = setTimeout(() => setShowLogo(true), 1500);
    const endTimeout = setTimeout(() => handleFinish(), 6000); // end after 6s or skip

    return () => {
      clearTimeout(logoTimeout);
      clearTimeout(endTimeout);
    };
  }, []);

  const handleFinish = () => {
    setIsWiping(true);
    setTimeout(() => onComplete(), 1500); // 1.5s is the animation duration
  };

  return (
    <div className={`fixed inset-0 z-[1000] bg-dawn transition-opacity duration-1000 ${isWiping ? 'iris-wipe-out' : ''}`}>
      <video
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
        onEnded={handleFinish}
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-traditional-indian-wedding-dance-40628-large.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,5,16,0.8)_100%)]" />

      {/* Logo Reveal */}
      <AnimatePresence>
        {showLogo && !isWiping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center"
          >
            <h1 className="text-6xl md:text-8xl font-display gold-gradient-text drop-shadow-[0_0_40px_rgba(245,197,24,0.6)]">
              Recreate873
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip Button */}
      <button
        onClick={handleFinish}
        className="absolute bottom-10 right-10 font-accent text-pearl text-sm uppercase tracking-[0.2em] hover:text-gold transition-colors"
      >
        Skip →
      </button>
    </div>
  );
}
