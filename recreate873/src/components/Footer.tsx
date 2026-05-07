import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Share2, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <footer className="relative bg-dawn border-t border-gold/20 pt-32 pb-12 overflow-hidden">
      {/* Mandala Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] pointer-events-none rotate-infinite">
        <img src="https://www.transparenttextures.com/patterns/mandala.png" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
          
          {/* Column 1: Our Story */}
          <div className="space-y-8">
            <h3 className="text-2xl font-accent gold-gradient-text tracking-tighter">Our Story</h3>
            <p className="text-sm font-serif italic text-pearl/60 leading-relaxed">
              "Recreate873 was born in Hyderabad in 2020 with a single belief — that Indian traditional wear deserves to be worn every day, not just on special occasions."
            </p>
            <button 
              onClick={() => setActiveModal('story')}
              className="text-[10px] font-accent text-gold hover:text-ember transition-colors uppercase tracking-[0.3em] flex items-center space-x-2"
            >
              <span>Read Manifest →</span>
            </button>
          </div>

          {/* Column 2: Artisanry */}
          <div className="space-y-8">
            <h3 className="text-2xl font-accent gold-gradient-text tracking-tighter">Artisanry</h3>
            <p className="text-sm font-serif italic text-pearl/60 leading-relaxed">
              Every garment is crafted by skilled artisans from Varanasi, Kanchipuram, and Lucknow. We celebrate centuries of craft in every thread.
            </p>
            <button 
              onClick={() => setActiveModal('artisanry')}
              className="text-[10px] font-accent text-gold hover:text-ember transition-colors uppercase tracking-[0.3em] flex items-center space-x-4"
            >
              <span className="flex items-center space-x-2">
                <span>Weave</span><div className="w-4 h-px bg-gold/40" /><span>Craft</span><div className="w-4 h-px bg-gold/40" /><span>Wear</span>
              </span>
            </button>
          </div>

          {/* Column 3: Ethics */}
          <div className="space-y-8">
            <h3 className="text-2xl font-accent gold-gradient-text tracking-tighter">Ethics</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                 <div className="w-1.5 h-1.5 rounded-full bg-ember" />
                 <span className="text-[10px] uppercase tracking-widest font-bold text-pearl/60">Fair Wages Above Market</span>
              </div>
              <div className="flex items-center space-x-4">
                 <div className="w-1.5 h-1.5 rounded-full bg-ember" />
                 <span className="text-[10px] uppercase tracking-widest font-bold text-pearl/60">100% Plastic-Free Packs</span>
              </div>
              <div className="flex items-center space-x-4">
                 <div className="w-1.5 h-1.5 rounded-full bg-ember" />
                 <span className="text-[10px] uppercase tracking-widest font-bold text-pearl/60">GOTS Organic Fabrics</span>
              </div>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-8">
            <h3 className="text-2xl font-accent gold-gradient-text tracking-tighter">Connect</h3>
            <div className="space-y-4 text-sm font-serif italic text-pearl/60">
              <p className="flex items-center space-x-4 hover:text-gold transition-colors cursor-pointer">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <span>Hyderabad, Telangana, India</span>
              </p>
              <p className="flex items-center space-x-4 hover:text-gold transition-colors cursor-pointer">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>recreate873@gmail.com</span>
              </p>
              <div className="flex items-center space-x-6 pt-4">
                <a href="https://instagram.com/recreate873" target="_blank" className="p-3 glass rounded-full hover:bg-gold/10 hover:text-gold transition-all"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="p-3 glass rounded-full hover:bg-gold/10 hover:text-gold transition-all"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="p-3 glass rounded-full hover:bg-gold/10 hover:text-gold transition-all"><Youtube className="w-5 h-5" /></a>
                <a href="#" className="p-3 glass rounded-full hover:bg-gold/10 hover:text-gold transition-all"><Share2 className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 pt-32 border-t border-white/5">
          <div className="space-y-10">
            <div>
              <h4 className="text-3xl font-serif text-pearl">Artisan Direct</h4>
              <p className="font-label text-silk italic text-lg mt-2">Inquire about custom tailoring or bridal couture.</p>
            </div>
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input type="text" placeholder="Gilded Name" className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-sm focus:border-gold transition-all outline-none" />
                <input type="email" placeholder="Email Oracle" className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-sm focus:border-gold transition-all outline-none" />
              </div>
              <textarea placeholder="Your message for our artisans..." rows={1} className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-sm focus:border-gold transition-all outline-none min-h-[120px]" />
              <button className="w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-ember to-glow text-dawn font-accent text-[10px] uppercase tracking-[0.4em] font-bold rounded-2xl shadow-xl shadow-ember/20 hover:scale-[1.02] transition-all flex items-center justify-center space-x-4">
                <Send className="w-4 h-4" />
                <span>Dispatch Message</span>
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-end text-center lg:text-right space-y-8">
            <h2 className="text-6xl md:text-8xl font-display gold-gradient-text opacity-10 leading-none">RECREATE<br />873</h2>
            <div className="space-y-2">
              <p className="text-[10px] font-accent text-white/20 uppercase tracking-[0.3em]">
                © 2025 Recreate873. All rights reserved.
              </p>
              <p className="text-[10px] font-accent text-white/20 uppercase tracking-[0.3em]">
                Crafted with <span className="text-ember">♡</span> in Hyderabad
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/91XXXXXXXXXX?text=I'm interested in Recreate873 artistry."
        target="_blank"
        className="fixed bottom-10 right-10 z-[80] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all group"
      >
        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping group-hover:hidden" />
        <svg fill="currentColor" width="30px" height="30px" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.7 69.3 27 106.2 27 122.4 0 222-99.6 222-222 0-59.3-23.1-115.1-65.1-157.1zM223.9 446.7c-33.1 0-65.5-8.9-93.7-25.7l-6.7-4-69.6 18.3 18.6-67.9-4.4-7c-18.4-29.3-28.1-63.1-28.1-97.9 0-104 84.5-188.4 188.4-188.4 50.4 0 97.7 19.6 133.3 55.2 35.6 35.6 55.2 82.9 55.2 133.3 0 104-84.5 188.4-188.4 188.4zm103.5-141.6c-5.7-2.8-33.5-16.5-38.7-18.4-5.2-1.9-9-2.8-12.8 2.8-3.8 5.7-14.7 18.4-18 22.2-3.3 3.8-6.6 4.3-12.3 1.4-5.7-2.8-23.9-8.8-45.6-28.2-16.8-15-28.2-33.5-31.5-39.1-3.3-5.7-.4-8.8 2.5-11.6 2.6-2.5 5.7-6.6 8.6-10 2.8-3.3 3.8-5.7 5.7-9.4 1.9-3.3 1-6.6-.5-9.4-1.4-2.8-12.8-30.7-17.5-42.1-4.6-11.1-9.2-9.6-12.8-9.8-3.3-.2-7.1-.2-10.9-.2s-9.9 1.4-15.1 7.1c-5.2 5.7-19.9 19.4-19.9 47.3 0 27.9 20.3 54.8 23.1 58.6 2.8 3.8 40 61.1 97 85.7 13.5 5.8 24.1 9.3 32.3 11.9 13.6 4.3 26 3.7 35.8 2.3 10.9-1.6 33.5-13.7 38.2-27 4.7-13.2 4.7-24.6 3.3-27-1.4-2.3-5.2-3.7-11.1-6.6z"/>
        </svg>
      </a>

      {/* Info Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-dawn/90 backdrop-blur-xl" onClick={() => setActiveModal(null)} />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative max-w-2xl w-full glass p-12 rounded-[50px] border-gold/20 overflow-hidden shadow-2xl">
               <button onClick={() => setActiveModal(null)} className="absolute top-8 right-8 text-pearl/40 hover:text-gold uppercase text-[10px] tracking-widest font-bold">Close ×</button>
               <h3 className="text-4xl font-serif text-gold mb-8 italic">
                 {activeModal === 'story' ? 'The Manifest' : activeModal === 'artisanry' ? 'The Alchemy' : 'The Ethos'}
               </h3>
               <div className="space-y-6 text-pearl/70 font-serif italic text-xl leading-relaxed">
                  {activeModal === 'story' ? (
                    <p>Recreate873 was born from a realization that India's textile heritage belongs in our daily rituals, not just dusty trunks. We are a bridge between the weaver's loom and your modern stride.</p>
                  ) : (
                    <div className="space-y-8">
                       <p>We work directly with clusters in Banaras (Silk), Kanchi (Zari), and Lucknow (Threadwork). Every piece takes 40-120 hours of concentrated human focus.</p>
                       <div className="flex justify-between border-t border-white/10 pt-8">
                          <div className="text-center space-y-2">
                             <div className="w-1.5 h-1.5 bg-gold rounded-full mx-auto" />
                             <span className="text-[10px] uppercase font-accent">Weave</span>
                          </div>
                          <div className="flex-1 h-px bg-white/10 mt-2" />
                          <div className="text-center space-y-2">
                             <div className="w-1.5 h-1.5 bg-gold rounded-full mx-auto" />
                             <span className="text-[10px] uppercase font-accent">Craft</span>
                          </div>
                          <div className="flex-1 h-px bg-white/10 mt-2" />
                          <div className="text-center space-y-2">
                             <div className="w-1.5 h-1.5 bg-gold rounded-full mx-auto" />
                             <span className="text-[10px] uppercase font-accent">Wear</span>
                          </div>
                       </div>
                    </div>
                  )}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
