import { useState, useRef, useEffect } from "react";
import { ArrowDown, ShoppingBag } from "lucide-react";
import { CATEGORIES } from "../data";
import ProductCard from "../components/ProductCard";
import ThreeBackground from "../components/ThreeBackground";
import ParticleEmbers from "../components/ParticleEmbers";
import { motion, useScroll, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import timelineVideo from "../../videos/Timeline34.mov";
import { subscribeToProducts, bootstrapProducts } from "../services/productService";
import { Product } from "../types";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"all" | "men" | "women" | "kids">(
    "all"
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const collectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial bootstrap
    bootstrapProducts();

    const unsub = subscribeToProducts((data) => {
      setProducts(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useScroll({
    target: collectionRef,
    offset: ["start end", "end start"],
  });

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter(
          (p) => p.category.toLowerCase() === activeTab.toLowerCase()
        );

  const scrollToCollection = () => {
    collectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative bg-black overflow-hidden">
      <ThreeBackground />
      <ParticleEmbers />

      {/* HERO SECTION */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center px-6">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
        >
          <source src={timelineVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="relative z-10 text-center max-w-6xl"
        >
          <p className="uppercase tracking-[0.5em] text-[11px] md:text-sm text-yellow-300 mb-6 font-light">
            EST. 2020 · HYDERABAD
          </p>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[140px] leading-none font-serif font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-400">
            RECREATE
          </h1>

          <p className="mt-8 text-base md:text-2xl italic tracking-[0.25em] text-white/80">
            Where Tradition Meets Artistry
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={scrollToCollection}
            className="mt-14 px-10 py-5 rounded-full border border-yellow-400/30 bg-black/30 text-yellow-300 uppercase tracking-[0.3em] text-xs hover:bg-yellow-400 hover:text-black transition-all"
          >
            <div className="flex items-center gap-3">
              <span>Explore Collection</span>
              <ArrowDown className="w-4 h-4" />
            </div>
          </motion.button>
        </motion.div>
      </section>

      {/* COLLECTION SECTION */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Our Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -10 }}
              className="group relative h-[600px] rounded-[40px] overflow-hidden border border-white/10"
            >
              <div
                className="absolute inset-0 group-hover:scale-110 transition-transform duration-700"
                style={{
                  backgroundImage: `url("${cat.image}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />

              <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-12 space-y-6">
                <h3 className="text-4xl font-serif text-yellow-300">
                  {cat.title}
                </h3>

                <p className="text-white/70 italic">{cat.description}</p>

                <Link
                  to={`/category/${cat.id}`}
                  className="px-8 py-3 rounded-full border border-yellow-500/30 text-yellow-300 hover:bg-yellow-400 hover:text-black transition-all"
                >
                  Discover →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section
        ref={collectionRef}
        className="py-32 bg-black/40 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center mb-20">
            {(["all", "men", "women", "kids"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full uppercase text-xs ${
                  activeTab === tab
                    ? "bg-orange-500 text-white"
                    : "bg-white/5 text-white/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center text-white">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          <div className="mt-24 text-center">
            <button className="inline-flex items-center gap-4 px-12 py-5 border border-yellow-500/30 text-yellow-400 rounded-full">
              <span>View All Products</span>
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}