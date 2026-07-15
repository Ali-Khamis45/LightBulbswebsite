import React, { createContext, useContext, useState, useEffect } from 'react';
import localProducts from '../data/products.json';

const ProductContext = createContext();
const PRODUCTS_STORAGE_KEY = 'luma-products-v3';

const hasImagePairs = (items) =>
  Array.isArray(items) && items.every((product) =>
    product.imageOff &&
    product.imageOn &&
    !product.imageOff.endsWith('.svg') &&
    !product.imageOn.endsWith('.svg')
  );

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (hasImagePairs(parsed)) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse products from localstorage, resetting.", e);
      }
    }
    return localProducts;
  });

  useEffect(() => {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: newProduct.id || `luma-${Date.now()}`,
      rating: newProduct.rating || 5.0,
      reviewsCount: newProduct.reviewsCount || 0
    };
    setProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (id, updatedDetails) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedDetails } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getProductById = (id) => {
    return products.find((p) => p.id === id);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
