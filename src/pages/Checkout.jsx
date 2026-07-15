import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { MagneticButton } from '../components/MagneticButton';
import { CreditCard, CheckCircle2, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';

export const Checkout = () => {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const { isLightsOn } = useTheme();

  // Pricing calculations
  const shippingFee = cartTotal > 499 ? 0 : 25;
  const estimatedTax = cartTotal * 0.08;
  const grandTotal = cartTotal + shippingFee + estimatedTax;

  // Form states
  const [formData, setFormData] = useState({
    name: '', email: '', address: '', city: '', zip: '',
    cardName: '', cardNumber: '', cardExpiry: '', cardCvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment authorization
    setTimeout(() => {
      setLoading(false);
      setOrderId(`LUM-${Math.floor(100000 + Math.random() * 900000)}`);
      setOrderCompleted(true);
      clearCart();
    }, 1800);
  };

  if (orderCompleted) {
    return (
      <div className="w-full pt-32 pb-16 flex flex-col items-center justify-center text-center space-y-6">
        <ScrollReveal className="flex flex-col items-center space-y-4 max-w-md">
          <div className="p-4 rounded-full bg-green-500/10 text-green-500 animate-bounce">
            <CheckCircle2 size={48} className="stroke-[2.5]" />
          </div>
          
          <h2 className="text-3xl font-black font-display text-neutral-900 dark:text-white">Order Confirmed</h2>
          
          <div className="p-4 bg-neutral-500/5 dark:bg-neutral-500/10 rounded-2xl border border-black/5 dark:border-white/5 w-full text-xs space-y-1.5">
            <div className="flex justify-between font-bold">
              <span className="text-neutral-400">Order Reference:</span>
              <span className="text-neutral-950 dark:text-amber-500">{orderId}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-neutral-400">Delivery To:</span>
              <span className="text-neutral-900 dark:text-neutral-200">{formData.name}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-neutral-400">Contact Email:</span>
              <span className="text-neutral-900 dark:text-neutral-200">{formData.email}</span>
            </div>
          </div>

          <p className="text-xs text-neutral-500 leading-relaxed">
            Thank you for shopping at Luma. We are preparing your architectural lighting elements. A shipping invoice and tracking links will be sent to your email shortly.
          </p>

          <Link 
            to="/showroom"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-xs bg-[#5C4033] dark:bg-amber-500 text-white"
          >
            <span>Continue to Showroom</span>
            <ArrowRight size={14} />
          </Link>
        </ScrollReveal>
      </div>
    );
  }

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="w-full pt-32 pb-16 flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-4 rounded-full bg-neutral-500/5 text-neutral-400">
          <ShoppingBag size={36} />
        </div>
        <h2 className="text-xl font-bold font-display text-neutral-900 dark:text-white">Checkout Unavailable</h2>
        <p className="text-xs text-neutral-500">Your shopping cart is empty. Please add items to begin checkout.</p>
        <Link to="/showroom" className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#5C4033] text-white">Browse Showroom</Link>
      </div>
    );
  }

  return (
    <div className="w-full pt-28 pb-16 flex flex-col space-y-8">
      {/* Header */}
      <ScrollReveal className="flex flex-col space-y-2 text-center md:text-left">
        <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-neutral-900 dark:text-white">
          Secure Checkout
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          Complete your information to deploy your lighting order.
        </p>
      </ScrollReveal>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Forms */}
        <div className="lg:col-span-2 flex flex-col space-y-6">
          {/* Shipping details */}
          <ScrollReveal className="glass border border-black/5 dark:border-white/5 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold font-display text-neutral-900 dark:text-white flex items-center space-x-2">
              <span className="p-1 rounded bg-amber-500/10 text-amber-500 text-xs">1</span>
              <span>Shipping Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="px-3 py-2 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="px-3 py-2 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Street Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="px-3 py-2 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="px-3 py-2 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Zip / Postal Code</label>
                <input
                  type="text"
                  name="zip"
                  required
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="px-3 py-2 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Payment Details */}
          <ScrollReveal className="glass border border-black/5 dark:border-white/5 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold font-display text-neutral-900 dark:text-white flex items-center space-x-2">
              <span className="p-1 rounded bg-amber-500/10 text-amber-500 text-xs">2</span>
              <span>Payment Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Cardholder Name</label>
                <input
                  type="text"
                  name="cardName"
                  required
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className="px-3 py-2 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 flex items-center justify-between">
                  <span>Card Number</span>
                  <CreditCard size={12} className="text-neutral-400" />
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  required
                  placeholder="4111 2222 3333 4444"
                  maxLength={19}
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="px-3 py-2 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Expiry Date</label>
                <input
                  type="text"
                  name="cardExpiry"
                  required
                  placeholder="MM/YY"
                  maxLength={5}
                  value={formData.cardExpiry}
                  onChange={handleInputChange}
                  className="px-3 py-2 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">CVV / Security Code</label>
                <input
                  type="password"
                  name="cardCvv"
                  required
                  placeholder="***"
                  maxLength={4}
                  value={formData.cardCvv}
                  onChange={handleInputChange}
                  className="px-3 py-2 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Side: Order Review Table */}
        <ScrollReveal className="lg:col-span-1">
          <div className="glass border border-black/5 dark:border-white/5 rounded-2xl p-6 flex flex-col space-y-6 shadow-lg">
            <h3 className="font-extrabold font-display text-base text-neutral-900 dark:text-white border-b border-black/5 dark:border-white/5 pb-3">
              Order Review
            </h3>

            {/* Quick items list */}
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs text-neutral-500 dark:text-neutral-300">
                  <span className="truncate max-w-[150px] font-bold text-neutral-800 dark:text-white">
                    {item.name} <span className="text-neutral-400">x{item.quantity}</span>
                  </span>
                  <span className="font-black text-neutral-800 dark:text-neutral-200">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Summaries */}
            <div className="border-t border-black/5 dark:border-white/5 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal ({cartCount} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Estimated Taxes (8%)</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="border-t border-black/5 dark:border-white/5 pt-2 flex justify-between font-black text-sm text-neutral-900 dark:text-white">
                <span>Grand Total</span>
                <span className="text-amber-500">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <MagneticButton className="w-full">
              <button 
                type="submit"
                disabled={loading}
                className="w-full text-center inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-bold transition-all duration-500 shadow-md text-xs tracking-wider cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                {loading ? (
                  <span>Authorizing Payment...</span>
                ) : (
                  <>
                    <span>Submit Secure Order</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </MagneticButton>

            <Link 
              to="/cart" 
              className="text-center text-xs font-bold text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors flex items-center justify-center space-x-1"
            >
              <ArrowLeft size={12} />
              <span>Back to Cart</span>
            </Link>
          </div>
        </ScrollReveal>
      </form>
    </div>
  );
};
