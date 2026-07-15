import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';

// Components
import { Navbar } from './components/Navbar';
import { GlowCursor } from './components/GlowCursor';

// Pages
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Auth } from './pages/Auth';
import { AdminDashboard } from './pages/AdminDashboard';

// Scroll to Top on Page Route Change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Theme Controller Wrapper (injects theme class to index.html/body)
const MainAppLayout = () => {
  const { isLightsOn } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col items-center w-full relative overflow-hidden transition-colors duration-700 ${
      isLightsOn 
        ? 'bg-brand-charcoal text-neutral-200' 
        : 'bg-brand-white text-neutral-800'
    }`}>
      
      {/* Glow Cursor tracking (Power ON/Dark Mode only) */}
      <GlowCursor />

      {/* Floating Navbar */}
      <Navbar />

      {/* Main Pages Content */}
      <main className="w-[92%] max-w-7xl flex-grow z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showroom" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Luxury Minimalist Footer */}
      <footer className={`w-full border-t py-8 mt-12 flex flex-col items-center justify-center text-center space-y-3 z-10 ${
        isLightsOn 
          ? 'border-white/5 bg-black/20' 
          : 'border-black/5 bg-black/5'
      }`}>
        <span className="text-xs font-black font-display tracking-widest text-neutral-400">
          LUMA SHOWROOM © 2026
        </span>
        <span className="text-[10px] text-neutral-500 font-semibold tracking-wider">
          Curated Architectural Lighting. All Rights Reserved.
        </span>
      </footer>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ProductProvider>
        <CartProvider>
          <AuthProvider>
            <Router>
              <ScrollToTop />
              <MainAppLayout />
            </Router>
          </AuthProvider>
        </CartProvider>
      </ProductProvider>
    </ThemeProvider>
  );
}

export default App;
