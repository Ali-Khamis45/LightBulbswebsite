import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { ProductImage } from './ProductImage';
import { MagneticButton } from './MagneticButton';

export const ProductCard = ({ product }) => {
  const { isLightsOn } = useTheme();
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group block relative rounded-2xl glass p-4 shadow-glow-card transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl border border-black/5 dark:border-white/5"
    >
      {/* Product Image Box */}
      <div className="relative w-full aspect-square rounded-xl bg-neutral-500/5 dark:bg-neutral-500/5 overflow-hidden flex items-center justify-center">
        <ProductImage 
          product={product}
          isLit={isLightsOn} 
          className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Lit Glow Badge */}
        {isLightsOn && (
          <span className="absolute top-3 right-3 flex h-2 w-2 z-20">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="mt-4 flex flex-col space-y-1">
        <span className="text-[10px] uppercase font-bold tracking-wider text-brand-mocha-light dark:text-neutral-400">
          {product.category}
        </span>
        
        <h3 className="text-base font-semibold font-display tracking-tight text-neutral-900 dark:text-white transition-colors duration-700 group-hover:text-amber-500 dark:group-hover:text-amber-400">
          {product.name}
        </h3>

        {/* Rating & Reviews */}
        <div className="flex items-center space-x-1 text-xs text-neutral-500 dark:text-neutral-400">
          <Star size={12} className="fill-amber-400 stroke-amber-400" />
          <span className="font-semibold text-neutral-700 dark:text-neutral-300">{product.rating}</span>
          <span className="text-[10px] text-neutral-400">({product.reviewsCount})</span>
        </div>

        {/* Price & Buy Section */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-base font-bold font-display text-neutral-900 dark:text-amber-400 transition-colors duration-700">
            ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>

          <MagneticButton>
            <button
              onClick={handleQuickAdd}
              className="p-2.5 rounded-xl transition-all duration-700 flex items-center justify-center cursor-pointer border hover:scale-110 active:scale-95"
              style={{
                background: isLightsOn 
                  ? 'radial-gradient(circle, #F6B100 0%, #D49000 100%)' 
                  : '#5C4033',
                borderColor: isLightsOn ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                color: '#FFF',
                boxShadow: isLightsOn 
                  ? '0 0 12px rgba(246,177,0,0.5)' 
                  : 'none'
              }}
              title="Add to Cart"
            >
              <ShoppingBag size={14} className="stroke-[2.5]" />
            </button>
          </MagneticButton>
        </div>
      </div>
    </Link>
  );
};
