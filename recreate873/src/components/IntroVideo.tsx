import { useEffect } from "react";

interface IntroVideoProps {
  onComplete: () => void;
}

const timelineVideo = "/videos/Timeline 1234.mov";

export default function IntroVideo({ onComplete }: IntroVideoProps) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] bg-black">

      {/* FULL SCREEN VIDEO */}
      <video
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
        onEnded={onComplete}
      >
        <source src={timelineVideo} type="video/quicktime" />
      </video>

      {/* ONLY SIMPLE SKIP BUTTON */}
      <button
        onClick={onComplete}
        className="absolute top-5 right-5 bg-white text-black px-4 py-2 rounded-full text-sm font-semibold"
      >
        Skip
      </button>

    </div>
  );
}