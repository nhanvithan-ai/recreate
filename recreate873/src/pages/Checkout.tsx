import { SELLER_CONTACT } from "../config/seller";
import { useState } from "react";
import { useShop } from "../context/ShopContext";
import { motion, AnimatePresence } from "motion/react";
import {
  CreditCard,
  Truck,
  CheckCircle2,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import ParticleEmbers from "../components/ParticleEmbers";

type Step = "address" | "review" | "payment" | "confirmed";
type PaymentMethod = "upi" | "card" | "cod";

export default function Checkout() {
  const { cart, clearCart, addOrder } = useShop();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("address");
  const [orderProcessed, setOrderProcessed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const isFormValid =
    form.name && form.phone && form.email && form.address && form.city && form.pincode;

  const handleOrderConfirm = () => {
    setOrderProcessed(true);
    setStep("confirmed");

    const newOrder = {
      id: `#RC-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      items: [...cart],
      total,
      status: "Processing" as const,
      paymentMethod,
    };

    addOrder(newOrder);
    clearCart();

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff4500", "#f5c518", "#ffcf96"],
    });
  };

  if (cart.length === 0 && !orderProcessed) {
    navigate("/");
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 relative overflow-hidden">

      <ParticleEmbers />

      {/* HEADER */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-serif text-gold">
          Atelier Checkout
        </h1>
        <p className="text-white/40 mt-3 text-xs tracking-[0.3em] uppercase">
          Secure luxury purchasing experience
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">

        {/* LEFT SIDE */}
        <div className="flex-[2]">

          <AnimatePresence mode="wait">

            {/* ADDRESS */}
            {step === "address" && (
              <motion.div className="space-y-8">
                <h2 className="text-2xl font-serif">Delivery Details</h2>

                <div className="grid md:grid-cols-2 gap-5">
                  {Object.entries(form).map(([key, value]) => (
                    <input
                      key={key}
                      value={value}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                      placeholder={key.toUpperCase()}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl text-sm focus:border-gold outline-none"
                    />
                  ))}
                </div>

                <button
                  onClick={() => setStep("review")}
                  disabled={!isFormValid}
                  className="w-full py-4 bg-ember text-black font-bold rounded-xl disabled:opacity-40"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {/* REVIEW */}
            {step === "review" && (
              <motion.div className="space-y-6">
                <h2 className="text-2xl font-serif">Order Review</h2>

                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 glass p-4 rounded-xl">
                    <img src={item.images[0]} className="w-20 h-24 object-cover rounded" />
                    <div>
                      <p className="font-serif">{item.name}</p>
                      <p className="text-sm text-white/40">Qty: {item.quantity}</p>
                      <p className="text-ember">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}

                <div className="flex gap-4">
                  <button onClick={() => setStep("address")} className="flex-1 py-4 glass">
                    Back
                  </button>
                  <button onClick={() => setStep("payment")} className="flex-1 py-4 bg-gold text-black">
                    Payment
                  </button>
                </div>
              </motion.div>
            )}

            {/* PAYMENT */}
            {step === "payment" && (
              <motion.div className="space-y-6">
                <h2 className="text-2xl font-serif">Payment Method</h2>

                {[
                  { id: "upi", label: "UPI", icon: <Wallet /> },
                  { id: "card", label: "Card", icon: <CreditCard /> },
                  { id: "cod", label: "Cash on Delivery", icon: <Truck /> },
                ].map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setPaymentMethod(p.id as PaymentMethod)}
                    className={`p-4 border rounded-xl cursor-pointer flex justify-between ${
                      paymentMethod === p.id ? "border-gold" : "border-white/10"
                    }`}
                  >
                    <span className="flex gap-3 items-center">
                      {p.icon} {p.label}
                    </span>
                    {paymentMethod === p.id && <CheckCircle2 />}
                  </div>
                ))}

                <div className="flex gap-4">
                  <button onClick={() => setStep("review")} className="flex-1 py-4 glass">
                    Back
                  </button>
                  <button
                    onClick={handleOrderConfirm}
                    className="flex-1 py-4 bg-ember text-black font-bold"
                  >
                    Place Order
                  </button>
                </div>
              </motion.div>
            )}

            {/* CONFIRMED */}
            {step === "confirmed" && (
              <motion.div className="text-center space-y-8">
                <CheckCircle2 className="w-20 h-20 text-gold mx-auto" />
                <h2 className="text-4xl font-serif">Order Placed!</h2>
                <button onClick={() => navigate("/")} className="py-4 px-8 bg-gold text-black rounded-xl">
                  Continue Shopping
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* RIGHT SIDEBAR */}
        {step !== "confirmed" && (
          <div className="flex-1">
            <div className="sticky top-32 glass p-8 rounded-2xl space-y-8">

              <h3 className="text-sm uppercase tracking-[0.4em] text-gold/80 border-b border-white/10 pb-4">
                Atelier Manifest
              </h3>

              <div className="space-y-4 text-xs">

                <div className="flex justify-between text-white/40">
                  <span>Couture Value</span>
                  <span className="text-white">₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-white/40">
                  <span>Global Logistics</span>
                  <span className="text-white">
                    {shipping === 0 ? "Complimentary" : `₹${shipping}`}
                  </span>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between">
                  <span className="text-white/50 uppercase tracking-[0.2em]">
                    Total Exchange
                  </span>
                  <span className="text-2xl font-serif text-ember">
                    ₹{total}
                  </span>
                </div>

              </div>

              {/* GILDED CODE */}
              <input
                type="text"
                placeholder="GILDED CODE"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-[10px] uppercase tracking-[0.3em]"
              />

              {/* SELLER CONTACT (FINAL FIXED VERSION) */}
              <div className="pt-4 border-t border-white/10 text-xs space-y-3 text-white/50">

                <p className="text-gold/70 uppercase tracking-[0.3em] text-[10px]">
                  Seller Support
                </p>

                <a href={`tel:${SELLER_CONTACT.phone}`} className="block hover:text-white">
                  📞 {SELLER_CONTACT.phone}
                </a>

                <a
https://wa.me/${SELLER_CONTACT.whatsapp}?text=Hi%20I%20want%20to%20place%20an%20order.%0A%0AName:%20${form.name}%0APhone:%20${form.phone}%0AAddress:%20${form.address}%0ACity:%20${form.city}%0APincode:%20${form.pincode}%0A%0ATotal:%20₹${total}%0APayment:%20${paymentMethod.toUpperCase()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-green-400"
                >
                  💬 WhatsApp Support
                </a>

                <a
                  href={`mailto:${SELLER_CONTACT.email}?subject=Order%20Support`}
                  className="block hover:text-blue-300"
                >
                  ✉️ {SELLER_CONTACT.email}
                </a>

                <p className="text-[10px] text-white/30">
                  {SELLER_CONTACT.supportHours}
                </p>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}