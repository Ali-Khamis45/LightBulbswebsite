import React, { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';

export const ProductImage = ({ product, isLit, className = "w-full h-full" }) => {
  const [imageState, setImageState] = useState('loading'); // 'loading' | 'loaded' | 'error'

  useEffect(() => {
    if (!product?.imageOff || !product?.imageOn) {
      setImageState('error');
      return;
    }

    setImageState('loading');
    let cancelled = false;
    let loaded = 0;

    const handleLoaded = () => {
      loaded += 1;
      if (!cancelled && loaded === 2) {
        setImageState('loaded');
      }
    };

    const handleError = () => {
      if (!cancelled) {
        setImageState('error');
      }
    };

    const offImage = new Image();
    const onImage = new Image();
    offImage.onload = handleLoaded;
    onImage.onload = handleLoaded;
    offImage.onerror = handleError;
    onImage.onerror = handleError;
    offImage.src = product.imageOff;
    onImage.src = product.imageOn;

    return () => {
      cancelled = true;
    };
  }, [product?.imageOff, product?.imageOn]);

  if (!product) return null;

  return (
    <div className={`relative overflow-hidden rounded-xl flex items-center justify-center w-full h-full ${className}`}>
      
      {/* 1. Base Element: Loading state */}
      {imageState === 'loading' && (
        <div className="w-full h-full bg-neutral-100 dark:bg-neutral-900 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-neutral-300 border-t-amber-500 animate-spin" />
        </div>
      )}

      {/* 2. Base Element: Error Fallback (Rendered instead of broken img) */}
      {imageState === 'error' && (
        <div className={`w-full h-full flex flex-col items-center justify-center p-4 transition-colors duration-700 ${
          isLit ? 'bg-[#1a1a1d]' : 'bg-[#FAF9F6]'
        }`}>
          <div className="relative flex items-center justify-center">
            <div 
              className={`absolute inset-0 rounded-full blur-xl scale-125 transition-all duration-700 ${
                isLit ? 'opacity-70 bg-amber-500/25' : 'opacity-0'
              }`}
            />
            <Lightbulb 
              size={44} 
              className={`transition-all duration-700 ease-in-out relative z-10 ${isLit ? 'filter-glow scale-110 text-amber-400' : 'scale-100 text-neutral-400'}`} 
            />
          </div>
          <span className={`text-[10px] uppercase tracking-wider font-extrabold mt-3 transition-colors duration-700 select-none ${
            isLit ? 'text-neutral-500' : 'text-neutral-400'
          }`}>
            {product.category}
          </span>
        </div>
      )}

      {/* 3. Two real paired product images cross-faded in place */}
      {imageState === 'loaded' && (
        <>
          <img
            src={product.imageOff}
            alt={`${product.name} turned off`}
            className="w-full h-full object-cover select-none pointer-events-none absolute inset-0"
            style={{
              opacity: isLit ? 0 : 1,
              transition: 'opacity 900ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />

          <img
            src={product.imageOn}
            alt={`${product.name} turned on`}
            className="w-full h-full object-cover select-none pointer-events-none absolute inset-0"
            style={{
              opacity: isLit ? 1 : 0,
              transition: 'opacity 900ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </>
      )}
    </div>
  );
};
