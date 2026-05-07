import { X } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { motion, AnimatePresence } from "motion/react";
import ParticleEmbers from "./ParticleEmbers";

export default function AuthOverlay() {
  const { isAuthOpen, closeAuth, login } = useShop();

  // ═══════════════════════════════════════════
  // FIREBASE CONFIG — ADD YOUR KEYS HERE
  // ═══════════════════════════════════════════
  /*
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  */
  // ═══════════════════════════════════════════

  const handleGoogleSignIn = () => {
    // Simulated sign-in for demo purposes
    // In production: use firebase.auth().signInWithPopup(provider)
    const mockUser = {
      uid: "mock_123",
      displayName: "Vikram Aditya",
      email: "vikram@aura.in",
      photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram"
    };
    login(mockUser);
    closeAuth();
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center px-6"
        >
          {/* Backdrop blur overlay */}
          <div 
            className="absolute inset-0 bg-dawn/80 backdrop-blur-3xl"
            onClick={closeAuth}
          />

          <ParticleEmbers />
          
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="relative w-full max-w-lg glass p-12 rounded-[50px] border border-gold/20 text-center space-y-10 overflow-hidden shadow-2xl shadow-gold/10"
          >
            {/* Close Button */}
            <button 
              onClick={closeAuth}
              className="absolute top-8 right-8 text-pearl/40 hover:text-gold transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-display gold-gradient-text drop-shadow-[0_0_20px_rgba(245,197,24,0.4)]">
                Welcome To Recreate873
              </h2>
              <p className="text-pearl/60 text-sm font-sans tracking-widest uppercase">
                Sign in to track orders & save your wishlist
              </p>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full h-16 bg-white text-dawn hover:bg-pearl transition-all rounded-2xl flex items-center justify-center space-x-4 group"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
              <span className="font-sans font-bold text-sm tracking-widest uppercase">Continue with Google</span>
            </button>

            <div className="pt-6">
              <p className="text-[10px] text-pearl/20 uppercase tracking-[0.3em] font-medium max-w-[280px] mx-auto leading-relaxed">
                By continuing you agree to our <span className="text-gold/40 hover:text-gold cursor-pointer transition-colors">Terms of Service</span> & <span className="text-gold/40 hover:text-gold cursor-pointer transition-colors">Privacy Policy</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
