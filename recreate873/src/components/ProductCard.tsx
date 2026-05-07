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
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "M");

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
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, product.colors[0]);
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
              <img
                src={img}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* WISHLIST */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-6 right-6 p-3 rounded-full glass"
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
            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={handleAddToCart}
              className="absolute bottom-6 left-6 right-6 bg-gradient-to-r from-ember to-glow text-black font-bold py-4 rounded-2xl text-[10px] uppercase tracking-[0.3em]"
            >
              Add To Cart
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* INFO */}
      <div className="p-6 space-y-4">

        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-serif">{product.name}</h3>
        </Link>

        <p className="text-xs text-white/40 italic">{product.fabric}</p>

        {/* 💥 SIZE SELECTION BAR (NEW) */}
        <div className="flex gap-2 pt-2">
          {product.sizes?.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-1 text-[10px] rounded-full border transition-all ${
                selectedSize === size
                  ? "border-gold text-gold shadow-glow"
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