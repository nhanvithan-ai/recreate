import { useState } from "react";
import { useShop } from "../context/ShopContext";
import { 
  Package, Heart, MapPin, CreditCard, Settings, LogOut, 
  ChevronRight, ExternalLink, Trash2, Edit2, Plus
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data";

type Tab = "orders" | "wishlist" | "addresses" | "payments" | "settings";

export default function Profile() {
  const { user, logout, orders, wishlist } = useShop();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("orders");

  if (!user) {
    navigate("/");
    return null;
  }

  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-80 space-y-12">
          <div className="text-center space-y-6">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full border-4 border-ember p-1 shadow-glow relative z-10 overflow-hidden">
                <img src={user.photoURL || ""} alt="" className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gold blur-3xl opacity-20 -z-10 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-accent text-gold tracking-tight">{user.displayName}</h2>
              <p className="text-xs text-blush/60 font-sans tracking-widest">{user.email}</p>
            </div>
          </div>

          <nav className="space-y-2">
            <SidebarLink 
              icon={<Package className="w-4 h-4" />} 
              label="My Orders" 
              active={activeTab === "orders"} 
              onClick={() => setActiveTab("orders")} 
            />
            <SidebarLink 
              icon={<Heart className="w-4 h-4" />} 
              label="My Wishlist" 
              active={activeTab === "wishlist"} 
              onClick={() => setActiveTab("wishlist")} 
            />
            <SidebarLink 
              icon={<MapPin className="w-4 h-4" />} 
              label="Saved Addresses" 
              active={activeTab === "addresses"} 
              onClick={() => setActiveTab("addresses")} 
            />
            <SidebarLink 
              icon={<CreditCard className="w-4 h-4" />} 
              label="Payment Methods" 
              active={activeTab === "payments"} 
              onClick={() => setActiveTab("payments")} 
            />
            <SidebarLink 
              icon={<Settings className="w-4 h-4" />} 
              label="Account Settings" 
              active={activeTab === "settings"} 
              onClick={() => setActiveTab("settings")} 
            />
            <button 
              onClick={() => {
                if(confirm("Are you sure you want to dissipate your aura?")) {
                  logout();
                  navigate("/");
                }
              }}
              className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-[10px] uppercase font-accent tracking-[0.3em] text-ember hover:bg-ember/10 transition-all mt-12"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === "orders" && (
              <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                <div className="flex items-center justify-between border-b border-white/5 pb-8">
                  <h3 className="text-4xl font-serif">Order Chronicle</h3>
                  <span className="text-[10px] font-accent text-gold/40 uppercase tracking-widest">{orders.length} Sacred Items</span>
                </div>
                
                {orders.length === 0 ? (
                  <div className="py-20 text-center space-y-8 glass rounded-[40px] border-white/5">
                    <p className="text-xl font-serif italic text-white/20">"No orders yet — start your heritage journey!"</p>
                    <button onClick={() => navigate("/")} className="px-12 py-4 bg-gradient-to-r from-ember to-glow text-dawn rounded-full font-accent text-[10px] uppercase tracking-[0.3em] font-bold">Begin Exploration</button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {orders.map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "wishlist" && (
              <motion.div key="wishlist" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                <div className="flex items-center justify-between border-b border-white/5 pb-8">
                  <h3 className="text-4xl font-serif">My Curation</h3>
                  <span className="text-[10px] font-accent text-gold/40 uppercase tracking-widest">{wishlist.length} Items</span>
                </div>
                {wishlistedProducts.length === 0 ? (
                  <div className="py-20 text-center space-y-8 glass rounded-[40px] border-white/5">
                    <p className="text-xl font-serif italic text-white/20">"Your wishlit is empty."</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                    {wishlistedProducts.map(p => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "addresses" && (
              <motion.div key="addresses" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                <div className="flex items-center justify-between border-b border-white/5 pb-8">
                  <h3 className="text-4xl font-serif">Sanctuaries</h3>
                  <button className="flex items-center space-x-2 text-[10px] font-accent text-gold uppercase tracking-[0.3em] hover:text-ember transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>New Address</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <AddressCard label="Home" address="204 Sky High Apts, Jubilee Hills" city="Hyderabad, TS 500033" isDefault />
                  <AddressCard label="Atelier" label2="(Office)" address="Sabyasachi Lane, Banjara Hills" city="Hyderabad, TS 500034" />
                </div>
              </motion.div>
            )}

            {activeTab === "payments" && (
              <motion.div key="payments" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                <div className="flex items-center justify-between border-b border-white/5 pb-8">
                  <h3 className="text-4xl font-serif">Treasury Methods</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <PaymentMethodCard type="UPI" detail="vikram@okaxis" provider="Axis Bank" />
                  <PaymentMethodCard type="Card" detail="**** **** **** 8730" provider="Visa" />
                </div>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                <div className="flex items-center justify-between border-b border-white/5 pb-8">
                  <h3 className="text-4xl font-serif">Essence Config</h3>
                </div>
                <div className="glass p-12 rounded-[40px] border-white/5 space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-accent uppercase tracking-[0.3em] text-pearl/40">Display Name</label>
                      <input type="text" defaultValue={user.displayName || ""} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-gold outline-none" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-accent uppercase tracking-[0.3em] text-pearl/40">Phone Aura</label>
                      <input type="text" placeholder="+91 91XXX XXXXX" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-gold outline-none" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-xs font-accent uppercase tracking-[0.2em] text-gold">Notification Channels</h4>
                    <div className="flex flex-wrap gap-8">
                       <Toggle label="Email Manifest" active />
                       <Toggle label="WhatsApp Envoys" active />
                       <Toggle label="SMS Whispers" />
                    </div>
                  </div>
                  <div className="pt-8 border-t border-white/5">
                    <button className="bg-gradient-to-r from-ember to-glow text-dawn px-12 py-4 rounded-xl font-accent text-[10px] uppercase tracking-[0.3em] font-bold">Commit Changes</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ icon, label, active, onClick }: { icon: any; label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl transition-all ${
        active ? "glass border-gold/40 text-gold shadow-glow" : "text-pearl/40 hover:text-pearl hover:bg-white/5"
      }`}
    >
      <div className="flex items-center space-x-4">
        {icon}
        <span className="text-[10px] font-accent uppercase tracking-[0.3em] font-bold">{label}</span>
      </div>
      <ChevronRight className={`w-3 h-3 transition-transform ${active ? "translate-x-1" : ""}`} />
    </button>
  );
}

function OrderCard({ order }: { order: any }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="glass rounded-[30px] border-white/5 overflow-hidden">
      <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center space-x-8">
          <div className="flex -space-x-4">
            {order.items.slice(0, 3).map((item: any) => (
              <img key={item.id} src={item.images[0]} alt="" className="w-16 h-16 rounded-full border-2 border-dawn object-cover shadow-xl" />
            ))}
            {order.items.length > 3 && (
              <div className="w-16 h-16 rounded-full border-2 border-dawn bg-horizon flex items-center justify-center text-[10px] font-bold text-gold">
                +{order.items.length - 3}
              </div>
            )}
          </div>
          <div>
            <h4 className="text-xl font-serif text-pearl">{order.id}</h4>
            <p className="text-[10px] text-pearl/40 font-sans tracking-widest uppercase mt-2">{order.date}</p>
          </div>
        </div>
        <div className="flex items-center space-x-12">
          <div className="text-right">
            <span className={`px-4 py-1.5 rounded-full text-[9px] font-accent uppercase tracking-widest border ${
              order.status === "Delivered" ? "border-green-500/20 text-green-500 bg-green-500/5" :
              order.status === "Processing" ? "border-ember/20 text-ember bg-ember/5" :
              "border-gold/20 text-gold bg-gold/5"
            }`}>
              {order.status}
            </span>
            <p className="text-xl font-display text-ember mt-2">₹{order.total}</p>
          </div>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="p-3 glass rounded-full border-white/10 hover:border-gold transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-gold" title="View Details" />
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden bg-white/5 p-8 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-6">
                  <h5 className="text-[10px] font-accent text-gold uppercase tracking-[0.2em]">Itemized Manifest</h5>
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-sm font-serif italic text-pearl/60">{item.name} (x{item.quantity})</span>
                      <span className="text-xs font-display text-blush">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
               </div>
               <div className="space-y-8">
                  <div className="space-y-4">
                    <h5 className="text-[10px] font-accent text-gold uppercase tracking-[0.2em]">Delivery Sanctum</h5>
                    <p className="text-sm text-pearl/40 leading-relaxed italic">
                      Vikram Aditya<br />
                      204 Sky High Apts, Jubilee Hills<br />
                      Hyderabad, TS 500033
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h5 className="text-[10px] font-accent text-gold uppercase tracking-[0.2em]">Tracing Stepper</h5>
                    <div className="flex items-center justify-between">
                       <div className="flex flex-col items-center space-y-2">
                         <div className="w-3 h-3 rounded-full bg-ember shadow-glow" />
                         <span className="text-[8px] uppercase tracking-widest font-bold text-ember">Placed</span>
                       </div>
                       <div className="flex-1 h-px bg-ember" />
                       <div className="flex flex-col items-center space-y-2">
                         <div className="w-3 h-3 rounded-full bg-ember shadow-glow" />
                         <span className="text-[8px] uppercase tracking-widest font-bold text-ember">Confirmed</span>
                       </div>
                       <div className="flex-1 h-px bg-white/10" />
                       <div className="flex flex-col items-center space-y-2">
                         <div className="w-3 h-3 rounded-full bg-white/10" />
                         <span className="text-[8px] uppercase tracking-widest font-bold text-white/10">Shipped</span>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AddressCard({ label, label2, address, city, isDefault }: any) {
  return (
    <div className={`p-8 rounded-[40px] border relative group ${isDefault ? "glass border-gold/40 shadow-glow" : "glass border-white/5 hover:border-white/20"}`}>
       <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-accent uppercase tracking-[0.4em] text-gold">{label} {label2}</span>
            {isDefault && <span className="block text-[8px] bg-ember text-dawn px-2 py-0.5 rounded-full font-bold uppercase tracking-widest w-fit">Default</span>}
          </div>
          <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="text-white/20 hover:text-gold transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
            <button className="text-white/20 hover:text-ember transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
       </div>
       <p className="font-serif italic text-pearl/60 text-lg leading-relaxed">{address}<br />{city}</p>
    </div>
  );
}

function PaymentMethodCard({ type, detail, provider }: any) {
  return (
    <div className="glass p-8 rounded-[40px] border-white/5 hover:border-gold/30 transition-all flex items-center justify-between group">
      <div className="flex items-center space-x-6">
        <div className="p-4 rounded-2xl bg-white/5 text-gold group-hover:bg-gold/10 transition-colors">
          <CreditCard className="w-6 h-6" />
        </div>
        <div>
          <span className="block text-[10px] font-accent uppercase tracking-[0.3em] text-gold/40">{type} — {provider}</span>
          <p className="text-lg font-display text-pearl mt-1">{detail}</p>
        </div>
      </div>
      <button className="p-3 glass rounded-full border-white/10 hover:border-ember transition-colors text-white/20 hover:text-ember">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

function Toggle({ label, active }: { label: string; active?: boolean }) {
  const [isOn, setIsOn] = useState(active);
  return (
    <div className="flex items-center space-x-4">
      <button onClick={() => setIsOn(!isOn)} className={`w-12 h-6 rounded-full relative transition-colors ${isOn ? "bg-ember" : "bg-white/10"}`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isOn ? "right-1" : "left-1"}`} />
      </button>
      <span className="text-[10px] font-accent uppercase tracking-widest text-pearl/60">{label}</span>
    </div>
  );
}
