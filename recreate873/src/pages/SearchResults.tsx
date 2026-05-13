import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { subscribeToProducts } from "../services/productService";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";
import { Search as SearchIcon, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ParticleEmbers from "../components/ParticleEmbers";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToProducts((data) => {
      setProducts(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.subcategory.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white relative">
      <ParticleEmbers />

      {/* HEADER */}
      <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto border-b border-white/5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gold/60 hover:text-gold transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-[0.2em]">Return to Gallery</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-gold uppercase tracking-[0.5em] text-[10px] mb-2 font-accent">Search Query</p>
            <h1 className="text-5xl md:text-7xl font-serif">"{query}"</h1>
            <p className="text-pearl/40 text-[10px] uppercase tracking-[0.3em] mt-4">
              {filteredProducts.length} results discovered in the vault
            </p>
          </div>

          <div className="relative group max-w-md w-full">
            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/40 group-focus-within:text-gold transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
              }}
              placeholder="Seek another artifact..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-full py-4 pl-16 pr-8 text-sm focus:outline-none focus:border-gold/40 transition-all font-light tracking-widest placeholder:text-white/20"
            />
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-[40px] bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-40 bg-white/[0.01] rounded-[60px] border border-dashed border-white/10">
            <SearchIcon className="w-16 h-16 text-white/5 mx-auto mb-8" />
            <p className="text-pearl/20 italic font-serif text-3xl tracking-widest">No matching products found</p>
            <p className="text-[10px] text-gold/40 uppercase tracking-[0.4em] mt-4">Try refining your query or seek in our standard categories</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
