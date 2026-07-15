import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Shield, Menu, X, Search, Lightbulb } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { PowerSwitch } from './PowerSwitch';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { isLightsOn } = useTheme();
  const { cartCount } = useCart();
  const { currentUser, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/showroom?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Showroom', path: '/showroom' },
    { name: 'About', path: '/#about' },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-40 transition-all duration-700">
      {/* Main Glass Navbar Panel */}
      <div className="w-full glass rounded-2xl py-3 px-4 md:px-6 flex items-center justify-between shadow-lg border border-black/5 dark:border-white/5">
        {/* Left Side: Brand Logo */}
        <Link to="/" className="flex items-center space-x-2 select-none group">
          <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform duration-300">
            <Lightbulb size={20} className={isLightsOn ? 'filter-glow' : ''} />
          </span>
          <span className="text-xl font-black font-display tracking-tight text-neutral-900 dark:text-white transition-colors duration-700">
            LUMA
          </span>
        </Link>

        {/* Center: Search & Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-semibold transition-colors duration-300 hover:text-amber-500 dark:hover:text-amber-400 ${
                location.pathname === link.path 
                  ? 'text-amber-500 dark:text-amber-400 font-bold' 
                  : 'text-neutral-600 dark:text-neutral-300'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              placeholder="Search illumination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 w-48 lg:w-60 rounded-xl text-xs bg-neutral-500/5 dark:bg-neutral-500/10 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 text-neutral-800 dark:text-white transition-all duration-300"
            />
            <Search size={14} className="absolute left-3 text-neutral-400 pointer-events-none" />
          </form>
        </div>

        {/* Right Side: Cart, User actions & Power Switch */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Admin Panel Link */}
          {isAdmin && (
            <Link 
              to="/admin" 
              title="Admin Dashboard"
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-500/5 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
            >
              <Shield size={18} />
            </Link>
          )}

          {/* User Logged in / Login link */}
          {currentUser ? (
            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-300 truncate max-w-[80px]">
                {currentUser.name}
              </span>
              <button 
                onClick={logout}
                title="Log Out"
                className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-500/5 hover:text-red-500 transition-colors cursor-pointer"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link 
              to="/auth" 
              title="Login / Register"
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-500/5 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
            >
              <User size={18} />
            </Link>
          )}

          {/* Shopping Cart with quantity badge */}
          <Link 
            to="/cart" 
            title="Cart"
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-500/5 hover:text-amber-500 dark:hover:text-amber-400 transition-colors relative"
          >
            <ShoppingCart size={18} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white rounded-full text-[9px] font-black flex items-center justify-center shadow-md shadow-amber-500/20"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Custom Physical Wall Power Switch */}
          <div className="pl-2 border-l border-black/10 dark:border-white/10 py-1">
            <PowerSwitch />
          </div>
        </div>

        {/* Mobile controls (Switch and Hamburger) */}
        <div className="flex md:hidden items-center space-x-3">
          {/* Switch */}
          <PowerSwitch />
          
          {/* Cart Icon */}
          <Link to="/cart" className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 relative">
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 text-white rounded-full text-[9px] font-black flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full mt-2 glass rounded-2xl border border-black/5 dark:border-white/5 p-4 flex flex-col space-y-4 md:hidden shadow-xl"
          >
            {/* Search form */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
              <input
                type="text"
                placeholder="Search showroom..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-full rounded-xl text-sm bg-neutral-500/5 dark:bg-neutral-500/10 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 text-neutral-800 dark:text-white"
              />
              <Search size={16} className="absolute left-3 text-neutral-400" />
            </form>

            {/* Navigation links */}
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-500/5 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Admin dashboard */}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-500/5 flex items-center space-x-2"
                >
                  <Shield size={16} />
                  <span>Admin Dashboard</span>
                </Link>
              )}

              {/* Login / Auth */}
              {currentUser ? (
                <div className="border-t border-black/5 dark:border-white/5 pt-2 flex items-center justify-between px-3">
                  <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
                    Logged in: {currentUser.name}
                  </span>
                  <button 
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-bold text-red-500 flex items-center space-x-1 cursor-pointer"
                  >
                    <LogOut size={14} />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-500/5 flex items-center space-x-2"
                >
                  <User size={16} />
                  <span>Account Login</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
