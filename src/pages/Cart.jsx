import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { ProductImage } from '../components/ProductImage';
import { ScrollReveal } from '../components/ScrollReveal';
import { MagneticButton } from '../components/MagneticButton';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';

export const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const { isLightsOn } = useTheme();

  // Pricing calculations
  const shippingFee = cartTotal > 499 ? 0 : 25;
  const estimatedTax = cartTotal * 0.08;
  const grandTotal = cartTotal + shippingFee + estimatedTax;

  if (cartItems.length === 0) {
    return (
      <div className="w-full pt-32 pb-16 flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-4 rounded-full bg-neutral-500/5 dark:bg-neutral-500/10 text-neutral-400">
          <ShoppingBag size={36} />
        </div>
        <h2 className="text-2xl font-bold font-display text-neutral-900 dark:text-white">Your Cart is Empty</h2>
        <p className="text-xs text-neutral-500 max-w-xs">
          You haven't added any luxury lighting products to your cart yet. Explore our showroom catalog to discover unique illumination.
        </p>
        <Link 
          to="/showroom"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-[#5C4033] dark:bg-amber-500 text-white"
        >
          <ArrowLeft size={14} />
          <span>Back to Showroom</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full pt-28 pb-16 flex flex-col space-y-8">
      {/* Header */}
      <ScrollReveal className="flex flex-col space-y-2 text-center md:text-left">
        <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-neutral-900 dark:text-white">
          Shopping Cart
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          Review your selected lighting fixtures before heading to secure checkout.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Items List */}
        <div className="lg:col-span-2 flex flex-col space-y-4">
          {cartItems.map((item) => (
            <ScrollReveal key={item.id}>
              <div className="glass border border-black/5 dark:border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
                {/* Image preview */}
                <div className="w-20 h-20 bg-neutral-500/5 rounded-xl flex items-center justify-center border border-black/5 dark:border-white/5 relative shrink-0 overflow-hidden">
                  <ProductImage product={item} isLit={isLightsOn} className="w-full h-full" />
                </div>

                {/* Details */}
                <div className="flex-1 text-center sm:text-left space-y-0.5">
                  <span className="text-[9px] uppercase font-bold text-neutral-400">{item.category}</span>
                  <h3 className="text-sm font-bold font-display text-neutral-900 dark:text-white">{item.name}</h3>
                  <span className="text-xs font-semibold text-neutral-500 dark:text-amber-500">${item.price.toFixed(2)} each</span>
                </div>

                {/* Quantity adjustments */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center border border-black/10 dark:border-white/10 rounded-lg p-0.5 bg-neutral-500/5">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center hover:bg-neutral-500/10 rounded font-bold text-xs cursor-pointer select-none"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-black select-none">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center hover:bg-neutral-500/10 rounded font-bold text-xs cursor-pointer select-none"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 hover:bg-red-500/10 text-neutral-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Total */}
                <div className="text-right font-black font-display text-sm text-neutral-900 dark:text-white shrink-0 min-w-[70px]">
                  ${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Right Side: Order Summary Panel */}
        <ScrollReveal className="lg:col-span-1">
          <div className="glass border border-black/5 dark:border-white/5 rounded-2xl p-6 flex flex-col space-y-6 shadow-lg">
            <h3 className="font-extrabold font-display text-base text-neutral-900 dark:text-white border-b border-black/5 dark:border-white/5 pb-3">
              Order Summary
            </h3>

            {/* Calculations Table */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between font-semibold text-neutral-500 dark:text-neutral-300">
                <span>Subtotal ({cartCount} items)</span>
                <span className="text-neutral-800 dark:text-white">${cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              
              <div className="flex justify-between font-semibold text-neutral-500 dark:text-neutral-300">
                <span>Shipping & Handling</span>
                <span className="text-neutral-800 dark:text-white">
                  {shippingFee === 0 ? <span className="text-green-500 font-bold">FREE</span> : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              
              <div className="flex justify-between font-semibold text-neutral-500 dark:text-neutral-300">
                <span>Estimated Sales Tax (8%)</span>
                <span className="text-neutral-800 dark:text-white">${estimatedTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              
              {shippingFee > 0 && (
                <div className="text-[10px] text-amber-500 font-bold bg-amber-500/5 p-2 rounded-lg leading-snug">
                  💡 Add ${(500 - cartTotal).toFixed(2)} more to unlock free luxury shipping!
                </div>
              )}
              
              <div className="border-t border-black/5 dark:border-white/5 pt-3 flex justify-between font-black text-sm text-neutral-900 dark:text-white">
                <span>Order Total</span>
                <span className="text-amber-500">${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <MagneticButton className="w-full">
              <Link 
                to="/checkout"
                className="w-full text-center inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-bold transition-all duration-500 shadow-md text-xs tracking-wider cursor-pointer"
                style={{
                  background: isLightsOn 
                    ? 'radial-gradient(circle, #F6B100 0%, #D49000 100%)' 
                    : '#5C4033',
                  color: '#FFF',
                  boxShadow: isLightsOn 
                    ? '0 6px 15px rgba(246, 177, 0, 0.3)' 
                    : 'none'
                }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </Link>
            </MagneticButton>

            <Link 
              to="/showroom"
              className="text-center text-xs font-bold text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
