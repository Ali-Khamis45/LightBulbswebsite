import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { MagneticButton } from '../components/MagneticButton';
import { KeyRound, Mail, UserPlus, Info } from 'lucide-react';

export const Auth = () => {
  const { login, register, currentUser } = useAuth();
  const { isLightsOn } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, redirect
  React.useEffect(() => {
    if (currentUser) {
      navigate('/showroom');
    }
  }, [currentUser, navigate]);

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Read redirect destination
  const from = location.state?.from?.pathname || '/showroom';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      setLoading(false);
      navigate(from, { replace: true });
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="w-full pt-28 pb-16 flex items-center justify-center min-h-[80vh]">
      <ScrollReveal className="w-full max-w-md">
        <div className="glass border border-black/5 dark:border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col space-y-6 shadow-xl relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-neutral-900 dark:text-white">
              {isLogin ? 'Showroom Access' : 'Create Account'}
            </h2>
            <p className="text-xs text-neutral-500">
              {isLogin ? 'Log in to manage orders and explore curated fixtures.' : 'Register to save cart layouts and write reviews.'}
            </p>
          </div>

          {/* Admin Credentials Tooltip Box */}
          {isLogin && (
            <div className="p-3.5 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex items-start space-x-2 text-[10px] sm:text-xs leading-relaxed text-amber-600 dark:text-amber-400">
              <Info size={16} className="shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block uppercase tracking-wide text-[9px] mb-0.5">Admin Demo Access</span>
                To unlock CRUD and product creation in the dashboard, log in with:
                <strong className="block font-black mt-1">Email: admin@luma.com</strong>
                <strong className="block font-black">Password: admin123</strong>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            
            {/* Name (Register only) */}
            {!isLogin && (
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Your Name</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-9 pr-4 py-2 w-full rounded-xl text-xs bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
                  />
                  <UserPlus size={14} className="absolute left-3 text-neutral-400" />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Email Address</label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-9 pr-4 py-2 w-full rounded-xl text-xs bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
                />
                <Mail size={14} className="absolute left-3 text-neutral-400" />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Password</label>
              <div className="relative flex items-center">
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-9 pr-4 py-2 w-full rounded-xl text-xs bg-neutral-500/5 border border-black/10 dark:border-white/5 focus:outline-none focus:border-amber-500 text-neutral-800 dark:text-white"
                />
                <KeyRound size={14} className="absolute left-3 text-neutral-400" />
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold rounded-xl text-center">
                {errorMsg}
              </div>
            )}

            {/* Submit Button */}
            <MagneticButton className="w-full pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full text-center inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold transition-all duration-500 shadow-md text-xs tracking-wider cursor-pointer disabled:opacity-50"
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
                {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Register')}
              </button>
            </MagneticButton>
          </form>

          {/* Toggle Switch links */}
          <div className="border-t border-black/5 dark:border-white/5 pt-4 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrorMsg('');
                setFormData({ name: '', email: '', password: '' });
              }}
              className="text-xs font-bold text-amber-500 hover:text-amber-600 transition-colors cursor-pointer"
            >
              {isLogin ? "New to Luma? Create an account" : "Have an account? Access showroom"}
            </button>
          </div>

        </div>
      </ScrollReveal>
    </div>
  );
};
