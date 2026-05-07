import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, User, Order } from "../types";

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  orders: Order[];

  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, delta: number) => void;

  toggleWishlist: (id: string) => void;

  isAuthOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;

  login: (user: User) => void;
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

  const [user, setUser] = useState<User | null>(() =>
    safeParse("user", null)
  );

  const [orders, setOrders] = useState<Order[]>(() =>
    safeParse("orders", [])
  );

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // ✅ SAFE ADD TO CART (SIZE + COLOR IS UNIQUE KEY)
  const addToCart = (product: Product, size: string, color: string) => {
    if (!size || !color) return;

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
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
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

  const login = (userData: User) => setUser(userData);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isAuthOpen,
        openAuth: () => setIsAuthOpen(true),
        closeAuth: () => setIsAuthOpen(false),
        login,
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