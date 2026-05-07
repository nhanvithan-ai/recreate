import { Product } from "./types";

// VIDEO (DO NOT TOUCH - kept as you requested)
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

export const PRODUCTS: Product[] = [

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
    sizes: ["XS","S","M","L","XL","XXL"],
    colors: ["Red","Blue","Green"],
    images: [w1, w2],
    rating: 4.7,
    reviews: 243,
    description: "Elegant handcrafted saree with rich traditional weaving.",
    care: "Dry clean only",
    isFeatured: true,
    isNew: false
  },

  {
    id: "women_lehenga_royal",
    name: "Royal Blossom Lehenga",
    category: "women",
    subcategory: "Lehengas",
    price: 8999,
    originalPrice: 15000,
    discount: 40,
    fabric: "Raw Silk",
    sizes: ["S","M","L","XL"],
    colors: ["Gold","Pink","Ivory"],
    images: [w2, w3],
    rating: 4.9,
    reviews: 128,
    description: "Luxury bridal lehenga with premium embroidery.",
    care: "Dry clean only",
    isFeatured: true,
    isNew: true
  },

  {
    id: "women_kurti_breeze",
    name: "Floral Breeze Kurti",
    category: "women",
    subcategory: "Kurtis",
    price: 1299,
    originalPrice: 2199,
    discount: 40,
    fabric: "Cotton Silk",
    sizes: ["S","M","L","XL","XXL"],
    colors: ["Pink","White","Blue"],
    images: [w1, w3],
    rating: 4.5,
    reviews: 56,
    description: "Lightweight everyday wear kurti.",
    care: "Machine wash gentle",
    isFeatured: false,
    isNew: false
  },

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
    sizes: ["38","40","42","44"],
    colors: ["Gold","Cream","White"],
    images: [m1, m2],
    rating: 4.9,
    reviews: 86,
    description: "Premium handcrafted wedding sherwani.",
    care: "Dry clean only",
    isFeatured: true,
    isNew: false
  },

  {
    id: "men_kurta_elegant",
    name: "Elegant Festive Kurta",
    category: "men",
    subcategory: "Kurta Sets",
    price: 3499,
    originalPrice: 5500,
    discount: 36,
    fabric: "Silk Blend",
    sizes: ["S","M","L","XL","XXL"],
    colors: ["Maroon","Gold","Black"],
    images: [m2, m3],
    rating: 4.7,
    reviews: 142,
    description: "Perfect festive traditional wear.",
    care: "Dry clean only",
    isFeatured: true,
    isNew: false
  },

  {
    id: "men_bandhgala_midnight",
    name: "Midnight Bandhgala",
    category: "men",
    subcategory: "Suits",
    price: 9999,
    originalPrice: 16000,
    discount: 38,
    fabric: "Wool Blend",
    sizes: ["40","42","44"],
    colors: ["Black","Navy","Grey"],
    images: [m1, m3],
    rating: 4.9,
    reviews: 43,
    description: "Luxury formal bandhgala suit.",
    care: "Dry clean only",
    isFeatured: true,
    isNew: true
  },

  // ================= KIDS =================
  {
    id: "kids_prince_1",
    name: "Little Prince Set",
    category: "kids",
    subcategory: "Kurta Sets",
    price: 999,
    originalPrice: 1499,
    discount: 33,
    fabric: "Cotton",
    sizes: ["S","M","L"],
    colors: ["Blue","White"],
    images: [k1, k11],
    rating: 4.5,
    reviews: 120,
    description: "Comfortable festive outfit for kids.",
    care: "Machine wash",
    isFeatured: false,
    isNew: true
  },

  {
    id: "kids_royal_festive",
    name: "Royal Festive Kids Set",
    category: "kids",
    subcategory: "Sherwanis",
    price: 1099,
    originalPrice: 1599,
    discount: 31,
    fabric: "Cotton Blend",
    sizes: ["S","M","L"],
    colors: ["Red","Gold"],
    images: [k2, k21],
    rating: 4.4,
    reviews: 98,
    description: "Mini royal sherwani for celebrations.",
    care: "Machine wash",
    isFeatured: false,
    isNew: true
  }
];

export const CATEGORIES = [
  {
    id: "men",
    title: "Men's Collection",
    subtitle: "Modern Royal Elegance",
    image: m1,
    description: "Premium ethnic menswear collection.",
    subcategories: ["Sherwanis", "Kurta Sets", "Suits"]
  },
  {
    id: "women",
    title: "Women's Collection",
    subtitle: "Grace in Every Thread",
    image: w1,
    description: "Elegant ethnic wear for women.",
    subcategories: ["Sarees", "Lehengas", "Kurtis"]
  },
  {
    id: "kids",
    title: "Kids Collection",
    subtitle: "Small Style, Big Charm",
    image: k1,
    description: "Comfortable festive wear for kids.",
    subcategories: ["Kurta Sets", "Sherwanis", "Frocks"]
  }
];