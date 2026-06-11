import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ClipboardCheck, Sparkles } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [shippingName, setShippingName] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingState, setShippingState] = useState("Lagos");

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!shippingName || !shippingPhone || !shippingAddress) {
      alert("Please fill in all delivery details.");
      return;
    }
    setIsCheckoutSuccess(true);
  };

  const closeAndReset = () => {
    onClearCart();
    setIsCheckoutSuccess(false);
    setShippingName("");
    setShippingPhone("");
    setShippingAddress("");
    setShippingState("Lagos");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#02050b]/80 backdrop-blur-sm"
          />

          {/* Sliding drawer panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex h-full w-full max-w-md flex-col bg-[#070b14] border-l border-slate-900 shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="flex h-16 items-center justify-between border-b border-slate-900 px-6">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-cyan-400" />
                <h2 className="font-display text-base font-bold text-white">
                  Your Tech Cart ({cartItems.length} styles)
                </h2>
              </div>
              <button
                id="close-cart-btn"
                onClick={onClose}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {isCheckoutSuccess ? (
              /* Success Checkout Screen */
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center bg-radial from-[#0e162a]/90 to-[#070b14]">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <ClipboardCheck className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-white">
                  Order Successfully Placed!
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  Thank you for shopping with <span className="text-cyan-400 font-semibold">NEXUSGEAR</span>. 
                  Our dispatch logistics officer will contact you within the next 2 hours to confirm your swift delivery.
                </p>

                <div className="mt-8 rounded-xl bg-slate-900/60 p-4 border border-slate-800 text-left w-full">
                  <span className="text-[10px] font-mono tracking-widest text-[#5d6d84] uppercase block mb-2">
                    DELIVERY SUMMARY
                  </span>
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div><span className="text-slate-500">Recipient:</span> {shippingName}</div>
                    <div><span className="text-slate-500">Contact No:</span> {shippingPhone}</div>
                    <div><span className="text-slate-500">Address:</span> {shippingAddress}, {shippingState}</div>
                    <div className="pt-2 border-t border-slate-800 flex justify-between font-mono font-bold text-white">
                      <span>Paid Total:</span>
                      <span>{formatNaira(totalAmount)}</span>
                    </div>
                  </div>
                </div>

                <button
                  id="checkout-success-close"
                  onClick={closeAndReset}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black py-3 text-xs font-semibold"
                >
                  <Sparkles className="h-4 w-4" />
                  Continue Browsing
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              /* Empty Cart Screen */
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 border border-slate-800 text-slate-500">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-white">
                  Your cart is empty
                </h3>
                <p className="mt-1 text-xs text-slate-500 max-w-xs">
                  Browse our high-quality categories and add high-performance electronics to get started.
                </p>
                <button
                  id="cart-empty-browse-cta"
                  onClick={onClose}
                  className="mt-6 rounded-lg bg-[#0e1423] border border-slate-800 px-4 py-2 text-xs font-medium text-cyan-400 hover:border-cyan-500/50 hover:bg-[#12192d] transition-all"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              /* Regular Cart Content & Form Layout */
              <div className="flex flex-1 flex-col overflow-y-auto">
                {/* Scrollable Items List */}
                <div className="flex-1 divide-y divide-slate-900/40 px-6 py-4">
                  {cartItems.map((item) => (
                    <div
                      id={`cart-item-${item.product.id}`}
                      key={item.product.id}
                      className="flex items-center gap-4 py-4"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="h-12 w-12 rounded-lg object-cover bg-[#0d1426]"
                      />
                      <div className="flex-1">
                        <h4 className="text-xs font-semibold text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {formatNaira(item.product.price)} each
                        </span>
                        
                        {/* Quantity adjust tool */}
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            id={`qty-minus-${item.product.id}`}
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="flex h-5 w-5 items-center justify-center rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-semibold text-white w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            id={`qty-plus-${item.product.id}`}
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="flex h-5 w-5 items-center justify-center rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold font-mono text-cyan-400">
                          {formatNaira(item.product.price * item.quantity)}
                        </span>
                        <div>
                          <button
                            id={`cart-item-remove-${item.product.id}`}
                            onClick={() => onRemoveItem(item.product.id)}
                            className="mt-2 text-slate-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal & Delivery Details Form Area */}
                <div className="border-t border-slate-900/80 bg-[#060a12] p-6">
                  {/* Delivery details form */}
                  <form onSubmit={handleCheckoutSubmit} className="space-y-3 mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-[#5d6d84] uppercase block">
                      DELIVERY ADDRESS DETAILS
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        id="checkout-name"
                        type="text"
                        placeholder="Recipient Name"
                        value={shippingName}
                        onChange={(e) => setShippingName(e.target.value)}
                        className="w-full rounded-lg border border-slate-800 bg-[#0c1221] px-3 py-1.5 text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-500"
                        required
                      />
                      <input
                        id="checkout-phone"
                        type="tel"
                        placeholder="Phone Number (e.g. 080...)"
                        value={shippingPhone}
                        onChange={(e) => setShippingPhone(e.target.value)}
                        className="w-full rounded-lg border border-slate-800 bg-[#0c1221] px-3 py-1.5 text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        id="checkout-address"
                        type="text"
                        placeholder="Street Address, City or Area"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="col-span-2 w-full rounded-lg border border-slate-800 bg-[#0c1221] px-3 py-1.5 text-xs text-white placeholder-slate-600 outline-none focus:border-cyan-500"
                        required
                      />
                      <select
                        id="checkout-state"
                        value={shippingState}
                        onChange={(e) => setShippingState(e.target.value)}
                        className="w-full rounded-lg border border-slate-800 bg-[#0c1221] px-2 py-1.5 text-xs text-slate-300 outline-none focus:border-cyan-500"
                      >
                        <option value="Lagos">Lagos</option>
                        <option value="Abuja">Abuja</option>
                        <option value="Port Harcourt">Port Harcourt</option>
                        <option value="Ibadan">Ibadan</option>
                        <option value="Kano">Kano</option>
                        <option value="Enugu">Enugu</option>
                      </select>
                    </div>

                    <div className="border-t border-slate-800/40 pt-3">
                      <div className="flex items-center justify-between font-mono">
                        <span className="text-xs text-slate-400 uppercase">Subtotal</span>
                        <span className="text-lg font-bold text-white">
                          {formatNaira(totalAmount)}
                        </span>
                      </div>
                      <p className="mt-1 text-[10px] text-slate-500">
                        * Free standard fulfillment. Logistics handles secure escrow dispatch.
                      </p>
                    </div>

                    <button
                      id="place-checkout-submit"
                      type="submit"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black py-3 text-xs font-bold transition-all duration-300 shadow-[0_4px_15px_rgba(6,182,212,0.25)]"
                    >
                      Complete Checkout
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
