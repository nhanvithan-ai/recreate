import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, User, Order } from "../types";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const ADMIN_EMAILS = ["nhanvithan@gmail.com"];

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  orders: Order[];
  loading: boolean;

  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, delta: number) => void;

  toggleWishlist: (id: string) => void;

  isAuthOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;

  logout: () => void;

  clearCart: () => void;
  addOrder: (order: Order) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const safeParse = (key: string, fallback: any) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() =>
    safeParse("cart", [])
  );

  const [wishlist, setWishlist] = useState<string[]>(() =>
    safeParse("wishlist", [])
  );

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [orders, setOrders] = useState<Order[]>([]);

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData: User = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          isAdmin: firebaseUser.email ? ADMIN_EMAILS.includes(firebaseUser.email) : false
        };
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any as Order));
        setOrders(ordersData);
      });
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ✅ SAFE ADD TO CART (SIZE + COLOR IS UNIQUE KEY)
  const addToCart = (product: Product, size: string, color: string, qty = 1) => {
    if (!size) {
      console.warn("Size selection is required.");
      return;
    }

    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: qty,
          selectedSize: size,
          selectedColor: color,
        },
      ];
    });
  };

  const removeFromCart = (id: string, size: string, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );
  };

  const updateQuantity = (
    id: string,
    size: string,
    color: string,
    delta: number
  ) => {
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.id === id &&
          item.selectedSize === size &&
          item.selectedColor === color
        ) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const logout = () => {
    signOut(auth);
  };

  const clearCart = () => setCart([]);

  const addOrder = (order: Order) =>
    setOrders((prev) => [order, ...prev]);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        user,
        orders,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isAuthOpen,
        openAuth: () => setIsAuthOpen(true),
        closeAuth: () => setIsAuthOpen(false),
        logout,
        clearCart,
        addOrder,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within ShopProvider");
  }
  return context;
};