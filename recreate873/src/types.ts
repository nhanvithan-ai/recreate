export interface Product {
  id: string;
  name: string;
  category: "men" | "women" | "kids";
  subcategory: string;
  price: number;
  originalPrice: number;
  discount: number;
  fabric: string;
  sizes: string[];
  colors: string[];
  images: string[];
  rating: number;
  reviews: number;
  description: string;
  care: string;
  isFeatured: boolean;
  isNew: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  images: string[];

  quantity: number;

  selectedSize: string;
  selectedColor: string;

  category: "men" | "women" | "kids";
}

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: "Delivered" | "In Transit" | "Processing" | "Cancelled";
}