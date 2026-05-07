import { useState, useRef } from "react";
import { ArrowDown, ShoppingBag } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "../data";
import ProductCard from "../components/ProductCard";
import ThreeBackground from "../components/ThreeBackground";
import ParticleEmbers from "../components/ParticleEmbers";
import { motion, useScroll } from "motion/react";
import { Link } from "react-router-dom";
import timelineVideo from "../../videos/Timeline34.mov";

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "all" | "men" | "women" | "kids"
  >("all");

  const collectionRef = useRef<HTMLDivElement>(null);

  useScroll({
    target: collectionRef,
    offset: ["start end", "end start"]
  });

  const filteredProducts =
    activeTab === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeTab);

  const scrollToCollection = () => {
    collectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <div className="relative bg-black overflow-hidden">
      <ThreeBackground />
      <ParticleEmbers />

      {/* HERO SECTION */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center px-6">

        {/* VIDEO */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            brightness-[0.45]
            scale-110
            md:scale-100
          "
        >
          <source src={timelineVideo} type="video/mp4" />
        </video>

        {/* MAIN DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />

        {/* TOP GLOW */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-500/10 blur-[150px] rounded-full animate-pulse" />

        {/* BOTTOM GLOW */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-500/10 blur-[150px] rounded-full animate-pulse" />

        {/* FLOATING PARTICLES */}
        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute top-[15%] left-[10%] w-2 h-2 bg-yellow-300 rounded-full animate-bounce opacity-70" />

          <div className="absolute top-[30%] right-[15%] w-3 h-3 bg-orange-400 rounded-full animate-pulse opacity-60" />

          <div className="absolute bottom-[20%] left-[25%] w-2 h-2 bg-white rounded-full animate-ping opacity-50" />

          <div className="absolute bottom-[15%] right-[20%] w-4 h-4 bg-yellow-200 rounded-full animate-bounce opacity-40" />

          <div className="absolute top-[50%] left-[50%] w-2 h-2 bg-orange-300 rounded-full animate-pulse opacity-40" />

        </div>

        {/* HERO CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="relative z-10 text-center max-w-6xl"
        >

          {/* SUBTITLE */}
          <p
            className="
              uppercase
              tracking-[0.5em]
              text-[11px]
              md:text-sm
              text-yellow-300
              mb-6
              font-light
            "
          >
            EST. 2020 · HYDERABAD
          </p>

          {/* MAIN TITLE */}
          <div className="relative">

            <h1
              className="
                text-6xl
                sm:text-7xl
                md:text-8xl
                lg:text-[140px]
                leading-none
                font-serif
                font-semibold
                tracking-tight
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-yellow-200
                via-yellow-400
                to-orange-400
                drop-shadow-[0_0_45px_rgba(255,170,0,0.35)]
              "
            >
              RECREATE
            </h1>

            <span
              className="
                absolute
                -bottom-1
                right-1
                md:right-10
                text-3xl
                md:text-6xl
                italic
                text-orange-400
                font-serif
              "
            >
              873
            </span>

          </div>

          {/* DECORATIVE LINE */}
          <div className="flex items-center justify-center gap-4 mt-8">

            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-yellow-400" />

            <div className="w-2 h-2 rounded-full bg-yellow-400" />

            <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-yellow-400" />

          </div>

          {/* TAGLINE */}
          <p
            className="
              mt-8
              text-base
              md:text-2xl
              italic
              tracking-[0.25em]
              text-white/80
              font-light
            "
          >
            Where Tradition Meets Artistry
          </p>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={scrollToCollection}
            className="
              mt-14
              px-10
              py-5
              rounded-full
              border
              border-yellow-400/30
              bg-black/30
              backdrop-blur-xl
              text-yellow-300
              uppercase
              tracking-[0.3em]
              text-xs
              hover:bg-yellow-400
              hover:text-black
              transition-all
              duration-500
              shadow-[0_0_40px_rgba(255,200,0,0.15)]
            "
          >
            <div className="flex items-center gap-3">
              <span>Explore Collection</span>
              <ArrowDown className="w-4 h-4" />
            </div>
          </motion.button>

        </motion.div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center"
          >

            <div className="w-[1px] h-16 bg-gradient-to-b from-yellow-400 to-transparent mb-3" />

            <span
              className="
                text-white/50
                text-[10px]
                tracking-[0.4em]
                uppercase
              "
            >
              Scroll
            </span>

          </motion.div>

        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="py-32 px-6 max-w-7xl mx-auto">

        <div className="flex flex-col items-center mb-24 text-center">

          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Our Collections
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

        </div>

        {/* CATEGORY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="
                group
                relative
                h-[600px]
                rounded-[40px]
                overflow-hidden
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                hover:border-yellow-500/40
                transition-all
                duration-700
                hover:-translate-y-3
                hover:shadow-[0_0_60px_rgba(255,180,0,0.15)]
              "
            >

              {/* IMAGE */}
              <div
                className="
                  absolute
                  inset-0
                  transition-transform
                  duration-[2500ms]
                  group-hover:scale-125
                  group-hover:rotate-1
                "
                style={{
                  backgroundImage: `url(${cat.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

              {/* HOVER GLOW */}
              <div
                className="
                  absolute
                  inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-700
                  bg-gradient-to-b
                  from-yellow-500/10
                  via-transparent
                  to-orange-500/10
                "
              />

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col justify-end p-12 text-center items-center space-y-6">

                <h3
                  className="
                    text-4xl
                    md:text-5xl
                    font-serif
                    font-semibold
                    text-yellow-300
                    group-hover:scale-110
                    transition-all
                    duration-500
                  "
                >
                  {cat.title}
                </h3>

                <p className="text-sm italic text-white/70 tracking-widest leading-relaxed">
                  {cat.description}
                </p>

                {/* DISCOVER BUTTON */}
                <Link
                  to={`/category/${cat.id}`}
                  className="
                    px-8
                    py-3
                    rounded-full
                    text-[10px]
                    uppercase
                    tracking-[0.35em]
                    border
                    border-yellow-500/30
                    text-yellow-300
                    bg-black/20
                    backdrop-blur-xl
                    hover:bg-yellow-400
                    hover:text-black
                    hover:scale-105
                    transition-all
                    duration-500
                  "
                >
                  Discover →
                </Link>

              </div>
            </motion.div>
          ))}

        </div>
      </section>

      {/* COLLECTION SECTION */}
      <section
        ref={collectionRef}
        className="py-32 bg-black/40 backdrop-blur-3xl border-t border-white/5"
      >

        <div className="max-w-7xl mx-auto px-6">

          {/* TOP */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-12">

            <div>

              <h2 className="text-4xl md:text-6xl font-serif mb-4 text-white">
                Complete Anthology
              </h2>

              <p className="italic text-xl tracking-widest text-white/60">
                Handmade perfection for every occasion.
              </p>

            </div>

            {/* FILTER */}
            <div className="flex items-center bg-white/5 backdrop-blur-xl p-2 rounded-full border border-white/10">

              {(["all", "men", "women", "kids"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.3em] transition-all ${
                    activeTab === tab
                      ? "bg-orange-500 text-white font-bold shadow-lg"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}

            </div>

          </div>

          {/* PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 4) * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}

          </div>

          {/* BUTTON */}
          <div className="mt-24 text-center">

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="
                inline-flex
                items-center
                space-x-4
                px-12
                py-5
                border
                border-yellow-500/30
                text-yellow-400
                text-[10px]
                uppercase
                tracking-[0.4em]
                rounded-full
                hover:bg-yellow-500/10
                transition-all
              "
            >

              <span>View All Artistry</span>

              <ShoppingBag className="w-4 h-4" />

            </motion.button>

          </div>

        </div>

      </section>
    </div>
  );
}