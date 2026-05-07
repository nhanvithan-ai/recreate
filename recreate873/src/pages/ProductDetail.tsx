import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data";
import { Star, Minus, Plus, ShoppingBag, Heart, Share2, MessageCircle, ChevronRight, Ruler } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { motion, AnimatePresence } from "motion/react";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart, toggleWishlist, wishlist } = useShop();

  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);

  if (!product) return <div className="py-40 text-center text-3xl font-serif">Aura Not Found</div>;

  const isInWishlist = wishlist.includes(product.id);
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-3 text-[10px] font-accent uppercase tracking-[0.3em] text-white/40 mb-12">
        <Link to="/" className="hover:text-gold transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/category/${product.category}`} className="hover:text-gold transition-colors">{product.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-silk italic">{product.subcategory}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
        {/* Left: Gallery */}
        <div className="space-y-8">
          <div 
            className="aspect-[4/5] rounded-[40px] overflow-hidden glass border border-white/10 relative cursor-zoom-in"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <motion.img
              src={product.images[activeImg]}
              alt={product.name}
              animate={{ scale: isZoomed ? 1.5 : 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full h-full object-cover"
            />
            {product.discount > 0 && (
              <div className="absolute top-8 left-8 bg-ember text-dawn px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-ember/30">
                {product.discount}% OFF
              </div>
            )}
          </div>

          <div className="grid grid-cols-5 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`aspect-[3/4] rounded-2xl overflow-hidden glass border transition-all ${
                  activeImg === idx ? "border-ember p-1 shadow-glow" : "border-white/5 hover:border-gold/40"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover rounded-xl" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="space-y-12">
          <div className="space-y-6">
            <span className="font-label text-silk text-lg italic tracking-[0.3em]">
              Heritage {product.subcategory}
            </span>
            <h1 className="text-5xl md:text-7xl font-display text-pearl leading-none tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-white/10"}`} />
                ))}
                <span className="ml-3 text-[10px] font-sans text-pearl/40 uppercase tracking-widest">
                  {product.rating} / 5.0 ({product.reviews} appraisals)
                </span>
              </div>
              <span className="bg-white/5 px-4 py-1.5 rounded-full text-[9px] font-accent text-gold uppercase tracking-[0.2em] border border-white/10">
                {product.fabric}
              </span>
            </div>

            <div className="flex items-end space-x-6 pt-4">
              <span className="text-5xl font-display text-ember">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-2xl font-serif text-white/20 line-through pb-1">₹{product.originalPrice}</span>
              )}
            </div>
          </div>

          <div className="space-y-10">
            {/* Size Selector */}
            <div className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <span className="text-[10px] font-accent text-pearl/40 uppercase tracking-[0.3em]">Couture Size</span>
                <button className="flex items-center space-x-2 text-[10px] text-gold/60 hover:text-gold transition-colors font-accent uppercase tracking-widest">
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Oracle</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-4">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[70px] h-14 rounded-2xl font-sans text-sm tracking-widest flex items-center justify-center border transition-all ${
                      selectedSize === size 
                        ? "bg-ember border-ember text-dawn font-bold shadow-lg shadow-ember/20" 
                        : "glass border-white/10 text-pearl/60 hover:border-gold/40"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="space-y-6">
              <span className="text-[10px] font-accent text-pearl/40 uppercase tracking-[0.3em] px-2 block">Aura Palettes</span>
              <div className="flex flex-wrap gap-6">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 p-1 transition-all ${
                      selectedColor === color ? "border-ember scale-125" : "border-transparent"
                    }`}
                  >
                    <div className="w-full h-full rounded-full border border-white/20" style={{ backgroundColor: color }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-6">
              <span className="text-[10px] font-accent text-pearl/40 uppercase tracking-[0.3em] px-2 block">Quantity</span>
              <div className="inline-flex items-center glass rounded-2xl border border-white/10 p-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-ember hover:text-gold transition-colors"><Minus className="w-5 h-5" /></button>
                <span className="w-16 text-center font-display text-xl">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-ember hover:text-gold transition-colors"><Plus className="w-5 h-5" /></button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-6">
            <button
              onClick={() => addToCart(product, selectedSize || product.sizes[0], selectedColor || product.colors[0])}
              className="flex-[2] h-20 bg-gradient-to-r from-ember to-glow text-dawn font-accent font-bold uppercase tracking-[0.4em] text-xs rounded-2xl shadow-2xl shadow-ember/30 hover:scale-[1.02] transition-all flex items-center justify-center space-x-4"
            >
              <ShoppingBag className="w-6 h-6" />
              <span>Acquire Now</span>
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`flex-1 h-20 rounded-2xl border flex items-center justify-center transition-all ${
                isInWishlist 
                  ? "bg-ember/10 border-ember text-ember" 
                  : "glass border-gold/30 text-gold hover:bg-gold/10"
              }`}
            >
              <Heart className={`w-6 h-6 ${isInWishlist ? "fill-current" : ""}`} />
            </button>
          </div>

          <button className="w-full h-16 glass border-green-500/20 text-green-500 rounded-2xl flex items-center justify-center space-x-4 hover:bg-green-500/10 transition-all font-accent text-[10px] uppercase tracking-[0.3em]">
            <MessageCircle className="w-6 h-6" />
            <span>Inquire via WhatsApp</span>
          </button>

          {/* Info Accordion - Simple implementation */}
          <div className="pt-12 space-y-8 border-t border-white/10">
            <div className="space-y-4">
              <h4 className="font-accent text-gold text-xs uppercase tracking-[0.3em]">Master's Description</h4>
              <p className="font-serif italic text-pearl/60 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-accent text-gold text-xs uppercase tracking-[0.3em]">Couture Care</h4>
              <p className="font-sans text-pearl/60 text-sm tracking-widest">
                {product.care}
              </p>
            </div>
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <span className="block font-accent text-gold text-[8px] uppercase tracking-[0.2em] mb-1">Shipping</span>
                <span className="text-pearl/40 text-[10px] uppercase font-bold">3-5 Solar Days</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <span className="block font-accent text-gold text-[8px] uppercase tracking-[0.2em] mb-1">Ethical</span>
                <span className="text-pearl/40 text-[10px] uppercase font-bold">100% Artisan Made</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete the Look */}
      <section className="pt-32 border-t border-white/5">
        <div className="flex flex-col items-center mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-serif text-pearl mb-6">Complete The Aura</h2>
          <p className="font-label text-silk italic text-xl tracking-widest">Curated pairings to enhance your radiance.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
