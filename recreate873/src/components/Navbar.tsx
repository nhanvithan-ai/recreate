import { Heart, ShoppingCart, User as UserIcon, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";

export default function Navbar() {
  const { cart, wishlist, user, openAuth } = useShop();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="sticky top-0 z-[100] w-full glass border-b border-gold/20 backdrop-blur-2xl px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-accent gold-gradient-text tracking-tighter shrink-0"
        >
          Recreate873
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md relative group">
          <form onSubmit={handleSearch} className="w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-gold transition-colors" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                navigate(`/search?q=${encodeURIComponent(val)}`);
              }}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-6 text-xs font-light tracking-[0.2em] focus:outline-none focus:border-gold/40 transition-all placeholder:text-white/20"
            />
          </form>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-6 md:space-x-8">

          {/* Mobile Search Toggle */}
          <button 
            className="md:hidden text-pearl hover:text-gold transition-colors"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="w-5 h-5" />
          </button>

          {user?.isAdmin && (
            <Link
              to="/admin"
              className="text-[10px] text-gold font-bold uppercase tracking-[0.2em] px-4 py-2 bg-gold/10 rounded-full border border-gold/20 hover:bg-gold hover:text-dawn transition-all hidden sm:inline-block"
            >
              Admin Panel
            </Link>
          )}

          <Link
            to="/wishlist"
            className="relative group text-pearl hover:text-gold transition-colors"
          >
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

          <Link
            to="/cart"
            className="relative group text-pearl hover:text-gold transition-colors"
          >
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
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <UserIcon className="w-full h-full p-1.5" />
              )}
            </div>

            <span className="hidden lg:inline text-xs font-accent tracking-widest uppercase">
              {user ? (user.displayName?.split(" ")[0] || "Profile") : "Login"}
            </span>
          </button>

        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-black/40 backdrop-blur-xl border-t border-gold/10 mt-4"
          >
            <form onSubmit={handleSearch} className="px-6 py-6 flex gap-4">
              <input
                type="text"
                autoFocus
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchQuery(val);
                  navigate(`/search?q=${encodeURIComponent(val)}`);
                }}
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-light tracking-widest focus:outline-none focus:border-gold/40 transition-all placeholder:text-white/20"
              />
              <button 
                type="submit"
                className="bg-gold text-black px-6 rounded-2xl font-bold uppercase text-[10px] tracking-widest"
              >
                Search
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
