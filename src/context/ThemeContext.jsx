import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Read initial power state from localStorage, defaulting to false (Power OFF / Light Mode)
  const [isPowerOn, setIsPowerOn] = useState(() => {
    const saved = localStorage.getItem('luma-power-on');
    return saved ? JSON.parse(saved) : false;
  });

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const listener = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    // Update body classes for transitions:
    // Switch ON (isPowerOn = true) -> Light Theme (power-off class)
    // Switch OFF (isPowerOn = false) -> Dark Theme (power-on class)
    if (isPowerOn) {
      document.body.classList.add('power-off');
      document.body.classList.remove('power-on');
    } else {
      document.body.classList.add('power-on');
      document.body.classList.remove('power-off');
    }
    localStorage.setItem('luma-power-on', JSON.stringify(isPowerOn));
  }, [isPowerOn]);

  const togglePower = () => {
    setIsPowerOn(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isPowerOn, isLightsOn: !isPowerOn, togglePower, reducedMotion }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
