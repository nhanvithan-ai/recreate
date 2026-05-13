import { Product } from "./types";
import timelineVideo from "../videos/Timeline34.mov";

// ================= IMAGES =================
import k1 from "./images/k1.jpeg";
import k11 from "./images/k1.1.jpeg";
import k2 from "./images/k2.jpeg";
import k21 from "./images/k2.1.jpeg";

import w1 from "./images/w1.jpeg";
import w2 from "./images/w2.jpeg";
import w3 from "./images/w3.png";

import m1 from "./images/m1.jpeg";
import m2 from "./images/m2.jpeg";
import m3 from "./images/m3.jpeg";
import m4 from "./images/m4.jpeg";

export const PRODUCTS: Product[] = [
  // ================= MEN =================
  {
    id: "men_sherwani_royal",
    name: "Royal Heritage Sherwani",
    category: "men",
    subcategory: "Sherwanis",
    price: 12999,
    originalPrice: 19999,
    discount: 35,
    fabric: "Jacquard Silk",
    sizes: ["38", "40", "42", "44"],
    colors: ["Gold", "Cream"],
    images: [m1, m2],
    rating: 4.9,
    reviews: 86,
    description: "A masterpiece of traditional craftsmanship, this Sherwani features intricate zardosi work on premium jacquard silk. Perfect for grand weddings.",
    care: "Dry clean only",
    isFeatured: true,
    isNew: false,
    stock: 15
  },
  {
    id: "men_kurta_silk",
    name: "Designer Silk Kurta",
    category: "men",
    subcategory: "Kurta Sets",
    price: 4499,
    originalPrice: 6999,
    discount: 35,
    fabric: "Tussar Silk",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Maroon", "Gold"],
    images: [m2, m3],
    rating: 4.7,
    reviews: 112,
    description: "Premium Tussar silk kurta set with subtle embroidery on the collar. Ideal for festive gatherings.",
    care: "Dry clean only",
    isFeatured: true,
    isNew: true,
    stock: 30
  },

  // ================= WOMEN =================
  {
    id: "women_aurora_saree",
    name: "Aurora Silk Saree",
    category: "women",
    subcategory: "Sarees",
    price: 2499,
    originalPrice: 4200,
    discount: 40,
    fabric: "Banarasi Silk",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Red", "Orange"],
    images: [w1, w2, w3],
    rating: 4.7,
    reviews: 243,
    description: "Elegant Banarasi silk saree with gold zari borders and beautiful floral motifs.",
    care: "Dry clean only",
    isFeatured: true,
    isNew: false,
    stock: 50
  },
  {
    id: "women_kurti_breeze",
    name: "Floral Breeze Kurti",
    category: "women",
    subcategory: "Kurtis",
    price: 1599,
    originalPrice: 2499,
    discount: 36,
    fabric: "Chanderi Silk",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Pastel Pink", "Mint"],
    images: [w2, w3, w1],
    rating: 4.6,
    reviews: 89,
    description: "Lightweight Chanderi silk kurti with delicate floral prints. Perfect for a summer day out.",
    care: "Gentle hand wash",
    isFeatured: true,
    isNew: true,
    stock: 40
  },

  // ================= KIDS =================
  {
    id: "kids_prince_set",
    name: "Little Prince Kurta Set",
    category: "kids",
    subcategory: "Kurta Sets",
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    fabric: "Soft Cotton",
    sizes: ["S", "M", "L"],
    colors: ["Blue", "Yellow"],
    images: [k1, k11],
    rating: 4.8,
    reviews: 142,
    description: "Comfortable and stylish kurta set for young boys. Made with soft skin-friendly cotton fabric.",
    care: "Machine wash gentle",
    isFeatured: true,
    isNew: true,
    stock: 25
  },
  {
    id: "kids_royal_set",
    name: "Mini Royal Sherwani",
    category: "kids",
    subcategory: "Sherwanis",
    price: 2499,
    originalPrice: 3999,
    discount: 37,
    fabric: "Silk Blend",
    sizes: ["S", "M", "L"],
    colors: ["Red", "Gold"],
    images: [k2, k21],
    rating: 4.7,
    reviews: 98,
    description: "A miniature version of our best-selling Sherwani. Let your little one shine.",
    care: "Dry clean recommended",
    isFeatured: true,
    isNew: false,
    stock: 20
  }
];

export const CATEGORIES = [
  { id: "men", title: "Men's Collection", image: m1, description: "Premium ethnic menswear." },
  { id: "women", title: "Women's Collection", image: w1, description: "Elegant ethnic wear for women." },
  { id: "kids", title: "Kids Collection", image: k1, description: "Comfortable festive wear for kids." }
];