import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import ParticleEmbers from "../components/ParticleEmbers";

import { auth } from "../lib/firebase";
import { signInAnonymously } from "firebase/auth";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Credentials provided by user
      if (username === "RECREATE873" && password === "recreate1234567873") {
        // Sign in anonymously to Firebase to get a valid request.auth for rules
        await signInAnonymously(auth);
        localStorage.setItem("admin_auth", "true");
        navigate("/admin");
      } else {
        setError("Unauthorized access attempt. Credentials invalid.");
      }
    } catch (err: any) {
      console.error("Firebase Admin Login Error:", err);
      setError("Login failed. Please check network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      <ParticleEmbers />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass border border-gold/20 p-10 rounded-[40px] relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/20">
            <Lock className="text-gold w-6 h-6" />
          </div>
          <h1 className="text-3xl font-serif gold-gradient-text">Admin Panel</h1>
          <p className="text-[10px] text-pearl/40 uppercase tracking-[0.3em] mt-2">Administrative Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-pearl/40 px-4">Username</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/40" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 text-sm focus:border-gold/40 outline-none transition-all placeholder:text-pearl/10"
                placeholder="Username"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-pearl/40 px-4">Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/40" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 text-sm focus:border-gold/40 outline-none transition-all placeholder:text-pearl/10"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-red-400 text-[10px] uppercase tracking-widest px-4"
            >
              <ShieldAlert className="w-3 h-3" />
              {error}
            </motion.div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full h-16 bg-ember text-dawn font-bold text-[10px] uppercase tracking-[0.4em] rounded-2xl shadow-xl shadow-ember/20 hover:scale-[1.02] active:scale-95 transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-dawn border-t-transparent rounded-full animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-[9px] text-white/20 uppercase tracking-widest">
          Secured by Recreate873 Infrastructure
        </p>
      </motion.div>
    </div>
  );
}
