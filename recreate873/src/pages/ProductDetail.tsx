import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data";
import {
  Star,
  Minus,
  Plus,
  ShoppingBag,
  Heart,
  Share2,
  MessageCircle,
  ChevronRight,
  Ruler,
  AlertCircle
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { motion, AnimatePresence } from "motion/react";
import ProductCard from "../components/ProductCard";
import { subscribeToProducts } from "../services/productService";
import { Product } from "../types";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useShop();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    const unsub = subscribeToProducts((data) => {
      setProducts(data);
      const found = data.find(p => p.id === id);
      if (found && found.colors.length > 0 && !selectedColor) {
        setSelectedColor(found.colors[0]);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [id, selectedColor]);

  const product = products.find(p => p.id === id);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!product)
    return (
      <div className="py-40 text-center text-3xl font-serif text-white bg-black min-h-screen">
        Artifact Not Found
      </div>
    );

  const isInWishlist = product ? wishlist.includes(product.id) : false;
  const relatedProducts = product ? products.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4) : [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-3 text-[10px] font-accent uppercase tracking-[0.3em] text-white/40 mb-12">
        <Link to="/" className="hover:text-gold transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link
          to={`/category/${product.category}`}
          className="hover:text-gold transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-silk italic">{product.subcategory || "Collection"}</span>
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
                  activeImg === idx
                    ? "border-ember p-1 shadow-glow"
                    : "border-white/5 hover:border-gold/40"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover rounded-xl"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-serif text-pearl leading-tight tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-gold text-gold"
                        : "text-white/10"
                    }`}
                  />
                ))}
                <span className="ml-3 text-[10px] font-sans text-pearl/40 uppercase tracking-widest">
                  {product.rating} / 5.0 ({product.reviews} reviews)
                </span>
              </div>

              <span className="bg-white/5 px-4 py-1.5 rounded-full text-[9px] font-accent text-gold uppercase tracking-[0.2em] border border-white/10">
                {product.fabric}
              </span>
            </div>

            <div className="flex items-end space-x-6 pt-4">
              <span className="text-5xl font-bold text-ember">
                ₹{product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-2xl font-serif text-white/20 line-through pb-1">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-12">
            {/* Size Selector */}
            <div className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-accent text-pearl/40 uppercase tracking-[0.3em]">Select Size</span>
                  {sizeError && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[10px] text-red-500 font-bold uppercase tracking-widest flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      Select size required
                    </motion.span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`min-w-[70px] h-14 rounded-2xl font-sans text-sm tracking-widest flex items-center justify-center border transition-all ${
                      selectedSize === size 
                        ? "bg-gold border-gold text-black font-bold shadow-lg shadow-gold/20" 
                        : sizeError 
                          ? "bg-red-500/5 border-red-500/20 text-red-400/40"
                          : "glass border-white/10 text-pearl/60 hover:border-gold/40"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-6">
              <span className="text-[10px] font-accent text-pearl/40 uppercase tracking-[0.3em] px-2 block">Quantity</span>
              <div className="flex items-center gap-6">
                <div className="inline-flex items-center glass rounded-2xl border border-white/10 p-2">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-ember hover:text-gold transition-colors"><Minus className="w-5 h-5" /></button>
                  <span className="w-16 text-center font-display text-xl">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-ember hover:text-gold transition-colors"><Plus className="w-5 h-5" /></button>
                </div>
                {product.stock < 10 && product.stock > 0 && (
                  <span className="text-[10px] text-orange-400 font-bold uppercase tracking-widest animate-pulse">
                    Only {product.stock} left in stock
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <button
                disabled={product.stock === 0}
                onClick={() => {
                  if (!selectedSize) {
                    setSizeError(true);
                    return;
                  }
                  addToCart(product, selectedSize, selectedColor || "N/A", quantity);
                  navigate("/cart");
                }}
                className="flex-[2] h-20 bg-gold text-black font-bold uppercase tracking-[0.4em] text-[10px] rounded-2xl shadow-2xl shadow-gold/20 hover:scale-[1.02] transition-all flex items-center justify-center space-x-4 disabled:opacity-30 disabled:hover:scale-100"
              >
                <ShoppingBag className="w-6 h-6" />
                <span>{product.stock === 0 ? "Out of Stock" : "Buy Now"}</span>
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

            {/* WhatsApp Button */}
            <button
              onClick={() => {
                const phoneNumber = "917075192712";
                const message = `Hi, I am interested in ordering this product:
                
Product: ${product.name}
Price: ₹${product.price}
Size: ${selectedSize || "Not selected"}
Quantity: ${quantity}
Link: ${window.location.href}`;

                window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
              }}
              className="w-full h-16 bg-white/5 border border-green-500/20 text-green-500 rounded-2xl flex items-center justify-center gap-4 hover:bg-green-500/10 transition-all font-bold uppercase tracking-widest text-[10px]"
            >
              <MessageCircle className="w-6 h-6 shadow-[0_0_20px_rgba(34,197,94,0.2)]" />
              <span>Buy on WhatsApp</span>
            </button>
          </div>

          <div className="pt-12 space-y-8 border-t border-white/10">
            <div className="space-y-4">
              <h4 className="font-accent text-gold text-[10px] uppercase tracking-[0.4em]">
                Description
              </h4>
              <p className="font-serif italic text-pearl/60 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      <section className="pt-32 border-t border-white/5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {relatedProducts.map(p => (
            <div key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}