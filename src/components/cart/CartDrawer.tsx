import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight, Check, CreditCard, Apple } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/Button';

export function CartDrawer() {
  const {
    cartOpen, setCartOpen, cart, removeFromCart, updateQuantity,
    cartTotal, cartCount, navigate, coupon, applyCoupon, discount,
  } = useApp();
  const [couponInput, setCouponInput] = useState('');
  const [couponStatus, setCouponStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');

  const handleClose = () => {
    setCartOpen(false);
    setTimeout(() => setCheckoutStep('cart'), 300);
  };

  const handleApplyCoupon = () => {
    if (applyCoupon(couponInput)) {
      setCouponStatus('success');
    } else {
      setCouponStatus('error');
    }
  };

  const finalTotal = cartTotal - discount;

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 bottom-0 w-[420px] max-w-[90vw] glass-strong flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-novixa-blue" />
                <span className="text-base font-semibold text-novixa-white">
                  {checkoutStep === 'checkout' ? 'Checkout' : checkoutStep === 'success' ? 'Order Complete' : 'Your Cart'}
                </span>
                {checkoutStep === 'cart' && cartCount > 0 && (
                  <span className="text-xs text-novixa-muted">({cartCount})</span>
                )}
              </div>
              <button onClick={handleClose} className="text-novixa-muted hover:text-novixa-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Success state */}
            {checkoutStep === 'success' ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4"
                >
                  <Check size={36} className="text-emerald-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-novixa-white mb-2">Purchase Complete!</h3>
                <p className="text-sm text-novixa-muted mb-6">Your products are ready to download in your dashboard.</p>
                <Button
                  onClick={() => { handleClose(); navigate('/downloads'); }}
                  rightIcon={<ArrowRight size={16} />}
                >
                  Go to Downloads
                </Button>
              </div>
            ) : cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4">
                  <ShoppingBag size={28} className="text-novixa-muted" />
                </div>
                <h3 className="text-lg font-semibold text-novixa-white mb-1">Your cart is empty</h3>
                <p className="text-sm text-novixa-muted mb-6">Browse our marketplace to find premium products.</p>
                <Button onClick={() => { handleClose(); navigate('/products'); }}>
                  Explore Products
                </Button>
              </div>
            ) : (
            <>
              {/* Cart items */}
              <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-4 space-y-3">
                {cart.map((item) => {
                  const Icon = item.product.icon;
                  return (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="glass rounded-2xl p-3 flex items-center gap-3"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${item.product.color}15`, border: `1px solid ${item.product.color}20` }}
                      >
                        <Icon size={20} style={{ color: item.product.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-novixa-white truncate">{item.product.name}</p>
                        <p className="text-2xs text-novixa-muted">{item.product.creator}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-5 h-5 rounded-md glass flex items-center justify-center text-novixa-muted hover:text-novixa-white transition-colors"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-xs font-medium text-novixa-white tabular-nums w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-5 h-5 rounded-md glass flex items-center justify-center text-novixa-muted hover:text-novixa-white transition-colors"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="text-sm font-semibold text-novixa-cyan">${item.product.price * item.quantity}</span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-novixa-muted hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="border-t border-white/5 px-5 py-4 space-y-3">
                {checkoutStep === 'cart' ? (
                  <>
                    {/* Coupon */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 flex items-center gap-2 glass rounded-xl px-3 py-2">
                        <Tag size={14} className="text-novixa-muted" />
                        <input
                          value={couponInput}
                          onChange={(e) => { setCouponInput(e.target.value); setCouponStatus('idle'); }}
                          placeholder="Coupon code"
                          className="flex-1 bg-transparent text-xs text-novixa-white placeholder:text-novixa-muted focus:outline-none"
                        />
                      </div>
                      <Button size="sm" variant="secondary" onClick={handleApplyCoupon}>Apply</Button>
                    </div>
                    {couponStatus === 'success' && (
                      <p className="text-2xs text-emerald-400 flex items-center gap-1">
                        <Check size={10} /> Coupon applied: {coupon} ({(discount / cartTotal * 100).toFixed(0)}% off)
                      </p>
                    )}
                    {couponStatus === 'error' && (
                      <p className="text-2xs text-red-400">Invalid coupon code</p>
                    )}

                    {/* Totals */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-novixa-muted">
                        <span>Subtotal</span>
                        <span className="text-novixa-white">${cartTotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-xs text-emerald-400">
                          <span>Discount</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm font-semibold pt-1">
                        <span className="text-novixa-white">Total</span>
                        <span className="text-novixa-cyan">${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button fullWidth size="lg" onClick={() => setCheckoutStep('checkout')} rightIcon={<ArrowRight size={16} />}>
                      Checkout
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Checkout step */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-2xs font-medium uppercase tracking-ultra text-novixa-muted mb-1.5 block">Email</label>
                        <input
                          placeholder="you@example.com"
                          className="w-full glass rounded-xl px-3 py-2.5 text-sm text-novixa-white placeholder:text-novixa-muted focus:outline-none focus:border-novixa-blue/40"
                        />
                      </div>
                      <div>
                        <label className="text-2xs font-medium uppercase tracking-ultra text-novixa-muted mb-1.5 block">Card Details</label>
                        <div className="glass rounded-xl p-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <CreditCard size={14} className="text-novixa-muted" />
                            <input
                              placeholder="4242 4242 4242 4242"
                              className="flex-1 bg-transparent text-sm text-novixa-white placeholder:text-novixa-muted focus:outline-none"
                            />
                          </div>
                          <div className="flex gap-2">
                            <input placeholder="MM/YY" className="flex-1 bg-white/5 rounded-lg px-2 py-1.5 text-xs text-novixa-white placeholder:text-novixa-muted focus:outline-none" />
                            <input placeholder="CVC" className="w-16 bg-white/5 rounded-lg px-2 py-1.5 text-xs text-novixa-white placeholder:text-novixa-muted focus:outline-none" />
                          </div>
                        </div>
                      </div>

                      {/* Pay buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button className="glass rounded-xl py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-novixa-white hover:border-white/20 transition-colors">
                          <Apple size={16} /> Apple Pay
                        </button>
                        <button className="glass rounded-xl py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-novixa-white hover:border-white/20 transition-colors">
                          <span className="text-base">G</span> Pay
                        </button>
                      </div>

                      <div className="flex justify-between text-sm font-semibold pt-1">
                        <span className="text-novixa-white">Total</span>
                        <span className="text-novixa-cyan">${finalTotal.toFixed(2)}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button fullWidth variant="ghost" onClick={() => setCheckoutStep('cart')}>Back</Button>
                        <Button fullWidth onClick={() => setCheckoutStep('success')}>
                          Pay ${finalTotal.toFixed(2)}
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
