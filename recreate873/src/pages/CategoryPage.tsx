import { useParams, useNavigate, Link } from "react-router-dom";
import { CATEGORIES } from "../data";
import { useShop } from "../context/ShopContext";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, LayoutGrid } from "lucide-react";
import { useState, useEffect } from "react";
import { subscribeToProducts } from "../services/productService";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";
import ParticleEmbers from "../components/ParticleEmbers";

export default function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { wishlist } = useShop();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToProducts((data) => {
      setProducts(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const category = CATEGORIES.find((c) => c.id === id);

  const categoryProducts = products.filter(
    (product) => product.category.toLowerCase() === id?.toLowerCase()
  );

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-4xl font-serif">
        Category Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <ParticleEmbers />
      
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 z-[110] p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-gold/40 hover:bg-gold/10 transition-all group backdrop-blur-xl"
      >
        <ArrowLeft className="w-6 h-6 text-gold group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* HERO SECTION */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${category.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="uppercase tracking-[0.5em] text-[10px] md:text-sm text-gold mb-6 font-accent"
          >
            PREMIUM ANTHOLOGY
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-9xl font-display font-semibold gold-gradient-text leading-none"
          >
            {category.title}
          </motion.h1>

          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-[1px] bg-gold/50 mx-auto my-8" 
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-3xl italic text-pearl/70 font-serif tracking-widest"
          >
            {category.description}
          </motion.p>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex items-center justify-between mb-20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20">
              <LayoutGrid className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="text-3xl font-serif">Collection</h2>
              <p className="text-[10px] text-pearl/40 uppercase tracking-[0.3em] mt-1">{categoryProducts.length} Products found</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-[40px] bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : categoryProducts.length === 0 ? (
          <div className="py-40 text-center border border-dashed border-white/10 rounded-[60px] bg-white/[0.02]">
            <p className="text-pearl/20 italic font-serif text-3xl tracking-widest underline decoration-gold/20 underline-offset-8">No products available</p>
            <p className="text-[10px] text-gold/40 uppercase tracking-[0.4em] mt-8">New items arriving shortly</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <AnimatePresence mode="popLayout">
              {categoryProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
}
