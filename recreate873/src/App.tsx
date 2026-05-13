import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "motion/react";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import IntroVideo from "./components/IntroVideo";
import AuthOverlay from "./components/AuthOverlay";
import { ShopProvider } from "./context/ShopContext";

// Pages
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import CategoryPage from "./pages/CategoryPage";
import SearchResults from "./pages/SearchResults";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLayout({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem("introShown");
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem("introShown", "true");
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroVideo onComplete={handleIntroComplete} />}
      </AnimatePresence>

      <div
        className={`transition-opacity duration-1000 ${
          showIntro ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <AuthOverlay />
      </div>
    </>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <Router>
        <ScrollToTop />
        <MainLayout>
          <Routes>
            {/* Main routes */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Redirect all unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </Router>
    </ShopProvider>
  );
}