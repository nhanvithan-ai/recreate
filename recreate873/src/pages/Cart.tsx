import { ShoppingBag, Trash2, Minus, Plus, ArrowRight, ShoppingCart } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import ParticleEmbers from "../components/ParticleEmbers";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useShop();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-48 text-center relative">
        <ParticleEmbers />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-32 h-32 glass rounded-full flex items-center justify-center mx-auto mb-12 border border-ember/20 shadow-glow"
        >
          <ShoppingCart className="w-12 h-12 text-ember" />
        </motion.div>
        <h2 className="text-6xl md:text-8xl font-display gold-gradient-text mb-8">Empty Aura</h2>
        <p className="text-blush/40 font-serif text-2xl italic tracking-widest mb-16 max-w-lg mx-auto leading-relaxed">
          "The first light of dawn finds an empty shelf. Your collection journey awaits its beginning."
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center space-x-4 px-12 py-5 bg-gradient-to-r from-ember to-glow text-dawn font-accent font-bold uppercase tracking-[0.4em] text-[10px] rounded-2xl hover:shadow-glow transition-all"
        >
          <span>Begin Acquisition</span>
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
          <h2 className="text-6xl md:text-8xl font-display gold-gradient-text">Artisan Palettes</h2>
          <p className="font-label text-silk italic text-2xl tracking-widest mt-4">Selected artifacts of the Sun.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-20">
        {/* Cart Items */}
        <div className="flex-[2.5] space-y-12">
          <AnimatePresence>
            {cart.map((item, idx) => (
              <motion.div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center space-x-8 pb-12 border-b border-white/5 group"
              >
                <Link to={`/product/${item.id}`} className="w-32 h-44 md:w-56 md:h-72 rounded-[40px] overflow-hidden flex-shrink-0 glass border border-white/10 relative">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dawn/60 to-transparent" />
                </Link>
                
                <div className="flex-1 min-w-0 py-4 flex flex-col justify-between h-44 md:h-72">
                  <div>
                    <Link to={`/product/${item.id}`} className="text-3xl md:text-5xl font-serif text-pearl hover:text-gold transition-colors block mb-4 truncate">
                      {item.name}
                    </Link>
                    <div className="flex flex-wrap items-center gap-8 mt-4 text-[10px] text-white/40 uppercase font-accent tracking-[0.3em]">
                      <span className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-ember rounded-full mr-2" />
                        Size: {item.selectedSize}
                      </span>
                      <div className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2" />
                        Aura:
                        <div className="w-4 h-4 rounded-full ml-3 border border-white/20" style={{ backgroundColor: item.selectedColor }} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center glass rounded-2xl border border-white/10 p-1.5">
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, -1)} className="p-3 text-ember hover:text-gold transition-colors"><Minus className="w-5 h-5" /></button>
                      <span className="w-12 text-center text-lg font-display tracking-widest">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, 1)} className="p-3 text-ember hover:text-gold transition-colors"><Plus className="w-5 h-5" /></button>
                    </div>
                    <span className="text-3xl font-display text-ember">₹{item.price * item.quantity}</span>
                  </div>
                </div>

                <div className="h-full flex flex-col justify-center">
                  <button 
                    onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                    className="p-5 glass rounded-full border-white/5 text-white/10 hover:text-ember hover:bg-ember/10 transition-all shadow-xl"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="flex-1">
          <div className="sticky top-32 glass p-12 rounded-[50px] border-gold/10 space-y-12">
            <h3 className="text-3xl font-serif text-gold border-b border-white/5 pb-8 italic">Atelier Manifest</h3>
            
            <div className="space-y-8">
              <div className="flex justify-between items-center text-xs text-pearl/40 uppercase tracking-[0.3em]">
                <span>Couture Value</span>
                <span className="text-pearl">₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-pearl/40 uppercase tracking-[0.3em]">
                <span>Global Logistics</span>
                <span className="text-pearl">{shipping === 0 ? "Complimentary" : `₹${shipping}`}</span>
              </div>
              <div className="pt-10 border-t border-white/10 flex justify-between items-end">
                <span className="font-accent text-[10px] uppercase tracking-[0.4em] text-white">Total Exchange</span>
                <span className="text-5xl font-display text-ember">₹{total}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="GILDED CODE" 
                  className="w-full bg-dawn/40 border border-white/5 rounded-2xl py-5 px-8 text-[11px] font-bold tracking-[0.4em] uppercase focus:border-glow outline-none transition-all"
                />
                <button className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] uppercase font-bold tracking-[0.3em] text-gold hover:text-ember transition-colors">Apply</button>
              </div>
              
              <button
                onClick={() => navigate("/checkout")}
                className="w-full h-20 bg-gradient-to-r from-ember to-glow text-dawn font-accent text-xs font-bold uppercase tracking-[0.5em] rounded-2xl shadow-2xl shadow-ember/30 hover:scale-[1.02] transition-all flex items-center justify-center space-x-4"
              >
                <ShoppingBag className="w-6 h-6" />
                <span>Secure Checkout</span>
              </button>
              
              <p className="text-[10px] text-white/20 text-center uppercase tracking-[0.3em] font-bold px-8 leading-relaxed">
                Prices inclusive of artistry tax & digital security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
