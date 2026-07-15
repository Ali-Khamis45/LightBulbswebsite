import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { playSwitchSound } from '../hooks/useAudio';
import { HelpCircle } from 'lucide-react';

export const PowerSwitch = () => {
  const { isPowerOn, togglePower } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show concept tooltip on first visit
    const hasVisited = localStorage.getItem('luma-switch-visited');
    if (!hasVisited) {
      setShowTooltip(true);
      // Automatically hide after 8 seconds
      const timer = setTimeout(() => {
        setShowTooltip(false);
        localStorage.setItem('luma-switch-visited', 'true');
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleToggle = () => {
    // Play physical sound click
    playSwitchSound(!isPowerOn);
    // Execute theme toggle
    togglePower();
    // Dismiss tooltip upon interaction
    if (showTooltip) {
      setShowTooltip(false);
      localStorage.setItem('luma-switch-visited', 'true');
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Concept Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20 }}
            className={`absolute bottom-20 z-50 w-64 p-4 text-center rounded-xl shadow-xl border glass ${
              isPowerOn ? 'text-neutral-800' : 'text-neutral-200'
            }`}
          >
            <div className="flex justify-center mb-1">
              <span className="p-1 rounded-full bg-amber-500/20 text-amber-500">
                <HelpCircle size={16} />
              </span>
            </div>
            <h4 className={`text-xs font-bold uppercase tracking-wider font-display ${
              isPowerOn ? 'text-neutral-900' : 'text-white'
            }`}>
              Showroom Power
            </h4>
            <p className={`text-[11px] leading-relaxed mt-1 ${
              isPowerOn ? 'text-neutral-600' : 'text-neutral-300'
            }`}>
              Flip the electrical switch to turn ON the showroom lights and experience our luxury illumination.
            </p>
            <button 
              onClick={() => {
                setShowTooltip(false);
                localStorage.setItem('luma-switch-visited', 'true');
              }}
              className="text-[10px] font-bold text-amber-500 hover:text-amber-600 mt-2 block mx-auto underline cursor-pointer"
            >
              Dismiss
            </button>
            {/* Arrow */}
            <div className={`absolute left-1/2 -bottom-2 -translate-x-1/2 w-4 h-4 rotate-45 border-r border-b ${
              isPowerOn ? 'bg-[#FAF9F6] border-black/10' : 'bg-[#141416] border-white/5'
            }`} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Switch Outer Plate */}
      <div 
        className="w-18 h-26 rounded-xl border flex flex-col items-center justify-between p-2 shadow-lg transition-all duration-700 select-none cursor-pointer"
        style={{
          background: isPowerOn 
            ? 'linear-gradient(135deg, #f4f3ec 0%, #e8e6dc 100%)' 
            : 'linear-gradient(135deg, #1f2022 0%, #141415 100%)',
          borderColor: isPowerOn ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
          boxShadow: isPowerOn 
            ? '0 10px 20px -5px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.4)'
            : '0 10px 25px -5px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.05)',
        }}
        onClick={handleToggle}
      >
        {/* Top Screw */}
        <div className={`w-1.5 h-1.5 rounded-full flex items-center justify-center transition-colors duration-700 ${
          isPowerOn ? 'bg-neutral-600/40' : 'bg-neutral-800'
        }`}>
          <div className={`w-1 h-[1px] rotate-45 transition-colors duration-700 ${
            isPowerOn ? 'bg-neutral-800/60' : 'bg-neutral-600'
          }`} />
        </div>

        {/* Switch Indent / Housing */}
        <div 
          className="w-8 h-14 rounded-lg flex items-center justify-center p-0.5 relative transition-all duration-700"
          style={{
            background: isPowerOn ? '#d2cfc2' : '#0a0a0b',
            boxShadow: isPowerOn 
              ? 'inset 0 2px 4px rgba(0,0,0,0.2)' 
              : 'inset 0 2px 4px rgba(0,0,0,0.9)',
          }}
        >
          {/* Status Indicators */}
          <div className={`absolute top-1 text-[7px] font-bold tracking-wider transition-colors duration-700 ${
            isPowerOn ? 'text-neutral-500' : 'text-neutral-700'
          }`}>OFF</div>
          
          <div className={`absolute bottom-1 text-[7px] font-bold tracking-wider transition-colors duration-700 ${
            isPowerOn ? 'text-neutral-400' : 'text-amber-500 font-extrabold'
          }`}>ON</div>

          {/* Toggle Lever */}
          <motion.div
            animate={{
              y: isPowerOn ? 8 : -8,
              rotateX: isPowerOn ? -25 : 25,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="w-5 h-7 rounded bg-gradient-to-b from-amber-400 to-amber-600 border border-amber-700 shadow-md flex items-center justify-center cursor-pointer relative z-10"
            style={{
              boxShadow: isPowerOn 
                ? '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.5)'
                : '0 0 8px rgba(246, 177, 0, 0.4), inset 0 1px 1px rgba(255,255,255,0.4)',
            }}
          >
            {/* Grip ridging */}
            <div className="w-3 h-0.5 bg-amber-800/40 rounded-full mb-0.5" />
            <div className="w-3 h-0.5 bg-amber-800/40 rounded-full" />
          </motion.div>
        </div>

        {/* Bottom Screw */}
        <div className={`w-1.5 h-1.5 rounded-full flex items-center justify-center transition-colors duration-700 ${
          isPowerOn ? 'bg-neutral-600/40' : 'bg-neutral-800'
        }`}>
          <div className={`w-1 h-[1px] -rotate-12 transition-colors duration-700 ${
            isPowerOn ? 'bg-neutral-800/60' : 'bg-neutral-600'
          }`} />
        </div>
      </div>
    </div>
  );
};
