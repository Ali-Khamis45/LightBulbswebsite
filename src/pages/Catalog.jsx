import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { SkeletonGrid } from '../components/Skeleton';
import { ScrollReveal } from '../components/ScrollReveal';
import { SlidersHorizontal, Search, RefreshCw } from 'lucide-react';

export const Catalog = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  // Read filter values from URL search params
  const categoryFilter = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';

  // Local state for non-URL filters
  const [priceRange, setPriceRange] = useState(2000);
  const [sortBy, setSortBy] = useState('featured');

  // Simulate network delay to showcase skeleton loaders
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [categoryFilter, searchQuery, priceRange, sortBy]);

  // Categories list
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Filtering logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price <= priceRange;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // Default or 'featured'
    return a.id.localeCompare(b.id);
  });

  const handleCategorySelect = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    setSearchParams(params);
  };

  const handleSearchChange = (e) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set('search', e.target.value);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSearchParams({});
    setPriceRange(2000);
    setSortBy('featured');
  };

  return (
    <div className="w-full pt-28 pb-16 flex flex-col space-y-8">
      {/* Page Header */}
      <ScrollReveal className="flex flex-col space-y-2 text-center md:text-left">
        <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-neutral-900 dark:text-white">
          Showroom Catalog
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          Filter and explore our designer lighting products under the current ambient light conditions.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Side: Filter Panel */}
        <ScrollReveal className="lg:col-span-1 flex flex-col space-y-6">
          <div className="glass rounded-2xl p-6 border border-black/5 dark:border-white/5 flex flex-col space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
              <span className="font-extrabold font-display text-sm tracking-wide text-neutral-900 dark:text-white flex items-center space-x-1.5">
                <SlidersHorizontal size={16} />
                <span>Filters</span>
              </span>
              <button 
                onClick={handleResetFilters}
                className="text-[10px] font-bold text-neutral-400 hover:text-amber-500 cursor-pointer flex items-center space-x-1"
              >
                <RefreshCw size={10} />
                <span>Reset All</span>
              </button>
            </div>

            {/* Inline Search */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Search</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Keyword..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-9 pr-4 py-2 w-full rounded-xl text-xs bg-neutral-500/5 dark:bg-neutral-500/10 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
                />
                <Search size={14} className="absolute left-3 text-neutral-400" />
              </div>
            </div>

            {/* Category selection */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Category</label>
              <div className="flex flex-wrap lg:flex-col gap-1.5 lg:space-y-0.5">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`text-left px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer w-fit lg:w-full ${
                      categoryFilter === cat
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'bg-neutral-500/5 dark:bg-neutral-500/10 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-500/10 dark:hover:bg-neutral-500/20'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price slider */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Max Price</label>
                <span className="text-xs font-bold text-amber-500">${priceRange}</span>
              </div>
              <input
                type="range"
                min="10"
                max="2000"
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex items-center justify-between text-[10px] text-neutral-400">
                <span>$10</span>
                <span>$2,000</span>
              </div>
            </div>

            {/* Sorting */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 w-full rounded-xl text-xs bg-neutral-500/5 dark:bg-neutral-500/10 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Side: Product Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <SkeletonGrid count={6} />
          ) : sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ScrollReveal key={product.id} className="w-full">
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            /* Empty State */
            <ScrollReveal className="w-full flex flex-col items-center justify-center text-center p-12 glass rounded-2xl border border-black/5 dark:border-white/5 space-y-4">
              <div className="p-4 rounded-full bg-neutral-500/5 dark:bg-neutral-500/10 text-neutral-400">
                <SlidersHorizontal size={36} />
              </div>
              <h3 className="text-xl font-bold font-display text-neutral-900 dark:text-white">No Illumination Found</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm">
                No items match your search criteria. Try relaxing your filters, searching for alternate keywords, or resetting everything.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#5C4033] dark:bg-amber-500 text-white cursor-pointer hover:scale-105 transition-transform"
              >
                Reset All Filters
              </button>
            </ScrollReveal>
          )}
        </div>
      </div>
    </div>
  );
};
