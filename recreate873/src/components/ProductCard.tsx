import React from 'react';
import { Heart } from "lucide-react";
import { Product } from "../types";
import { useShop } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const [isHovered, setIsHovered] = useState(false);

  // ✅ SIZE SELECTION STATE (NEW)
  const [selectedSize, setSelectedSize] = useState("");
  const [showSizeError, setShowSizeError] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const isWishlisted = wishlist.includes(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 12;
    const rotateY = -((x - centerX) / centerX) * 12;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
    setShowSizeError(false);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    addToCart(product, selectedSize, product.colors[0] || "N/A");
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? "none" : "transform 0.5s ease-out",
      }}
      className="group relative glass rounded-[40px] overflow-hidden border border-white/5 hover:border-gold/30 shadow-2xl"
    >

      {/* IMAGE */}
      <div className="aspect-[3/4] overflow-hidden relative">
        <Swiper modules={[Pagination]} pagination={{ clickable: true }} className="h-full w-full">
          {product.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <Link to={`/product/${product.id}`}>
                <img
                  src={img}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* WISHLIST */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-6 right-6 p-3 rounded-full glass z-10"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? "fill-ember text-ember" : "text-white/60"
            }`}
          />
        </button>

        {/* ADD TO CART */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="absolute bottom-6 left-6 right-6 z-10 flex flex-col gap-2"
            >
              {showSizeError && (
                <motion.span 
                   initial={{ opacity: 0, y: 5 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="text-[10px] bg-red-600 text-white font-bold uppercase tracking-widest py-2 px-3 rounded-xl text-center shadow-lg"
                >
                  Please Select Size
                </motion.span>
              )}
              <button
                onClick={handleAddToCart}
                className={`w-full bg-gradient-to-r from-ember to-glow text-black font-bold py-4 rounded-2xl text-[10px] uppercase tracking-[0.3em] transition-all shadow-xl shadow-ember/20 hover:scale-105 active:scale-95 ${product.stock === 0 ? "opacity-50 grayscale cursor-not-allowed" : ""}`}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? "Out of Stock" : "Add To Cart"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* INFO */}
      <div className="p-6 space-y-4">

        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-serif text-white hover:text-gold transition-colors truncate">{product.name}</h3>
        </Link>

        <div className="flex justify-between items-center">
          <p className="text-[10px] uppercase tracking-widest text-white/40">{product.category}</p>
          <p className="text-lg font-bold text-ember">₹{product.price}</p>
        </div>

        {/* 💥 SIZE SELECTION BAR */}
        <div className="flex flex-wrap gap-2 pt-2">
          {product.sizes?.map((size) => (
            <button
              key={size}
              onClick={(e) => {
                e.preventDefault();
                setSelectedSize(size);
                setShowSizeError(false);
              }}
              className={`w-10 h-10 text-[10px] rounded-xl border transition-all flex items-center justify-center font-bold ${
                selectedSize === size
                  ? "border-gold text-gold shadow-glow bg-gold/10"
                  : showSizeError 
                    ? "border-red-500/50 text-red-400"
                    : "border-white/10 text-white/40 hover:border-white/30"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
