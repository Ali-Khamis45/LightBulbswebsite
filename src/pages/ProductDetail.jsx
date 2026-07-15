import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { ProductImage } from '../components/ProductImage';
import { SkeletonDetails } from '../components/Skeleton';
import { ScrollReveal } from '../components/ScrollReveal';
import { MagneticButton } from '../components/MagneticButton';
import { ArrowLeft, ShoppingBag, Star, AlertTriangle, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


export const ProductDetail = () => {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const { isLightsOn } = useTheme();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedAlert, setAddedAlert] = useState(false);
  const [localLit, setLocalLit] = useState(true); // Allow turning on/off this specific lamp independently!

  // Reviews simulated state
  const [reviews, setReviews] = useState([
    { name: 'Alexander V.', rating: 5, date: '2026-06-12', text: 'Stunning craftsmanship. The brushed brass reflects the light beautifully. Worth every penny.' },
    { name: 'Elena R.', rating: 4, date: '2026-07-01', text: 'Excellent rendering index. Foods look vibrant under this bulb. The amber tint is beautiful.' }
  ]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, text: '' });

  useEffect(() => {
    setLoading(true);
    const found = getProductById(id);
    if (found) {
      setProduct(found);
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id, getProductById]);

  // Sync independent fixture light state with global switch, but allow overriding
  useEffect(() => {
    setLocalLit(isLightsOn);
  }, [isLightsOn]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedAlert(true);
      setTimeout(() => setAddedAlert(false), 3000);
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;
    const date = new Date().toISOString().split('T')[0];
    setReviews(prev => [{ ...newReview, date }, ...prev]);
    
    // Reset review form
    setNewReview({ name: '', rating: 5, text: '' });
  };

  if (loading) {
    return (
      <div className="w-full pt-28 pb-16">
        <SkeletonDetails />
      </div>
    );
  }

  // Error State: Product not found
  if (!product) {
    return (
      <div className="w-full pt-32 pb-16 flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-4 rounded-full bg-red-500/10 text-red-500">
          <AlertTriangle size={36} />
        </div>
        <h2 className="text-2xl font-bold font-display text-neutral-900 dark:text-white">Product Not Found</h2>
        <p className="text-xs text-neutral-500 max-w-xs">
          The lighting fixture you are seeking does not exist or has been retired from our catalog.
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
    <div className="w-full pt-28 pb-16 flex flex-col space-y-12">
      {/* Back link */}
      <div>
        <button 
          onClick={() => navigate(-1)}
          className="text-xs font-bold text-neutral-500 dark:text-neutral-300 hover:text-amber-500 transition-colors flex items-center space-x-1.5 cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Go Back</span>
        </button>
      </div>

      {/* Main product showcase split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Left Side: Product interactive illustration */}
        <ScrollReveal className="glass border border-black/5 dark:border-white/5 rounded-3xl p-8 flex flex-col items-center relative aspect-square justify-center">
          {/* Spotlight toggle */}
          <div className="absolute top-4 left-4 z-20 flex items-center space-x-1.5 text-[10px] font-bold text-neutral-400">
            <span className={`w-1.5 h-1.5 rounded-full ${localLit ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span>Fixture Power: {localLit ? 'ON' : 'OFF'}</span>
          </div>

          {/* Quick toggle on the card itself */}
          <button 
            onClick={() => setLocalLit(!localLit)}
            className="absolute top-4 right-4 z-20 text-[10px] font-bold px-2 py-1 rounded bg-neutral-500/10 hover:bg-neutral-500/20 text-neutral-600 dark:text-neutral-300 transition-colors cursor-pointer"
          >
            Friction Click
          </button>

          {/* Master SVG image */}
          <div className="w-full h-full flex items-center justify-center py-6">
            <ProductImage 
              product={product} 
              isLit={localLit} 
              className="w-56 h-56"
            />
          </div>
        </ScrollReveal>

        {/* Right Side: Product Details */}
        <ScrollReveal className="flex flex-col space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-mocha-light dark:text-neutral-400">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-neutral-900 dark:text-white transition-colors duration-700">
              {product.name}
            </h1>
            
            {/* Ratings and Badge */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-xs text-neutral-500 dark:text-neutral-400">
                <Star size={14} className="fill-amber-400 stroke-amber-400" />
                <span className="font-bold text-neutral-700 dark:text-neutral-300">{product.rating}</span>
                <span>({reviews.length} Reviews)</span>
              </div>
              
              {localLit && (
                <div className="inline-flex items-center space-x-1 text-[10px] font-bold text-amber-500 tracking-wide uppercase">
                  <Sparkles size={10} className="animate-pulse" />
                  <span>Emitting Ambient Bloom</span>
                </div>
              )}
            </div>
          </div>

          <div className="text-xl sm:text-2xl font-black font-display text-neutral-900 dark:text-amber-400 transition-colors duration-700">
            ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium transition-colors duration-700">
            {product.description}
          </p>

          {/* Add to Cart Actions */}
          <div className="pt-4 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center gap-4 w-full">
            {/* Quantity Adjuster */}
            <div className="flex items-center border border-black/10 dark:border-white/10 rounded-xl p-1 bg-neutral-500/5">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-8 h-8 font-extrabold flex items-center justify-center hover:bg-neutral-500/10 rounded-lg text-sm cursor-pointer select-none"
              >
                -
              </button>
              <span className="w-10 text-center text-xs font-black select-none">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="w-8 h-8 font-extrabold flex items-center justify-center hover:bg-neutral-500/10 rounded-lg text-sm cursor-pointer select-none"
              >
                +
              </button>
            </div>

            {/* CTA Button */}
            <MagneticButton className="w-full sm:w-auto">
              <button 
                onClick={handleAddToCart}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl font-bold transition-all duration-500 shadow-md text-xs tracking-wider cursor-pointer"
                style={{
                  background: localLit 
                    ? 'linear-gradient(135deg, #F6B100 0%, #D49000 100%)' 
                    : '#5C4033',
                  color: '#FFF',
                  boxShadow: localLit 
                    ? '0 8px 20px rgba(246, 177, 0, 0.3)' 
                    : 'none'
                }}
              >
                <ShoppingBag size={14} className="stroke-[2.5]" />
                <span>Add to Cart</span>
              </button>
            </MagneticButton>
          </div>

          {/* Added to Cart Alert Popin */}
          <AnimatePresence>
            {addedAlert && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-3 bg-green-500 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-md w-full sm:w-fit"
              >
                <Check size={14} strokeWidth={3} />
                <span>Successfully added {quantity} item(s) to cart!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </div>

      {/* Specifications & Review Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 border-t border-black/5 dark:border-white/5">
        {/* Specifications List */}
        <ScrollReveal className="space-y-4">
          <h3 className="text-xl font-bold font-display text-neutral-900 dark:text-white">Technical Specifications</h3>
          
          <div className="rounded-2xl glass border border-black/5 dark:border-white/5 overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <tbody>
                {Object.entries(product.specs).map(([label, val], idx) => (
                  <tr key={label} className={idx !== 0 ? "border-t border-black/5 dark:border-white/5" : ""}>
                    <td className="px-4 py-3 font-bold text-neutral-400 w-1/3 bg-neutral-500/5">{label}</td>
                    <td className="px-4 py-3 font-semibold text-neutral-800 dark:text-neutral-200">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Customer Reviews Section */}
        <ScrollReveal className="space-y-6">
          <h3 className="text-xl font-bold font-display text-neutral-900 dark:text-white">Customer Reviews</h3>

          {/* Review Write Form */}
          <form onSubmit={handleAddReview} className="glass border border-black/5 dark:border-white/5 rounded-2xl p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input 
                type="text" 
                placeholder="Your Name" 
                required
                value={newReview.name}
                onChange={e => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                className="px-3 py-2 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 text-neutral-800 dark:text-white focus:outline-none focus:border-amber-500"
              />
              <select
                value={newReview.rating}
                onChange={e => setNewReview(prev => ({ ...prev, rating: Number(e.target.value) }))}
                className="px-3 py-2 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 text-neutral-800 dark:text-white focus:outline-none focus:border-amber-500 font-bold"
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            
            <textarea
              placeholder="Share your showroom experience..."
              required
              rows={2}
              value={newReview.text}
              onChange={e => setNewReview(prev => ({ ...prev, text: e.target.value }))}
              className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-500/5 border border-black/10 dark:border-white/5 text-neutral-800 dark:text-white focus:outline-none focus:border-amber-500"
            />
            
            <button 
              type="submit"
              className="px-4 py-2 bg-neutral-800 dark:bg-amber-500 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Post Review
            </button>
          </form>

          {/* Reviews list */}
          <div className="space-y-4">
            {reviews.map((rev, idx) => (
              <div key={idx} className="border-b border-black/5 dark:border-white/5 pb-4 last:border-0 flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{rev.name}</span>
                  <span className="text-[10px] text-neutral-400 font-medium">{rev.date}</span>
                </div>
                
                {/* Review Stars */}
                <div className="flex items-center space-x-0.5 text-xs text-amber-400">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star 
                      key={s} 
                      size={10} 
                      className={s < rev.rating ? "fill-amber-400 stroke-amber-400" : "stroke-neutral-300 dark:stroke-neutral-700"} 
                    />
                  ))}
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 pt-1 leading-relaxed">
                  {rev.text}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
