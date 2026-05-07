import { Search, Heart, ShoppingCart, User as UserIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export default function Navbar() {
  const { cart, wishlist, user, openAuth } = useShop();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-[100] w-full glass border-b border-gold/20 backdrop-blur-2xl px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="text-2xl md:text-3xl font-accent gold-gradient-text tracking-tighter shrink-0">
          Recreate873
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl relative group">
          <input
            type="text"
            placeholder="Search tradition..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-10 text-sm focus:outline-none focus:border-ember focus:ring-1 focus:ring-ember transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-ember transition-colors" />
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-6 md:space-x-8">
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="md:hidden text-pearl hover:text-gold transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          <Link to="/wishlist" className="relative group text-pearl hover:text-gold transition-colors">
            <Heart className="w-5 h-5" />
            <AnimatePresence>
              {wishlist.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-ember text-dawn text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {wishlist.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <Link to="/cart" className="relative group text-pearl hover:text-gold transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-glow text-dawn text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg shadow-glow/20"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button 
            onClick={user ? () => navigate("/profile") : openAuth}
            className="flex items-center space-x-2 text-pearl hover:text-gold transition-colors"
          >
            <div className="w-8 h-8 rounded-full border border-gold/30 p-0.5 overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full rounded-full object-cover" />
              ) : (
                <UserIcon className="w-full h-full p-1.5" />
              )}
            </div>
            <span className="hidden lg:inline text-xs font-accent tracking-widest uppercase">
              {user ? (user.displayName?.split(' ')[0] || "Aura") : "Login"}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
