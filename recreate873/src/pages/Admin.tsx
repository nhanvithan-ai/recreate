import React, { useState, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  Upload,
  Package,
  LayoutDashboard,
  CheckCircle,
  Clock,
  LogOut,
  Image as ImageIcon,
  Menu,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  subscribeToProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  bootstrapData,
} from "../services/productService";
import { Product } from "../types";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";

export default function Admin() {
  const navigate = useNavigate();

  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "orders">("dashboard");

  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth") === "true";
    if (!isAuth) {
      navigate("/admin/login");
    } else {
      setIsAdminAuth(true);
    }
    setIsAuthChecking(false);
  }, [navigate]);

  useEffect(() => {
    if (isAdminAuth) {
      const unsub = subscribeToProducts(setProducts);
      return () => unsub();
    }
  }, [isAdminAuth]);

  const handleAdminLogout = async () => {
    localStorage.removeItem("admin_auth");
    await signOut(auth);
    navigate("/admin/login");
  };

  const handleBootstrap = async () => {
    if (window.confirm("Add sample products? This will only add products if collection is empty.")) {
      await bootstrapData();
    }
  };

  if (isAuthChecking) return null;
  if (!isAdminAuth) return null;

  return (
    <div className="min-h-screen bg-[#080510] text-pearl flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden h-20 bg-black/40 backdrop-blur-3xl border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-[100]">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("/")}
            className="p-2 text-pearl/40 hover:text-gold transition-all"
            title="Back to Store"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-display gold-gradient-text tracking-tighter">Admin Panel</h1>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gold hover:bg-gold/10 rounded-xl transition-all"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-black/40 backdrop-blur-3xl border-r border-white/5 flex flex-col p-8 z-[200] transition-transform duration-500 lg:translate-x-0 lg:static lg:h-screen
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="mb-12">
          <h1 className="text-2xl font-display gold-gradient-text">Admin Panel</h1>
          <p className="text-[10px] text-pearl/40 uppercase tracking-[0.3em] mt-2 font-accent">Store Management</p>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => { setActiveTab("dashboard"); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
              activeTab === "dashboard" 
                ? "bg-gold/10 text-gold border border-gold/20" 
                : "text-pearl/40 hover:text-pearl hover:bg-white/5"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-sm font-accent tracking-widest uppercase">Dashboard</span>
          </button>
          <button
            onClick={() => { setActiveTab("products"); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
              activeTab === "products" 
                ? "bg-gold/10 text-gold border border-gold/20" 
                : "text-pearl/40 hover:text-pearl hover:bg-white/5"
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="text-sm font-accent tracking-widest uppercase">Products</span>
          </button>
        </nav>

        <div className="pt-8 border-t border-white/5">
          <button 
            onClick={handleAdminLogout}
            className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-red-400/60 hover:bg-red-500/10 hover:text-red-400 transition-all text-[10px] uppercase tracking-widest font-bold"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-x-hidden">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
          <div className="w-full">
            <button 
              onClick={() => navigate("/")}
              className="mb-8 flex items-center gap-3 text-pearl/40 hover:text-gold transition-all group w-fit"
            >
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold/50 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold">Back to Store</span>
            </button>
            <h2 className="text-4xl font-serif capitalize">{activeTab}</h2>
            <p className="text-pearl/40 text-xs mt-2 font-accent tracking-widest uppercase">
              {activeTab === "dashboard" ? "Overview of your products" : `Manage your ${activeTab}`}
            </p>
          </div>

          {activeTab === "products" && (
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleBootstrap}
                className="px-6 h-12 glass border-gold/20 text-gold text-[10px] uppercase tracking-widest rounded-xl hover:bg-gold/10 transition-all"
              >
                Add Sample Products
              </button>
              <button 
                onClick={() => {
                  setEditingProduct(null);
                  setIsModalOpen(true);
                }}
                className="px-8 h-12 bg-gold text-black font-bold text-[10px] uppercase tracking-widest rounded-xl hover:scale-105 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>
          )}
        </header>

        {activeTab === "dashboard" && <DashboardView products={products} />}
        {activeTab === "products" && (
          <ProductsView 
            products={products} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onEdit={(p) => {
              setEditingProduct(p);
              setIsModalOpen(true);
            }}
            onDelete={async (id) => {
              if (window.confirm("Are you sure you want to delete this product?")) {
                await deleteProduct(id);
              }
            }}
          />
        )}
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <ProductModal 
            product={editingProduct} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function DashboardView({ products }: { products: Product[] }) {
  const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const lowStock = products.filter(p => (p.stock || 0) < 10 && (p.stock || 0) > 0).length;
  const outOfStock = products.filter(p => (p.stock || 0) === 0).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <StatCard 
        label="Total Products" 
        value={products.length.toString()} 
        detail="Active Products"
        icon={<ImageIcon className="w-6 h-6 text-gold" />}
      />
      <StatCard 
        label="Total Stock" 
        value={totalStock.toString()} 
        detail="Inventory Count"
        icon={<ShoppingBag className="w-6 h-6 text-ember" />}
      />
      <StatCard 
        label="Low Stock Alerts" 
        value={(lowStock + outOfStock).toString()} 
        detail={`${outOfStock} Out of Stock · ${lowStock} Low Stock`}
        icon={<Clock className="w-6 h-6 text-red-400" />}
        warning={lowStock + outOfStock > 0}
      />
    </div>
  );
}

function StatCard({ label, value, detail, icon, warning }: { label: string, value: string, detail: string, icon: React.ReactNode, warning?: boolean }) {
  return (
    <div className={`glass p-8 rounded-3xl border ${warning ? "border-red-500/30" : "border-white/5"} space-y-4`}>
      <div className="flex justify-between items-start">
        <div className="p-3 bg-white/5 rounded-2xl">{icon}</div>
        {warning && <span className="bg-red-500/20 text-red-400 text-[8px] font-bold uppercase tracking-[0.2em] px-2 py-1 rounded-full">Action Required</span>}
      </div>
      <div>
        <h3 className="text-[10px] text-pearl/40 uppercase tracking-[0.3em] mb-1 font-accent">{label}</h3>
        <p className="text-4xl font-display">{value}</p>
        <p className="text-[10px] text-pearl/30 mt-2 italic font-serif">{detail}</p>
      </div>
    </div>
  );
}

function ProductsView({ 
  products, 
  searchQuery, 
  setSearchQuery, 
  onEdit, 
  onDelete 
}: any) {
  const filtered = products.filter((p: Product) => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="relative group max-w-xl">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-pearl/30 group-focus-within:text-gold transition-colors" />
        <input 
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-16 pr-8 text-sm focus:outline-none focus:border-gold/30 transition-all font-accent tracking-widest placeholder:text-pearl/10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filtered.map((p: Product) => (
          <motion.div
            key={p.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl overflow-hidden border border-white/10 group flex flex-col"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img 
                src={p.images?.[0]} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt={p.name}
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={() => onEdit(p)}
                  className="p-3 bg-black/60 text-white rounded-xl hover:bg-gold hover:text-black transition-all backdrop-blur-xl"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onDelete(p.id)}
                  className="p-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all backdrop-blur-xl border border-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-xl border border-white/10 text-[10px] text-gold uppercase tracking-widest rounded-full">
                  {p.category}
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-serif mb-2 line-clamp-1">{p.name}</h3>
              <div className="flex justify-between items-center mt-auto">
                <p className="text-ember font-bold text-lg">₹{p.price}</p>
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${p.stock && p.stock > 0 ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className="text-[10px] uppercase tracking-widest text-pearl/40">{p.stock || 0} In Stock</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="py-24 text-center glass rounded-[40px] border border-dashed border-white/10">
          <ImageIcon className="w-12 h-12 text-white/5 mx-auto mb-4" />
          <p className="text-pearl/40 font-serif italic text-xl tracking-widest">No products found</p>
        </div>
      )}
    </div>
  );
}

function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void; }) {
  const [formData, setFormData] = useState<any>(
    product || {
      name: "",
      category: "women",
      subcategory: "",
      price: 0,
      originalPrice: 0,
      stock: 50,
      images: [],
      description: "",
      fabric: "",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: [],
      isFeatured: false,
      isNew: true,
    }
  );

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be below 5MB");
      return;
    }

    try {
      setUploading(true);
      setError("");
      setUploadProgress(0);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "recreate873"); // Ensure this preset exists
      data.append("cloud_name", "dmudji6nk");

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.cloudinary.com/v1_1/dmudji6nk/image/upload");

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percent = (event.loaded / event.total) * 100;
          setUploadProgress(percent);
        }
      });

      xhr.onload = () => {
        const response = JSON.parse(xhr.responseText);
        if (response.secure_url) {
          setFormData((prev: any) => ({
            ...prev,
            images: [...(prev.images || []), response.secure_url],
          }));
          setSuccess("Image uploaded successfully");
          setTimeout(() => setSuccess(""), 3000);
        } else {
          setError("Image upload failed");
        }
        setUploading(false);
      };

      xhr.onerror = () => {
        setError("Network error occurred during upload");
        setUploading(false);
      };

      xhr.send(data);
    } catch (err: any) {
      console.error(err);
      setError("Upload failed unexpectedly");
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");

      if (!formData.name) {
        setError("Product name is required");
        return;
      }
      if (!formData.images?.length) {
        setError("Upload at least one product image");
        return;
      }

      if (product) {
        await updateProduct(product.id, formData);
        setSuccess("Product updated successfully");
      } else {
        await addProduct(formData);
        setSuccess("Product saved successfully");
      }

      setTimeout(() => onClose(), 1200);
    } catch (err: any) {
      console.error(err);
      setError("Failed to save to store");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div className="w-full max-w-5xl bg-[#0a0a0f] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div>
            <h2 className="text-3xl font-serif">
              {product ? "Edit Product" : "Add Product"}
            </h2>
            <p className="text-[10px] text-pearl/40 uppercase tracking-[0.3em] font-accent mt-1">Product Details</p>
          </div>
          <button onClick={onClose} className="p-3 bg-white/5 rounded-2xl hover:bg-gold/10 hover:text-gold transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] text-gold/60 uppercase tracking-widest font-bold px-2">Product Name</label>
              <input
                type="text"
                placeholder="Product name..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 focus:border-gold/30 outline-none transition-all placeholder:text-pearl/10"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] text-gold/60 uppercase tracking-widest font-bold px-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 focus:border-gold/30 outline-none transition-all appearance-none"
                >
                  <option value="women">Women</option>
                  <option value="men">Men</option>
                  <option value="kids">Kids</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gold/60 uppercase tracking-widest font-bold px-2">Inventory Count</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 focus:border-gold/30 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-gold/60 uppercase tracking-widest font-bold px-2">Price (₹)</label>
              <input
                type="number"
                placeholder="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 focus:border-gold/30 outline-none transition-all text-ember font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-gold/60 uppercase tracking-widest font-bold px-2">Description</label>
              <textarea
                placeholder="Product description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold/30 outline-none resize-none transition-all placeholder:text-pearl/10"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] text-gold/60 uppercase tracking-widest font-bold px-2">Product Images</label>
              <div className="grid grid-cols-2 gap-4">
                {formData.images?.map((img: string, idx: number) => (
                  <div key={idx} className="relative aspect-[3/4] rounded-2xl overflow-hidden group border border-white/10">
                    <img src={img} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setFormData((prev: any) => ({ ...prev, images: prev.images.filter((_: any, i: number) => i !== idx) }))}
                      className="absolute top-2 right-2 p-2 bg-black/60 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <label className={`aspect-[3/4] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-gold/40 hover:bg-white/5 transition-all group ${uploading ? 'pointer-events-none' : ''}`}>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  {uploading ? (
                    <div className="text-center px-4 w-full">
                      <div className="text-xs text-gold font-bold mb-2 uppercase tracking-widest">
                        {Math.round(uploadProgress)}% Uploading
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gold"
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mb-3 text-gold/40 group-hover:text-gold transition-colors" />
                      <span className="text-[10px] text-pearl/20 uppercase tracking-[0.2em] font-bold group-hover:text-pearl/40 transition-colors">Add Image</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-3">
                <X className="w-4 h-4" />
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs flex items-center gap-3">
                <CheckCircle className="w-4 h-4" />
                {success}
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={saving || uploading}
              className="w-full h-16 bg-gold text-black rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] shadow-xl shadow-gold/5 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                "Save Product"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
