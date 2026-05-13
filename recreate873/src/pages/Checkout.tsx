import React, { useState } from "react";
import {
  CheckCircle2,
  ArrowLeft,
  MapPin,
  User,
  Phone,
  Mail,
  Send,
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import ParticleEmbers from "../components/ParticleEmbers";
import emailjs from "@emailjs/browser";

export default function Checkout() {
  const { cart, clearCart } = useShop();
  const navigate = useNavigate();

  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address || !formData.email) {
      alert("Please fill all details");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    setLoading(true);

    const orderId = "ORD-" + Math.random().toString(36).substring(2, 9).toUpperCase();

    // ========================
    // CLEAN PRODUCT FORMAT
    // ========================
    const cartItemsText = cart
      .map(
        (item) =>
          `• ${item.name}
  Size: ${item.selectedSize || "N/A"}
  Qty: ${item.quantity}
  Price: ₹${item.price * item.quantity}`
      )
      .join("<br/><br/>");

    // ========================
    // WHATSAPP MESSAGE
    // ========================
    const whatsappMessage = `
🛍 *NEW ORDER - RECREATE873*

Order ID: ${orderId}

👤 *Customer Details*
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Address: ${formData.address}

📦 *Products*
${cart.map(item =>
  `• ${item.name} (Size: ${item.selectedSize || "N/A"}) x${item.quantity} = ₹${item.price * item.quantity}`
).join("\n")}

💰 *Total: ₹${total}*
`;

    const whatsappUrl = `https://wa.me/917075192712?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // ========================
    // EMAILJS PAYLOAD
    // ========================
    const emailParams = {
      order_id: orderId,
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      customer_address: formData.address,

      order_items: cartItemsText,
      total_price: total,
    };

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Email ALWAYS attempt (no silent failure)
      if (serviceId && templateId && publicKey) {
        await emailjs.send(serviceId, templateId, emailParams, publicKey);
      } else {
        console.warn("EmailJS not configured properly");
      }

      // success flow
      clearCart();
      setIsSuccess(true);

      // open WhatsApp
      window.open(whatsappUrl, "_blank");
    } catch (err) {
      console.error("Order error:", err);
      alert("Something went wrong while placing order.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Cart is empty</h2>
          <button onClick={() => navigate("/")} className="underline text-gold">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <ParticleEmbers />

      <div className="max-w-4xl mx-auto px-6 pt-32 relative z-10">

        {!isSuccess ? (
          <motion.form
            onSubmit={handleConfirmOrder}
            className="space-y-6"
          >
            <h1 className="text-4xl font-serif mb-6">Checkout</h1>

            <input
              placeholder="Name"
              className="w-full p-4 bg-white/10 rounded-xl"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <input
              placeholder="Phone"
              className="w-full p-4 bg-white/10 rounded-xl"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <input
              placeholder="Email"
              className="w-full p-4 bg-white/10 rounded-xl"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <textarea
              placeholder="Address"
              className="w-full p-4 bg-white/10 rounded-xl"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />

            <div className="bg-white/5 p-4 rounded-xl">
              <p>Subtotal: ₹{subtotal}</p>
              <p>Shipping: ₹{shipping}</p>
              <p className="text-gold text-xl">Total: ₹{total}</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-black py-4 rounded-xl font-bold"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </motion.form>
        ) : (
          <div className="text-center space-y-6">
            <CheckCircle2 className="mx-auto text-green-500 w-20 h-20" />
            <h2 className="text-3xl">Order Placed Successfully</h2>

            <button
              onClick={() => navigate("/")}
              className="bg-white text-black px-6 py-3 rounded-xl"
            >
              Return to Store
            </button>
          </div>
        )}
      </div>
    </div>
  );
}