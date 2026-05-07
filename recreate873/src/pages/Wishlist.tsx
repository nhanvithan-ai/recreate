import { Heart, ArrowRight } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { PRODUCTS } from "../data";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import ProductCard from "../components/ProductCard";
import ParticleEmbers from "../components/ParticleEmbers";

export default function Wishlist() {
  const { wishlist } = useShop();
  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-48 text-center relative">
        <ParticleEmbers />
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-32 h-32 glass rounded-full flex items-center justify-center mx-auto mb-12 border border-ember/20 shadow-glow"
        >
          <Heart className="w-12 h-12 text-ember fill-ember/20" />
        </motion.div>
        <h2 className="text-6xl md:text-8xl font-display gold-gradient-text mb-8">Bereft of Radiance</h2>
        <p className="text-blush/40 font-serif text-2xl italic tracking-widest mb-16 max-w-lg mx-auto">
          "The stars await your curation. Save the pieces that speak to your inner light."
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center space-x-4 px-12 py-5 border border-gold/40 text-gold font-accent font-bold uppercase tracking-[0.4em] text-[10px] rounded-full hover:bg-gold/10 transition-all"
        >
          <span>Explore The Aura</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 relative">
      <ParticleEmbers />
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 border-b border-white/5 pb-10">
        <div>
          <h2 className="text-6xl md:text-8xl font-display gold-gradient-text">My Private Curation</h2>
          <p className="font-label text-silk italic text-2xl tracking-widest mt-4">Selected starlight from Recreate Atelier.</p>
        </div>
        <div className="mt-8 md:mt-0 font-accent text-[10px] uppercase tracking-[0.5em] text-gold/40">
          {wishlistedProducts.length} Sacred Pieces
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <AnimatePresence>
          {wishlistedProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-40 text-center opacity-20">
        <p className="text-pearl font-serif text-2xl italic mb-10">"Every chosen thread tells a story of dawn."</p>
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
      </div>
    </div>
  );
}
