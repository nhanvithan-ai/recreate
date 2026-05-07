import timelineVideo from "../../videos/Timeline34.mov";

export default function IntroVideo() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={timelineVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-6">

        <h1 className="text-white text-6xl md:text-8xl font-bold tracking-[0.35em] uppercase">
          Recreate
        </h1>

        <p className="mt-6 text-white/70 text-sm md:text-lg tracking-[0.4em] uppercase">
          Luxury Fashion Atelier
        </p>

      </div>
    </div>
  );
}