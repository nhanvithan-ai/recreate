/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Package, ChevronRight, Calendar, CreditCard, ChevronDown } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function Orders() {
  const { orders } = useShop();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-4xl md:text-5xl lg:text-6xl mb-12">Acquisition History</h2>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
            <Package className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <p className="text-white/40">No orders yet. Your style journey awaits.</p>
          </div>
        ) : (
          orders.map((order, idx) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group"
            >
              <div 
                className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-brand-gold/10 rounded-xl flex items-center justify-center border border-brand-gold/20">
                    <Package className="w-8 h-8 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display tracking-wide">{order.id}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-xs text-white/40">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{order.date}</span>
                      </div>
                      <div className="flex items-center text-xs text-white/40">
                        <CreditCard className="w-3 h-3 mr-1" />
                        <span>${order.total}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <span className={cn(
                    "text-[10px] uppercase font-bold tracking-[0.2em] px-3 py-1 rounded-full",
                    order.status === "Delivered" ? "bg-green-500/20 text-green-500" :
                    order.status === "Processing" ? "bg-blue-500/20 text-blue-500" : "bg-orange-500/20 text-orange-500"
                  )}>
                    {order.status}
                  </span>
                  <motion.div
                    animate={{ rotate: expandedOrder === order.id ? 180 : 0 }}
                  >
                    <ChevronDown className="w-5 h-5 text-white/40" />
                  </motion.div>
                </div>
              </div>

              <AnimatePresence>
                {expandedOrder === order.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-white/5"
                  >
                    <div className="p-8 bg-black/40">
                      <h4 className="text-xs uppercase tracking-widest text-white/20 mb-6">Manifest Items</h4>
                      <div className="space-y-6">
                        {order.items.length === 0 ? (
                          <p className="text-white/40 text-xs italic">Historical order data from before the artisan logging system update.</p>
                        ) : (
                          order.items.map((item, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-16 bg-white/5 rounded-lg overflow-hidden border border-white/10">
                                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <p className="text-sm font-display">{item.name}</p>
                                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Qty: {item.quantity} | Size: {item.selectedSize}</p>
                                </div>
                              </div>
                              <span className="text-sm text-brand-gold">${item.price * item.quantity}</span>
                            </div>
                          ))
                        )}
                        <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                          <span className="text-xs uppercase tracking-[0.2em] text-white/40">Total Acquisition Value</span>
                          <span className="text-xl font-bold text-brand-gold font-display">${order.total}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
